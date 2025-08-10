import React, { useState, useEffect } from "react";
import {
  getExpedientes,
  crearExpediente,
  exportarExpedientesExcel,
  exportarExpedientesPDF,
  actualizarExpediente,
} from "../services/expedienteService";

import {
  getEvidenciaId,
  agregarEvidencia,
  actualizarEvidencia,
} from "../services/evidenciaService";

import ExpedientesTable from "../components/ExpedientesTable";
import EvidenciaFormModal from "../components/EvidenciaFormModal";
import ExpedienteFormModal from "../components/ExpedienteFormModal";

function Expedientes() {
  const [expedientes, setExpedientes] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [evidencias, setEvidencias] = useState({});
  const [loading, setLoading] = useState(true);
  const [expedientesConEvidencias, setExpedientesConEvidencias] = useState(new Set());
  const [expedienteParaEditar, setExpedienteParaEditar] = useState(null);

  // Modal evidencia y estado para creación o edición
  const [modalEvidenciaOpen, setModalEvidenciaOpen] = useState(false);
  const [expedienteParaEvidencia, setExpedienteParaEvidencia] = useState(null);
  const [evidenciaParaEditar, setEvidenciaParaEditar] = useState(null);

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

    setExpedientesConEvidencias(evidenciasSet);
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

  // Abrir modal para crear nueva evidencia
  const handleAbrirModalAgregarEvidencia = (expId) => {
    setExpedienteParaEvidencia(expId);
    setEvidenciaParaEditar(null); // Limpiar edición previa
    setModalEvidenciaOpen(true);
  };

  // Abrir modal para editar evidencia existente
  const handleAbrirModalEditarEvidencia = (evidencia) => {
    setEvidenciaParaEditar(evidencia);
    setExpedienteParaEvidencia(evidencia.evi_expediente_id);
    setModalEvidenciaOpen(true);
  };

  const handleCerrarModalEvidencia = () => {
    setModalEvidenciaOpen(false);
    setEvidenciaParaEditar(null);
    setExpedienteParaEvidencia(null);
  };

  // Guardar evidencia (creación o actualización)
  const handleGuardarEvidencia = async (evidencia) => {
    try {
      if (evidencia.evi_id && evidencia.evi_id !== 0) {
        await actualizarEvidencia(evidencia);
        alert("Evidencia actualizada correctamente");
      } else {
        await agregarEvidencia(evidencia);
        alert("Evidencia agregada correctamente");
      }

      // Refrescar evidencias del expediente correspondiente
      const res = await getEvidenciaId(evidencia.evi_expediente_id);
      setEvidencias((prev) => ({
        ...prev,
        [evidencia.evi_expediente_id]: res,
      }));

      setExpedientesConEvidencias((prev) => new Set(prev).add(evidencia.evi_expediente_id));

      setModalEvidenciaOpen(false);
      setEvidenciaParaEditar(null);
      setExpedienteParaEvidencia(null);
    } catch (error) {
      console.error("Error al guardar evidencia:", error);
      alert("Error al guardar evidencia");
    }
  };

  // Abrir modal para crear nuevo expediente
  const handleAbrirModalExpediente = () => {
    setExpedienteParaEditar(null);
    setModalExpedienteOpen(true);
  };

  const handleCerrarModalExpediente = () => {
    setModalExpedienteOpen(false);
  };

  // Abrir modal para editar expediente existente
  const handleAbrirModalEditarExpediente = (exp) => {
    setExpedienteParaEditar(exp);
    setModalExpedienteOpen(true);
  };

  // Guardar expediente (creación o actualización)
  const handleGuardarExpediente = async (expediente) => {
    try {
      if (expedienteParaEditar) {
        await actualizarExpediente(expediente);
        alert("Expediente actualizado correctamente");
      } else {
        await crearExpediente(expediente);
        alert("Expediente creado correctamente");
      }
      setModalExpedienteOpen(false);
      setExpedienteParaEditar(null);
      cargarExpedientes();
    } catch (error) {
      console.error("Error al guardar expediente:", error);
      alert("Error al guardar expediente");
    }
  };

  if (loading) return <p>Cargando expedientes...</p>;

  return (
    <div>
      <h1>Listado de expedientes</h1>

      <div style={{ marginBottom: "15px" }}>
        <button onClick={handleAbrirModalExpediente}>+ Nuevo Expediente</button>
        <button onClick={exportarExpedientesExcel} style={{ marginLeft: "10px" }}>
          Exportar Excel
        </button>
        <button onClick={exportarExpedientesPDF} style={{ marginLeft: "10px" }}>
          Exportar PDF
        </button>
      </div>

      <ExpedientesTable
        expedientes={expedientes}
        expandedId={expandedId}
        toggleEvidencias={toggleEvidencias}
        evidencias={evidencias}
        expedientesConEvidencias={expedientesConEvidencias}
        onAgregarEvidencia={handleAbrirModalAgregarEvidencia}
        onEditarExpediente={handleAbrirModalEditarExpediente}
        onEditarEvidencia={handleAbrirModalEditarEvidencia}
      />

      {modalEvidenciaOpen && (
        <EvidenciaFormModal
          expedienteId={expedienteParaEvidencia}
          initialData={evidenciaParaEditar}
          onClose={handleCerrarModalEvidencia}
          onSave={handleGuardarEvidencia}
        />
      )}

      {modalExpedienteOpen && (
        <ExpedienteFormModal
          onClose={handleCerrarModalExpediente}
          onSave={handleGuardarExpediente}
          initialData={expedienteParaEditar}
        />
      )}
    </div>
  );
}

export default Expedientes;
