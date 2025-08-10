import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/authService";

function CrearUsuario() {
  const [usr_nombre_completo, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [usr_rol_id, setRol] = useState(2); // valor por defecto
  const [usr_activo, setActivo] = useState(1); // activo por defecto
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validaciones básicas
    if (!usr_nombre_completo || !usuario || !password) {
      setError("Por favor llena todos los campos obligatorios");
      return;
    }

    const userData = {
      usr_nombre_completo,
      usuario,
      password,
      usr_rol_id: Number(usr_rol_id),
      usr_activo: Number(usr_activo),
    };

    const result = await createUser(userData);

    if (result.success) {
      setSuccess("Usuario creado con éxito. Redirigiendo...");
      setTimeout(() => navigate("/usuarios"), 2000);
    } else {
      setError(result.message || "Error al crear usuario");
    }
  }

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white rounded shadow"
        style={{ width: "360px" }}
      >
        <h2 className="mb-4 text-center">Crear Usuario</h2>

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre completo *
          </label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            value={usr_nombre_completo}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="usuario" className="form-label">
            Usuario *
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
            Contraseña *
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

        <div className="mb-3">
          <label htmlFor="rol" className="form-label">
            Rol
          </label>
          <select
            id="rol"
            className="form-select"
            value={usr_rol_id}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value={1}>Tecnico</option>
            <option value={2}>Coordinador</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Activo</label>
          <select
            className="form-select"
            value={usr_activo}
            onChange={(e) => setActivo(e.target.value)}
          >
            <option value={1}>Sí</option>
            <option value={0}>No</option>
          </select>
        </div>

        <div className="d-flex justify-content-center gap-3 mt-3">
        <button type="submit" className="btn btn-success" style={{ minWidth: "120px" }}>
            Crear Usuario
        </button>
        <button type="button" className="btn btn-danger" style={{ minWidth: "120px" }} onClick={() => {navigate("/usuarios")}}>
            Cancelar
        </button>
        </div>


        {error && <div className="mt-3 text-danger text-center">{error}</div>}
        {success && <div className="mt-3 text-success text-center">{success}</div>}
      </form>
    </div>
  );
}

export default CrearUsuario;
