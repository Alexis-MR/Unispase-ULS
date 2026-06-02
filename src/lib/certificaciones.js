// lib/certificaciones.js
// Funciones del lado del cliente para certificaciones

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
 * Obtener todas las certificaciones de un perfil
 * @param {number} idPerfil - ID del perfil
 * @returns {Promise<Array>} Lista de certificaciones
 */
export async function getCertificaciones(idPerfil) {
  const token = getToken();
  
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

  try {
    const response = await fetch(`${API_URL}/certificaciones/${idPerfil}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
    });

    if (!response.ok) {
      let errorMessage = "Error al obtener certificaciones";
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
    console.error("Error en getCertificaciones:", error);
    throw error;
  }
}

/**
 * Obtener una certificación específica
 * @param {number} idCertificacion - ID de la certificación
 * @returns {Promise<Object>} Datos de la certificación
 */
export async function getCertificacion(idCertificacion) {
  const token = getToken();
  
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

  try {
    const response = await fetch(`${API_URL}/certificaciones/${idCertificacion}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
    });

    if (!response.ok) {
      let errorMessage = "Error al obtener certificación";
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
    console.error("Error en getCertificacion:", error);
    throw error;
  }
}

/**
 * Crear una nueva certificación
 * @param {Object} certificacionData - Datos de la certificación
 * @param {number} certificacionData.id_perfil - ID del perfil
 * @param {string} certificacionData.nombre_certificacion - Nombre de la certificación
 * @param {string} [certificacionData.organizacion] - Organización emisora (opcional)
 * @param {string} [certificacionData.fecha_obtencion] - Fecha de obtención (opcional)
 * @param {string} [certificacionData.fecha_expiracion] - Fecha de expiración (opcional)
 * @param {string} [certificacionData.url_credencial] - URL de la credencial (opcional)
 * @returns {Promise<Object>} Certificación creada
 */
export async function crearCertificacion(certificacionData) {
  const token = getToken();
  
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

  // Validar datos
  if (!certificacionData.nombre_certificacion || certificacionData.nombre_certificacion.trim() === "") {
    throw new Error("El nombre de la certificación es requerido");
  }

  try {
    const response = await fetch(`${API_URL}/certificaciones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
      body: JSON.stringify(certificacionData),
    });

    if (!response.ok) {
      let errorMessage = "Error al crear certificación";
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
    console.error("Error en crearCertificacion:", error);
    throw error;
  }
}

/**
 * Actualizar una certificación
 * @param {number} idCertificacion - ID de la certificación
 * @param {Object} certificacionData - Datos actualizados
 * @returns {Promise<Object>} Certificación actualizada
 */
export async function actualizarCertificacion(idCertificacion, certificacionData) {
  const token = getToken();
  
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

  try {
    const response = await fetch(`${API_URL}/certificaciones/${idCertificacion}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
      body: JSON.stringify(certificacionData),
    });

    if (!response.ok) {
      let errorMessage = "Error al actualizar certificación";
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
    console.error("Error en actualizarCertificacion:", error);
    throw error;
  }
}

/**
 * Eliminar una certificación
 * @param {number} idCertificacion - ID de la certificación
 * @returns {Promise<Object>} Mensaje de confirmación
 */
export async function eliminarCertificacion(idCertificacion) {
  const token = getToken();
  
  if (!token) {
    throw new Error("No hay token de autenticación");
  }

  const confirmar = confirm("¿Estás seguro de que quieres eliminar esta certificación?");
  
  if (!confirmar) {
    throw new Error("Eliminación cancelada");
  }

  try {
    const response = await fetch(`${API_URL}/certificaciones/${idCertificacion}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
    });

    if (!response.ok) {
      let errorMessage = "Error al eliminar certificación";
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
    console.error("Error en eliminarCertificacion:", error);
    throw error;
  }
}