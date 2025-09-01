import * as XLSX from "xlsx";

export const exportToExcel = (data, filename = "export") => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  // Set column widths
  const cols = Object.keys(data[0] || {}).map(() => ({ wch: 15 }));
  worksheet["!cols"] = cols;

  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  XLSX.writeFile(
    workbook,
    `${filename}_${new Date().toISOString().split("T")[0]}.xlsx`
  );
};

export const exportAssetsToPDF = (assets) => {
  // Implement PDF export functionality
  console.log("Exporting to PDF:", assets);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};
