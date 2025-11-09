import { Bot, Brain, Star } from "lucide-react";

export function ChatHeader() {
  return (
    <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-[#F5F7FA] to-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-[#1E88E5] to-[#2196F3] rounded-full flex items-center justify-center shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              💬 SIFIN AI Konsultan
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              Konsultan keuangan pribadi Anda yang siap 24/7
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-medium text-green-600">
                  Online & Siap Membantu
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
                <span className="text-xs text-gray-500 ml-2">Expert Level</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-600 font-medium">
              💡 Tips Hari Ini
            </p>
            <p className="text-xs text-blue-700 mt-1">
              "Warren Buffett: Investasi yang terbaik adalah investasi pada diri
              sendiri"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
