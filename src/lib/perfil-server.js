import { createServerAPI } from "./server-api";

/**
 * Obtener perfil del usuario autenticado (server-side)
 * @param {string} token - Token de autenticación
 */
export async function getPerfil(token) {
  const api = createServerAPI(token);
  try {
    return await api.get("/perfil/me");
  } catch (error) {
    // Retornar null si no tiene perfil (404)
    if (error.message.includes("404")) {
      return null;
    }
    throw error;
  }
}

/**
 * Obtener perfil de cualquier usuario por ID (server-side)
 * @param {string} token - Token de autenticación
 * @param {string} userId - ID del usuario
 */
export async function getPerfilPorId(token, userId) {
  const api = createServerAPI(token);
  try {
    return await api.get(`/perfil/${userId}`);
  } catch (error) {
    throw new Error(error.message || "Error al obtener perfil del usuario");
  }
}
export async function getMiPerfil() {
  try {
    const res = await api.get(`/perfil/me`);

    if (!res.ok) {
      throw new Error("Error al obtener perfil");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Crear perfil (server-side) - SOLO para datos sin archivos
 * Para archivos, usar la versión cliente (perfil.js)
 * @param {string} token - Token de autenticación
 * @param {Object} data - Datos del perfil
 */
export async function crearPerfilServer(token, data) {
  const api = createServerAPI(token);
  return await api.post("/perfil", data);
}

/**
 * Actualizar perfil (server-side) - SOLO para datos sin archivos
 * @param {string} token - Token de autenticación
 * @param {Object} data - Datos a actualizar
 */
export async function actualizarPerfilServer(token, data) {
  const api = createServerAPI(token);
  return await api.put("/perfil", data);
}

/**
 * Eliminar perfil (server-side)
 * @param {string} token - Token de autenticación
 */
export async function eliminarPerfilServer(token) {
  const api = createServerAPI(token);
  return await api.delete("/perfil");
}