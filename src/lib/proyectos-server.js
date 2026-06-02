// lib/proyectos-server.js
// Funciones del lado del servidor para proyectos

const API_URL = "http://localhost:8000/api";

/**
 * Obtener todos los proyectos de un perfil
 * @param {string} token - Token de autenticación
 * @param {number} idPerfil - ID del perfil
 * @returns {Promise<Array>} Lista de proyectos
 */
export async function getProyectos(token, idPerfil) {
  try {
    const response = await fetch(`${API_URL}/proyectos/${idPerfil}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al obtener proyectos");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getProyectos:", error);
    throw error;
  }
}

/**
 * Obtener un proyecto específico
 * @param {string} token - Token de autenticación
 * @param {number} idProyecto - ID del proyecto
 * @returns {Promise<Object>} Datos del proyecto
 */
export async function getProyecto(token, idProyecto) {
  try {
    const response = await fetch(`${API_URL}/proyectos/${idProyecto}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al obtener proyecto");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getProyecto:", error);
    throw error;
  }
}

/**
 * Crear un nuevo proyecto
 * @param {string} token - Token de autenticación
 * @param {Object} proyectoData - Datos del proyecto
 * @param {number} proyectoData.id_perfil - ID del perfil
 * @param {string} proyectoData.nombre_proyecto - Nombre del proyecto
 * @param {string} [proyectoData.descripcion] - Descripción (opcional)
 * @param {string} [proyectoData.url] - URL del proyecto (opcional)
 * @param {string} [proyectoData.fecha_inicio] - Fecha de inicio (opcional)
 * @param {string} [proyectoData.fecha_fin] - Fecha de fin (opcional)
 * @returns {Promise<Object>} Proyecto creado
 */
export async function crearProyecto(token, proyectoData) {
  try {
    const response = await fetch(`${API_URL}/proyectos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
      body: JSON.stringify(proyectoData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al crear proyecto");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en crearProyecto:", error);
    throw error;
  }
}

/**
 * Actualizar un proyecto
 * @param {string} token - Token de autenticación
 * @param {number} idProyecto - ID del proyecto
 * @param {Object} proyectoData - Datos actualizados
 * @returns {Promise<Object>} Proyecto actualizado
 */
export async function actualizarProyecto(token, idProyecto, proyectoData) {
  try {
    const response = await fetch(`${API_URL}/proyectos/${idProyecto}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
      body: JSON.stringify(proyectoData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al actualizar proyecto");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en actualizarProyecto:", error);
    throw error;
  }
}

/**
 * Eliminar un proyecto
 * @param {string} token - Token de autenticación
 * @param {number} idProyecto - ID del proyecto
 * @returns {Promise<Object>} Mensaje de confirmación
 */
export async function eliminarProyecto(token, idProyecto) {
  try {
    const response = await fetch(`${API_URL}/proyectos/${idProyecto}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al eliminar proyecto");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en eliminarProyecto:", error);
    throw error;
  }
}