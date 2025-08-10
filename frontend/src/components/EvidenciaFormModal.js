import React, { useState } from "react";

function EvidenciaFormModal({ expedienteId, onClose, onSave }) {
  const [form, setForm] = useState({
    evi_id: 0,
    evi_expediente_id: expedienteId,
    evi_descripcion: "",
    evi_color: "",
    evi_tamano: "",
    evi_peso: "",
    evi_ubicacion: "",
    evi_tecnico_id: "", // Aquí podrías usar el usuario logueado si tienes
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
      justifyContent: "center", alignItems: "center",
      zIndex: 9999
    }}>
      <div style={{ backgroundColor: "white", padding: 20, borderRadius: 8, width: 400 }}>
        <h3>Nueva Evidencia para expediente #{expedienteId}</h3>
        <form onSubmit={handleSubmit}>
          <label>Descripción:<br/>
            <input type="text" name="evi_descripcion" value={form.evi_descripcion} onChange={handleChange} required />
          </label><br/>
          <label>Color:<br/>
            <input type="text" name="evi_color" value={form.evi_color} onChange={handleChange} />
          </label><br/>
          <label>Tamaño:<br/>
            <input type="text" name="evi_tamano" value={form.evi_tamano} onChange={handleChange} />
          </label><br/>
          <label>Peso:<br/>
            <input type="number" step="any" name="evi_peso" value={form.evi_peso} onChange={handleChange} />
          </label><br/>
          <label>Ubicación:<br/>
            <input type="text" name="evi_ubicacion" value={form.evi_ubicacion} onChange={handleChange} />
          </label><br/>
          <label>ID Técnico:<br/>
            <input type="number" name="evi_tecnico_id" value={form.evi_tecnico_id} onChange={handleChange} required />
          </label><br/><br/>
          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose} style={{ marginLeft: 10 }}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default EvidenciaFormModal;
