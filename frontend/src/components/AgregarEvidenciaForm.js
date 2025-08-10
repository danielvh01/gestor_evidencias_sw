import React, { useState, useEffect } from "react";

function AgregarEvidenciaForm({ expedienteId, onClose, onSave }) {
  const [formData, setFormData] = useState({
    evi_descripcion: "",
    evi_color: "",
    evi_tamano: "",
    evi_peso: "",
    evi_ubicacion: "",
  });

  useEffect(() => {
    // Resetear formulario si cambia expedienteId
    setFormData({
      evi_descripcion: "",
      evi_color: "",
      evi_tamano: "",
      evi_peso: "",
      evi_ubicacion: "",
    });
  }, [expedienteId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!expedienteId) return null; // No mostrar si no hay expediente seleccionado

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
          minWidth: 320,
        }}
      >
        <h2>Agregar Evidencia (Expediente {expedienteId})</h2>

        <label>
          Descripción:<br />
          <input
            type="text"
            name="evi_descripcion"
            value={formData.evi_descripcion}
            onChange={handleChange}
            required
          />
        </label>
        <br /><br />

        <label>
          Color:<br />
          <input
            type="text"
            name="evi_color"
            value={formData.evi_color}
            onChange={handleChange}
          />
        </label>
        <br /><br />

        <label>
          Tamaño:<br />
          <input
            type="text"
            name="evi_tamano"
            value={formData.evi_tamano}
            onChange={handleChange}
          />
        </label>
        <br /><br />

        <label>
          Peso:<br />
          <input
            type="number"
            step="0.01"
            name="evi_peso"
            value={formData.evi_peso}
            onChange={handleChange}
          />
        </label>
        <br /><br />

        <label>
          Ubicación:<br />
          <input
            type="text"
            name="evi_ubicacion"
            value={formData.evi_ubicacion}
            onChange={handleChange}
          />
        </label>
        <br /><br />

        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose} style={{ marginLeft: 10 }}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default AgregarEvidenciaForm;
