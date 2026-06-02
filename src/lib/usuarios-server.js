import { createServerAPI } from "./server-api";

/**
 * Obtener listado de todos los usuarios (server-side)
 * @param {string} token - Token de autenticación
 */
export async function getUsuarios(token) {
  const api = createServerAPI(token);
  try {
    return await api.get("/usuarios");
  } catch (error) {
    throw new Error(error.message || "Error al obtener usuarios");
  }
}

/**
 * Obtener un usuario específico por ID (server-side)
 * @param {string} token - Token de autenticación
 * @param {string} userId - ID del usuario
 */
export async function getUsuario(token, userId) {
  const api = createServerAPI(token);
  try {
    return await api.get(`/usuarios/${userId}`);
  } catch (error) {
    throw new Error(error.message || "Error al obtener usuario");
  }
}

/**
 * Obtener perfil de un usuario específico por ID (server-side)
 * @param {string} token - Token de autenticación
 * @param {string} userId - ID del usuario
 */
export async function getPerfilUsuario(token, userId) {
  const api = createServerAPI(token);
  try {
    return await api.get(`/usuarios/${userId}/perfil`);
  } catch (error) {
    throw new Error(error.message || "Error al obtener perfil del usuario");
  }
}

/**
 * Buscar usuarios por nombre o email (server-side)
 * @param {string} token - Token de autenticación
 * @param {string} query - Texto a buscar
 */
export async function buscarUsuarios(token, query) {
  const api = createServerAPI(token);
  try {
    return await api.get(`/usuarios/buscar?q=${encodeURIComponent(query)}`);
  } catch (error) {
    throw new Error(error.message || "Error al buscar usuarios");
  }
}