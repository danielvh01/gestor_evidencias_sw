import React, { useState, useEffect } from "react";
import { getExpedientes } from "../services/expedienteService";
import { getEvidenciaId } from "../services/evidenciaService";
import ExpedientesTable from "../components/ExpedientesTable";

function Expedientes() {
  const [expedientes, setExpedientes] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [evidencias, setEvidencias] = useState({});
  const [loading, setLoading] = useState(true);
  const [expedientesConEvidencias, setExpedientesConEvidencias] = useState(new Set());

    useEffect(() => {
    async function fetchData() {
        const data = await getExpedientes();
        setExpedientes(data);

        // Para cada expediente, consulta si tiene evidencia:
        const evidenciasSet = new Set();

        await Promise.all(
        data.map(async (exp) => {
            try {
            const res = await getEvidenciaId(exp.exp_id);
            if (res && Object.keys(res).length > 0) {
                evidenciasSet.add(exp.exp_id);
            }
            } catch {
            // No hay evidencia o error, no agregar
            }
        })
        );

        setExpedientesConEvidencias(new Set(evidenciasSet));
        setLoading(false);
    }
    fetchData();
    }, []);


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

  if (loading) return <p>Cargando expedientes...</p>;

  return (
    <div>
        <h1>Listado de expedientes</h1>
        <ExpedientesTable
          expedientes={expedientes}
          expandedId={expandedId}
          toggleEvidencias={toggleEvidencias}
          evidencias={evidencias}
          expedientesConEvidencias={expedientesConEvidencias}
        />
    </div>
  );
}

export default Expedientes;
