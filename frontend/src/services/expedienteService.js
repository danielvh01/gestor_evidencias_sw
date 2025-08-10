import apiClient from "./apiClient";

export async function getExpedientes() {
  const response = await apiClient.get("/expedientes");
  return response.data.body || [];
}

