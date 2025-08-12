import axios from "axios";

const apiClient = axios.create({
    baseURL: window.APP_CONFIG?.API_URL || "http://127.0.0.1:4000/api"
});

// Interceptor para incluir token en cada petición
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
