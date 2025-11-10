import React, { useState } from "react";
import { Upload } from "lucide-react";

interface UploadDocumentsStepProps {
  onClose: () => void;
  accountName: string;
}

interface FileItem {
  key: string;
  label: string;
  color: string;
  file?: File;
}

const UploadDocumentsStep: React.FC<UploadDocumentsStepProps> = ({
  onClose,
  accountName,
}) => {
  const [files, setFiles] = useState<FileItem[]>([
    {
      key: "driverLicense",
      label: "Driver’s License (Taxpayer & Spouse)",
      color: "text-blue-500",
    },
    {
      key: "priorYearReturns",
      label: "Prior Year Tax Returns (2023, 2022)",
      color: "text-green-500",
    },
    {
      key: "sourceDocs2024",
      label: "Any Source Documents for 2024",
      color: "text-purple-500",
    },
  ]);

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFiles((prev) =>
        prev.map((item) => (item.key === key ? { ...item, file } : item))
      );
    }
  };

  const handleUploadFiles = async () => {
    try {
      setError(null);
      setSuccessMessage(null);

      const formData = new FormData();
      files.forEach((item) => {
        if (item.file) {
          formData.append("files", item.file, item.file.name);
        }
      });
      formData.append("type", "prospect_documents");
      formData.append("accountName", accountName);

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;
      if (!token) throw new Error("Missing access token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/zoho/prospect/upload/files`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to upload files");
      }

      const response = await res.json();
      setSuccessMessage("Files uploaded successfully!");
      setUploadedFiles(
        files.filter((f) => f.file).map((f) => f.file!.name)
      );
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 3000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error uploading files. Please try again.");
    }
  };

  return (
    <div className="mt-6 flex flex-col gap-6 max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold mb-4 text-center">
        Upload Required Documents for {accountName}
      </h3>

      <p className="text-gray-600 text-center">
        Please upload all required documents listed below.
      </p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded-md text-center">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-md text-center">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {files.map((input) => (
          <label
            key={input.key}
            className="border rounded-xl p-4 flex flex-col items-start gap-3 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Upload className={`h-5 w-5 ${input.color}`} />
              <span className="font-medium text-gray-700">{input.label}</span>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e, input.key)}
            />
            {input.file && (
              <span className="text-sm text-gray-500 truncate">
                Selected: {input.file.name}
              </span>
            )}
          </label>
        ))}
      </div>

      <button
        onClick={handleUploadFiles}
        className="mt-6 self-center bg-blue-600 text-white font-medium px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition w-full md:w-auto"
      >
        Upload Files
      </button>

      {uploadedFiles.length > 0 && (
        <div className="mt-6 bg-green-50 border border-green-300 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-green-700 mb-2">
            Uploaded Documents:
          </h4>
          <ul className="list-disc ml-5 text-green-700">
            {uploadedFiles.map((file, idx) => (
              <li key={idx}>{file}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadDocumentsStep;
