// lib/likes-server.js
const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:8000/api";

/**
 * Toggle Like/Unlike en una publicación
 * POST /api/likes/toggle
 * data = { id_publicacion }
 */
export async function toggleLike(token, idPublicacion) {
  try {
    const response = await fetch(`${API_URL}/likes/toggle`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_publicacion: idPublicacion
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al dar like");
    }

    return await response.json(); // { liked: true/false }
  } catch (error) {
    throw new Error(error.message || "Error al dar like");
  }
}

/**
 * Verificar si el usuario dio like a una publicación
 * GET /api/likes/check/{id_publicacion}/{id_users}
 */
export async function checkLike(token, idPublicacion, idUsers) {
  try {
    const response = await fetch(`${API_URL}/likes/check/${idPublicacion}/${idUsers}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al verificar like");
    }

    return await response.json(); // { liked: true/false }
  } catch (error) {
    throw new Error(error.message || "Error al verificar like");
  }
}

/**
 * Obtener total de likes de una publicación
 * GET /api/likes/count/{id_publicacion}
 */
export async function countLikes(token, idPublicacion) {
  try {
    const response = await fetch(`${API_URL}/likes/count/${idPublicacion}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al contar likes");
    }

    return await response.json(); // { total_likes: number }
  } catch (error) {
    throw new Error(error.message || "Error al contar likes");
  }
}