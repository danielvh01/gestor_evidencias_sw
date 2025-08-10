import apiClient from "./apiClient";

export async function getUsuarios() {
  const response = await apiClient.get("/usuarios");
  return response.data.body || [];
}

export async function updateUsuario(usuario) {
  const response = await apiClient.post("/usuarios/", usuario);
  return response.data;
}
