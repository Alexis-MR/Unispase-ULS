import { createServerAPI } from "./server-api";

export async function getUser(token) {
  const api = createServerAPI(token);
  return await api.get("/auth/me");
}

export async function getPerfil(token) {
  const api = createServerAPI(token);
  return await api.get("/perfil/me");
}