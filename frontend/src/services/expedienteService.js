import apiClient from "./apiClient";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { getEvidenciaId } from "./evidenciaService";

export async function getExpedientes() {
  const response = await apiClient.get("/expedientes");
  return response.data.body || [];
}

export async function crearExpediente(expediente) {
  const response = await apiClient.post("/expedientes", expediente);
  return response.data;
}

export async function exportarExpedientesExcel() {
  const expedientes = await getExpedientes();
  
  // Para cada expediente obtenemos evidencias
  const datos = [];
  for (let exp of expedientes) {
    const evidencias = await getEvidenciaId(exp.exp_id);
    datos.push({
      ID: exp.exp_id,
      FechaRegistro: exp.exp_fecha_registro || "",
      IdTecnico: exp.exp_tecnico_id || "",
      exp_estado: exp.exp_estado || "", 
      TieneEvidencia: evidencias && Object.keys(evidencias).length > 0 ? "Sí" : "No"
    });
  }

  // Crear hoja de Excel
  const ws = XLSX.utils.json_to_sheet(datos);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Expedientes");
  
  // Descargar archivo
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "expedientes.xlsx");
}

export async function exportarExpedientesPDF() {
  const expedientes = await getExpedientes();

  const doc = new jsPDF();
  let yPos = 10; // posición inicial en el PDF

  doc.setFontSize(16);
  doc.text("Reporte Detallado de Expedientes DICRI", 14, yPos);
  yPos += 10;

  for (let i = 0; i < expedientes.length; i++) {
    const exp = expedientes[i];
    const evidencias = await getEvidenciaId(exp.exp_id);

    // Datos del expediente
    doc.setFontSize(12);
    doc.text(`Expediente ID: ${exp.exp_id}`, 14, yPos);
    yPos += 6;
    doc.text(`Fecha de registro: ${exp.exp_fecha_registro || "-"}`, 14, yPos);
    yPos += 6;
    doc.text(`ID Técnico: ${exp.exp_tecnico_id || "-"}`, 14, yPos);
    yPos += 6;
    doc.text(`Estado: ${exp.exp_estado || "-"}`, 14, yPos);
    yPos += 6;

    // Tabla de evidencias
    if (evidencias && evidencias.length > 0) {
        autoTable(doc, {
        startY: yPos,
        head: [["#", "Descripción", "Color", "Tamaño", "Peso (kg)", "Ubicación"]],
        body: evidencias.map((ev, idx) => [
            idx + 1,
            ev.evi_descripcion || "Sin descripción",
            ev.evi_color || "-",
            ev.evi_tamano || "-",
            ev.evi_peso != null ? ev.evi_peso : "-",
            ev.evi_ubicacion || "-"
        ]),
        theme: "grid",
        styles: { fontSize: 10 },
        headStyles: {
            fillColor: [0, 51, 102], // Azul oscuro (RGB)
            textColor: [255, 255, 255], // Blanco
            fontStyle: "bold"
        },
        bodyStyles: {
            fillColor: [240, 240, 240] // Gris claro en el cuerpo (opcional)
        },
        });
        yPos = doc.lastAutoTable.finalY + 8;
    } else {
      doc.text("Evidencias: No tiene", 14, yPos);
      yPos += 8;
    }

    // Salto de página si se acerca al final
    if (yPos > 260 && i < expedientes.length - 1) {
      doc.addPage();
      yPos = 10;
    }
  }

  doc.save("expedientes_detallado.pdf");
}

export async function actualizarExpediente(expediente) {
  const response = await apiClient.put("/expedientes", expediente);
  return response.data;
}