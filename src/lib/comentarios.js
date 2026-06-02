// lib/comentarios.js

import api from "./api";

/* =========================================================
   OBTENER COMENTARIOS
========================================================= */

export async function getComentarios(
  commentable_id,
  commentable_type = "publicacion",
  limit = 10,
  offset = 0
) {
  try {

    const response = await api.get(
      "/comentarios",
      {
        params: {
          commentable_id,
          commentable_type,
        },
      }
    );
    console.log(response.data.comentarios)

    return response.data;

  } catch (error) {

    console.error(
      "Error al obtener comentarios:",
      error.response?.data || error
    );

    throw error;
  }
}

/* =========================================================
   CREAR COMENTARIO
========================================================= */

export async function crearComentario({
  comentario,
  commentable_id,
  commentable_type = "publicacion",
}) {
  try {

    const response = await api.post(
      "/comentarios",
      {
        comentario,
        commentable_id,
        commentable_type,
      }
    );

    return response.data.data;

  } catch (error) {

    console.error(
      "Error al crear comentario:",
      error.response?.data || error
    );

    throw error;
  }
}

/* =========================================================
   OBTENER UN COMENTARIO
========================================================= */

export async function getComentario(
  idComentario
) {
  try {

    const response = await api.get(
      `/comentarios/${idComentario}`
    );

    return response.data;

  } catch (error) {

    console.error(
      "Error getComentario:",
      error.response?.data || error
    );

    throw new Error(
      error.response?.data?.message ||
      "Error al obtener comentario"
    );
  }
}

/* =========================================================
   ACTUALIZAR COMENTARIO
========================================================= */

export async function actualizarComentario(
  idComentario,
  comentario
) {
  try {

    if (!comentario?.trim()) {
      throw new Error(
        "El comentario es requerido"
      );
    }

    const response = await api.put(
      `/comentarios/${idComentario}`,
      {
        comentario,
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      "Error actualizarComentario:",
      error.response?.data || error
    );

    throw new Error(
      error.response?.data?.message ||
      error.message ||
      "Error al actualizar comentario"
    );
  }
}

/* =========================================================
   ELIMINAR COMENTARIO
========================================================= */

export async function eliminarComentario(
  idComentario
) {
  try {

    const confirmar = confirm(
      "¿Eliminar comentario?"
    );

    if (!confirmar) {
      return false;
    }

    const response = await api.delete(
      `/comentarios/${idComentario}`
    );

    return response.data;

  } catch (error) {

    console.error(
      "Error eliminarComentario:",
      error.response?.data || error
    );

    throw new Error(
      error.response?.data?.message ||
      "Error al eliminar comentario"
    );
  }
}

/* =========================================================
   CARGAR MÁS
========================================================= */

export async function cargarMasComentarios(
  commentable_id,
  commentable_type = "publicacion",
  offset = 0,
  limit = 10
) {

  return await getComentarios(
    commentable_id,
    commentable_type,
    limit,
    offset
  );
}

/* =========================================================
   VALIDAR TEXTO
========================================================= */

export function validarTextoComentario(
  comentario
) {

  if (!comentario?.trim()) {

    return {
      valido: false,
      error:
        "El comentario no puede estar vacío",
    };
  }

  if (comentario.length > 5000) {

    return {
      valido: false,
      error:
        "Máximo 5000 caracteres",
    };
  }

  return {
    valido: true,
    error: null,
  };
}