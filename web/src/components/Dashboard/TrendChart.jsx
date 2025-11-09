import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, BarChart3, PieChart as PieChartIcon } from "lucide-react";

export function TrendChart({ financialData = null }) {
  const [activeTab, setActiveTab] = useState("revenue");

  // Process financial data for charts
  const processChartData = () => {
    if (!financialData) {
      // Default sample data if no user data
      return {
        revenueData: [
          {
            month: "Jan",
            pendapatan: 15500000,
            pengeluaran: 13000000,
            profit: 2500000,
          },
          {
            month: "Feb",
            pendapatan: 18300000,
            pengeluaran: 14150000,
            profit: 4150000,
          },
          {
            month: "Mar",
            pendapatan: 17250000,
            pengeluaran: 13430000,
            profit: 3820000,
          },
          {
            month: "Apr",
            pendapatan: 20400000,
            pengeluaran: 15900000,
            profit: 4500000,
          },
          {
            month: "Mei",
            pendapatan: 22600000,
            pengeluaran: 17420000,
            profit: 5180000,
          },
        ],
        cashFlowData: [
          {
            month: "Jan",
            kasmasuk: 14500000,
            kaskeluar: 10500000,
            saldo: 4000000,
          },
          {
            month: "Feb",
            kasmasuk: 22500000,
            kaskeluar: 14000000,
            saldo: 8500000,
          },
          {
            month: "Mar",
            kasmasuk: 15800000,
            kaskeluar: 11800000,
            saldo: 4000000,
          },
          {
            month: "Apr",
            kasmasuk: 19200000,
            kaskeluar: 14000000,
            saldo: 5200000,
          },
          {
            month: "Mei",
            kasmasuk: 21200000,
            kaskeluar: 14700000,
            saldo: 6500000,
          },
        ],
        expenseBreakdown: [
          { name: "Bahan Baku", value: 8800000, color: "#2196F3" },
          { name: "Gaji", value: 3500000, color: "#4CAF50" },
          { name: "Operasional", value: 2800000, color: "#FF9800" },
          { name: "Listrik & Air", value: 620000, color: "#9C27B0" },
          { name: "Transportasi", value: 1100000, color: "#F44336" },
          { name: "Lain-lain", value: 750000, color: "#607D8B" },
        ],
      };
    }

    // Process user's data
    const revenueData = [];
    const cashFlowData = [];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei"];

    for (let i = 1; i <= 5; i++) {
      const revenue = parseFloat(financialData[`revenue_month${i}`]) || 0;
      const expense = parseFloat(financialData[`expense_month${i}`]) || 0;

      if (revenue > 0 || expense > 0) {
        revenueData.push({
          month: monthNames[i - 1],
          pendapatan: revenue,
          pengeluaran: expense,
          profit: revenue - expense,
        });

        cashFlowData.push({
          month: monthNames[i - 1],
          kasmasuk: revenue * 0.85, // Estimate cash inflow
          kaskeluar: expense * 0.9, // Estimate cash outflow
          saldo: revenue * 0.85 - expense * 0.9,
        });
      }
    }

    // Process expense breakdown from user data
    const expenseBreakdown = [];
    const expenses = [
      { key: "raw_materials", name: "Bahan Baku", color: "#2196F3" },
      { key: "salary", name: "Gaji", color: "#4CAF50" },
      { key: "operational", name: "Operasional", color: "#FF9800" },
      { key: "utilities", name: "Listrik & Air", color: "#9C27B0" },
      { key: "transportation", name: "Transportasi", color: "#F44336" },
      { key: "other_expenses", name: "Lain-lain", color: "#607D8B" },
    ];

    expenses.forEach((expense) => {
      const value = parseFloat(financialData[expense.key]) || 0;
      if (value > 0) {
        expenseBreakdown.push({
          name: expense.name,
          value: value,
          color: expense.color,
        });
      }
    });

    return { revenueData, cashFlowData, expenseBreakdown };
  };

  const { revenueData, cashFlowData, expenseBreakdown } = processChartData();

  const formatCurrency = (value) => {
    return `Rp ${(value / 1000000).toFixed(1)}M`;
  };

  const calculateInsights = () => {
    if (revenueData.length < 2) {
      return [
        {
          text: "Pendapatan meningkat 46% dalam 5 bulan terakhir",
          type: "positive",
        },
        {
          text: "Cash flow positif dengan rata-rata saldo Rp 5.6M",
          type: "neutral",
        },
        { text: "Margin profit meningkat dari 16% ke 23%", type: "positive" },
      ];
    }

    const insights = [];
    const firstMonth = revenueData[0];
    const lastMonth = revenueData[revenueData.length - 1];

    // Revenue growth
    const revenueGrowth =
      ((lastMonth.pendapatan - firstMonth.pendapatan) / firstMonth.pendapatan) *
      100;
    if (revenueGrowth > 0) {
      insights.push({
        text: `Pendapatan meningkat ${revenueGrowth.toFixed(1)}% dalam ${revenueData.length} bulan`,
        type: "positive",
      });
    } else {
      insights.push({
        text: `Pendapatan turun ${Math.abs(revenueGrowth).toFixed(1)}% dalam ${revenueData.length} bulan`,
        type: "negative",
      });
    }

    // Cash flow
    const avgCashFlow =
      cashFlowData.reduce((sum, month) => sum + month.saldo, 0) /
      cashFlowData.length;
    if (avgCashFlow > 0) {
      insights.push({
        text: `Cash flow positif rata-rata ${formatCurrency(avgCashFlow)}`,
        type: "positive",
      });
    } else {
      insights.push({
        text: `Cash flow negatif rata-rata ${formatCurrency(Math.abs(avgCashFlow))}`,
        type: "negative",
      });
    }

    // Profit margin
    const firstMargin = (firstMonth.profit / firstMonth.pendapatan) * 100;
    const lastMargin = (lastMonth.profit / lastMonth.pendapatan) * 100;
    if (lastMargin > firstMargin) {
      insights.push({
        text: `Margin profit meningkat dari ${firstMargin.toFixed(1)}% ke ${lastMargin.toFixed(1)}%`,
        type: "positive",
      });
    } else {
      insights.push({
        text: `Margin profit saat ini ${lastMargin.toFixed(1)}%`,
        type: "neutral",
      });
    }

    return insights;
  };

  const insights = calculateInsights();

  // Show empty state if no data
  if (!revenueData.length && financialData) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Analisis Keuangan
        </h2>
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Data Belum Lengkap
          </h3>
          <p className="text-gray-600">
            Lengkapi data pendapatan dan pengeluaran untuk melihat grafik
            analisis
          </p>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`Bulan: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{payload[0].name}</p>
          <p className="text-sm text-gray-600">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (activeTab) {
      case "revenue":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={revenueData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="pendapatan"
                stroke="#2196F3"
                strokeWidth={3}
                dot={{ fill: "#2196F3", strokeWidth: 2, r: 4 }}
                name="Pendapatan"
              />
              <Line
                type="monotone"
                dataKey="pengeluaran"
                stroke="#FF5722"
                strokeWidth={3}
                dot={{ fill: "#FF5722", strokeWidth: 2, r: 4 }}
                name="Pengeluaran"
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#4CAF50"
                strokeWidth={3}
                dot={{ fill: "#4CAF50", strokeWidth: 2, r: 4 }}
                name="Profit"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "cashflow":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={cashFlowData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="kasmasuk"
                fill="#4CAF50"
                name="Kas Masuk"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="kaskeluar"
                fill="#FF5722"
                name="Kas Keluar"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case "expenses":
        if (expenseBreakdown.length === 0) {
          return (
            <div className="h-250 flex items-center justify-center">
              <div className="text-center">
                <PieChartIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">
                  Isi detail pengeluaran untuk melihat breakdown
                </p>
              </div>
            </div>
          );
        }
        return (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={expenseBreakdown}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {expenseBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Analisis Keuangan {financialData ? "(Data Real)" : "(Contoh)"}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("revenue")}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              activeTab === "revenue"
                ? "bg-[#2196F3] text-white"
                : "border border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
          >
            Pendapatan
          </button>
          <button
            onClick={() => setActiveTab("cashflow")}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              activeTab === "cashflow"
                ? "bg-[#2196F3] text-white"
                : "border border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
          >
            Arus Kas
          </button>
          <button
            onClick={() => setActiveTab("expenses")}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              activeTab === "expenses"
                ? "bg-[#2196F3] text-white"
                : "border border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
          >
            Pengeluaran
          </button>
        </div>
      </div>

      <div className="h-64">{renderChart()}</div>

      {/* Chart Insights */}
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 ${
              insight.type === "positive"
                ? "bg-green-50 border-green-200"
                : insight.type === "negative"
                  ? "bg-red-50 border-red-200"
                  : "bg-blue-50 border-blue-200"
            }`}
          >
            <p
              className={`text-sm font-medium ${
                insight.type === "positive"
                  ? "text-green-800"
                  : insight.type === "negative"
                    ? "text-red-800"
                    : "text-blue-800"
              }`}
            >
              {insight.type === "positive"
                ? "Trend Positif"
                : insight.type === "negative"
                  ? "Perhatian"
                  : "Info"}
            </p>
            <p
              className={`text-xs mt-1 ${
                insight.type === "positive"
                  ? "text-green-600"
                  : insight.type === "negative"
                    ? "text-red-600"
                    : "text-blue-600"
              }`}
            >
              {insight.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
