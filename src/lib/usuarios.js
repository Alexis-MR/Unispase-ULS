import api from "./api";

/**
 * Obtener listado de todos los usuarios (cliente)
 * GET /usuarios
 */
export async function getUsuarios() {
  try {
    const res = await api.get("/usuarios");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al obtener usuarios");
  }
}

/**
 * Obtener un usuario específico por ID (cliente)
 * GET /usuarios/{id}
 * @param {string} userId - ID del usuario
 */
export async function getUsuario(userId) {
  try {
    const res = await api.get(`/usuarios/${userId}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al obtener usuario");
  }
}

/**
 * Obtener perfil de un usuario específico (cliente)
 * GET /usuarios/{id}/perfil
 * @param {string} userId - ID del usuario
 */
export async function getPerfilUsuario(userId) {
  try {
    const res = await api.get(`/usuarios/${userId}/perfil`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al obtener perfil del usuario");
  }
}

/**
 * Buscar usuarios por nombre o email (cliente)
 * GET /usuarios/buscar?q=texto
 * @param {string} query - Texto a buscar
 */
export async function buscarUsuarios(query) {
  try {
    const res = await api.get(`/usuarios/buscar?q=${encodeURIComponent(query)}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al buscar usuarios");
  }
}

export async function CambiarRol(userId, data) {
  try {
    const res = await api.put(`/usuarios/${userId}`, data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al actualizar usuario");
  }
}