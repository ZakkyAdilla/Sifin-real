"use client";
import { useState } from "react";
import {
  Building2,
  Users,
  Calendar,
  MapPin,
  TrendingUp,
  Target,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
} from "lucide-react";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [businessData, setBusinessData] = useState({
    businessName: "",
    businessType: "",
    industry: "",
    monthlyRevenue: "",
    employeeCount: "",
    operationYears: "",
    location: "",
    businessGoals: [],
    mainChallenges: [],
    fundingNeeds: "",
  });

  const steps = [
    {
      title: "Profil Bisnis",
      subtitle: "Ceritakan tentang bisnis Anda",
      icon: Building2,
    },
    {
      title: "Skala Operasi",
      subtitle: "Ukuran dan jangkauan bisnis",
      icon: TrendingUp,
    },
    {
      title: "Tujuan & Tantangan",
      subtitle: "Apa yang ingin dicapai dan kendala yang dihadapi",
      icon: Target,
    },
    {
      title: "Selesai",
      subtitle: "Siap memulai dengan SIFIN AI",
      icon: CheckCircle,
    },
  ];

  const businessTypes = [
    "Usaha Mikro (< Rp 50 juta/tahun)",
    "Usaha Kecil (Rp 50 juta - 2.5 miliar/tahun)",
    "Usaha Menengah (Rp 2.5 - 50 miliar/tahun)",
    "Startup/Tech",
    "Freelancer/Konsultan",
  ];

  const industries = [
    "Kuliner & F&B",
    "Fashion & Retail",
    "Jasa & Konsultan",
    "Teknologi & Digital",
    "Pertanian & Peternakan",
    "Manufaktur & Produksi",
    "Kesehatan & Kecantikan",
    "Pendidikan & Pelatihan",
    "Konstruksi & Properti",
    "Lainnya",
  ];

  const revenueRanges = [
    "< Rp 10 juta/bulan",
    "Rp 10-50 juta/bulan",
    "Rp 50-200 juta/bulan",
    "Rp 200 juta - 1 miliar/bulan",
    "> Rp 1 miliar/bulan",
  ];

  const employeeRanges = [
    "Solo/1 orang",
    "2-5 orang",
    "6-20 orang",
    "21-100 orang",
    "> 100 orang",
  ];

  const operationYearsOptions = [
    "< 6 bulan",
    "6 bulan - 1 tahun",
    "1-3 tahun",
    "3-5 tahun",
    "> 5 tahun",
  ];

  const businessGoalsOptions = [
    "Meningkatkan penjualan",
    "Ekspansi bisnis",
    "Efisiensi operasional",
    "Mendapatkan funding",
    "Memperbaiki cash flow",
    "Diversifikasi produk",
    "Go digital/online",
    "IPO/Exit strategy",
  ];

  const challengesOptions = [
    "Modal terbatas",
    "Cash flow tidak stabil",
    "Persaingan ketat",
    "SDM kurang kompeten",
    "Pemasaran tidak efektif",
    "Operasional tidak efisien",
    "Teknologi tertinggal",
    "Regulasi & compliance",
  ];

  const handleInputChange = (field, value) => {
    setBusinessData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (field, value) => {
    setBusinessData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    // Save business data to localStorage
    localStorage.setItem("sifinBusinessProfile", JSON.stringify(businessData));

    // Redirect to dashboard
    window.location.href = "/dashboard";
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return (
          businessData.businessName &&
          businessData.businessType &&
          businessData.industry
        );
      case 1:
        return (
          businessData.monthlyRevenue &&
          businessData.employeeCount &&
          businessData.operationYears &&
          businessData.location
        );
      case 2:
        return (
          businessData.businessGoals.length > 0 &&
          businessData.mainChallenges.length > 0
        );
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Nama Bisnis/Usaha <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={businessData.businessName}
                onChange={(e) =>
                  handleInputChange("businessName", e.target.value)
                }
                placeholder="Contoh: Warung Makan Sari, Toko Online BudiMart"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Jenis Usaha <span className="text-red-500">*</span>
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {businessTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleInputChange("businessType", type)}
                    className={`p-3 text-left border rounded-xl transition-all duration-300 ${
                      businessData.businessType === type
                        ? "border-[#2196F3] bg-blue-50 text-[#2196F3]"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <span className="text-sm font-medium">{type}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Industri/Bidang Usaha <span className="text-red-500">*</span>
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {industries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => handleInputChange("industry", industry)}
                    className={`p-3 text-left border rounded-xl transition-all duration-300 ${
                      businessData.industry === industry
                        ? "border-[#2196F3] bg-blue-50 text-[#2196F3]"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <span className="text-sm font-medium">{industry}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Omzet Bulanan <span className="text-red-500">*</span>
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {revenueRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => handleInputChange("monthlyRevenue", range)}
                    className={`p-3 text-left border rounded-xl transition-all duration-300 ${
                      businessData.monthlyRevenue === range
                        ? "border-[#2196F3] bg-blue-50 text-[#2196F3]"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <span className="text-sm font-medium">{range}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Jumlah Karyawan <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {employeeRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => handleInputChange("employeeCount", range)}
                    className={`p-3 text-center border rounded-xl transition-all duration-300 ${
                      businessData.employeeCount === range
                        ? "border-[#2196F3] bg-blue-50 text-[#2196F3]"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <span className="text-sm font-medium">{range}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Lama Beroperasi <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {operationYearsOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleInputChange("operationYears", option)}
                    className={`p-3 text-center border rounded-xl transition-all duration-300 ${
                      businessData.operationYears === option
                        ? "border-[#2196F3] bg-blue-50 text-[#2196F3]"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <span className="text-sm font-medium">{option}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Lokasi Bisnis <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={businessData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Contoh: Jakarta Selatan, Bandung, Surabaya"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Tujuan Bisnis (pilih yang sesuai){" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {businessGoalsOptions.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => handleArrayChange("businessGoals", goal)}
                    className={`p-3 text-left border rounded-xl transition-all duration-300 ${
                      businessData.businessGoals.includes(goal)
                        ? "border-[#2196F3] bg-blue-50 text-[#2196F3]"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <span className="text-sm font-medium">{goal}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Tantangan Utama (pilih yang sesuai){" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {challengesOptions.map((challenge) => (
                  <button
                    key={challenge}
                    onClick={() =>
                      handleArrayChange("mainChallenges", challenge)
                    }
                    className={`p-3 text-left border rounded-xl transition-all duration-300 ${
                      businessData.mainChallenges.includes(challenge)
                        ? "border-[#2196F3] bg-blue-50 text-[#2196F3]"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <span className="text-sm font-medium">{challenge}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Kebutuhan Pendanaan (opsional)
              </label>
              <textarea
                value={businessData.fundingNeeds}
                onChange={(e) =>
                  handleInputChange("fundingNeeds", e.target.value)
                }
                placeholder="Contoh: Butuh modal Rp 100 juta untuk ekspansi toko ke 3 cabang..."
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-[#1E88E5] to-[#2196F3] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Profil Bisnis Lengkap!
              </h3>
              <p className="text-gray-600">
                SIFIN AI sekarang siap memberikan konsultasi yang
                dipersonalisasi untuk{" "}
                <span className="font-semibold text-[#2196F3]">
                  {businessData.businessName}
                </span>
              </p>
            </div>

            <div className="bg-[#F5F7FA] rounded-xl p-6 text-left">
              <h4 className="font-semibold text-gray-900 mb-4">
                Ringkasan Profil Bisnis:
              </h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Bisnis:</strong> {businessData.businessName} (
                  {businessData.industry})
                </p>
                <p>
                  <strong>Jenis:</strong> {businessData.businessType}
                </p>
                <p>
                  <strong>Omzet:</strong> {businessData.monthlyRevenue}
                </p>
                <p>
                  <strong>Karyawan:</strong> {businessData.employeeCount}
                </p>
                <p>
                  <strong>Operasi:</strong> {businessData.operationYears}
                </p>
                <p>
                  <strong>Lokasi:</strong> {businessData.location}
                </p>
                <p>
                  <strong>Tujuan:</strong>{" "}
                  {businessData.businessGoals.join(", ")}
                </p>
                <p>
                  <strong>Tantangan:</strong>{" "}
                  {businessData.mainChallenges.join(", ")}
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-[#1E88E5] to-[#2196F3] rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome to SIFIN!
              </h1>
              <p className="text-gray-600">
                Mari kenalan dengan bisnis Anda untuk konsultasi yang lebih
                personal
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center ${index < steps.length - 1 ? "flex-1" : ""}`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      index <= currentStep
                        ? "bg-gradient-to-r from-[#1E88E5] to-[#2196F3] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    <StepIcon className="w-6 h-6" />
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 ${
                        index < currentStep ? "bg-[#2196F3]" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600">{steps[currentStep].subtitle}</p>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Sebelumnya
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-[#1E88E5] to-[#0D47A1] text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Selanjutnya
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-[#1E88E5] to-[#0D47A1] text-white rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Mulai dengan SIFIN AI
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
