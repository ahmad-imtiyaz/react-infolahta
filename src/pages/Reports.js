import React, { useState } from "react";
import * as XLSX from "xlsx";
import { mockAssets, mockYardipAssets } from "../data/mockData";
import { KOREM_LIST, KODIM_LIST } from "../utils/constants";
import { FaDownload, FaFileExcel } from "react-icons/fa";

const Reports = () => {
  const [reportType, setReportType] = useState("all");
  const [selectedKorem, setSelectedKorem] = useState("");
  const [selectedKodim, setSelectedKodim] = useState("");
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });

  const exportToExcel = (data, filename) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  const generateAssetReport = () => {
    let filteredData = mockAssets;

    // Apply filters
    if (reportType !== "all") {
      if (selectedKorem) {
        filteredData = filteredData.filter(
          (asset) => asset.korem === selectedKorem
        );
      }
      if (selectedKodim) {
        filteredData = filteredData.filter(
          (asset) => asset.kodim === selectedKodim
        );
      }
    }

    // Transform data for Excel
    const excelData = filteredData.map((asset) => ({
      Korem: asset.korem,
      Kodim: asset.kodim,
      Lokasi: asset.lokasi,
      "KIB/Kode Barang": asset.kibKode,
      "Nomor Registrasi": asset.nomorRegistrasi,
      Alamat: asset.alamat,
      Peruntukan: asset.peruntukan,
      Status: asset.status,
      "Asal Milik": asset.asalMilik,
      "Bukti Pemilikan": asset.buktiPemilikan,
      "Pemilikan Sertifikat": asset.pemilikanSertifikat ? "Ya" : "Tidak",
      "Bidang Sertifikat": asset.jumlahTanahSertifikat.bidang,
      "Luas Sertifikat (M²)": asset.jumlahTanahSertifikat.luas,
      "Bidang Belum Sertifikat": asset.belumSertifikat.bidang,
      "Luas Belum Sertifikat (M²)": asset.belumSertifikat.luas,
      "Total Luas (M²)":
        asset.jumlahTanahSertifikat.luas + asset.belumSertifikat.luas,
      Keterangan: asset.keterangan,
    }));

    const filename =
      reportType === "all"
        ? "Laporan_Aset_Semua"
        : `Laporan_Aset_${selectedKorem}_${selectedKodim || "Semua"}`;

    exportToExcel(excelData, filename);
  };

  const generateYardipReport = () => {
    const excelData = mockYardipAssets.map((asset) => ({
      Pengelola: asset.pengelola,
      Bidang: asset.bidang,
      "Kabupaten/Kota": asset.lokasi.kabKota,
      Kecamatan: asset.lokasi.kecamatan,
      "Kelurahan/Desa": asset.lokasi.kelurahan,
      Peruntukan: asset.peruntukan,
      Status: asset.status,
      Keterangan: asset.keterangan,
    }));

    exportToExcel(excelData, "Laporan_Aset_Yardip");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Laporan Aset</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Report Configuration */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            Konfigurasi Laporan Aset
          </h3>

          <div className="space-y-4">
            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jenis Laporan
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Semua Aset</option>
                <option value="specific">Korem/Kodim Tertentu</option>
              </select>
            </div>

            {/* Korem Selection - Show only if specific report type */}
            {reportType === "specific" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih Korem
                </label>
                <select
                  value={selectedKorem}
                  onChange={(e) => {
                    setSelectedKorem(e.target.value);
                    setSelectedKodim(""); // Reset kodim
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Pilih Korem</option>
                  {KOREM_LIST.map((korem) => (
                    <option key={korem.id} value={korem.id}>
                      {korem.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Kodim Selection */}
            {reportType === "specific" && selectedKorem && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih Kodim (Opsional)
                </label>
                <select
                  value={selectedKodim}
                  onChange={(e) => setSelectedKodim(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Semua Kodim</option>
                  {KODIM_LIST[selectedKorem]?.map((kodim) => (
                    <option key={kodim.id} value={kodim.id}>
                      {kodim.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, start: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Akhir
                </label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, end: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Generate Report Button */}
            <div className="pt-4">
              <button
                onClick={generateAssetReport}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <FaFileExcel />
                <span>Generate Laporan Aset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Yardip Report */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Laporan Aset Yardip</h3>
          <p className="text-gray-600 mb-6">
            Generate laporan untuk semua aset Yayasan Rumpun Diponegoro
          </p>

          <button
            onClick={generateYardipReport}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 flex items-center justify-center space-x-2"
          >
            <FaFileExcel />
            <span>Download Laporan Yardip</span>
          </button>

          {/* Statistics */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Statistik Data</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Aset Kodam:</span>
                <span className="font-medium">{mockAssets.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Aset Yardip:</span>
                <span className="font-medium">{mockYardipAssets.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Luas:</span>
                <span className="font-medium">
                  {mockAssets
                    .reduce(
                      (total, asset) =>
                        total +
                        asset.jumlahTanahSertifikat.luas +
                        asset.belumSertifikat.luas,
                      0
                    )
                    .toLocaleString()}{" "}
                  M²
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Export Buttons */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Export Cepat</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {KOREM_LIST.map((korem) => (
            <button
              key={korem.id}
              onClick={() => {
                const koremAssets = mockAssets.filter(
                  (asset) => asset.korem === korem.id
                );
                const excelData = koremAssets.map((asset) => ({
                  Lokasi: asset.lokasi,
                  Kodim: asset.kodim,
                  "KIB/Kode": asset.kibKode,
                  Status: asset.status,
                  "Luas Total (M²)":
                    asset.jumlahTanahSertifikat.luas +
                    asset.belumSertifikat.luas,
                }));
                exportToExcel(
                  excelData,
                  `Laporan_${korem.name.replace(" ", "_")}`
                );
              }}
              className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 flex items-center justify-center space-x-2"
            >
              <FaDownload />
              <span>{korem.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
