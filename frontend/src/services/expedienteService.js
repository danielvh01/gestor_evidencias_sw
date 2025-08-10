import apiClient from "./apiClient";

export async function getExpedientes() {
  const response = await apiClient.get("/expedientes");
  return response.data.body || [];
}

export async function crearExpediente(expediente) {
  const response = await apiClient.post("/expedientes", expediente);
  return response.data;
}