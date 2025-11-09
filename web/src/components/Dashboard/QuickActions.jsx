import { FileText, Heart, DollarSign } from "lucide-react";

export function QuickActions({ onActionClick }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Quick Actions
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={() => onActionClick("analysis")}
          className="p-4 bg-gradient-to-br from-[#F5F7FA] to-white border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 text-left hover:scale-105"
        >
          <FileText className="w-8 h-8 text-[#2196F3] mb-2" />
          <h3 className="font-semibold text-gray-900">Analisis Laporan</h3>
          <p className="text-sm text-gray-600">Upload & analisis otomatis</p>
        </button>
        <button
          onClick={() => onActionClick("health")}
          className="p-4 bg-gradient-to-br from-[#F5F7FA] to-white border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 text-left hover:scale-105"
        >
          <Heart className="w-8 h-8 text-red-500 mb-2" />
          <h3 className="font-semibold text-gray-900">Health Check</h3>
          <p className="text-sm text-gray-600">
            Input angka, dapat skor kesehatan
          </p>
        </button>
        <button
          onClick={() => onActionClick("funding")}
          className="p-4 bg-gradient-to-br from-[#F5F7FA] to-white border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 text-left hover:scale-105"
        >
          <DollarSign className="w-8 h-8 text-[#2196F3] mb-2" />
          <h3 className="font-semibold text-gray-900">Strategi Funding</h3>
          <p className="text-sm text-gray-600">Rencana pendanaan</p>
        </button>
      </div>
    </div>
  );
}
