import { useState } from "react";
import {
  Heart,
  Calculator,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export function HealthCheck({ onSubmit }) {
  const [formData, setFormData] = useState({
    monthlyRevenue: "",
    monthlyExpenses: "",
    cashBalance: "",
    accounts_receivable: "",
    inventory: "",
    accounts_payable: "",
    loans: "",
    employees: "",
  });

  const [healthScore, setHealthScore] = useState(null);
  const [healthAnalysis, setHealthAnalysis] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const handleInputChange = (field, value) => {
    // Remove non-numeric characters and convert to number
    const numericValue = value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({
      ...prev,
      [field]: numericValue,
    }));
  };

  const formatCurrency = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const calculateHealthScore = () => {
    const revenue = parseFloat(formData.monthlyRevenue) || 0;
    const expenses = parseFloat(formData.monthlyExpenses) || 0;
    const cash = parseFloat(formData.cashBalance) || 0;
    const receivables = parseFloat(formData.accounts_receivable) || 0;
    const inventory = parseFloat(formData.inventory) || 0;
    const payables = parseFloat(formData.accounts_payable) || 0;
    const loans = parseFloat(formData.loans) || 0;

    if (revenue === 0) return null;

    // Calculate financial ratios
    const profitMargin = ((revenue - expenses) / revenue) * 100;
    const currentAssets = cash + receivables + inventory;
    const currentLiabilities = payables;
    const currentRatio =
      currentLiabilities > 0 ? currentAssets / currentLiabilities : 10;
    const debtToEquity = loans / (currentAssets - currentLiabilities);
    const cashFlowRatio = cash / expenses;

    // Scoring system (0-100)
    let score = 0;
    const analysis = {
      profitMargin: { value: profitMargin, status: "", advice: "" },
      currentRatio: { value: currentRatio, status: "", advice: "" },
      debtToEquity: { value: debtToEquity, status: "", advice: "" },
      cashFlow: { value: cashFlowRatio, status: "", advice: "" },
      strengths: [],
      warnings: [],
      recommendations: [],
    };

    // Profit Margin (25 points)
    if (profitMargin >= 20) {
      score += 25;
      analysis.profitMargin.status = "excellent";
      analysis.profitMargin.advice = "Margin profit sangat baik";
      analysis.strengths.push("Margin profit sangat sehat (>20%)");
    } else if (profitMargin >= 10) {
      score += 18;
      analysis.profitMargin.status = "good";
      analysis.profitMargin.advice = "Margin profit baik";
      analysis.strengths.push("Margin profit dalam kondisi baik");
    } else if (profitMargin >= 5) {
      score += 10;
      analysis.profitMargin.status = "fair";
      analysis.profitMargin.advice = "Margin profit cukup";
      analysis.warnings.push("Margin profit perlu ditingkatkan");
    } else {
      score += 0;
      analysis.profitMargin.status = "poor";
      analysis.profitMargin.advice = "Margin profit rendah";
      analysis.warnings.push("Margin profit terlalu rendah (<5%)");
      analysis.recommendations.push(
        "Kurangi biaya operasional atau tingkatkan harga jual",
      );
    }

    // Current Ratio (25 points)
    if (currentRatio >= 2) {
      score += 25;
      analysis.currentRatio.status = "excellent";
      analysis.currentRatio.advice = "Likuiditas sangat baik";
      analysis.strengths.push("Likuiditas sangat baik untuk membayar hutang");
    } else if (currentRatio >= 1.2) {
      score += 18;
      analysis.currentRatio.status = "good";
      analysis.currentRatio.advice = "Likuiditas baik";
      analysis.strengths.push("Likuiditas dalam kondisi sehat");
    } else if (currentRatio >= 1) {
      score += 10;
      analysis.currentRatio.status = "fair";
      analysis.currentRatio.advice = "Likuiditas cukup";
      analysis.warnings.push("Likuiditas perlu diperkuat");
    } else {
      score += 0;
      analysis.currentRatio.status = "poor";
      analysis.currentRatio.advice = "Likuiditas kurang";
      analysis.warnings.push("Risiko kesulitan membayar hutang jangka pendek");
      analysis.recommendations.push(
        "Tingkatkan kas atau kurangi hutang jangka pendek",
      );
    }

    // Debt to Equity (25 points)
    if (debtToEquity <= 0.3) {
      score += 25;
      analysis.debtToEquity.status = "excellent";
      analysis.debtToEquity.advice = "Hutang sangat terkendali";
      analysis.strengths.push("Tingkat hutang sangat rendah dan aman");
    } else if (debtToEquity <= 0.7) {
      score += 18;
      analysis.debtToEquity.status = "good";
      analysis.debtToEquity.advice = "Hutang dalam batas wajar";
    } else if (debtToEquity <= 1.0) {
      score += 10;
      analysis.debtToEquity.status = "fair";
      analysis.debtToEquity.advice = "Hutang cukup tinggi";
      analysis.warnings.push("Tingkat hutang perlu diperhatikan");
    } else {
      score += 0;
      analysis.debtToEquity.status = "poor";
      analysis.debtToEquity.advice = "Hutang terlalu tinggi";
      analysis.warnings.push("Tingkat hutang terlalu tinggi, berisiko");
      analysis.recommendations.push(
        "Fokus pada pelunasan hutang sebelum ekspansi",
      );
    }

    // Cash Flow (25 points)
    if (cashFlowRatio >= 3) {
      score += 25;
      analysis.cashFlow.status = "excellent";
      analysis.cashFlow.advice = "Kas sangat kuat";
      analysis.strengths.push("Cadangan kas sangat memadai");
    } else if (cashFlowRatio >= 1.5) {
      score += 18;
      analysis.cashFlow.status = "good";
      analysis.cashFlow.advice = "Kas dalam kondisi baik";
    } else if (cashFlowRatio >= 0.5) {
      score += 10;
      analysis.cashFlow.status = "fair";
      analysis.cashFlow.advice = "Kas cukup";
      analysis.warnings.push("Cadangan kas perlu diperkuat");
    } else {
      score += 0;
      analysis.cashFlow.status = "poor";
      analysis.cashFlow.advice = "Kas kurang memadai";
      analysis.warnings.push("Risiko cash flow negatif");
      analysis.recommendations.push("Tingkatkan cadangan kas darurat");
    }

    // General recommendations
    if (score >= 80) {
      analysis.recommendations.push(
        "Bisnis dalam kondisi sangat sehat, pertimbangkan ekspansi",
      );
      analysis.recommendations.push(
        "Manfaatkan kondisi baik untuk mencari peluang investasi",
      );
    } else if (score >= 60) {
      analysis.recommendations.push(
        "Perbaiki area yang masih lemah untuk stabilitas jangka panjang",
      );
      analysis.recommendations.push("Monitor cash flow secara berkala");
    } else {
      analysis.recommendations.push(
        "Fokus pada perbaikan fundamental sebelum ekspansi",
      );
      analysis.recommendations.push(
        "Konsultasikan dengan ahli keuangan untuk strategi pemulihan",
      );
    }

    return { score, analysis };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = calculateHealthScore();
    if (result) {
      setHealthScore(result.score);
      setHealthAnalysis(result.analysis);
      setShowForm(false);

      // Send to AI chat for more detailed analysis
      if (onSubmit) {
        const message = `Saya telah melakukan health check bisnis dengan data berikut:
- Pendapatan bulanan: Rp ${formatCurrency(formData.monthlyRevenue)}
- Pengeluaran bulanan: Rp ${formatCurrency(formData.monthlyExpenses)}
- Saldo kas: Rp ${formatCurrency(formData.cashBalance)}
- Piutang: Rp ${formatCurrency(formData.accounts_receivable)}
- Persediaan: Rp ${formatCurrency(formData.inventory)}
- Hutang: Rp ${formatCurrency(formData.accounts_payable)}
- Pinjaman: Rp ${formatCurrency(formData.loans)}
- Jumlah karyawan: ${formData.employees}

Hasil health score: ${result.score}/100

Mohon berikan analisis mendalam dan rekomendasi strategis untuk meningkatkan kondisi keuangan bisnis saya.`;

        onSubmit(message);
      }
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getScoreIcon = (score) => {
    if (score >= 80) return <CheckCircle className="w-8 h-8 text-green-600" />;
    if (score >= 60) return <TrendingUp className="w-8 h-8 text-yellow-600" />;
    return <AlertCircle className="w-8 h-8 text-red-600" />;
  };

  if (!showForm && healthScore !== null) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Heart className="w-6 h-6 text-red-500 mr-2" />
            Health Check Hasil
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="text-sm text-[#2196F3] hover:text-[#1976D2]"
          >
            Cek Ulang
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            {getScoreIcon(healthScore)}
          </div>
          <div
            className={`inline-block px-6 py-3 rounded-2xl ${getScoreColor(healthScore)}`}
          >
            <span className="text-3xl font-bold">{healthScore}</span>
            <span className="text-lg font-medium ml-2">/ 100</span>
          </div>
          <p className="mt-2 text-gray-600">
            {healthScore >= 80
              ? "Bisnis Sangat Sehat"
              : healthScore >= 60
                ? "Bisnis Cukup Sehat"
                : "Bisnis Perlu Perbaikan"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Strengths */}
          {healthAnalysis.strengths.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h4 className="font-semibold text-green-800 mb-2">✅ Kekuatan</h4>
              <ul className="text-sm text-green-700 space-y-1">
                {healthAnalysis.strengths.map((strength, index) => (
                  <li key={index}>• {strength}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Warnings */}
          {healthAnalysis.warnings.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">
                ⚠️ Perhatian
              </h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                {healthAnalysis.warnings.map((warning, index) => (
                  <li key={index}>• {warning}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:col-span-2">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Rekomendasi</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              {healthAnalysis.recommendations.map((rec, index) => (
                <li key={index}>• {rec}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center mb-6">
        <Heart className="w-6 h-6 text-red-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">
          Health Check Bisnis
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pendapatan Bulanan <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">Rp</span>
              <input
                type="text"
                value={formatCurrency(formData.monthlyRevenue)}
                onChange={(e) =>
                  handleInputChange("monthlyRevenue", e.target.value)
                }
                placeholder="15.000.000"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pengeluaran Bulanan <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">Rp</span>
              <input
                type="text"
                value={formatCurrency(formData.monthlyExpenses)}
                onChange={(e) =>
                  handleInputChange("monthlyExpenses", e.target.value)
                }
                placeholder="12.000.000"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Saldo Kas Saat Ini <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">Rp</span>
              <input
                type="text"
                value={formatCurrency(formData.cashBalance)}
                onChange={(e) =>
                  handleInputChange("cashBalance", e.target.value)
                }
                placeholder="5.000.000"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Piutang Usaha
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">Rp</span>
              <input
                type="text"
                value={formatCurrency(formData.accounts_receivable)}
                onChange={(e) =>
                  handleInputChange("accounts_receivable", e.target.value)
                }
                placeholder="3.000.000"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nilai Persediaan
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">Rp</span>
              <input
                type="text"
                value={formatCurrency(formData.inventory)}
                onChange={(e) => handleInputChange("inventory", e.target.value)}
                placeholder="8.000.000"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hutang Usaha
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">Rp</span>
              <input
                type="text"
                value={formatCurrency(formData.accounts_payable)}
                onChange={(e) =>
                  handleInputChange("accounts_payable", e.target.value)
                }
                placeholder="2.000.000"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Pinjaman Bank
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">Rp</span>
              <input
                type="text"
                value={formatCurrency(formData.loans)}
                onChange={(e) => handleInputChange("loans", e.target.value)}
                placeholder="10.000.000"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jumlah Karyawan
            </label>
            <input
              type="number"
              value={formData.employees}
              onChange={(e) => handleInputChange("employees", e.target.value)}
              placeholder="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2 flex items-center">
            <Calculator className="w-4 h-4 mr-2" />
            Cara Mengisi Health Check:
          </h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>
              • <strong>Wajib diisi:</strong> Pendapatan, pengeluaran, dan saldo
              kas bulanan
            </li>
            <li>
              • <strong>Opsional:</strong> Data aset dan kewajiban untuk
              analisis lebih detail
            </li>
            <li>
              • <strong>Format angka:</strong> Masukkan angka biasa (contoh:
              5000000 untuk 5 juta)
            </li>
            <li>
              • <strong>AI akan analisis:</strong> Rasio keuangan dan memberikan
              skor kesehatan
            </li>
          </ul>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#1E88E5] to-[#0D47A1] text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
        >
          Analisis Kesehatan Bisnis
        </button>
      </form>
    </div>
  );
}
