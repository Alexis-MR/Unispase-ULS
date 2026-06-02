// lib/experiencias.js
// Funciones del lado del cliente para experiencias laborales

const API_URL = "http://localhost:8000/api";

/**
 * Obtener el token de las cookies
 * @returns {string|null} Token de autenticación
 */
function getToken() {
  const cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((c) => c.trim().startsWith("token="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
}

/**
 * Obtener todas las experiencias laborales del usuario autenticado
 * @returns {Promise<Array>} Lista de experiencias laborales
 */
export async function getExperiencias() {
  const token = getToken();
  
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

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
      let errorMessage = "Error al obtener experiencias";
      try {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } catch (e) {
        errorMessage = `Error ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
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
 * @param {Object} experienciaData - Datos de la experiencia
 * @param {number} experienciaData.id_perfil - ID del perfil
 * @param {string} experienciaData.puesto - Puesto de trabajo
 * @param {string} experienciaData.empresa - Nombre de la empresa
 * @param {string} experienciaData.fecha_inicio - Fecha de inicio
 * @param {string} [experienciaData.fecha_fin] - Fecha de fin (opcional)
 * @param {string} [experienciaData.descripcion] - Descripción (opcional)
 * @returns {Promise<Object>} Experiencia creada
 */
export async function crearExperiencia(experienciaData) {
  const token = getToken();
  
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

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
      let errorMessage = "Error al crear experiencia";
      try {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } catch (e) {
        errorMessage = `Error ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
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
 * @param {number} idExperiencia - ID de la experiencia
 * @param {Object} experienciaData - Datos actualizados
 * @returns {Promise<Object>} Experiencia actualizada
 */
export async function actualizarExperiencia(idExperiencia, experienciaData) {
  const token = getToken();
  
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

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
      let errorMessage = "Error al actualizar experiencia";
      try {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } catch (e) {
        errorMessage = `Error ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
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
 * @param {number} idExperiencia - ID de la experiencia
 * @returns {Promise<Object>} Mensaje de confirmación
 */
export async function eliminarExperiencia(idExperiencia) {
  const token = getToken();
  
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

  const confirmar = confirm("¿Estás seguro de que quieres eliminar esta experiencia laboral?");
  
  if (!confirmar) {
    throw new Error("Eliminación cancelada");
  }

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
      let errorMessage = "Error al eliminar experiencia";
      try {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } catch (e) {
        errorMessage = `Error ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en eliminarExperiencia:", error);
    throw error;
  }
}