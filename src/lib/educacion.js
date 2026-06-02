// lib/educacion.js
// Funciones del lado del cliente para educación

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
 * Obtener toda la educación del usuario autenticado
 * @returns {Promise<Array>} Lista de educación
 */
export async function getEducacion() {
  const token = getToken();
  
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

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
      let errorMessage = "Error al obtener educación";
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
    console.error("Error en getEducacion:", error);
    throw error;
  }
}

/**
 * Crear una nueva educación
 * @param {Object} educacionData - Datos de la educación
 * @param {number} educacionData.id_perfil - ID del perfil
 * @param {string} educacionData.institucion - Nombre de la institución
 * @param {string} educacionData.titulo - Título obtenido
 * @param {string} educacionData.fecha_inicio - Fecha de inicio
 * @param {string} [educacionData.fecha_fin] - Fecha de fin (opcional)
 * @param {string} [educacionData.descripcion] - Descripción (opcional)
 * @returns {Promise<Object>} Educación creada
 */
export async function crearEducacion(educacionData) {
  const token = getToken();
  
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

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
      let errorMessage = "Error al crear educación";
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
    console.error("Error en crearEducacion:", error);
    throw error;
  }
}

/**
 * Actualizar una educación
 * @param {number} idEducacion - ID de la educación
 * @param {Object} educacionData - Datos actualizados
 * @returns {Promise<Object>} Educación actualizada
 */
export async function actualizarEducacion(idEducacion, educacionData) {
  const token = getToken();
  
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

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
      let errorMessage = "Error al actualizar educación";
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
    console.error("Error en actualizarEducacion:", error);
    throw error;
  }
}

/**
 * Eliminar una educación
 * @param {number} idEducacion - ID de la educación
 * @returns {Promise<Object>} Mensaje de confirmación
 */
export async function eliminarEducacion(idEducacion) {
  const token = getToken();
  
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

  const confirmar = confirm("¿Estás seguro de que quieres eliminar esta educación?");
  
  if (!confirmar) {
    throw new Error("Eliminación cancelada");
  }

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
      let errorMessage = "Error al eliminar educación";
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
    console.error("Error en eliminarEducacion:", error);
    throw error;
  }
}