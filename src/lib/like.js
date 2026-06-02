// lib/likes.js
import api from "./api";

/**
 * Toggle Like/Unlike en una publicación
 * POST /api/likes/toggle
 * data = { id_publicacion }
 * El id_users se obtiene automáticamente del token en el backend
 */
export async function toggleLike(likeableId, type) {
  try {
    const res = await api.post("/likes/toggle", {
      likeable_id: likeableId,
      likeable_type: type
    });
    console.log("Respuesta del toggleLike:", res.data);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al dar like"
    );
  }
}

/**
 * Verificar si el usuario dio like a una publicación
 * GET /api/likes/check/{id_publicacion}/{id_users}
 */
export async function checkLike(idPublicacion, idUsers) {
  try {
    const res = await api.get(`/likes/check/${idPublicacion}/${idUsers}`);
    return res.data; // { liked: true/false }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al verificar like"
    );
  }
}

/**
 * Obtener total de likes de una publicación
 * GET /api/likes/count/{id_publicacion}
 */
export async function countLikes(idPublicacion) {
  try {
    const res = await api.get(`/likes/count/${idPublicacion}`);
    return res.data; // { total_likes: number }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al contar likes"
    );
  }
}