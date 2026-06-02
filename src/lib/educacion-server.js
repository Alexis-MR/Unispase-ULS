// lib/educacion-server.js
// Funciones del lado del servidor para educación

const API_URL = "http://localhost:8000/api";

/**
 * Obtener toda la educación del usuario autenticado
 * @param {string} token - Token de autenticación
 * @returns {Promise<Array>} Lista de educación
 */
export async function getEducacion(token) {
  try {
    const response = await fetch(`${API_URL}/educacion`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al obtener educación");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getEducacion:", error);
    throw error;
  }
}

/**
 * Crear una nueva educación
 * @param {string} token - Token de autenticación
 * @param {Object} educacionData - Datos de la educación
 * @param {number} educacionData.id_perfil - ID del perfil
 * @param {string} educacionData.institucion - Nombre de la institución
 * @param {string} educacionData.titulo - Título obtenido
 * @param {string} educacionData.fecha_inicio - Fecha de inicio
 * @param {string} [educacionData.fecha_fin] - Fecha de fin (opcional)
 * @param {string} [educacionData.descripcion] - Descripción (opcional)
 * @returns {Promise<Object>} Educación creada
 */
export async function crearEducacion(token, educacionData) {
  try {
    const response = await fetch(`${API_URL}/educacion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
      body: JSON.stringify(educacionData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al crear educación");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en crearEducacion:", error);
    throw error;
  }
}

/**
 * Actualizar una educación
 * @param {string} token - Token de autenticación
 * @param {number} idEducacion - ID de la educación
 * @param {Object} educacionData - Datos actualizados
 * @returns {Promise<Object>} Educación actualizada
 */
export async function actualizarEducacion(token, idEducacion, educacionData) {
  try {
    const response = await fetch(`${API_URL}/educacion/${idEducacion}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
      body: JSON.stringify(educacionData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al actualizar educación");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en actualizarEducacion:", error);
    throw error;
  }
}

/**
 * Eliminar una educación
 * @param {string} token - Token de autenticación
 * @param {number} idEducacion - ID de la educación
 * @returns {Promise<Object>} Mensaje de confirmación
 */
export async function eliminarEducacion(token, idEducacion) {
  try {
    const response = await fetch(`${API_URL}/educacion/${idEducacion}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al eliminar educación");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en eliminarEducacion:", error);
    throw error;
  }
}