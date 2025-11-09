import { Download } from "lucide-react";

export function TemplateCard({ title, description, onDownload }) {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <h5 className="font-semibold text-gray-900 mb-2">{title}</h5>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <button
        onClick={onDownload}
        className="text-[#2196F3] hover:text-[#1565C0] flex items-center text-sm font-medium"
      >
        <Download className="w-4 h-4 mr-1" />
        Download Template
      </button>
    </div>
  );
}
