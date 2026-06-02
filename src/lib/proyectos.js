// lib/proyectos.js
// Funciones del lado del cliente para proyectos

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
 * Obtener todos los proyectos de un perfil
 * @param {number} idPerfil - ID del perfil
 * @returns {Promise<Array>} Lista de proyectos
 */
export async function getProyectos(idPerfil) {
  const token = getToken();
  
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

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
      let errorMessage = "Error al obtener proyectos";
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
    console.error("Error en getProyectos:", error);
    throw error;
  }
}

/**
 * Obtener un proyecto específico
 * @param {number} idProyecto - ID del proyecto
 * @returns {Promise<Object>} Datos del proyecto
 */
export async function getProyecto(idProyecto) {
  const token = getToken();
  
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

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
      let errorMessage = "Error al obtener proyecto";
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
    console.error("Error en getProyecto:", error);
    throw error;
  }
}

/**
 * Crear un nuevo proyecto
 * @param {Object} proyectoData - Datos del proyecto
 * @param {number} proyectoData.id_perfil - ID del perfil
 * @param {string} proyectoData.nombre_proyecto - Nombre del proyecto
 * @param {string} [proyectoData.descripcion] - Descripción (opcional)
 * @param {string} [proyectoData.url] - URL del proyecto (opcional)
 * @param {string} [proyectoData.fecha_inicio] - Fecha de inicio (opcional)
 * @param {string} [proyectoData.fecha_fin] - Fecha de fin (opcional)
 * @returns {Promise<Object>} Proyecto creado
 */
export async function crearProyecto(proyectoData) {
  const token = getToken();
  
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

  // Validar datos
  if (!proyectoData.nombre_proyecto || proyectoData.nombre_proyecto.trim() === "") {
    throw new Error("El nombre del proyecto es requerido");
  }

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
      let errorMessage = "Error al crear proyecto";
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
    console.error("Error en crearProyecto:", error);
    throw error;
  }
}

/**
 * Actualizar un proyecto
 * @param {number} idProyecto - ID del proyecto
 * @param {Object} proyectoData - Datos actualizados
 * @returns {Promise<Object>} Proyecto actualizado
 */
export async function actualizarProyecto(idProyecto, proyectoData) {
  const token = getToken();
  
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

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
      let errorMessage = "Error al actualizar proyecto";
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
    console.error("Error en actualizarProyecto:", error);
    throw error;
  }
}

/**
 * Eliminar un proyecto
 * @param {number} idProyecto - ID del proyecto
 * @returns {Promise<Object>} Mensaje de confirmación
 */
export async function eliminarProyecto(idProyecto) {
  const token = getToken();
  
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

  const confirmar = confirm("¿Estás seguro de que quieres eliminar este proyecto?");
  
  if (!confirmar) {
    throw new Error("Eliminación cancelada");
  }

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
      let errorMessage = "Error al eliminar proyecto";
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
    console.error("Error en eliminarProyecto:", error);
    throw error;
  }
}