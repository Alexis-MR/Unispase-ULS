// lib/comentarios-server.js
// Funciones del lado del servidor para comentarios

const API_URL = "http://localhost:8000/api";

/**
 * Obtener comentarios de una publicación (paginados)
 * @param {string} token - Token de autenticación
 * @param {number} idPublicacion - ID de la publicación
 * @param {number} limit - Cantidad de comentarios a obtener (default: 10)
 * @param {number} offset - Offset para paginación (default: 0)
 * @returns {Promise<Object>} Objeto con comentarios y metadatos de paginación
 */
export async function getComentarios(token, idPublicacion, limit = 10, offset = 0) {
  try {
    const response = await fetch(
      `${API_URL}/comentarios/${idPublicacion}?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al obtener comentarios");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getComentarios:", error);
    throw error;
  }
}

/**
 * Crear un nuevo comentario
 * @param {string} token - Token de autenticación
 * @param {Object} comentarioData - Datos del comentario
 * @param {number} comentarioData.id_publicacion - ID de la publicación
 * @param {string} comentarioData.texto_comentario - Texto del comentario
 * @returns {Promise<Object>} Comentario creado
 */
export async function crearComentario(token, comentarioData) {
  try {
    const response = await fetch(`${API_URL}/comentarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(comentarioData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al crear comentario");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en crearComentario:", error);
    throw error;
  }
}

/**
 * Obtener un comentario específico
 * @param {string} token - Token de autenticación
 * @param {number} idComentario - ID del comentario
 * @returns {Promise<Object>} Datos del comentario
 */
export async function getComentario(token, idComentario) {
  try {
    const response = await fetch(`${API_URL}/comentarios/show/${idComentario}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al obtener comentario");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getComentario:", error);
    throw error;
  }
}

/**
 * Actualizar un comentario
 * @param {string} token - Token de autenticación
 * @param {number} idComentario - ID del comentario
 * @param {Object} comentarioData - Datos actualizados del comentario
 * @param {string} comentarioData.texto_comentario - Texto del comentario
 * @returns {Promise<Object>} Comentario actualizado
 */
export async function actualizarComentario(token, idComentario, comentarioData) {
  try {
    const response = await fetch(`${API_URL}/comentarios/${idComentario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(comentarioData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al actualizar comentario");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en actualizarComentario:", error);
    throw error;
  }
}

/**
 * Eliminar un comentario
 * @param {string} token - Token de autenticación
 * @param {number} idComentario - ID del comentario
 * @returns {Promise<Object>} Mensaje de confirmación
 */
export async function eliminarComentario(token, idComentario) {
  try {
    const response = await fetch(`${API_URL}/comentarios/${idComentario}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al eliminar comentario");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en eliminarComentario:", error);
    throw error;
  }
}