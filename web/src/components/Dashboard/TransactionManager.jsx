"use client";
import { useState } from "react";
import {
  Upload,
  FileText,
  CreditCard,
  Receipt,
  DollarSign,
  Calendar,
  Filter,
  Download,
  Plus,
  Send,
  Eye,
  MoreHorizontal,
} from "lucide-react";

export function TransactionManager({ financialData }) {
  const [activeSubTab, setActiveSubTab] = useState("auto-categorization");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const subTabs = [
    {
      id: "auto-categorization",
      label: "Auto Categorization",
      icon: Upload,
    },
    {
      id: "invoice-tracker",
      label: "Invoice & Payment",
      icon: Receipt,
    },
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      // Here you would typically process the file and extract transactions
      // For demo purposes, we'll add some sample transactions
      const sampleTransactions = [
        {
          id: 1,
          date: "2024-11-01",
          description: "Penjualan Produk A",
          amount: 150000,
          type: "income",
          category: "Revenue",
          status: "categorized",
        },
        {
          id: 2,
          date: "2024-11-02",
          description: "Pembelian Bahan Baku",
          amount: -75000,
          type: "expense",
          category: "Cost of Goods",
          status: "categorized",
        },
        {
          id: 3,
          date: "2024-11-03",
          description: "Transfer ke Supplier",
          amount: -200000,
          type: "expense",
          category: "Uncategorized",
          status: "pending",
        },
      ];
      setTransactions(sampleTransactions);
    }
  };

  const renderAutoCategorization = () => (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Upload Mutasi Rekening
          </h3>
          <p className="text-gray-600">
            Upload file CSV, Excel, atau PDF dari bank untuk kategorisasi
            otomatis transaksi
          </p>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <div className="space-y-2">
            <h4 className="text-lg font-medium text-gray-900">
              Drag & drop file atau klik untuk upload
            </h4>
            <p className="text-gray-600">
              Mendukung format: CSV, Excel (.xlsx), PDF
            </p>
            <input
              type="file"
              accept=".csv,.xlsx,.xls,.pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Pilih File</span>
            </label>
          </div>
        </div>

        {uploadedFile && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">
                  {uploadedFile.name}
                </p>
                <p className="text-sm text-green-600">
                  File berhasil diupload dan diproses!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Transactions List */}
      {transactions.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                Hasil Kategorisasi AI
              </h3>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === "income"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <DollarSign className="w-5 h-5" />
                      ) : (
                        <CreditCard className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          transaction.amount > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        Rp{" "}
                        {new Intl.NumberFormat("id-ID").format(
                          Math.abs(transaction.amount),
                        )}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.category}
                      </p>
                    </div>

                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        transaction.status === "categorized"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {transaction.status === "categorized"
                        ? "Terkategorisasi"
                        : "Perlu Review"}
                    </div>

                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderInvoiceTracker = () => (
    <div className="space-y-6">
      {/* Create Invoice Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Buat Invoice Baru
            </h3>
            <p className="text-gray-600">
              Buat faktur digital dan kirim langsung ke pelanggan
            </p>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Buat Invoice</span>
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Draft</h4>
                <p className="text-sm text-gray-500">Belum dikirim</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">3</p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Send className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Terkirim</h4>
                <p className="text-sm text-gray-500">Menunggu pembayaran</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">7</p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Terbayar</h4>
                <p className="text-sm text-gray-500">Lunas</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">12</p>
          </div>
        </div>
      </div>

      {/* Invoice List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              Daftar Invoice
            </h3>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {[
              {
                id: "INV-001",
                customer: "PT. ABC Indonesia",
                amount: 5000000,
                date: "2024-11-01",
                dueDate: "2024-11-15",
                status: "paid",
              },
              {
                id: "INV-002",
                customer: "CV. XYZ Trading",
                amount: 3500000,
                date: "2024-11-03",
                dueDate: "2024-11-17",
                status: "sent",
              },
              {
                id: "INV-003",
                customer: "Toko Serbaguna",
                amount: 1250000,
                date: "2024-11-05",
                dueDate: "2024-11-20",
                status: "draft",
              },
            ].map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Receipt className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{invoice.id}</p>
                    <p className="text-sm text-gray-500">{invoice.customer}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      Rp {new Intl.NumberFormat("id-ID").format(invoice.amount)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Jatuh tempo: {invoice.dueDate}
                    </p>
                  </div>

                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      invoice.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : invoice.status === "sent"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {invoice.status === "paid"
                      ? "Lunas"
                      : invoice.status === "sent"
                        ? "Terkirim"
                        : "Draft"}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Sub-tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                activeSubTab === tab.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sub-tab Content */}
      {activeSubTab === "auto-categorization" && renderAutoCategorization()}
      {activeSubTab === "invoice-tracker" && renderInvoiceTracker()}
    </div>
  );
}
