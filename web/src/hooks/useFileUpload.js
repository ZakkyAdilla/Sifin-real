import { useState, useRef } from "react";
import useUpload from "@/utils/useUpload";

export function useFileUpload() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const fileInputRef = useRef(null);
  const [upload, { loading: uploadLoading }] = useUpload();

  const handleFileUpload = async (event, onSuccess) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadStatus("Uploading...");

    try {
      const result = await upload({ file });

      if (result.error) {
        setUploadStatus(`Error: ${result.error}`);
        return;
      }

      setUploadedFile({
        name: file.name,
        url: result.url,
        type: file.type,
        size: file.size,
      });
      setUploadStatus("File berhasil diupload!");

      if (onSuccess) {
        onSuccess(file);
      }
    } catch (error) {
      setUploadStatus(`Error: ${error.message}`);
    }
  };

  return {
    uploadedFile,
    uploadStatus,
    setUploadStatus,
    fileInputRef,
    uploadLoading,
    handleFileUpload,
  };
}
