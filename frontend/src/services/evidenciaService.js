import apiClient from "./apiClient";


export async function getEvidenciaId(id) {
    console.log(id);
  const response = await apiClient.get(`/evidencias/${id}`);
  console.log(response.data.body);
  return response.data.body || [];
}