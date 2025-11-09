"use client";
import { useState } from "react";
import {
  MessageCircle,
  BarChart3,
  Heart,
  Calendar,
  FileSpreadsheet,
  Building2,
  ArrowRight,
  Check,
  Star,
  Instagram,
  Linkedin,
  MessageSquare,
} from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-white font-inter">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E88E5] via-[#2196F3] to-[#0D47A1] opacity-5"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#2196F3] rounded-full opacity-10 blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#1E88E5] rounded-full opacity-10 blur-xl animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Asisten Finansial
              <span className="bg-gradient-to-r from-[#1E88E5] to-[#0D47A1] bg-clip-text text-transparent">
                {" "}
                Pintar
              </span>{" "}
              untuk Bisnis Kamu
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Gunakan AI untuk menganalisis laporan keuangan, merancang strategi
              pendanaan, dan meningkatkan profit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="/onboarding"
                className="bg-gradient-to-r from-[#1E88E5] to-[#0D47A1] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 text-center"
              >
                Mulai Gratis
              </a>
              <a
                href="/dashboard"
                className="border-2 border-[#1E88E5] text-[#1E88E5] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#1E88E5] hover:text-white transition-all duration-300 text-center"
              >
                Sudah Punya Akun
              </a>
            </div>
          </div>

          {/* 3D Dashboard Visualization */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Dashboard SIFIN</h3>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-4">
                <div className="h-32 bg-gradient-to-r from-[#1E88E5] to-[#2196F3] rounded-lg opacity-80"></div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-16 bg-[#F5F7FA] rounded-lg"></div>
                  <div className="h-16 bg-[#F5F7FA] rounded-lg"></div>
                  <div className="h-16 bg-[#F5F7FA] rounded-lg"></div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-[#2196F3] to-[#1E88E5] text-white p-4 rounded-xl shadow-lg">
              <MessageCircle className="w-6 h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Kenalan dengan SIFIN
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            SIFIN membantu UMKM memahami kondisi keuangan, menyusun rencana
            pendanaan, dan mengambil keputusan strategis untuk pertumbuhan
            bisnis.
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-[#1E88E5] to-[#0D47A1] rounded-2xl p-8 text-white">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">AI Brain</h3>
                <p className="text-blue-100">
                  Teknologi AI canggih yang memahami pola keuangan bisnis Anda
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-[#1E88E5] to-[#2196F3] rounded-full flex items-center justify-center mb-6 mx-auto">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Business Dashboard
              </h3>
              <p className="text-gray-600">
                Interface yang mudah dipahami untuk mengelola semua aspek
                keuangan bisnis
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Fitur Unggulan SIFIN
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Solusi lengkap untuk mengelola keuangan bisnis dengan teknologi AI
              terdepan
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Chat Konsultan */}
            <div className="bg-gradient-to-br from-[#F5F7FA] to-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-[#1E88E5] to-[#2196F3] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                AI Chat Konsultan
              </h3>
              <p className="text-gray-600">
                Diskusi langsung dengan AI tentang strategi keuangan bisnismu.
              </p>
            </div>

            {/* Analisis Laporan Keuangan */}
            <div className="bg-gradient-to-br from-[#F5F7FA] to-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-[#1E88E5] to-[#2196F3] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Analisis Laporan Keuangan
              </h3>
              <p className="text-gray-600">
                Unggah laporan → dapatkan insight visual + rekomendasi otomatis.
              </p>
            </div>

            {/* Cek Kesehatan Bisnis */}
            <div className="bg-gradient-to-br from-[#F5F7FA] to-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-[#1E88E5] to-[#2196F3] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Cek Kesehatan Bisnis
              </h3>
              <p className="text-gray-600">
                Skor finansial dan tips peningkatan performa.
              </p>
            </div>

            {/* Perencanaan Keuangan Otomatis */}
            <div className="bg-gradient-to-br from-[#F5F7FA] to-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-[#1E88E5] to-[#2196F3] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Perencanaan Keuangan Otomatis
              </h3>
              <p className="text-gray-600">
                Proyeksi cash flow dan budgeting berbasis data.
              </p>
            </div>

            {/* Integrasi Spreadsheet */}
            <div className="bg-gradient-to-br from-[#F5F7FA] to-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-[#1E88E5] to-[#2196F3] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FileSpreadsheet className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Integrasi Spreadsheet
              </h3>
              <p className="text-gray-600">
                Ekspor analisis ke Google Sheet/Excel.
              </p>
            </div>

            {/* Strategi Pendanaan */}
            <div className="bg-gradient-to-br from-[#F5F7FA] to-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-[#1E88E5] to-[#2196F3] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Strategi Pendanaan
              </h3>
              <p className="text-gray-600">
                Fitur cerdas untuk membantu pengguna menyiapkan strategi dan
                dokumen saat mengajukan pinjaman ke bank atau investor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#F5F7FA] to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Cara Kerja SIFIN
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proses sederhana untuk mendapatkan insight keuangan yang powerful
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-r from-[#1E88E5] to-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Upload Data
              </h3>
              <p className="text-gray-600">
                Unggah laporan keuangan atau data bisnis Anda dengan mudah
              </p>

              {/* Arrow */}
              <div className="hidden md:block absolute top-10 -right-4 text-[#2196F3]">
                <ArrowRight className="w-8 h-8" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-r from-[#1E88E5] to-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Analisis AI
              </h3>
              <p className="text-gray-600">
                AI menganalisis data dan mengidentifikasi pola serta peluang
              </p>

              {/* Arrow */}
              <div className="hidden md:block absolute top-10 -right-4 text-[#2196F3]">
                <ArrowRight className="w-8 h-8" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-r from-[#1E88E5] to-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Dapatkan Insight
              </h3>
              <p className="text-gray-600">
                Terima laporan visual dan rekomendasi yang mudah dipahami
              </p>

              {/* Arrow */}
              <div className="hidden md:block absolute top-10 -right-4 text-[#2196F3]">
                <ArrowRight className="w-8 h-8" />
              </div>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-[#1E88E5] to-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                4
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Rancang Strategi Pendanaan
              </h3>
              <p className="text-gray-600">
                Implementasikan strategi dan siapkan dokumen untuk pendanaan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Kata Mereka tentang SIFIN
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dengar langsung dari para pemilik UMKM yang sudah merasakan
              manfaatnya
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Dengan SIFIN, aku bisa ngerti laporan keuangan dan bahkan siap
                apply pinjaman ke bank dengan data yang rapi!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-[#1E88E5] to-[#2196F3] rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  S
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sari Dewi</h4>
                  <p className="text-gray-600 text-sm">
                    Owner Warung Makan Sari
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "AI-nya sangat membantu dalam menganalisis cash flow. Sekarang
                bisnis online ku lebih terstruktur!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-[#1E88E5] to-[#2196F3] rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  B
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Budi Santoso</h4>
                  <p className="text-gray-600 text-sm">
                    Founder Toko Online BudiMart
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Fitur funding strategy-nya luar biasa! Berkat SIFIN, proposal
                bisnis ku diterima investor."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-[#1E88E5] to-[#2196F3] rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  A
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Andi Wijaya</h4>
                  <p className="text-gray-600 text-sm">CEO Startup AgriTech</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#1E88E5] to-[#0D47A1] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold mb-4">SIFIN</h3>
              <p className="text-blue-100 mb-6 text-lg">
                "Rapiin keuangan, naikin keuntungan."
              </p>
              <p className="text-blue-200 leading-relaxed">
                Asisten finansial pintar yang membantu UMKM mengelola keuangan
                dengan teknologi AI terdepan.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Navigasi</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#about"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Ikuti Kami</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <MessageSquare className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-blue-200">
              © 2024 SIFIN. All rights reserved. | Rapiin keuangan, naikin
              keuntungan.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
