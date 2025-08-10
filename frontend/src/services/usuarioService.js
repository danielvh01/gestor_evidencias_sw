import apiClient from "./apiClient";

export async function getUsuarios() {
  const response = await apiClient.get("/usuarios");
  return response.data.body || [];
}

export async function updateUsuario(usuario) {
  // usuario es un objeto completo con usr_id, usr_nombre_completo, usr_rol_id, usr_activo
  const response = await apiClient.post("/usuarios/", usuario);
  return response.data;
}
