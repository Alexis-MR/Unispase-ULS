// lib/habilidades-server.js
// Funciones del lado del servidor para habilidades

const API_URL = "http://localhost:8000/api";

/**
 * Obtener todas las habilidades de un perfil
 * @param {string} token - Token de autenticación
 * @param {number} idPerfil - ID del perfil
 * @returns {Promise<Array>} Lista de habilidades
 */
export async function getHabilidades(token, idPerfil) {
  try {
    const response = await fetch(`${API_URL}/habilidades/${idPerfil}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al obtener habilidades");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getHabilidades:", error);
    throw error;
  }
}

/**
 * Obtener una habilidad específica
 * @param {string} token - Token de autenticación
 * @param {number} idHabilidad - ID de la habilidad
 * @returns {Promise<Object>} Datos de la habilidad
 */
export async function getHabilidad(token, idHabilidad) {
  try {
    const response = await fetch(`${API_URL}/habilidades/${idHabilidad}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al obtener habilidad");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getHabilidad:", error);
    throw error;
  }
}

/**
 * Crear una nueva habilidad
 * @param {string} token - Token de autenticación
 * @param {Object} habilidadData - Datos de la habilidad
 * @param {number} habilidadData.id_perfil - ID del perfil
 * @param {string} habilidadData.nombre_habilidad - Nombre de la habilidad
 * @param {string} [habilidadData.nivel] - Nivel de dominio (opcional)
 * @returns {Promise<Object>} Habilidad creada
 */
export async function crearHabilidad(token, habilidadData) {
  try {
    const response = await fetch(`${API_URL}/habilidades`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
      body: JSON.stringify(habilidadData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al crear habilidad");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en crearHabilidad:", error);
    throw error;
  }
}

/**
 * Actualizar una habilidad
 * @param {string} token - Token de autenticación
 * @param {number} idHabilidad - ID de la habilidad
 * @param {Object} habilidadData - Datos actualizados
 * @returns {Promise<Object>} Habilidad actualizada
 */
export async function actualizarHabilidad(token, idHabilidad, habilidadData) {
  try {
    const response = await fetch(`${API_URL}/habilidades/${idHabilidad}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
      body: JSON.stringify(habilidadData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al actualizar habilidad");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en actualizarHabilidad:", error);
    throw error;
  }
}

/**
 * Eliminar una habilidad
 * @param {string} token - Token de autenticación
 * @param {number} idHabilidad - ID de la habilidad
 * @returns {Promise<Object>} Mensaje de confirmación
 */
export async function eliminarHabilidad(token, idHabilidad) {
  try {
    const response = await fetch(`${API_URL}/habilidades/${idHabilidad}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al eliminar habilidad");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en eliminarHabilidad:", error);
    throw error;
  }
}