import React from "react";

function ExpedientesTable({ expedientes, expandedId, toggleEvidencias, evidencias ,expedientesConEvidencias}) {
  return (
    <table border="1" cellPadding="5">
      <thead>
        <tr>
          <th>ID de expediente</th>
          <th>Fecha Registro</th>
          <th>ID del tecnico</th>
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
              </td>
            </tr>

            {expandedId === exp.exp_id && evidencias[exp.exp_id] && (
              <tr>
                <td colSpan="5">
                  <div>
                    <p><strong>Descripción:</strong> {evidencias[exp.exp_id].evi_descripcion}</p>
                    <p><strong>Color:</strong> {evidencias[exp.exp_id].evi_color}</p>
                    <p><strong>Tamaño:</strong> {evidencias[exp.exp_id].evi_tamano}</p>
                    <p><strong>Peso:</strong> {evidencias[exp.exp_id].evi_peso}</p>
                    <p><strong>Ubicación:</strong> {evidencias[exp.exp_id].evi_ubicacion}</p>
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
