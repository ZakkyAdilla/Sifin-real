import { useState, useEffect } from "react";
import {
  Calculator,
  TrendingUp,
  BarChart3,
  PieChart,
  Save,
} from "lucide-react";

export function FinancialInputForm({ onDataUpdate, initialData = null }) {
  const [formData, setFormData] = useState({
    // Pendapatan 5 bulan
    revenue_month1: "",
    revenue_month2: "",
    revenue_month3: "",
    revenue_month4: "",
    revenue_month5: "",

    // Pengeluaran 5 bulan
    expense_month1: "",
    expense_month2: "",
    expense_month3: "",
    expense_month4: "",
    expense_month5: "",

    // Breakdown pengeluaran (bulan terakhir)
    raw_materials: "",
    salary: "",
    operational: "",
    utilities: "",
    transportation: "",
    other_expenses: "",

    // Arus kas
    cash_sales: "",
    credit_sales: "",
    accounts_receivable: "",
    inventory: "",
    cash_balance: "",

    // Kewajiban & Modal
    accounts_payable: "",
    bank_loans: "",
    initial_capital: "",

    // Info bisnis
    employees: "",
    business_age_months: "",
  });

  const [isComplete, setIsComplete] = useState(false);
  const [showForm, setShowForm] = useState(!initialData);

  // Load initial data if provided
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setIsComplete(true);
    }
  }, [initialData]);

  const handleInputChange = (field, value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    const newFormData = {
      ...formData,
      [field]: numericValue,
    };
    setFormData(newFormData);

    // Check if minimum required fields are filled
    const requiredFields = ["revenue_month5", "expense_month5", "cash_balance"];
    const hasRequiredData = requiredFields.every((field) => newFormData[field]);

    if (hasRequiredData) {
      setIsComplete(true);
      if (onDataUpdate) {
        onDataUpdate(newFormData);
      }
    }
  };

  const formatCurrency = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const calculateSummary = () => {
    const currentRevenue = parseFloat(formData.revenue_month5) || 0;
    const currentExpense = parseFloat(formData.expense_month5) || 0;
    const previousRevenue =
      parseFloat(formData.revenue_month4) || currentRevenue;

    const profit = currentRevenue - currentExpense;
    const profitMargin =
      currentRevenue > 0 ? (profit / currentRevenue) * 100 : 0;
    const growth =
      previousRevenue > 0
        ? ((currentRevenue - previousRevenue) / previousRevenue) * 100
        : 0;

    return { profit, profitMargin, growth, currentRevenue, currentExpense };
  };

  const handleSaveAndAnalyze = () => {
    setShowForm(false);
    if (onDataUpdate) {
      onDataUpdate(formData);
    }
  };

  if (!showForm && isComplete) {
    const summary = calculateSummary();
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <BarChart3 className="w-6 h-6 text-[#2196F3] mr-2" />
            Data Keuangan Tersimpan
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="text-sm text-[#2196F3] hover:text-[#1976D2] flex items-center"
          >
            <Calculator className="w-4 h-4 mr-1" />
            Edit Data
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <h3 className="text-sm font-medium text-green-800 mb-1">
              Pendapatan Bulan Ini
            </h3>
            <p className="text-2xl font-bold text-green-600">
              Rp {formatCurrency(summary.currentRevenue)}
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <h3 className="text-sm font-medium text-blue-800 mb-1">
              Profit Margin
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {summary.profitMargin.toFixed(1)}%
            </p>
          </div>
          <div
            className={`${summary.growth >= 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"} border rounded-xl p-4 text-center`}
          >
            <h3
              className={`text-sm font-medium ${summary.growth >= 0 ? "text-green-800" : "text-red-800"} mb-1`}
            >
              Growth Rate
            </h3>
            <p
              className={`text-2xl font-bold ${summary.growth >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {summary.growth >= 0 ? "+" : ""}
              {summary.growth.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="bg-[#F5F7FA] rounded-xl p-4">
          <p className="text-gray-700 text-center">
            ✅ Data keuangan telah tersimpan. Lihat grafik analisis dan health
            score di bawah!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center mb-6">
        <Calculator className="w-6 h-6 text-[#2196F3] mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">
          Input Data Keuangan
        </h2>
      </div>

      <div className="space-y-8">
        {/* Pendapatan & Pengeluaran 5 Bulan */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
            Pendapatan & Pengeluaran (5 Bulan Terakhir)
          </h3>
          <div className="grid md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((month) => (
              <div key={month} className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 text-center">
                  Bulan {month}
                </h4>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Pendapatan
                  </label>
                  <div className="relative">
                    <span className="absolute left-2 top-2 text-gray-500 text-sm">
                      Rp
                    </span>
                    <input
                      type="text"
                      value={formatCurrency(formData[`revenue_month${month}`])}
                      onChange={(e) =>
                        handleInputChange(
                          `revenue_month${month}`,
                          e.target.value,
                        )
                      }
                      placeholder="15.000.000"
                      className="w-full pl-8 pr-2 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Pengeluaran
                  </label>
                  <div className="relative">
                    <span className="absolute left-2 top-2 text-gray-500 text-sm">
                      Rp
                    </span>
                    <input
                      type="text"
                      value={formatCurrency(formData[`expense_month${month}`])}
                      onChange={(e) =>
                        handleInputChange(
                          `expense_month${month}`,
                          e.target.value,
                        )
                      }
                      placeholder="12.000.000"
                      className="w-full pl-8 pr-2 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown Pengeluaran */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <PieChart className="w-5 h-5 text-orange-600 mr-2" />
            Detail Pengeluaran (Bulan Terakhir)
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bahan Baku/Produk
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  type="text"
                  value={formatCurrency(formData.raw_materials)}
                  onChange={(e) =>
                    handleInputChange("raw_materials", e.target.value)
                  }
                  placeholder="8.000.000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gaji Karyawan
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  type="text"
                  value={formatCurrency(formData.salary)}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                  placeholder="3.500.000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biaya Operasional
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  type="text"
                  value={formatCurrency(formData.operational)}
                  onChange={(e) =>
                    handleInputChange("operational", e.target.value)
                  }
                  placeholder="2.800.000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Listrik & Air
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  type="text"
                  value={formatCurrency(formData.utilities)}
                  onChange={(e) =>
                    handleInputChange("utilities", e.target.value)
                  }
                  placeholder="620.000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transportasi
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  type="text"
                  value={formatCurrency(formData.transportation)}
                  onChange={(e) =>
                    handleInputChange("transportation", e.target.value)
                  }
                  placeholder="1.100.000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lain-lain
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  type="text"
                  value={formatCurrency(formData.other_expenses)}
                  onChange={(e) =>
                    handleInputChange("other_expenses", e.target.value)
                  }
                  placeholder="750.000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Arus Kas & Posisi Keuangan */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
            Arus Kas & Posisi Keuangan
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Saldo Kas Saat Ini <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  type="text"
                  value={formatCurrency(formData.cash_balance)}
                  onChange={(e) =>
                    handleInputChange("cash_balance", e.target.value)
                  }
                  placeholder="5.200.000"
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
                  placeholder="3.500.000"
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
                  onChange={(e) =>
                    handleInputChange("inventory", e.target.value)
                  }
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
                  placeholder="2.500.000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pinjaman Bank
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  type="text"
                  value={formatCurrency(formData.bank_loans)}
                  onChange={(e) =>
                    handleInputChange("bank_loans", e.target.value)
                  }
                  placeholder="8.000.000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modal Awal
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  type="text"
                  value={formatCurrency(formData.initial_capital)}
                  onChange={(e) =>
                    handleInputChange("initial_capital", e.target.value)
                  }
                  placeholder="20.000.000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Info Bisnis */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Info Bisnis
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Umur Bisnis (Bulan)
              </label>
              <input
                type="number"
                value={formData.business_age_months}
                onChange={(e) =>
                  handleInputChange("business_age_months", e.target.value)
                }
                placeholder="24"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">
            💡 Tips Mengisi Data:
          </h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>
              • <strong>Minimal isi:</strong> Pendapatan & pengeluaran bulan
              terakhir + saldo kas
            </li>
            <li>
              • <strong>Untuk analisis terbaik:</strong> Isi data 5 bulan
              terakhir
            </li>
            <li>
              • <strong>Format angka:</strong> Masukkan angka biasa (contoh:
              5000000 untuk 5 juta)
            </li>
            <li>
              • <strong>Data akan otomatis:</strong> Generate grafik + analisis
              + health score
            </li>
          </ul>
        </div>

        {/* Save Button */}
        {isComplete && (
          <button
            onClick={handleSaveAndAnalyze}
            className="w-full bg-gradient-to-r from-[#1E88E5] to-[#0D47A1] text-white py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold flex items-center justify-center"
          >
            <Save className="w-5 h-5 mr-2" />
            Simpan Data & Lihat Analisis Lengkap
          </button>
        )}
      </div>
    </div>
  );
}
