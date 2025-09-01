import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { KOREM_LIST, KODIM_LIST, ASSET_STATUS } from "../utils/constants";
import "leaflet/dist/leaflet.css";

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
};

const AddAsset = () => {
  const [formData, setFormData] = useState({
    korem: "",
    kodim: "",
    lokasi: "",
    kibKode: "",
    nomorRegistrasi: "",
    alamat: "",
    peruntukan: "",
    status: "",
    asalMilik: "",
    buktiPemilikan: "",
    pemilikanSertifikat: false,
    jumlahTanahSertifikat: { bidang: 0, luas: 0 },
    belumSertifikat: { bidang: 0, luas: 0 },
    keterangan: "",
  });

  const [mapPosition, setMapPosition] = useState(null);
  const [selectedKorem, setSelectedKorem] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNestedInputChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleKoremChange = (e) => {
    const koremId = e.target.value;
    setSelectedKorem(koremId);
    setFormData((prev) => ({
      ...prev,
      korem: koremId,
      kodim: "", // Reset kodim when korem changes
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const assetData = {
      ...formData,
      coordinates: mapPosition,
    };
    console.log("Asset Data:", assetData);
    // Here you would typically send data to your API
    alert("Data aset berhasil disimpan!");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Tambah Data Aset
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Korem Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih Korem
              </label>
              <select
                name="korem"
                value={formData.korem}
                onChange={handleKoremChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Pilih Korem</option>
                {KOREM_LIST.map((korem) => (
                  <option key={korem.id} value={korem.id}>
                    {korem.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Kodim Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih Kodim
              </label>
              <select
                name="kodim"
                value={formData.kodim}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={!selectedKorem}
              >
                <option value="">Pilih Kodim</option>
                {selectedKorem &&
                  KODIM_LIST[selectedKorem]?.map((kodim) => (
                    <option key={kodim.id} value={kodim.id}>
                      {kodim.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lokasi
              </label>
              <input
                type="text"
                name="lokasi"
                value={formData.lokasi}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nama lokasi akan otomatis terisi dari peta"
                required
              />
            </div>

            {/* KIB/Kode Barang */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                KIB/Kode Barang
              </label>
              <input
                type="text"
                name="kibKode"
                value={formData.kibKode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Nomor Registrasi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor Registrasi
              </label>
              <input
                type="text"
                name="nomorRegistrasi"
                value={formData.nomorRegistrasi}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Alamat */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alamat
              </label>
              <textarea
                name="alamat"
                value={formData.alamat}
                onChange={handleInputChange}
                rows="3"
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
                {ASSET_STATUS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Asal Milik */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Asal Milik
              </label>
              <input
                type="text"
                name="asalMilik"
                value={formData.asalMilik}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Bukti Pemilikan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bukti Pemilikan
              </label>
              <input
                type="text"
                name="buktiPemilikan"
                value={formData.buktiPemilikan}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Pemilikan Sertifikat */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="pemilikanSertifikat"
                checked={formData.pemilikanSertifikat}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label className="text-sm font-medium text-gray-700">
                Pemilikan Sertifikat
              </label>
            </div>

            {/* Jumlah Tanah Sertifikat */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bidang Sertifikat
                </label>
                <input
                  type="number"
                  value={formData.jumlahTanahSertifikat.bidang}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "jumlahTanahSertifikat",
                      "bidang",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Luas Sertifikat (M²)
                </label>
                <input
                  type="number"
                  value={formData.jumlahTanahSertifikat.luas}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "jumlahTanahSertifikat",
                      "luas",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Belum Sertifikat */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bidang Belum Sertifikat
                </label>
                <input
                  type="number"
                  value={formData.belumSertifikat.bidang}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "belumSertifikat",
                      "bidang",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Luas Belum Sertifikat (M²)
                </label>
                <input
                  type="number"
                  value={formData.belumSertifikat.luas}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "belumSertifikat",
                      "luas",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
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
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Simpan Data Aset
              </button>
            </div>
          </form>
        </div>

        {/* Map Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Pilih Lokasi di Peta</h3>
          <p className="text-sm text-gray-600 mb-4">
            Klik pada peta untuk menentukan lokasi aset
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

export default AddAsset;
