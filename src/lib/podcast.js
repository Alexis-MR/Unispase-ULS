import api from "./api";

/**
 * @typedef {Object} Podcast
 * @property {string} tema
 * @property {string} titulo
 * @property {string} descripcion
 * @property {string} contenido
 * @property {string} user_id
 */

/**
 * @returns {Promise<Podcast[]>}
 */
export async function getPodcast() {
  const response = await api.get("/podcast");
  return response.data;
}

/**
 * @param {string} id
 * @returns {Promise<Podcast>}
 */
export async function getPodcastById(id) {
  const response = await api.get(`/podcast/${id}`);
  return response.data;
}

// ======================================
// OBTENER PODCAST POR TEMA
// ======================================
export async function getPodcastPorTema(
  tema
) {
  try {

    const res = await api.get(
      `/podcast/tema/${tema}`
    );

    return res.data;

  } catch (error) {

    if (error.response?.status === 404) {
      return [];
    }

    throw new Error(
      error.response?.data?.message ||
      "Error al obtener podcast del tema"
    );
  }
}

export async function getPodcastPorCategoria(categoria) {
  try {

    const res = await api.get(
      `/podcast/categoria/${categoria}`
    );

    return res.data;

  } catch (error) {

    if (error.response?.status === 404) {
      return [];
    }

    throw new Error(
      error.response?.data?.message ||
      "Error al obtener podcast de la categoría"
    );
  }
}

/**
 * @param {Partial<Podcast>} data
 * @returns {Promise<Podcast>}
 */
export async function createPodcast(data) {
  try {
    const response = await api.post("/podcast", data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      "Error al crear el podcast"
    );
  }
}

/**
 * @param {string} id
 * @param {Partial<Podcast>} data
 * @returns {Promise<Podcast>}
 */
export async function updatePodcast(id, data) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value);
  }

  const response = await api.put(`/podcast/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

/**
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function deletePodcast(id) {
  await api.delete(`/podcast/${id}`);
}

// Aliases en español para compatibilidad
export const actualizarPodcast = updatePodcast;
export const eliminarPodcast = deletePodcast;