import React from "react";
import { exportarExpedientesExcel, exportarExpedientesPDF } from "../services/expedienteService";

function ExportButtons() {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <button onClick={exportarExpedientesExcel}>Exportar a Excel</button>
      <button onClick={exportarExpedientesPDF} style={{ marginLeft: "10px" }}>
        Exportar a PDF
      </button>
    </div>
  );
}

export default ExportButtons;
