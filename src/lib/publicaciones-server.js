// lib/publicaciones-server.js

import api from "@/lib/api";

// ======================================
// HELPER ERROR
// ======================================
function handleError(error, defaultMessage) {
  console.error(error);

  throw new Error(
    error?.response?.data?.message ||
    error?.message ||
    defaultMessage
  );
}

// ======================================
// OBTENER FEED
// GET /api/publicaciones
// ======================================
export async function getFeed(token) {
  return getPublicaciones(token);
}

// ======================================
// OBTENER PUBLICACIONES
// ======================================
export async function getPublicaciones(token, page = 1) {
  try {
    const { data } = await api.get(
      "/publicaciones",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
        },
      }
    );

    return data;

  } catch (error) {
    handleError(
      error,
      "Error al obtener publicaciones"
    );
  }
}

// ======================================
// OBTENER MIS PUBLICACIONES
// ======================================
export async function mePublicacion(token) {
  try {
    const { data } = await api.get(
      "/publicaciones/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;

  } catch (error) {
    handleError(
      error,
      "Error al obtener publicaciones"
    );
  }
}

// ======================================
// OBTENER PUBLICACIONES POR AUTOR
// ======================================
export async function getPublicacionesPorAutor(
  token,
  idAutor
) {
  try {
    const { data } = await api.get(
      `/publicaciones/autor/${idAutor}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;

  } catch (error) {

    // Si no hay publicaciones
    if (error?.response?.status === 404) {
      return [];
    }

    handleError(
      error,
      "Error al obtener publicaciones del autor"
    );
  }
}

// ======================================
// OBTENER PUBLICACION POR ID
// ======================================
export async function getPublicacion(
  token,
  idPublicacion
) {
  try {
    const { data } = await api.get(
      `/publicaciones/${idPublicacion}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;

  } catch (error) {
    handleError(
      error,
      "Error al obtener la publicación"
    );
  }
}

// ======================================
// CREAR PUBLICACION
// ======================================
export async function crearPublicacion(
  token,
  payload
) {
  try {
    const { data } = await api.post(
      "/publicaciones",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;

  } catch (error) {
    handleError(
      error,
      "Error al crear publicación"
    );
  }
}

// ======================================
// ACTUALIZAR PUBLICACION
// ======================================
export async function actualizarPublicacion(
  token,
  idPublicacion,
  payload
) {
  try {
    const { data } = await api.put(
      `/publicaciones/${idPublicacion}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;

  } catch (error) {
    handleError(
      error,
      "Error al actualizar publicación"
    );
  }
}

// ======================================
// ELIMINAR PUBLICACION
// ======================================
export async function eliminarPublicacion(
  token,
  idPublicacion
) {
  try {
    const { data } = await api.delete(
      `/publicaciones/${idPublicacion}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;

  } catch (error) {
    handleError(
      error,
      "Error al eliminar publicación"
    );
  }
}