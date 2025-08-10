import apiClient from "./apiClient";

export async function getUsuarios() {
  const response = await apiClient.get("/usuarios");
  return response.data.body || [];
}

