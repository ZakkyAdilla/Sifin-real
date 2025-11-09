import { useState } from "react";
import {
  Heart,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calculator,
} from "lucide-react";

export function HealthScore({ financialData = null, onChatMessage }) {
  const calculateHealthScore = () => {
    if (!financialData) {
      return {
        score: 75,
        analysis: {
          profitMargin: {
            value: 18.5,
            status: "good",
            advice: "Margin profit baik",
          },
          currentRatio: {
            value: 2.1,
            status: "excellent",
            advice: "Likuiditas sangat baik",
          },
          debtToEquity: {
            value: 0.4,
            status: "good",
            advice: "Hutang dalam batas wajar",
          },
          cashFlow: {
            value: 2.8,
            status: "excellent",
            advice: "Kas sangat kuat",
          },
          strengths: [
            "Margin profit dalam kondisi baik",
            "Likuiditas sangat baik untuk membayar hutang",
          ],
          warnings: [],
          recommendations: [
            "Perbaiki area yang masih lemah untuk stabilitas jangka panjang",
            "Monitor cash flow secara berkala",
          ],
        },
      };
    }

    const revenue = parseFloat(financialData.revenue_month5) || 0;
    const expenses = parseFloat(financialData.expense_month5) || 0;
    const cash = parseFloat(financialData.cash_balance) || 0;
    const receivables = parseFloat(financialData.accounts_receivable) || 0;
    const inventory = parseFloat(financialData.inventory) || 0;
    const payables = parseFloat(financialData.accounts_payable) || 0;
    const loans = parseFloat(financialData.bank_loans) || 0;

    if (revenue === 0) return null;

    // Calculate financial ratios
    const profitMargin = ((revenue - expenses) / revenue) * 100;
    const currentAssets = cash + receivables + inventory;
    const currentLiabilities = payables;
    const currentRatio =
      currentLiabilities > 0 ? currentAssets / currentLiabilities : 10;
    const totalEquity = currentAssets - currentLiabilities - loans;
    const debtToEquity = totalEquity > 0 ? loans / totalEquity : 0;
    const cashFlowRatio = expenses > 0 ? cash / expenses : 10;

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

    // General recommendations based on score
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

  const result = calculateHealthScore();

  if (!result) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center mb-4">
          <Heart className="w-6 h-6 text-red-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">
            Health Score Bisnis
          </h2>
        </div>
        <div className="text-center py-8 bg-gray-50 rounded-xl">
          <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Siap Menghitung Kesehatan
          </h3>
          <p className="text-gray-600">
            Input data keuangan untuk mendapatkan health score otomatis
          </p>
        </div>
      </div>
    );
  }

  const { score, analysis } = result;

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

  const getStatusLabel = (score) => {
    if (score >= 80) return "Bisnis Sangat Sehat";
    if (score >= 60) return "Bisnis Cukup Sehat";
    return "Bisnis Perlu Perbaikan";
  };

  const formatCurrency = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const handleGetDetailedAnalysis = () => {
    if (onChatMessage) {
      const message = `Berdasarkan health score ${score}/100, mohon berikan analisis mendalam tentang kondisi keuangan bisnis saya. 

Data keuangan saya:
- Pendapatan bulan ini: Rp ${formatCurrency(financialData?.revenue_month5 || 0)}
- Pengeluaran bulan ini: Rp ${formatCurrency(financialData?.expense_month5 || 0)}
- Saldo kas: Rp ${formatCurrency(financialData?.cash_balance || 0)}
- Piutang: Rp ${formatCurrency(financialData?.accounts_receivable || 0)}
- Persediaan: Rp ${formatCurrency(financialData?.inventory || 0)}
- Hutang: Rp ${formatCurrency(financialData?.accounts_payable || 0)}
- Pinjaman: Rp ${formatCurrency(financialData?.bank_loans || 0)}

Kekuatan:
${analysis.strengths.map((s) => `- ${s}`).join("\n")}

Area yang perlu perhatian:
${analysis.warnings.map((w) => `- ${w}`).join("\n")}

Mohon berikan:
1. Strategi konkret untuk meningkatkan health score
2. Prioritas perbaikan yang harus dilakukan
3. Target financial ratio yang realistis
4. Rencana jangka pendek dan panjang untuk stabilitas bisnis`;

      onChatMessage(message);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Heart className="w-6 h-6 text-red-500 mr-2" />
          Health Score Bisnis {financialData ? "(Data Real)" : "(Contoh)"}
        </h2>
      </div>

      {/* Score Display */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          {getScoreIcon(score)}
        </div>
        <div
          className={`inline-block px-6 py-3 rounded-2xl ${getScoreColor(score)}`}
        >
          <span className="text-3xl font-bold">{score}</span>
          <span className="text-lg font-medium ml-2">/ 100</span>
        </div>
        <p className="mt-2 text-gray-600 font-medium">
          {getStatusLabel(score)}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Profit Margin
            </span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                analysis.profitMargin.status === "excellent"
                  ? "bg-green-100 text-green-800"
                  : analysis.profitMargin.status === "good"
                    ? "bg-blue-100 text-blue-800"
                    : analysis.profitMargin.status === "fair"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
              }`}
            >
              {analysis.profitMargin.status === "excellent"
                ? "Sangat Baik"
                : analysis.profitMargin.status === "good"
                  ? "Baik"
                  : analysis.profitMargin.status === "fair"
                    ? "Cukup"
                    : "Perlu Perbaikan"}
            </span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {analysis.profitMargin.value.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-600">
            {analysis.profitMargin.advice}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Likuiditas
            </span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                analysis.currentRatio.status === "excellent"
                  ? "bg-green-100 text-green-800"
                  : analysis.currentRatio.status === "good"
                    ? "bg-blue-100 text-blue-800"
                    : analysis.currentRatio.status === "fair"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
              }`}
            >
              {analysis.currentRatio.status === "excellent"
                ? "Sangat Baik"
                : analysis.currentRatio.status === "good"
                  ? "Baik"
                  : analysis.currentRatio.status === "fair"
                    ? "Cukup"
                    : "Perlu Perbaikan"}
            </span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {analysis.currentRatio.value.toFixed(1)}x
          </p>
          <p className="text-xs text-gray-600">
            {analysis.currentRatio.advice}
          </p>
        </div>
      </div>

      {/* Analysis Summary */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Strengths */}
        {analysis.strengths.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Kekuatan
            </h4>
            <ul className="text-sm text-green-700 space-y-1">
              {analysis.strengths.map((strength, index) => (
                <li key={index}>• {strength}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Warnings */}
        {analysis.warnings.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              Perhatian
            </h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              {analysis.warnings.map((warning, index) => (
                <li key={index}>• {warning}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2" />
          Rekomendasi Quick Wins
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          {analysis.recommendations.slice(0, 3).map((rec, index) => (
            <li key={index}>• {rec}</li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      {financialData && onChatMessage && (
        <button
          onClick={handleGetDetailedAnalysis}
          className="w-full bg-gradient-to-r from-[#1E88E5] to-[#0D47A1] text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold flex items-center justify-center"
        >
          <Calculator className="w-5 h-5 mr-2" />
          Dapatkan Analisis Mendalam dari AI
        </button>
      )}
    </div>
  );
}
