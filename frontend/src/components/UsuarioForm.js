import React, { useState, useEffect } from "react";

function UsuarioForm({ usuario, onClose, onSave }) {
  const [formData, setFormData] = useState({
    usr_id: usuario.usr_id || "",
    usr_nombre_completo: usuario.usr_nombre_completo || "",
    usr_rol_id: usuario.usr_rol_id,
    usr_activo: usuario.usr_activo,
  });

  useEffect(() => {
    setFormData({
      usr_id: usuario.usr_id || "",
      usr_nombre_completo: usuario.usr_nombre_completo || "",
      usr_rol_id: usuario.usr_rol_id,
      usr_activo: usuario.usr_activo,
    });
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 8,
          minWidth: 300,
        }}
      >
        <h2>Editar Usuario</h2>

        <div>
          <label>Nombre Completo:</label><br />
          <input
            type="text"
            name="usr_nombre_completo"
            value={formData.usr_nombre_completo}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Rol ID:</label><br />
          <input
            type="number"
            name="usr_rol_id"
            value={formData.usr_rol_id}
            onChange={handleChange}
            min={1}
            required
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="usr_activo"
              checked={formData.usr_activo}
              onChange={handleChange}
            />{" "}
            Activo
          </label>
        </div>

        <div style={{ marginTop: 10 }}>
          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose} style={{ marginLeft: 10 }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default UsuarioForm;
