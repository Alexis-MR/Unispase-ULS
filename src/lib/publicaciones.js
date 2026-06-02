// lib/publicaciones.js

import api from "./api";

// ======================================
// OBTENER PUBLICACIONES
// ======================================
export async function getPublicaciones() {
  try {

    const res = await api.get("/publicaciones");

    return res.data;

  } catch (error) {

    throw new Error(
      error.response?.data?.message ||
      "Error al obtener publicaciones"
    );
  }
}

// ======================================
// OBTENER PUBLICACIONES POR AUTOR
// ======================================
export async function getPublicacionesPorAutor(
  idAutor
) {
  try {

    const res = await api.get(
      `/publicaciones/autor/${idAutor}`
    );

    return res.data;

  } catch (error) {

    if (error.response?.status === 404) {
      return [];
    }

    throw new Error(
      error.response?.data?.message ||
      "Error al obtener publicaciones del autor"
    );
  }
}
// ======================================
// OBTENER PUBLICACIONES POR TEMA
// ======================================
export async function getPublicacionesPorTema(
  tema
) {
  try {

    const res = await api.get(
      `/publicaciones/tema/${tema}`
    );

    return res.data;

  } catch (error) {

    if (error.response?.status === 404) {
      return [];
    }

    throw new Error(
      error.response?.data?.message ||
      "Error al obtener publicaciones del tema"
    );
  }
}

export async function getPublicacionesPorCategoria(categoria) {
  try {

    const res = await api.get(
      `/publicaciones/categoria/${categoria}`
    );

    return res.data;

  } catch (error) {

    if (error.response?.status === 404) {
      return [];
    }

    throw new Error(
      error.response?.data?.message ||
      "Error al obtener publicaciones de la categoría"
    );
  }
}
// ======================================
// OBTENER PUBLICACION
// ======================================
export async function getPublicacion(
  idPublicacion
) {
  try {

    const res = await api.get(
      `/publicaciones/${idPublicacion}`
    );

    return res.data;

  } catch (error) {

    throw new Error(
      error.response?.data?.message ||
      "Error al obtener la publicación"
    );
  }
}

// ======================================
// CREAR PUBLICACION
// ======================================
export async function crearPublicacion(data) {
  try {

    const res = await api.post(
      "/publicaciones",
      data
    );

    return res.data;

  } catch (error) {

    throw new Error(
      error.response?.data?.message ||
      "Error al crear publicación"
    );
  }
}

// ======================================
// ACTUALIZAR PUBLICACION
// ======================================
export async function actualizarPublicacion(
  idPublicacion,
  data
) {
  try {

    // Laravel multipart PUT fix
    data.append("_method", "PUT");

    const res = await api.post(
      `/publicaciones/${idPublicacion}`,
      data
    );

    return res.data;

  } catch (error) {

    throw new Error(
      error.response?.data?.message ||
      "Error al actualizar publicación"
    );
  }
}

// ======================================
// ELIMINAR PUBLICACION
// ======================================
export async function eliminarPublicacion(
  idPublicacion
) {
  try {

    const res = await api.delete(
      `/publicaciones/${idPublicacion}`
    );

    return res.data;

  } catch (error) {

    throw new Error(
      error.response?.data?.message ||
      "Error al eliminar publicación"
    );
  }
}