import { createServerAPI } from "./server-api";

/**
 * Obtener idiomas del usuario logueado por ID de perfil (server-side)
 * @param {string} token - Token de autenticación
 * @param {string} idPerfil - ID del perfil del usuario
 */
export async function getIdiomas(token, idPerfil) {
  const api = createServerAPI(token);
  try {
    return await api.get(`/idiomas/${idPerfil}`);
  } catch (error) {
    // Si no tiene idiomas, devolver arreglo vacío
    if (error.message.includes("404")) {
      return [];
    }
    throw error;
  }
}

/**
 * Obtener un idioma por ID (server-side)
 * @param {string} token - Token de autenticación
 * @param {string} idIdioma - ID del idioma
 */
export async function getIdiomaPorId(token, idIdioma) {
  const api = createServerAPI(token);
  try {
    return await api.get(`/idiomas/${idIdioma}`);
  } catch (error) {
    throw new Error(error.message || "Error al obtener idioma");
  }
}

/**
 * Crear idioma (server-side)
 * @param {string} token - Token de autenticación
 * @param {Object} data - { id_perfil, nombre_idioma, nivel }
 */
export async function crearIdiomaServer(token, data) {
  const api = createServerAPI(token);
  return await api.post("/idiomas", data);
}

/**
 * Actualizar idioma (server-side)
 * @param {string} token - Token de autenticación
 * @param {string} idIdioma - ID del idioma
 * @param {Object} data - { nombre_idioma?, nivel? }
 */
export async function actualizarIdiomaServer(token, idIdioma, data) {
  const api = createServerAPI(token);
  return await api.put(`/idiomas/${idIdioma}`, data);
}

/**
 * Eliminar idioma (server-side)
 * @param {string} token - Token de autenticación
 * @param {string} idIdioma - ID del idioma
 */
export async function eliminarIdiomaServer(token, idIdioma) {
  const api = createServerAPI(token);
  return await api.delete(`/idiomas/${idIdioma}`);
}
