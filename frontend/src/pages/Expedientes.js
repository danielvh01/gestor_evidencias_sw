import React, { useState, useEffect } from "react";
import { getExpedientes, crearExpediente } from "../services/expedienteService";
import { getEvidenciaId, agregarEvidencia } from "../services/evidenciaService";
import ExpedientesTable from "../components/ExpedientesTable";
import EvidenciaFormModal from "../components/EvidenciaFormModal";
import ExpedienteFormModal from "../components/ExpedienteFormModal";

function Expedientes() {
  const [expedientes, setExpedientes] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [evidencias, setEvidencias] = useState({});
  const [loading, setLoading] = useState(true);
  const [expedientesConEvidencias, setExpedientesConEvidencias] = useState(new Set());

  const [modalEvidenciaOpen, setModalEvidenciaOpen] = useState(false);
  const [expedienteParaEvidencia, setExpedienteParaEvidencia] = useState(null);

  const [modalExpedienteOpen, setModalExpedienteOpen] = useState(false);

  useEffect(() => {
    cargarExpedientes();
  }, []);

  async function cargarExpedientes() {
    setLoading(true);
    const data = await getExpedientes();
    setExpedientes(data);

    const evidenciasSet = new Set();

    await Promise.all(
      data.map(async (exp) => {
        try {
          const res = await getEvidenciaId(exp.exp_id);
          if (res && res.length > 0) {
            evidenciasSet.add(exp.exp_id);
          }
        } catch {
          // ignorar error
        }
      })
    );

    setExpedientesConEvidencias(new Set(evidenciasSet));
    setLoading(false);
  }

  const toggleEvidencias = async (id) => {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }

    try {
      const res = await getEvidenciaId(id);
      setEvidencias((prev) => ({ ...prev, [id]: res }));
      setExpandedId(id);
    } catch (error) {
      console.error("Error al obtener evidencias:", error);
    }
  };

  const handleAbrirModalEvidencia = (expId) => {
    setExpedienteParaEvidencia(expId);
    setModalEvidenciaOpen(true);
  };

  const handleCerrarModalEvidencia = () => {
    setModalEvidenciaOpen(false);
    setExpedienteParaEvidencia(null);
  };

  const handleGuardarEvidencia = async (nuevaEvidencia) => {
    try {
      await agregarEvidencia(nuevaEvidencia);
      alert("Evidencia agregada correctamente");

      // Refrescar evidencias
      const res = await getEvidenciaId(nuevaEvidencia.evi_expediente_id);
      setEvidencias((prev) => ({ ...prev, [nuevaEvidencia.evi_expediente_id]: res }));

      setExpedientesConEvidencias((prev) => new Set(prev).add(nuevaEvidencia.evi_expediente_id));

      setModalEvidenciaOpen(false);
      setExpedienteParaEvidencia(null);
    } catch (error) {
      console.error("Error al agregar evidencia:", error);
      alert("Error al agregar evidencia");
    }
  };

  const handleAbrirModalExpediente = () => {
    setModalExpedienteOpen(true);
  };

  const handleCerrarModalExpediente = () => {
    setModalExpedienteOpen(false);
  };

  const handleGuardarExpediente = async (nuevoExpediente) => {
    try {
      await crearExpediente(nuevoExpediente);
      alert("Expediente creado correctamente");
      setModalExpedienteOpen(false);

      // Recargar expedientes
      cargarExpedientes();
    } catch (error) {
      console.error("Error al crear expediente:", error);
      alert("Error al crear expediente");
    }
  };

  if (loading) return <p>Cargando expedientes...</p>;

  return (
    <div>
      <h1>Listado de expedientes</h1>

      <button onClick={handleAbrirModalExpediente} style={{ marginBottom: "15px" }}>
        + Nuevo Expediente
      </button>

      <ExpedientesTable
        expedientes={expedientes}
        expandedId={expandedId}
        toggleEvidencias={toggleEvidencias}
        evidencias={evidencias}
        expedientesConEvidencias={expedientesConEvidencias}
        onAgregarEvidencia={handleAbrirModalEvidencia}
      />

      {modalEvidenciaOpen && (
        <EvidenciaFormModal
          expedienteId={expedienteParaEvidencia}
          onClose={handleCerrarModalEvidencia}
          onSave={handleGuardarEvidencia}
        />
      )}

      {modalExpedienteOpen && (
        <ExpedienteFormModal
          onClose={handleCerrarModalExpediente}
          onSave={handleGuardarExpediente}
        />
      )}
    </div>
  );
}

export default Expedientes;
