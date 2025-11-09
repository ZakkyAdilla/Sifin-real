import { Upload, X, CheckCircle } from "lucide-react";

export function UploadArea({
  fileInputRef,
  onFileUpload,
  uploadLoading,
  uploadStatus,
}) {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#2196F3] transition-colors">
      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h4 className="text-lg font-semibold text-gray-900 mb-2">
        Upload File Laporan Keuangan
      </h4>
      <p className="text-gray-600 mb-4">
        Format yang didukung: CSV, Excel (.xlsx), PDF
      </p>
      <input
        ref={fileInputRef}
        type="file"
        onChange={onFileUpload}
        accept=".csv,.xlsx,.xls,.pdf"
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploadLoading}
        className="bg-gradient-to-r from-[#1E88E5] to-[#0D47A1] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50"
      >
        {uploadLoading ? "Uploading..." : "Pilih File"}
      </button>

      {uploadStatus && (
        <div className="mt-4 flex items-center justify-center">
          {uploadStatus.includes("Error") ? (
            <div className="text-red-600 flex items-center">
              <X className="w-4 h-4 mr-2" />
              {uploadStatus}
            </div>
          ) : uploadStatus.includes("berhasil") ? (
            <div className="text-green-600 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              {uploadStatus}
            </div>
          ) : (
            <div className="text-blue-600">{uploadStatus}</div>
          )}
        </div>
      )}
    </div>
  );
}
