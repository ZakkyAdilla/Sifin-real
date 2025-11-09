import { BarChart3, Upload } from "lucide-react";

export function DashboardHeader({ onUploadClick }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-[#1E88E5] to-[#2196F3] rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                SIFIN Dashboard
              </h1>
              <p className="text-gray-600">
                Rapiin keuangan, naikin keuntungan
              </p>
            </div>
          </div>
          <button
            onClick={onUploadClick}
            className="bg-gradient-to-r from-[#1E88E5] to-[#0D47A1] text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <Upload className="w-4 h-4 inline mr-2" />
            Upload Laporan
          </button>
        </div>
      </div>
    </header>
  );
}
