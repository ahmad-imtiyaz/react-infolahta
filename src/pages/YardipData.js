import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { mockYardipAssets } from "../data/mockData";
import { YARDIP_BIDANG } from "../utils/constants";
import { FaEdit, FaTrash, FaPrint, FaFilter } from "react-icons/fa";

const YardipData = () => {
  const [yardipAssets, setYardipAssets] = useState(mockYardipAssets);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [filters, setFilters] = useState({
    bidang: "",
    kabKota: "",
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
    }));
  };

  const filteredAssets = yardipAssets.filter((asset) => {
    return (
      (!filters.bidang || asset.bidang === filters.bidang) &&
      (!filters.kabKota ||
        asset.lokasi.kabKota
          .toLowerCase()
          .includes(filters.kabKota.toLowerCase()))
    );
  });

  const handleEdit = (asset) => {
    console.log("Edit Yardip asset:", asset);
  };

  const handleDelete = (assetId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setYardipAssets((prev) => prev.filter((asset) => asset.id !== assetId));
    }
  };

  const handlePrint = (asset) => {
    console.log("Print Yardip asset:", asset);
  };

  const uniqueKabKota = [
    ...new Set(yardipAssets.map((asset) => asset.lokasi.kabKota)),
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Data Aset Yardip</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
        >
          <FaFilter />
          <span>Filter</span>
        </button>
      </div>

      {/* Filter Section */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Filter Data Yardip</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jenis Bidang
              </label>
              <select
                name="bidang"
                value={filters.bidang}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Semua Bidang</option>
                {YARDIP_BIDANG.map((bidang) => (
                  <option key={bidang} value={bidang}>
                    {bidang}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kabupaten/Kota
              </label>
              <select
                name="kabKota"
                value={filters.kabKota}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Semua Kab/Kota</option>
                {uniqueKabKota.map((kota) => (
                  <option key={kota} value={kota}>
                    {kota}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Peta Aset Yardip</h3>
          <div className="h-96 border rounded-lg overflow-hidden">
            <MapContainer
              center={[-7.2575, 112.7521]}
              zoom={10}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />

              {filteredAssets.map((asset) => (
                <Marker
                  key={asset.id}
                  position={asset.coordinates}
                  eventHandlers={{
                    click: () => handleAssetSelect(asset),
                  }}
                >
                  <Popup>
                    <div>
                      <h4 className="font-bold">{asset.bidang}</h4>
                      <p>{asset.lokasi.kabKota}</p>
                      <p>Status: {asset.status}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Asset Detail Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Detail Aset Yardip</h3>
          {selectedAsset ? (
            <div className="space-y-3">
              <div>
                <strong>Pengelola:</strong> {selectedAsset.pengelola}
              </div>
              <div>
                <strong>Bidang:</strong> {selectedAsset.bidang}
              </div>
              <div>
                <strong>Lokasi:</strong>
                <br />
                <span className="text-sm">
                  {selectedAsset.lokasi.kelurahan},{" "}
                  {selectedAsset.lokasi.kecamatan}
                  <br />
                  {selectedAsset.lokasi.kabKota}
                </span>
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
                <strong>Keterangan:</strong> {selectedAsset.keterangan}
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
        <h3 className="text-lg font-semibold mb-4">Tabel Data Yardip</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bidang
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lokasi
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Peruntukan
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
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
                    {asset.bidang}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {asset.lokasi.kelurahan}, {asset.lokasi.kecamatan},{" "}
                    {asset.lokasi.kabKota}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {asset.peruntukan}
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

export default YardipData;
