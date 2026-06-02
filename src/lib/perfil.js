
// lib/perfil.js
import api from "./api";

/**
 * Obtener MI perfil (GET /auth/perfil/me)
 */
export async function getMiPerfil() {
  try {
    const res = await api.get("/auth/perfil/me");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al obtener el perfil");
  }
}


/**
 * Obtener perfil de cualquier usuario por ID (cliente)
 * GET /perfil/{id}
 * @param {string} userId - ID del usuario
 */
export async function getPerfilPorId(userId) {
  try {
    const res = await api.get(`/perfil/${userId}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al obtener perfil del usuario");
  }
}

/**
 * Crear perfil (POST /auth/perfil)
 * data ejemplo:
 * {
 *   fecha_nacimiento: "2000-01-01",
 *   telefono: "12345678",
 *   direccion: "San Salvador",
 *   bio: "Desarrollador"
 * }
 */
export async function crearPerfil(data) {
  try {
    const res = await api.post("/auth/perfil", data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al crear el perfil");
  }
}

/**
 * Actualizar perfil (PUT /auth/perfil)
 */
export async function actualizarPerfil(data) {
  try {
    data.append("_method", "PUT");
    const res = await api.post("/perfil/perfil", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.log("Error:", error.response?.data);
    throw new Error(
      error.response?.data?.message || "Error al actualizar el perfil"
    );
  }
}
/**
 * Eliminar perfil (DELETE /auth/perfil)
 */
export async function eliminarPerfil() {
  try {
    const res = await api.delete("/auth/perfil");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al eliminar el perfil");
  }
}
