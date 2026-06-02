// lib/server-api.js
import { API_URL } from "./config";

export function createServerAPI(token) {
  async function request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    
    console.log('🔍 Server API llamando:', url); // ⬅️ DEBUG
    
    const headers = {
      Accept: "application/json",
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  return {
    get: (endpoint, options = {}) => 
      request(endpoint, { ...options, method: "GET" }),
    
    post: (endpoint, data, options = {}) => 
      request(endpoint, {
        ...options,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: JSON.stringify(data),
      }),
    
    put: (endpoint, data, options = {}) => 
      request(endpoint, {
        ...options,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: JSON.stringify(data),
      }),
    
    delete: (endpoint, options = {}) => 
      request(endpoint, { ...options, method: "DELETE" }),
  };
}