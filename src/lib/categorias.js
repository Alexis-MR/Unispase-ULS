import api from "./api";

 export async function  getCategorias() {
  try {
    const res = await api.get("/categorias");
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      "Error al obtener categorías"
    );
  }
}

export async function updateCategoria(idCategoria, data) {
  try {
    const res = await api.put(`/categorias/${idCategoria}`, data);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      "Error al actualizar la categoría"
    );
  }
}

export async function createCategoria(data) {
  try {
    const res = await api.post("/categorias", data);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      "Error al crear la categoría"
    );
  }
}
