import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { YARDIP_BIDANG } from "../utils/constants";

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : <Marker position={position} />;
};

const AddYardip = () => {
  const [formData, setFormData] = useState({
    pengelola: "Yayasan Rumpun Diponegoro",
    bidang: "",
    lokasi: {
      kabKota: "",
      kecamatan: "",
      kelurahan: "",
    },
    peruntukan: "",
    status: "",
    keterangan: "",
  });

  const [mapPosition, setMapPosition] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      lokasi: {
        ...prev.lokasi,
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const yardipData = {
      ...formData,
      coordinates: mapPosition,
    };
    console.log("Yardip Data:", yardipData);
    alert("Data Yardip berhasil disimpan!");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Tambah Data Aset Yardip
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Pengelola */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pengelola
              </label>
              <input
                type="text"
                name="pengelola"
                value={formData.pengelola}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                readOnly
              />
            </div>

            {/* Bidang */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bidang
              </label>
              <select
                name="bidang"
                value={formData.bidang}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Pilih Bidang</option>
                {YARDIP_BIDANG.map((bidang) => (
                  <option key={bidang} value={bidang}>
                    {bidang}
                  </option>
                ))}
              </select>
            </div>

            {/* Lokasi - Kab/Kota */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kabupaten/Kota
              </label>
              <input
                type="text"
                value={formData.lokasi.kabKota}
                onChange={(e) =>
                  handleLocationChange("kabKota", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Lokasi - Kecamatan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kecamatan
              </label>
              <input
                type="text"
                value={formData.lokasi.kecamatan}
                onChange={(e) =>
                  handleLocationChange("kecamatan", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Lokasi - Kelurahan/Desa */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kelurahan/Desa
              </label>
              <input
                type="text"
                value={formData.lokasi.kelurahan}
                onChange={(e) =>
                  handleLocationChange("kelurahan", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Peruntukan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peruntukan
              </label>
              <input
                type="text"
                name="peruntukan"
                value={formData.peruntukan}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Pilih Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Tidak Aktif">Tidak Aktif</option>
                <option value="Dalam Renovasi">Dalam Renovasi</option>
              </select>
            </div>

            {/* Keterangan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keterangan
              </label>
              <textarea
                name="keterangan"
                value={formData.keterangan}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Simpan Data Yardip
              </button>
            </div>
          </form>
        </div>

        {/* Map Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Pilih Lokasi di Peta</h3>
          <p className="text-sm text-gray-600 mb-4">
            Klik pada peta untuk menentukan lokasi aset Yardip
          </p>
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
              <LocationMarker
                position={mapPosition}
                setPosition={setMapPosition}
              />
            </MapContainer>
          </div>
          {mapPosition && (
            <div className="mt-4 p-3 bg-gray-100 rounded">
              <p className="text-sm">
                <strong>Koordinat Terpilih:</strong>
                <br />
                Latitude: {mapPosition[0].toFixed(6)}
                <br />
                Longitude: {mapPosition[1].toFixed(6)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddYardip;
