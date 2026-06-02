// lib/certificaciones-server.js
// Funciones del lado del servidor para certificaciones

const API_URL = "http://localhost:8000/api";

/**
 * Obtener todas las certificaciones de un perfil
 * @param {string} token - Token de autenticación
 * @param {number} idPerfil - ID del perfil
 * @returns {Promise<Array>} Lista de certificaciones
 */
export async function getCertificaciones(token, idPerfil) {
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
      const error = await response.json();
      throw new Error(error.message || "Error al obtener certificaciones");
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
 * @param {string} token - Token de autenticación
 * @param {number} idCertificacion - ID de la certificación
 * @returns {Promise<Object>} Datos de la certificación
 */
export async function getCertificacion(token, idCertificacion) {
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
      const error = await response.json();
      throw new Error(error.message || "Error al obtener certificación");
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
 * @param {string} token - Token de autenticación
 * @param {Object} certificacionData - Datos de la certificación
 * @param {number} certificacionData.id_perfil - ID del perfil
 * @param {string} certificacionData.nombre_certificacion - Nombre de la certificación
 * @param {string} [certificacionData.organizacion] - Organización emisora (opcional)
 * @param {string} [certificacionData.fecha_obtencion] - Fecha de obtención (opcional)
 * @param {string} [certificacionData.fecha_expiracion] - Fecha de expiración (opcional)
 * @param {string} [certificacionData.url_credencial] - URL de la credencial (opcional)
 * @returns {Promise<Object>} Certificación creada
 */
export async function crearCertificacion(token, certificacionData) {
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
      const error = await response.json();
      throw new Error(error.message || "Error al crear certificación");
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
 * @param {string} token - Token de autenticación
 * @param {number} idCertificacion - ID de la certificación
 * @param {Object} certificacionData - Datos actualizados
 * @returns {Promise<Object>} Certificación actualizada
 */
export async function actualizarCertificacion(token, idCertificacion, certificacionData) {
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
      const error = await response.json();
      throw new Error(error.message || "Error al actualizar certificación");
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
 * @param {string} token - Token de autenticación
 * @param {number} idCertificacion - ID de la certificación
 * @returns {Promise<Object>} Mensaje de confirmación
 */
export async function eliminarCertificacion(token, idCertificacion) {
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
      const error = await response.json();
      throw new Error(error.message || "Error al eliminar certificación");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en eliminarCertificacion:", error);
    throw error;
  }
}