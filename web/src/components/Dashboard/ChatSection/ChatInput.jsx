import { Send } from "lucide-react";

export function ChatInput({
  currentMessage,
  setCurrentMessage,
  onSend,
  onKeyPress,
  isLoading,
}) {
  return (
    <div className="p-8 border-t border-gray-100 bg-gradient-to-r from-white to-[#F5F7FA]">
      <div className="flex space-x-4">
        <textarea
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Tanya apa saja tentang keuangan bisnis... SIFIN siap bantu dengan basis ilmu dari para ahli finance dunia! 😊"
          className="flex-1 resize-none border-2 border-gray-300 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent text-lg placeholder:text-gray-500"
          rows="3"
          disabled={isLoading}
        />
        <button
          onClick={onSend}
          disabled={isLoading || !currentMessage.trim()}
          className="bg-gradient-to-r from-[#1E88E5] to-[#0D47A1] text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 font-semibold"
        >
          <Send className="w-6 h-6" />
        </button>
      </div>
      <div className="flex flex-wrap gap-3 mt-6">
        <button
          onClick={() =>
            setCurrentMessage(
              "Gimana caranya analisis cash flow bisnis saya? Tolong jelaskan dengan mudah seperti Warren Buffett menjelaskan ke pemula 😊",
            )
          }
          className="text-sm bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 px-4 py-2 rounded-full hover:from-blue-100 hover:to-blue-200 transition-all duration-300 border border-blue-200 font-medium"
        >
          💰 Analisis Cash Flow ala Warren Buffett
        </button>
        <button
          onClick={() =>
            setCurrentMessage(
              "Bagaimana tips meningkatkan profit seperti yang diajarkan oleh Peter Lynch? Jelaskan dengan contoh sederhana ya!",
            )
          }
          className="text-sm bg-gradient-to-r from-green-50 to-green-100 text-green-700 px-4 py-2 rounded-full hover:from-green-100 hover:to-green-200 transition-all duration-300 border border-green-200 font-medium"
        >
          📈 Tips Profit ala Peter Lynch
        </button>
        <button
          onClick={() =>
            setCurrentMessage(
              "Strategi funding yang smart untuk startup seperti yang dilakukan Elon Musk? Bagaimana cara mempersiapkan diri?",
            )
          }
          className="text-sm bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 px-4 py-2 rounded-full hover:from-purple-100 hover:to-purple-200 transition-all duration-300 border border-purple-200 font-medium"
        >
          🚀 Strategi Funding ala Elon Musk
        </button>
        <button
          onClick={() =>
            setCurrentMessage(
              "Bisa jelasin rumus-rumus finance dasar dengan bahasa yang gampang dimengerti? Seperti Benjamin Graham ngajarin murid-muridnya",
            )
          }
          className="text-sm bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 px-4 py-2 rounded-full hover:from-yellow-100 hover:to-yellow-200 transition-all duration-300 border border-yellow-200 font-medium"
        >
          📚 Belajar Finance Dasar ala Benjamin Graham
        </button>
        <button
          onClick={() =>
            setCurrentMessage(
              "Gimana cara kelola risiko bisnis dengan bijak? Tolong kasih contoh real seperti yang diajarkan Ray Dalio",
            )
          }
          className="text-sm bg-gradient-to-r from-red-50 to-red-100 text-red-700 px-4 py-2 rounded-full hover:from-red-100 hover:to-red-200 transition-all duration-300 border border-red-200 font-medium"
        >
          ⚠️ Kelola Risiko ala Ray Dalio
        </button>
      </div>
      <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-600 font-medium">
          💡 <span className="font-bold">Pro Tip:</span> Semakin spesifik
          pertanyaan Anda, semakin detail jawaban yang bisa SIFIN berikan!
          Contoh: "Bagaimana cara hitung ROI investasi mesin baru untuk cafe
          saya?"
        </p>
      </div>
    </div>
  );
}
