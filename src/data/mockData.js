export const mockAssets = [
  {
    id: 1,
    korem: "071",
    kodim: "0701",
    lokasi: "Jl. Merdeka No. 1",
    kibKode: "KIB001",
    nomorRegistrasi: "REG001",
    alamat: "Jl. Merdeka No. 1, Surabaya",
    peruntukan: "Kantor",
    status: "Aktif",
    asalMilik: "TNI AD",
    buktiPemilikan: "Sertifikat",
    pemilikanSertifikat: true,
    jumlahTanahSertifikat: {
      bidang: 1,
      luas: 1000,
    },
    belumSertifikat: {
      bidang: 0,
      luas: 0,
    },
    keterangan: "Kantor Kodim 0701",
    coordinates: [-7.2575, 112.7521],
  },
  // Add more mock data as needed
];

export const mockYardipAssets = [
  {
    id: 1,
    pengelola: "Yayasan Rumpun Diponegoro",
    bidang: "Tanah Bangunan",
    lokasi: {
      kabKota: "Surabaya",
      kecamatan: "Gubeng",
      kelurahan: "Gubeng",
    },
    peruntukan: "Pendidikan",
    status: "Aktif",
    keterangan: "Gedung Sekolah",
    coordinates: [-7.2652, 112.7473],
  },
  // Add more mock data as needed
];

export const mockUsers = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    role: "Admin",
    name: "Administrator Kodam IV/Dip",
  },
  {
    id: 2,
    username: "opslog",
    password: "opslog123",
    role: "Operator Slog",
    name: "Operator Logistik",
  },
  {
    id: 3,
    username: "opsren",
    password: "opsren123",
    role: "Operator Sren",
    name: "Operator Sumber Daya",
  },
];
