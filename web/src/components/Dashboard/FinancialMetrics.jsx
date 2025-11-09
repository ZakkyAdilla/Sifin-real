import {
  ArrowUp,
  ArrowDown,
  TrendingUp,
  DollarSign,
  PiggyBank,
  AlertTriangle,
} from "lucide-react";

export function FinancialMetrics({ financialData }) {
  // Debug log to help troubleshoot
  console.log("FinancialMetrics received data:", financialData);

  // Early return if no financial data
  if (!financialData) {
    console.log("No financial data provided, returning null");
    return null;
  }

  const calculateMetrics = () => {
    try {
      console.log("Starting metrics calculation...");

      const currentRevenue = parseFloat(financialData.revenue_month5) || 0;
      const currentExpense = parseFloat(financialData.expense_month5) || 0;
      const previousRevenue = parseFloat(financialData.revenue_month4) || 0;
      const previousExpense = parseFloat(financialData.expense_month4) || 0;

      const cash = parseFloat(financialData.cash_balance) || 0;
      const receivables = parseFloat(financialData.accounts_receivable) || 0;
      const inventory = parseFloat(financialData.inventory) || 0;
      const payables = parseFloat(financialData.accounts_payable) || 0;

      // Calculate key metrics
      const currentProfit = currentRevenue - currentExpense;
      const previousProfit = previousRevenue - previousExpense;
      const profitMargin =
        currentRevenue > 0 ? (currentProfit / currentRevenue) * 100 : 0;
      const currentAssets = cash + receivables + inventory;
      const workingCapital = currentAssets - payables;

      // Calculate trends
      const revenueGrowth =
        previousRevenue > 0
          ? ((currentRevenue - previousRevenue) / previousRevenue) * 100
          : 0;
      const profitGrowth =
        previousProfit > 0
          ? ((currentProfit - previousProfit) / previousProfit) * 100
          : 0;

      const metricsArray = [
        {
          title: "💰 Uang Masuk Bulan Ini",
          subtitle: "Total semua penjualan & pemasukan",
          value: `Rp ${new Intl.NumberFormat("id-ID").format(currentRevenue)}`,
          change: revenueGrowth !== 0 ? `${revenueGrowth.toFixed(1)}%` : "0%",
          trend: revenueGrowth >= 0 ? "up" : "down",
          icon: DollarSign,
          color: "blue",
          explanation:
            revenueGrowth >= 0
              ? "Bagus! Penjualan naik"
              : "Perlu fokus tingkatkan penjualan",
        },
        {
          title: "🎯 Keuntungan Bersih",
          subtitle: "Sisa uang setelah dikurangi semua pengeluaran",
          value: `Rp ${new Intl.NumberFormat("id-ID").format(currentProfit)}`,
          change: profitGrowth !== 0 ? `${profitGrowth.toFixed(1)}%` : "0%",
          trend: profitGrowth >= 0 ? "up" : "down",
          icon: TrendingUp,
          color: currentProfit >= 0 ? "green" : "red",
          explanation:
            currentProfit >= 0
              ? "Mantap! Bisnis untung"
              : "Perlu kurangi pengeluaran",
        },
        {
          title: "📊 Persentase Untung",
          subtitle: "Berapa persen keuntungan dari setiap penjualan",
          value: `${profitMargin.toFixed(1)}%`,
          change:
            profitMargin >= 15
              ? "Luar Biasa!"
              : profitMargin >= 10
                ? "Bagus"
                : profitMargin >= 5
                  ? "Cukup Baik"
                  : "Perlu Ditingkatkan",
          trend: profitMargin >= 10 ? "up" : "down",
          icon: PiggyBank,
          color:
            profitMargin >= 15
              ? "green"
              : profitMargin >= 10
                ? "green"
                : profitMargin >= 5
                  ? "yellow"
                  : "red",
          explanation:
            profitMargin >= 10
              ? "Margin sehat untuk bisnis"
              : "Warren Buffett bilang: fokus pada efisiensi!",
        },
        {
          title: "💳 Kas Siap Pakai",
          subtitle: "Uang yang bisa langsung digunakan untuk operasional",
          value: `Rp ${new Intl.NumberFormat("id-ID").format(workingCapital)}`,
          change: workingCapital >= 0 ? "Aman" : "Butuh Perhatian",
          trend: workingCapital >= 0 ? "up" : "down",
          icon: AlertTriangle,
          color: workingCapital >= 0 ? "green" : "red",
          explanation:
            workingCapital >= 0
              ? "Cash flow sehat"
              : "Seperti kata Elon Musk: 'Cash is king!'",
        },
      ];

      console.log("Metrics calculated successfully:", metricsArray);
      return metricsArray;
    } catch (error) {
      console.error("Error calculating financial metrics:", error);
      return [];
    }
  };

  // Calculate metrics with error handling
  let metrics;
  try {
    metrics = calculateMetrics();
  } catch (error) {
    console.error("Failed to calculate metrics:", error);
    metrics = [];
  }

  // Ensure metrics is always an array
  if (!metrics || !Array.isArray(metrics)) {
    console.warn("Metrics is not an array, setting to empty array");
    metrics = [];
  }

  console.log("Final metrics before render:", metrics);

  // Show fallback if no metrics
  if (metrics.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          📊 Ringkasan Keuangan Sederhana
        </h2>
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">Belum ada data keuangan untuk ditampilkan</p>
          <p className="text-sm mt-2">
            📝 Isi data keuangan dulu ya, biar SIFIN bisa bantu analisis!
          </p>
        </div>
      </div>
    );
  }

  const getColorClasses = (color) => {
    switch (color) {
      case "green":
        return "from-green-50 to-green-100 border-green-200 hover:shadow-green-100";
      case "blue":
        return "from-blue-50 to-blue-100 border-blue-200 hover:shadow-blue-100";
      case "red":
        return "from-red-50 to-red-100 border-red-200 hover:shadow-red-100";
      case "yellow":
        return "from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-yellow-100";
      default:
        return "from-gray-50 to-gray-100 border-gray-200 hover:shadow-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        📊 Ringkasan Keuangan Sederhana
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {metrics &&
          metrics.length > 0 &&
          metrics.map((metric, index) => {
            if (!metric || !metric.icon) {
              console.warn("Invalid metric at index", index, metric);
              return null;
            }

            const Icon = metric.icon;
            return (
              <div
                key={`metric-${index}`}
                className={`bg-gradient-to-br ${getColorClasses(metric.color)} p-6 rounded-xl border hover:shadow-xl transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Icon className="w-6 h-6 text-gray-600 mr-3" />
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700">
                        {metric.title || "N/A"}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {metric.subtitle}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center ${
                      metric.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {metric.trend === "up" ? (
                      <ArrowUp className="w-5 h-5" />
                    ) : (
                      <ArrowDown className="w-5 h-5" />
                    )}
                    <span className="text-sm ml-1 font-medium">
                      {metric.change || "0%"}
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {metric.value || "Rp 0"}
                </div>
                <p className="text-xs text-gray-600 italic">
                  💡 {metric.explanation}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
