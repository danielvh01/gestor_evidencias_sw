import React from "react";

function ExpedientesTable({
  expedientes,
  expandedId,
  toggleEvidencias,
  evidencias,
  expedientesConEvidencias,
  onAgregarEvidencia,// callback para agregar evidencia
  onEditarExpediente,
  onEditarEvidencia
}) {
  return (
    <table border="1" cellPadding="5">
      <thead>
        <tr>
          <th>ID de expediente</th>
          <th>Fecha Registro</th>
          <th>ID del técnico</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {expedientes.map((exp) => (
          <React.Fragment key={exp.exp_id}>
            <tr>
              <td>{exp.exp_id}</td>
              <td>{new Date(exp.exp_fecha_registro).toLocaleString()}</td>
              <td>{exp.exp_tecnico_id}</td>
              <td>{exp.exp_estado}</td>
              <td>
                <button
                  onClick={() => toggleEvidencias(exp.exp_id)}
                  hidden={!expedientesConEvidencias.has(exp.exp_id)}
                >
                  {expandedId === exp.exp_id ? "Ocultar evidencias" : "Ver evidencias"}
                </button>

                {/* Botón para agregar evidencia */}
                <button
                  style={{ marginLeft: "8px" }}
                  onClick={() => onAgregarEvidencia(exp.exp_id)}
                >
                  + Agregar Evidencia
                </button>

                 <button
                    style={{ marginLeft: "8px" }}
                    onClick={() => onEditarExpediente(exp)}
                >
                Editar
                </button>
              </td>
            </tr>
            {expandedId === exp.exp_id && evidencias[exp.exp_id] && (
            <tr>
                <td colSpan="5">
                <div>
                    {evidencias[exp.exp_id].map((evi) => (
                    <div key={evi.evi_id} style={{ marginBottom: "12px", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}>
                        <p><strong>Descripción:</strong> {evi.evi_descripcion}</p>
                        <p><strong>Color:</strong> {evi.evi_color}</p>
                        <p><strong>Tamaño:</strong> {evi.evi_tamano}</p>
                        <p><strong>Peso:</strong> {evi.evi_peso}</p>
                        <p><strong>Ubicación:</strong> {evi.evi_ubicacion}</p>
                        {/* Botón para editar evidencia */}
                        <button onClick={() => onEditarEvidencia(evi)}>
                          Editar Evidencia
                        </button>
                    </div>
                    ))}
                </div>
                </td>
            </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default ExpedientesTable;
