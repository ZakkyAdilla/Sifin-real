"use client";
import { useState, useEffect } from "react";
import { useDashboardChat } from "@/hooks/useDashboardChat";
import { useBusinessProfile } from "@/hooks/useBusinessProfile";
import { generatePersonalizedSystemPrompt } from "@/utils/systemPrompts";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { FinancialMetrics } from "@/components/Dashboard/FinancialMetrics";
import { HealthScore } from "@/components/Dashboard/HealthScore";
import { FinancialInputForm } from "@/components/Dashboard/FinancialInputForm";
import { ChatSection } from "@/components/Dashboard/ChatSection/ChatSection";
import { TransactionManager } from "@/components/Dashboard/TransactionManager";
import { MessageCircle, Receipt, BarChart3 } from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("ai-consultant");
  const [financialData, setFinancialData] = useState(null);
  const { businessProfile } = useBusinessProfile();

  const getInitialMessage = () => {
    if (businessProfile) {
      return [
        {
          role: "assistant",
          content: `Halo! 👋 Saya SIFIN AI, konsultan keuangan pribadi untuk ${businessProfile.businessName}! 

Berdasarkan profil bisnis Anda di bidang ${businessProfile.industry}, saya siap membantu dengan basis pengetahuan finance mendalam dari para ahli dunia seperti Warren Buffett, Benjamin Graham, Peter Lynch, dan Elon Musk.

🎯 Yang Bisa Saya Bantu:
📊 Analisis Keuangan Mendalam - Seperti cara Warren Buffett menganalisis laporan keuangan
💰 Strategi Profit Maksimal - Tips dari Peter Lynch tentang growth investing  
🚀 Funding & Investment - Belajar dari strategi Elon Musk membangun Tesla & SpaceX
❤️ Health Check Bisnis - Assessment komprehensif kondisi finansial
💡 Strategi Jangka Panjang - Wisdom dari Benjamin Graham tentang value investing

Mulai dengan mengisi data keuangan di tab Overview, lalu kembali ke sini untuk diskusi strategi yang tepat untuk bisnis Anda! 😊`,
        },
      ];
    }
    return [
      {
        role: "assistant",
        content: `Halo! 👋 Saya SIFIN AI, konsultan keuangan pribadi Anda!

Saya dibekali dengan pengetahuan finance mendalam dari para ahli dunia seperti Warren Buffett, Benjamin Graham, Peter Lynch, Ray Dalio, dan Elon Musk.

🎯 Yang Bisa Saya Bantu:
📊 Analisis Keuangan Mendalam - Seperti cara Warren Buffett menganalisis laporan keuangan
💰 Strategi Profit Maksimal - Tips dari Peter Lynch tentang growth investing  
🚀 Funding & Investment - Belajar dari strategi Elon Musk membangun Tesla & SpaceX
❤️ Health Check Bisnis - Assessment komprehensif kondisi finansial
💡 Strategi Jangka Panjang - Wisdom dari Benjamin Graham tentang value investing

Mulai dengan mengisi data keuangan di tab Overview, lalu kembali ke sini untuk diskusi strategi yang tepat untuk bisnis Anda! 😊`,
      },
    ];
  };

  const {
    messages,
    setMessages,
    currentMessage,
    setCurrentMessage,
    streamingMessage,
    isLoading,
    handleSendMessage,
    handleKeyPress,
  } = useDashboardChat(getInitialMessage(), () =>
    generatePersonalizedSystemPrompt(businessProfile),
  );

  // Update welcome message when business profile is loaded
  useEffect(() => {
    if (businessProfile) {
      setMessages([
        {
          role: "assistant",
          content: `Halo! 👋 Saya SIFIN AI, konsultan keuangan pribadi untuk ${businessProfile.businessName}! 

Berdasarkan profil bisnis Anda di bidang ${businessProfile.industry}, saya siap membantu dengan basis pengetahuan finance mendalam dari para ahli dunia seperti Warren Buffett, Benjamin Graham, Peter Lynch, dan Elon Musk.

🎯 Yang Bisa Saya Bantu:
📊 Analisis Keuangan Mendalam - Seperti cara Warren Buffett menganalisis laporan keuangan
💰 Strategi Profit Maksimal - Tips dari Peter Lynch tentang growth investing  
🚀 Funding & Investment - Belajar dari strategi Elon Musk membangun Tesla & SpaceX
❤️ Health Check Bisnis - Assessment komprehensif kondisi finansial
💡 Strategi Jangka Panjang - Wisdom dari Benjamin Graham tentang value investing

Mulai dengan mengisi data keuangan di tab Overview, lalu kembali ke sini untuk diskusi strategi yang tepat untuk bisnis Anda! 😊`,
        },
      ]);
    }
  }, [businessProfile, setMessages]);

  const handleFinancialDataUpdate = (data) => {
    setFinancialData(data);

    // Auto-send summary to AI when data is complete
    const revenue = parseFloat(data.revenue_month5) || 0;
    const expenses = parseFloat(data.expense_month5) || 0;
    const profit = revenue - expenses;
    const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0;

    if (revenue > 0) {
      const summaryMessage = `Data keuangan telah diupdate! 📊

💰 Ringkasan Bulan Ini:
- Uang Masuk: Rp ${new Intl.NumberFormat("id-ID").format(revenue)}
- Pengeluaran: Rp ${new Intl.NumberFormat("id-ID").format(expenses)}
- Keuntungan Bersih: Rp ${new Intl.NumberFormat("id-ID").format(profit)}
- Persentase Untung: ${profitMargin.toFixed(1)}%

Tolong kasih insight mendalam tentang kondisi keuangan ini dengan referensi dari para ahli finance dan rekomendasi strategis yang actionable untuk bulan depan! 🚀`;

      setCurrentMessage(summaryMessage);
      setActiveTab("ai-consultant"); // Switch to AI tab when sending auto message
    }
  };

  const handleHealthScoreChatMessage = (message) => {
    setCurrentMessage(message);
    setActiveTab("ai-consultant"); // Switch to AI tab when sending health message
  };

  const tabs = [
    {
      id: "ai-consultant",
      label: "AI Konsultan",
      icon: MessageCircle,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "transactions",
      label: "Manajemen Transaksi",
      icon: Receipt,
      color: "from-green-500 to-green-600",
    },
    {
      id: "overview",
      label: "Overview",
      icon: BarChart3,
      color: "from-purple-500 to-purple-600",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "ai-consultant":
        return (
          <div className="w-full">
            {/* AI Chat Section - Full Width */}
            <ChatSection
              messages={messages}
              streamingMessage={streamingMessage}
              isLoading={isLoading}
              currentMessage={currentMessage}
              setCurrentMessage={setCurrentMessage}
              onSend={handleSendMessage}
              onKeyPress={handleKeyPress}
            />
          </div>
        );

      case "transactions":
        return <TransactionManager financialData={financialData} />;

      case "overview":
        return (
          <div className="space-y-8">
            {/* Financial Input Section */}
            <div className="grid lg:grid-cols-1 gap-8">
              <FinancialInputForm
                onDataUpdate={handleFinancialDataUpdate}
                initialData={financialData}
              />
            </div>

            {/* Analytics Section - Only show if we have financial data */}
            {financialData && (
              <div className="space-y-8">
                {/* Metrics & Health Score Row */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <FinancialMetrics financialData={financialData} />
                  <HealthScore
                    financialData={financialData}
                    onChatMessage={handleHealthScoreChatMessage}
                  />
                </div>

                {/* Additional Analytics - You can add trend charts, detailed breakdowns, etc. here */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <BarChart3 className="w-6 h-6 text-[#2196F3] mr-2" />
                    Analisis Mendalam
                  </h3>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Quick Stats */}
                    <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                      <h4 className="font-medium text-blue-800 mb-2">
                        Efisiensi Operasional
                      </h4>
                      <p className="text-2xl font-bold text-blue-600">
                        {financialData.expense_month5 &&
                        financialData.revenue_month5
                          ? (
                              (parseFloat(financialData.expense_month5) /
                                parseFloat(financialData.revenue_month5)) *
                              100
                            ).toFixed(1)
                          : "0"}
                        %
                      </p>
                      <p className="text-sm text-blue-600">
                        Expense to Revenue Ratio
                      </p>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                      <h4 className="font-medium text-green-800 mb-2">
                        Likuiditas
                      </h4>
                      <p className="text-2xl font-bold text-green-600">
                        Rp {formatCurrency(financialData.cash_balance || 0)}
                      </p>
                      <p className="text-sm text-green-600">
                        Saldo Kas Tersedia
                      </p>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
                      <h4 className="font-medium text-purple-800 mb-2">
                        Working Capital
                      </h4>
                      <p className="text-2xl font-bold text-purple-600">
                        Rp{" "}
                        {formatCurrency(
                          parseFloat(financialData.accounts_receivable || 0) +
                            parseFloat(financialData.cash_balance || 0) +
                            parseFloat(financialData.inventory || 0) -
                            parseFloat(financialData.accounts_payable || 0),
                        )}
                      </p>
                      <p className="text-sm text-purple-600">
                        Assets - Liabilities
                      </p>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
                      <h4 className="font-medium text-orange-800 mb-2">
                        Debt Ratio
                      </h4>
                      <p className="text-2xl font-bold text-orange-600">
                        {financialData.bank_loans &&
                        financialData.initial_capital
                          ? (
                              (parseFloat(financialData.bank_loans) /
                                parseFloat(financialData.initial_capital)) *
                              100
                            ).toFixed(1)
                          : "0"}
                        %
                      </p>
                      <p className="text-sm text-orange-600">
                        Loan to Capital Ratio
                      </p>
                    </div>
                  </div>

                  {/* Action Recommendations */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-[#F5F7FA] to-white rounded-xl border border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      💡 Rekomendasi Strategis
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-800">
                          📈 Optimasi Profit:
                        </h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Analisis margin per produk/layanan</li>
                          <li>• Review pricing strategy bulanan</li>
                          <li>• Monitor kompetitor pricing</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-800">
                          💰 Cash Flow Management:
                        </h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Percepat collection piutang</li>
                          <li>• Optimasi payment terms supplier</li>
                          <li>• Maintain 3-6 bulan operating cash</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-blue-800 text-sm">
                        💬 <strong>Pro Tip:</strong> Diskusikan strategi ini
                        lebih detail dengan AI Konsultan di tab sebelah! AI
                        sudah dibekali knowledge dari Warren Buffett, Peter
                        Lynch, dan Ray Dalio.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // Helper function for currency formatting
  const formatCurrency = (value) => {
    if (!value) return "0";
    return new Intl.NumberFormat("id-ID").format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-white">
      <DashboardHeader onUploadClick={() => {}} />

      <div className="max-w-[1600px] mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
}
