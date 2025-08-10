import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const token = await login(usuario, password);
      if (token) {
        navigate("/expedientes");
      }
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
    }
  }

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white rounded shadow"
        style={{ width: "320px" }}
      >
        <h2 className="mb-4 text-center">Iniciar Sesión</h2>

        <div className="mb-3">
          <label htmlFor="usuario" className="form-label">
            Usuario
          </label>
          <input
            type="text"
            id="usuario"
            className="form-control"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Ingresar
        </button>

        {error && (
          <div className="mt-3 text-danger text-center fw-semibold">{error}</div>
        )}
      </form>
    </div>
  );
}

export default Login;
