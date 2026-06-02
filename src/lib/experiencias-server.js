// lib/experiencias-server.js
// Funciones del lado del servidor para experiencias laborales

const API_URL = "http://localhost:8000/api";

/**
 * Obtener todas las experiencias laborales del usuario autenticado
 * @param {string} token - Token de autenticación
 * @returns {Promise<Array>} Lista de experiencias laborales
 */
export async function getExperiencias(token) {
  try {
    const response = await fetch(`${API_URL}/experiencias`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al obtener experiencias");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getExperiencias:", error);
    throw error;
  }
}

/**
 * Crear una nueva experiencia laboral
 * @param {string} token - Token de autenticación
 * @param {Object} experienciaData - Datos de la experiencia
 * @param {number} experienciaData.id_perfil - ID del perfil
 * @param {string} experienciaData.puesto - Puesto de trabajo
 * @param {string} experienciaData.empresa - Nombre de la empresa
 * @param {string} experienciaData.fecha_inicio - Fecha de inicio
 * @param {string} [experienciaData.fecha_fin] - Fecha de fin (opcional)
 * @param {string} [experienciaData.descripcion] - Descripción (opcional)
 * @returns {Promise<Object>} Experiencia creada
 */
export async function crearExperiencia(token, experienciaData) {
  try {
    const response = await fetch(`${API_URL}/experiencias`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
      body: JSON.stringify(experienciaData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al crear experiencia");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en crearExperiencia:", error);
    throw error;
  }
}

/**
 * Actualizar una experiencia laboral
 * @param {string} token - Token de autenticación
 * @param {number} idExperiencia - ID de la experiencia
 * @param {Object} experienciaData - Datos actualizados
 * @returns {Promise<Object>} Experiencia actualizada
 */
export async function actualizarExperiencia(token, idExperiencia, experienciaData) {
  try {
    const response = await fetch(`${API_URL}/experiencias/${idExperiencia}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
      body: JSON.stringify(experienciaData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al actualizar experiencia");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en actualizarExperiencia:", error);
    throw error;
  }
}

/**
 * Eliminar una experiencia laboral
 * @param {string} token - Token de autenticación
 * @param {number} idExperiencia - ID de la experiencia
 * @returns {Promise<Object>} Mensaje de confirmación
 */
export async function eliminarExperiencia(token, idExperiencia) {
  try {
    const response = await fetch(`${API_URL}/experiencias/${idExperiencia}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al eliminar experiencia");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en eliminarExperiencia:", error);
    throw error;
  }
}