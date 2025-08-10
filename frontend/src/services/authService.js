import apiClient from "./apiClient";

export function getToken() {
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
}

export async function login(usuario, password) {
  try {
    const response = await apiClient.post("/auth/login", { usuario, password });

    if (!response.data.error) {
      const token = response.data.body; 
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", usuario);
      const user = await apiClient.get(`/auth/login/${usuario}`);
      console.log("ID DE AU");
      console.log(user.body[0].au_id);
      console.log("FIN DE AU");
      const getRol = await apiClient.get(`/usuarios/${user.body[0].au_id}`);
      localStorage.setItem("rol",getRol.data.usr_activo)
      return { success: true, token };
    } else {
      return { success: false, message: "Usuario o contraseña inválidos" };
    }
  } catch (error) {
    return { success: false, message: "Error al conectar con el servidor" };
  }
}

export async function createUser(userData) {
  try {
    const payload = { ...userData, usr_id: 0 };

    const response = await apiClient.post("/usuarios", payload);

    if (!response.data.error) {
      return { success: true, data: response.data.body };
    } else {
      return { success: false, message: response.data.message || "Error al crear usuario" };
    }
  } catch (error) {
    return { success: false, message: "Error al conectar con el servidor" };
  }
}
