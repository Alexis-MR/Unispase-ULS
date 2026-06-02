// lib/habilidades.js
// Funciones del lado del cliente para habilidades

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
 * Obtener todas las habilidades de un perfil
 * @param {number} idPerfil - ID del perfil
 * @returns {Promise<Array>} Lista de habilidades
 */
export async function getHabilidades(idPerfil) {
  const token = getToken();
  
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

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
      let errorMessage = "Error al obtener habilidades";
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
    console.error("Error en getHabilidades:", error);
    throw error;
  }
}

/**
 * Obtener una habilidad específica
 * @param {number} idHabilidad - ID de la habilidad
 * @returns {Promise<Object>} Datos de la habilidad
 */
export async function getHabilidad(idHabilidad) {
  const token = getToken();
  
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

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
      let errorMessage = "Error al obtener habilidad";
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
    console.error("Error en getHabilidad:", error);
    throw error;
  }
}

/**
 * Crear una nueva habilidad
 * @param {Object} habilidadData - Datos de la habilidad
 * @param {number} habilidadData.id_perfil - ID del perfil
 * @param {string} habilidadData.nombre_habilidad - Nombre de la habilidad
 * @param {string} [habilidadData.nivel] - Nivel de dominio (opcional)
 * @returns {Promise<Object>} Habilidad creada
 */
export async function crearHabilidad(habilidadData) {
  const token = getToken();
  
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

  // Validar datos
  if (!habilidadData.nombre_habilidad || habilidadData.nombre_habilidad.trim() === "") {
    throw new Error("El nombre de la habilidad es requerido");
  }

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
      let errorMessage = "Error al crear habilidad";
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
    console.error("Error en crearHabilidad:", error);
    throw error;
  }
}

/**
 * Actualizar una habilidad
 * @param {number} idHabilidad - ID de la habilidad
 * @param {Object} habilidadData - Datos actualizados
 * @returns {Promise<Object>} Habilidad actualizada
 */
export async function actualizarHabilidad(idHabilidad, habilidadData) {
  const token = getToken();
  
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

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
      let errorMessage = "Error al actualizar habilidad";
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
    console.error("Error en actualizarHabilidad:", error);
    throw error;
  }
}

/**
 * Eliminar una habilidad
 * @param {number} idHabilidad - ID de la habilidad
 * @returns {Promise<Object>} Mensaje de confirmación
 */
export async function eliminarHabilidad(idHabilidad) {
  const token = getToken();
  
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

  const confirmar = confirm("¿Estás seguro de que quieres eliminar esta habilidad?");
  
  if (!confirmar) {
    throw new Error("Eliminación cancelada");
  }

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
      let errorMessage = "Error al eliminar habilidad";
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
    console.error("Error en eliminarHabilidad:", error);
    throw error;
  }
}