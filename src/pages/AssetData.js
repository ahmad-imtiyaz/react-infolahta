import React, { useState, useEffect } from "react";
import InteractiveMap from "../components/maps/InteractiveMap";
import { mockAssets } from "../data/mockData";
import { KOREM_LIST, KODIM_LIST } from "../utils/constants";
import { FaEdit, FaTrash, FaPrint, FaFilter } from "react-icons/fa";

const AssetData = () => {
  const [assets, setAssets] = useState(mockAssets);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [filters, setFilters] = useState({
    korem: "",
    kodim: "",
    status: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "korem" && { kodim: "" }), // Reset kodim when korem changes
    }));
  };

  const filteredAssets = assets.filter((asset) => {
    return (
      (!filters.korem || asset.korem === filters.korem) &&
      (!filters.kodim || asset.kodim === filters.kodim) &&
      (!filters.status || asset.status === filters.status)
    );
  });

  const handleEdit = (asset) => {
    // Implement edit functionality
    console.log("Edit asset:", asset);
  };

  const handleDelete = (assetId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setAssets((prev) => prev.filter((asset) => asset.id !== assetId));
    }
  };

  const handlePrint = (asset) => {
    // Implement print functionality
    console.log("Print asset:", asset);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Data Aset Kodam IV/Dip
        </h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <FaFilter />
          <span>Filter</span>
        </button>
      </div>

      {/* Filter Section */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Filter Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Korem
              </label>
              <select
                name="korem"
                value={filters.korem}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Semua Korem</option>
                {KOREM_LIST.map((korem) => (
                  <option key={korem.id} value={korem.id}>
                    {korem.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kodim
              </label>
              <select
                name="kodim"
                value={filters.kodim}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={!filters.korem}
              >
                <option value="">Semua Kodim</option>
                {filters.korem &&
                  KODIM_LIST[filters.korem]?.map((kodim) => (
                    <option key={kodim.id} value={kodim.id}>
                      {kodim.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Tidak Aktif">Tidak Aktif</option>
                <option value="Dalam Perbaikan">Dalam Perbaikan</option>
                <option value="Rusak">Rusak</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Peta Aset Interaktif</h3>
          <InteractiveMap
            assets={filteredAssets}
            onAssetSelect={handleAssetSelect}
            selectedAsset={selectedAsset}
          />
        </div>

        {/* Asset Detail Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Detail Aset</h3>
          {selectedAsset ? (
            <div className="space-y-3">
              <div>
                <strong>Lokasi:</strong> {selectedAsset.lokasi}
              </div>
              <div>
                <strong>Korem:</strong> {selectedAsset.korem}
              </div>
              <div>
                <strong>Kodim:</strong> {selectedAsset.kodim}
              </div>
              <div>
                <strong>KIB/Kode:</strong> {selectedAsset.kibKode}
              </div>
              <div>
                <strong>No. Registrasi:</strong> {selectedAsset.nomorRegistrasi}
              </div>
              <div>
                <strong>Alamat:</strong> {selectedAsset.alamat}
              </div>
              <div>
                <strong>Peruntukan:</strong> {selectedAsset.peruntukan}
              </div>
              <div>
                <strong>Status:</strong>
                <span
                  className={`ml-2 px-2 py-1 rounded text-xs ${
                    selectedAsset.status === "Aktif"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedAsset.status}
                </span>
              </div>
              <div>
                <strong>Asal Milik:</strong> {selectedAsset.asalMilik}
              </div>
              <div>
                <strong>Luas Total:</strong>{" "}
                {selectedAsset.jumlahTanahSertifikat.luas +
                  selectedAsset.belumSertifikat.luas}{" "}
                M²
              </div>

              <div className="pt-4 space-y-2">
                <button
                  onClick={() => handleEdit(selectedAsset)}
                  className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 flex items-center justify-center space-x-2"
                >
                  <FaEdit />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(selectedAsset.id)}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center justify-center space-x-2"
                >
                  <FaTrash />
                  <span>Hapus</span>
                </button>
                <button
                  onClick={() => handlePrint(selectedAsset)}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 flex items-center justify-center space-x-2"
                >
                  <FaPrint />
                  <span>Cetak</span>
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">
              Pilih aset di peta untuk melihat detail
            </p>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Tabel Data Aset</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lokasi
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Korem/Kodim
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  KIB/Kode
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Luas (M²)
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {asset.lokasi}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {asset.korem}/{asset.kodim}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {asset.kibKode}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        asset.status === "Aktif"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {(
                      asset.jumlahTanahSertifikat.luas +
                      asset.belumSertifikat.luas
                    ).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(asset)}
                        className="text-yellow-600 hover:text-yellow-900"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(asset.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={() => handlePrint(asset)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <FaPrint />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssetData;
