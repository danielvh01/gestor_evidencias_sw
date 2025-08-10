import React from "react";

function ExpedientesTable({
  expedientes,
  expandedId,
  toggleEvidencias,
  evidencias,
  expedientesConEvidencias,
  onAgregarEvidencia, // callback para agregar evidencia
  onEditarExpediente,
  onEditarEvidencia,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID de expediente</th>
            <th>Fecha Registro</th>
            <th>ID del técnico</th>
            <th>Estado</th>
            <th style={{ minWidth: "200px" }}>Acciones</th>
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
                  {expedientesConEvidencias.has(exp.exp_id) && (
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => toggleEvidencias(exp.exp_id)}
                      aria-expanded={expandedId === exp.exp_id}
                      aria-controls={`evidencias-${exp.exp_id}`}
                    >
                      {expandedId === exp.exp_id ? "Ocultar evidencias" : "Ver evidencias"}
                    </button>
                  )}

                  <button
                    className="btn btn-sm btn-outline-success me-2"
                    onClick={() => onAgregarEvidencia(exp.exp_id)}
                  >
                    + Agregar Evidencia
                  </button>

                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => onEditarExpediente(exp)}
                  >
                    Editar expediente
                  </button>
                </td>
              </tr>

              {expandedId === exp.exp_id && evidencias[exp.exp_id] && (
                <tr>
                  <td colSpan="5" id={`evidencias-${exp.exp_id}`}>
                    <div className="p-3 bg-light rounded">
                      {evidencias[exp.exp_id].map((evi) => (
                        <div
                          key={evi.evi_id}
                          className="border rounded p-3 mb-3"
                          style={{ backgroundColor: "#fff" }}
                        >
                          <p>
                            <strong>Descripción:</strong> {evi.evi_descripcion}
                          </p>
                          <p>
                            <strong>Color:</strong> {evi.evi_color}
                          </p>
                          <p>
                            <strong>Tamaño:</strong> {evi.evi_tamano}
                          </p>
                          <p>
                            <strong>Peso:</strong> {evi.evi_peso}
                          </p>
                          <p>
                            <strong>Ubicación:</strong> {evi.evi_ubicacion}
                          </p>
                          <button
                            className="btn btn-sm btn-outline-warning"
                            onClick={() => onEditarEvidencia(evi)}
                          >
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
    </div>
  );
}

export default ExpedientesTable;
