import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://192.168.0.5:4000/api", 
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
