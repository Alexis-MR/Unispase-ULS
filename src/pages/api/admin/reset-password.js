// src/pages/api/admin/reset-password.js
import { createClient } from "@supabase/supabase-js";

export const prerender = false;

const ROLES_VALIDOS = ["estudiante", "docente", "admin"];

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST({ request }) {
  try {
    const url = import.meta.env.PUBLIC_SUPABASE_URL;
    const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
      return json(
        { error: "Falta configurar SUPABASE_SERVICE_ROLE_KEY en el servidor." },
        500
      );
    }

    // Cliente admin con la service_role key (poder total, SOLO en el servidor)
    const admin = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // 1) Token de quien hace la petición
    const authHeader = request.headers.get("authorization") || "";
    const token = authHeader.replace("Bearer ", "").trim();
    if (!token) return json({ error: "No autorizado." }, 401);

    // 2) Validar el token y obtener al usuario que llama
    const { data: userData, error: userErr } = await admin.auth.getUser(token);
    if (userErr || !userData?.user) {
      return json({ error: "Sesión inválida o expirada." }, 401);
    }
    const callerId = userData.user.id;

    // 3) Verificar que quien llama tenga rol "admin"
    const { data: perfil, error: perfilErr } = await admin
      .from("perfiles")
      .select("rol")
      .eq("id", callerId)
      .single();

    if (perfilErr || !perfil || perfil.rol !== "admin") {
      return json({ error: "Solo un administrador puede hacer esto." }, 403);
    }

    // 4) Leer datos
    const body = await request.json();
    const email = (body.email || "").trim().toLowerCase();
    const password = body.password || "";
    const newEmail = (body.newEmail || "").trim().toLowerCase();
    const newRol = (body.newRol || "").trim().toLowerCase();

    if (!email) {
      return json({ error: "Falta el correo del usuario." }, 400);
    }
    if (!password && !newEmail && !newRol) {
      return json(
        { error: "Indica una nueva contraseña, un nuevo correo o un nuevo rol." },
        400
      );
    }
    if (password && password.length < 6) {
      return json(
        { error: "La contraseña debe tener al menos 6 caracteres." },
        400
      );
    }
    if (newEmail && !newEmail.includes("@")) {
      return json({ error: "El nuevo correo no es válido." }, 400);
    }
    if (newRol && !ROLES_VALIDOS.includes(newRol)) {
      return json({ error: "Rol no válido." }, 400);
    }

    // 5) Encontrar el id del usuario destino por su correo actual
    let targetId = null;

    const { data: perfilDestino } = await admin
      .from("perfiles")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (perfilDestino?.id) {
      targetId = perfilDestino.id;
    } else {
      let page = 1;
      while (page <= 20 && !targetId) {
        const { data: list, error: listErr } =
          await admin.auth.admin.listUsers({ page, perPage: 1000 });
        if (listErr || !list?.users?.length) break;
        const found = list.users.find(
          (u) => (u.email || "").toLowerCase() === email
        );
        if (found) targetId = found.id;
        if (list.users.length < 1000) break;
        page++;
      }
    }

    if (!targetId) {
      return json({ error: "No existe ningún usuario con ese correo." }, 404);
    }

    // 6) Cambios en Auth (contraseña / correo) — solo si hay algo que cambiar
    const cambios = {};
    if (password) cambios.password = password;
    if (newEmail) {
      cambios.email = newEmail;
      cambios.email_confirm = true; // cambio inmediato, sin email de confirmación
    }
    if (Object.keys(cambios).length > 0) {
      const { error: updErr } = await admin.auth.admin.updateUserById(
        targetId,
        cambios
      );
      if (updErr) return json({ error: updErr.message }, 400);
    }

    // 7) Cambios en la tabla perfiles (correo y/o rol)
    const cambiosPerfil = {};
    if (newEmail) cambiosPerfil.email = newEmail;
    if (newRol) cambiosPerfil.rol = newRol;
    if (Object.keys(cambiosPerfil).length > 0) {
      const { error: perfUpdErr } = await admin
        .from("perfiles")
        .update(cambiosPerfil)
        .eq("id", targetId);
      if (perfUpdErr) return json({ error: perfUpdErr.message }, 400);
    }

    // 8) Mensaje según lo que se cambió
    const hechos = [];
    if (password) hechos.push("contraseña");
    if (newEmail) hechos.push("correo");
    if (newRol) hechos.push("rol");
    const msg = "Se actualizó: " + hechos.join(", ") + ".";

    return json({ ok: true, message: msg });
  } catch (e) {
    return json({ error: "Error interno: " + e.message }, 500);
  }
}