import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Import autoTable correctly

const exportToPDF = (columns, data, title, filename) => {
  const doc = new jsPDF();

  
//   console.log("Users before exporting:", data);

  if (!Array.isArray(data) || data.length === 0) {
    alert("No data available to export!");
    return;
  }

  
  try {
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(title, 14, 15);

    
    autoTable(doc, {
      startY: 25,
      head: [columns],
      body: data,
      margin: { top: 30 },
      styles: { fontSize: 10, cellPadding: 3 },
    });

    // Save the PDF
    doc.save(filename);
  } catch (error) {
    console.error("Error using autoTable:", error);
    alert("Failed to generate PDF! Check console logs.");
  }
};

export default exportToPDF;
