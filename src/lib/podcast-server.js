// lib/podcast-server.js

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
// GET /api/podcast
// ======================================
export async function getFeed(token) {
  return getPodcast(token);
}

// ======================================
// OBTENER PUBLICACIONES
// ======================================
export async function getPodcast(token) {
  try {
    const { data } = await api.get(
      "/podcast",
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
      "Error al obtener podcast"
    );
  }
}

// ======================================
// OBTENER MIS PUBLICACIONES
// ======================================
export async function mePodcast(token) {
  try {
    const { data } = await api.get(
      "/podcast/me",
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
      "Error al obtener podcast"
    );
  }
}

// ======================================
// OBTENER PUBLICACIONES POR AUTOR
// ======================================
export async function getPodcastPorAutor(
  token,
  idAutor
) {
  try {
    const { data } = await api.get(
      `/podcast/autor/${idAutor}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;

  } catch (error) {

    // Si no hay podcast
    if (error?.response?.status === 404) {
      return [];
    }

    handleError(
      error,
      "Error al obtener podcast del autor"
    );
  }
}

// ======================================
// OBTENER PUBLICACION POR ID
// ======================================
export async function getPodcastById(
  token,
  idPodcast
) {
  try {
    const { data } = await api.get(
      `/podcast/${idPodcast}`,
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
export async function crearPodcast(
  token,
  payload
) {
  try {
    const { data } = await api.post(
      "/podcast",
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
export async function actualizarPodcast(
  token,
  idPodcast,
  payload
) {
  try {
    const { data } = await api.put(
      `/podcast/${idPodcast}`,
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
export async function eliminarPodcast(
  token,
  idPodcast
) {
  try {
    const { data } = await api.delete(
      `/podcast/${idPodcast}`,
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