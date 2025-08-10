import React, { useState } from "react";

function ExpedienteFormModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    exp_id: 0,
    exp_fecha_registro: new Date().toISOString(),
    exp_tecnico_id: "",
    exp_estado: "Pendiente",
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
      justifyContent: "center", alignItems: "center", zIndex: 9999
    }}>
      <div style={{ backgroundColor: "white", padding: 20, borderRadius: 8, width: 400 }}>
        <h3>Nuevo Expediente</h3>
        <form onSubmit={handleSubmit}>
          <label>Fecha Registro:<br/>
            <input
              type="datetime-local"
              name="exp_fecha_registro"
              value={form.exp_fecha_registro.slice(0,16)} // formato para datetime-local
              onChange={(e) => setForm(f => ({ ...f, exp_fecha_registro: new Date(e.target.value).toISOString() }))}
              required
            />
          </label><br/>
          <label>ID Técnico:<br/>
            <input
              type="number"
              name="exp_tecnico_id"
              value={form.exp_tecnico_id}
              onChange={handleChange}
              required
            />
          </label><br/>
          <label>Estado:<br/>
            <select
              name="exp_estado"
              value={form.exp_estado}
              onChange={handleChange}
              required
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En Proceso">En Proceso</option>
              <option value="Finalizado">Finalizado</option>
            </select>
          </label><br/><br/>
          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose} style={{ marginLeft: 10 }}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default ExpedienteFormModal;
