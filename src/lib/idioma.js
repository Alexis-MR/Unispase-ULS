// lib/idioma.js
import api from "./api";

/**
 * Obtener idiomas por ID de perfil
 * GET /idiomas/{id_perfil}
 */
export async function getIdiomas(idPerfil) {
  try {
    const res = await api.get(`/idiomas/${idPerfil}`);
    return res.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }
    throw new Error(
      error.response?.data?.message || "Error al obtener idiomas"
    );
  }
}

/**
 * Obtener idioma por ID
 * GET /idiomas/idioma/{id}
 */
export async function getIdiomaPorId(idIdioma) {
  try {
    const res = await api.get(`/idiomas/idioma/${idIdioma}`);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener idioma"
    );
  }
}

/**
 * Crear idioma
 * POST /idiomas
 * data = { id_perfil, nombre_idioma, nivel }
 */
export async function crearIdioma(data) {
  try {
    const res = await api.post("/idiomas", data);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al crear idioma"
    );
  }
}

/**
 * Actualizar idioma
 * PUT /idiomas/{id}
 */
export async function actualizarIdioma(idIdioma, data) {
  try {
    const res = await api.put(`/idiomas/${idIdioma}`, data);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al actualizar idioma"
    );
  }
}

/**
 * Eliminar idioma
 * DELETE /idiomas/{id}
 */
export async function eliminarIdioma(idIdioma) {
  try {
    const res = await api.delete(`/idiomas/${idIdioma}`);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al eliminar idioma"
    );
  }
}
