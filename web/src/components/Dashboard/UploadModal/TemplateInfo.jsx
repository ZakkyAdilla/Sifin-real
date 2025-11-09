import { Info, Download } from "lucide-react";

export function TemplateInfo() {
  const handleDownloadTemplate = () => {
    // Create comprehensive financial template
    const templateData = [
      ["LAPORAN KEUANGAN UMKM - TEMPLATE SIFIN", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["BAGIAN A: LABA RUGI (Bulan Terakhir)", "", "", "", "", ""],
      ["Item", "Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024", "Mei 2024"],
      ["PENDAPATAN:", "", "", "", "", ""],
      [
        "Penjualan Produk/Jasa",
        "15000000",
        "18000000",
        "16500000",
        "20000000",
        "22000000",
      ],
      [
        "Pendapatan Lain-lain",
        "500000",
        "300000",
        "750000",
        "400000",
        "600000",
      ],
      ["TOTAL PENDAPATAN", "=B6+B7", "=C6+C7", "=D6+D7", "=E6+E7", "=F6+F7"],
      ["", "", "", "", "", ""],
      ["PENGELUARAN:", "", "", "", "", ""],
      [
        "Biaya Bahan Baku/Produk",
        "6000000",
        "7200000",
        "6600000",
        "8000000",
        "8800000",
      ],
      ["Gaji Karyawan", "3000000", "3000000", "3000000", "3500000", "3500000"],
      [
        "Biaya Operasional",
        "2000000",
        "2200000",
        "1800000",
        "2500000",
        "2800000",
      ],
      ["Biaya Listrik & Air", "500000", "550000", "480000", "600000", "620000"],
      [
        "Biaya Transportasi",
        "800000",
        "900000",
        "750000",
        "1000000",
        "1100000",
      ],
      ["Biaya Lain-lain", "700000", "650000", "800000", "900000", "750000"],
      [
        "TOTAL PENGELUARAN",
        "=B11+B12+B13+B14+B15+B16",
        "=C11+C12+C13+C14+C15+C16",
        "=D11+D12+D13+D14+D15+D16",
        "=E11+E12+E13+E14+E15+E16",
        "=F11+F12+F13+F14+F15+F16",
      ],
      ["", "", "", "", "", ""],
      ["LABA BERSIH", "=B8-B17", "=C8-C17", "=D8-D17", "=E8-E17", "=F8-F17"],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["BAGIAN B: ARUS KAS", "", "", "", "", ""],
      ["Item", "Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024", "Mei 2024"],
      ["KAS MASUK:", "", "", "", "", ""],
      [
        "Penjualan Tunai",
        "12000000",
        "14000000",
        "13000000",
        "16000000",
        "17000000",
      ],
      [
        "Penjualan Kredit (Tertagih)",
        "2500000",
        "3500000",
        "2800000",
        "3200000",
        "4200000",
      ],
      ["Modal Tambahan", "0", "5000000", "0", "0", "0"],
      [
        "TOTAL KAS MASUK",
        "=B25+B26+B27",
        "=C25+C26+C27",
        "=D25+D26+D27",
        "=E25+E26+E27",
        "=F25+F26+F27",
      ],
      ["", "", "", "", "", ""],
      ["KAS KELUAR:", "", "", "", "", ""],
      [
        "Pembelian Tunai",
        "5500000",
        "6800000",
        "6000000",
        "7500000",
        "8200000",
      ],
      ["Gaji", "3000000", "3000000", "3000000", "3500000", "3500000"],
      ["Operasional", "2000000", "2200000", "1800000", "2500000", "2800000"],
      ["Investasi Peralatan", "0", "2000000", "0", "0", "1500000"],
      [
        "TOTAL KAS KELUAR",
        "=B31+B32+B33+B34",
        "=C31+C32+C33+C34",
        "=D31+D32+D33+D34",
        "=E31+E32+E33+E34",
        "=F31+F32+F33+F34",
      ],
      ["", "", "", "", "", ""],
      [
        "SALDO KAS AKHIR",
        "=B28-B35",
        "=C28-C35",
        "=D28-D35",
        "=E28-E35",
        "=F28-F35",
      ],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["BAGIAN C: POSISI KEUANGAN (Per Mei 2024)", "", "", "", "", ""],
      ["ASET:", "", "", "", "", ""],
      ["Kas & Bank", "5200000", "", "", "", ""],
      ["Piutang Usaha", "3500000", "", "", "", ""],
      ["Persediaan", "8000000", "", "", "", ""],
      ["Peralatan", "15000000", "", "", "", ""],
      ["TOTAL ASET", "=B41+B42+B43+B44", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["KEWAJIBAN:", "", "", "", "", ""],
      ["Hutang Usaha", "2500000", "", "", "", ""],
      ["Hutang Bank", "8000000", "", "", "", ""],
      ["TOTAL KEWAJIBAN", "=B47+B48", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["MODAL:", "", "", "", "", ""],
      ["Modal Awal", "20000000", "", "", "", ""],
      ["Laba Ditahan", "=B45-B49-B52", "", "", "", ""],
      ["TOTAL MODAL", "=B52+B53", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["TOTAL KEWAJIBAN + MODAL", "=B49+B54", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["PETUNJUK PENGISIAN:", "", "", "", "", ""],
      ["1. Ganti angka contoh dengan data bisnis Anda", "", "", "", "", ""],
      [
        "2. Gunakan angka tanpa titik atau koma (contoh: 1500000)",
        "",
        "",
        "",
        "",
        "",
      ],
      [
        "3. Isi minimal 3 bulan data untuk analisis yang akurat",
        "",
        "",
        "",
        "",
        "",
      ],
      [
        "4. Pastikan rumus Excel tetap aktif untuk perhitungan otomatis",
        "",
        "",
        "",
        "",
        "",
      ],
      ["5. Simpan file dalam format .xlsx atau .csv", "", "", "", "", ""],
    ];

    const csvContent = templateData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Template_Laporan_Keuangan_SIFIN.csv";
    link.click();
  };

  return (
    <div className="bg-[#F5F7FA] rounded-xl p-6">
      <div className="flex items-center mb-4">
        <Info className="w-5 h-5 text-[#2196F3] mr-2" />
        <h4 className="text-lg font-semibold text-gray-900">
          Template Laporan Keuangan Lengkap
        </h4>
      </div>

      <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h5 className="font-semibold text-gray-900 mb-2">
              📊 Template SIFIN All-in-One
            </h5>
            <p className="text-sm text-gray-600">
              Satu file lengkap berisi: Laba Rugi + Arus Kas + Neraca
            </p>
          </div>
          <button
            onClick={handleDownloadTemplate}
            className="flex items-center bg-[#2196F3] text-white px-4 py-2 rounded-lg hover:bg-[#1976D2] transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Template
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-green-600 font-semibold">A</span>
            </div>
            <div>
              <p className="font-medium">Laba Rugi</p>
              <p className="text-gray-500">5 bulan data</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-blue-600 font-semibold">B</span>
            </div>
            <div>
              <p className="font-medium">Arus Kas</p>
              <p className="text-gray-500">Cash flow detail</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-purple-600 font-semibold">C</span>
            </div>
            <div>
              <p className="font-medium">Neraca</p>
              <p className="text-gray-500">Posisi keuangan</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <h5 className="font-semibold text-gray-900 mb-2">
          ✅ Cara Mudah Menggunakan Template:
        </h5>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>
            • <strong>Download template</strong> - Klik tombol download di atas
          </li>
          <li>
            • <strong>Ganti angka contoh</strong> - Sesuaikan dengan data bisnis
            Anda
          </li>
          <li>
            • <strong>Isi minimal 3 bulan</strong> - Untuk analisis yang akurat
          </li>
          <li>
            • <strong>Upload 1 file</strong> - Semua laporan dalam satu file
          </li>
          <li>
            • <strong>Dapatkan analisis</strong> - AI akan buat grafik & insight
            otomatis
          </li>
        </ul>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h5 className="font-semibold text-gray-900 mb-2">
          💡 Tips untuk Hasil Analisis Terbaik:
        </h5>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>
            • <strong>Data akurat</strong> - Pastikan angka sesuai dengan
            catatan asli
          </li>
          <li>
            • <strong>Format angka</strong> - Gunakan angka biasa (tanpa Rp,
            titik, koma)
          </li>
          <li>
            • <strong>Periode konsisten</strong> - Data bulanan dalam urutan
            yang benar
          </li>
          <li>
            • <strong>Lengkapi semua bagian</strong> - Laba rugi, arus kas, dan
            neraca
          </li>
        </ul>
      </div>
    </div>
  );
}
