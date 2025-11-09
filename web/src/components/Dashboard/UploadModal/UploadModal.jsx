import { X } from "lucide-react";
import { UploadArea } from "./UploadArea";
import { TemplateInfo } from "./TemplateInfo";

export function UploadModal({
  show,
  onClose,
  fileInputRef,
  onFileUpload,
  uploadLoading,
  uploadStatus,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-gray-900">
            Upload Laporan Keuangan
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <UploadArea
            fileInputRef={fileInputRef}
            onFileUpload={onFileUpload}
            uploadLoading={uploadLoading}
            uploadStatus={uploadStatus}
          />
          <TemplateInfo />
        </div>
      </div>
    </div>
  );
}
