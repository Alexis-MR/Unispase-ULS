// lib/auth.js

import api from "./api";

// ======================================
// LOGIN
// ======================================
export async function login(email, password) {
  try {

    const res = await api.post("/auth/login", {
      email,
      password,
    });

    const token = res.data.token;

    // Cookie para SSR Astro
    document.cookie =
      `token=${token}; path=/; max-age=86400; SameSite=Strict`;

    // LocalStorage para cliente
    localStorage.setItem("token", token);

    return res.data.user;

  } catch (error) {

    throw new Error(
      error.response?.data?.message ||
      "Error al iniciar sesión"
    );
  }
}

// ======================================
// REGISTER
// ======================================
export async function register(data) {
  try {

    const res = await api.post("/auth/register", data);

    const token = res.data.token;

    // Cookie SSR
    document.cookie =
      `token=${token}; path=/; max-age=86400; SameSite=Strict`;

    // LocalStorage cliente
    localStorage.setItem("token", token);

    return res.data.user;

  } catch (error) {

    console.log(error.response?.data);

    throw new Error(
      error.response?.data?.message ||
      "Error al registrarse"
    );
  }
}

// ======================================
// OBTENER USUARIO ACTUAL
// ======================================
export async function getMe() {
  try {

    const res = await api.get("/auth/me");

    return res.data;

  } catch (error) {

    throw new Error(
      error.response?.data?.message ||
      "Error al obtener usuario"
    );
  }
}

// ======================================
// LOGOUT
// ======================================
export async function logout() {
  try {

    await api.post("/auth/logout");

  } catch (error) {

    console.error(error);

  } finally {

    // Limpiar localStorage
    localStorage.removeItem("token");

    // Limpiar cookie
    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  }
}

// ======================================
// VERIFICAR AUTH
// ======================================
export function isAuthenticated() {

  // Evitar SSR errors
  if (typeof window === "undefined") {
    return false;
  }

  return !!localStorage.getItem("token");
}

// ======================================
// OBTENER TOKEN
// ======================================
export function getToken() {

  // Evitar SSR errors
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("token");
}