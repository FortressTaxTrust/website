import React, { useState } from "react";
import { Upload, CheckCircle, ChevronDown, FileUp } from "lucide-react";

interface Account {
  id: string;
  name: string;
}

interface UploadDocumentsStepProps {
  onClose: () => void;
  accounts: Account[];
}

interface FileItem {
  key: string;
  label: string;
  color: string;
  file?: File;
}

const UploadDocumentsStep: React.FC<UploadDocumentsStepProps> = ({
  onClose,
  accounts,
}) => {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
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
  const [uploadedAccounts, setUploadedAccounts] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const resetMessages = () => {
    setError(null);
    setSuccessMessage(null);
    setUploadedFiles([]);
  };

  const handleAccountSelect = (accountId: string) => {
    const selected = accounts.find((a) => a.id === accountId) || null;
    setSelectedAccount(selected);
    setFiles((prev) => prev.map((item) => ({ ...item, file: undefined })));
    resetMessages();
  };

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
      resetMessages();

      if (!selectedAccount)
        throw new Error("Please select an account before uploading files.");

      const formData = new FormData();
      files.forEach(
        (item) =>
          item.file && formData.append("files", item.file, item.file.name)
      );
      formData.append("type", "prospect_documents");
      formData.append("accountName", selectedAccount.name);

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

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to upload files");

      setSuccessMessage(
        `Documents for ${selectedAccount.name} uploaded successfully!`
      );
      setUploadedFiles(files.filter((f) => f.file).map((f) => f.file!.name));
      setUploadedAccounts((prev) => [...prev, selectedAccount.id]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error uploading files. Please try again.");
    }
  };

  return (
    <div className="mt-6 flex flex-col gap-5 max-w-2xl mx-auto ">
      <h3 className="text-xl font-semibold mb-2 text-center text-gray-800">
        Upload Required Documents
      </h3>

      {/* Account Dropdown */}
      <div className="flex flex-col items-center gap-3">
        <label className="text-gray-700 text-sm font-medium">
          Select Account
        </label>
        <div className="relative w-full md:w-3/4">
          <select
            value={selectedAccount?.id || ""}
            onChange={(e) => handleAccountSelect(e.target.value)}
            disabled={accounts.length === 0}
            className="appearance-none border border-gray-300 rounded-lg px-3 py-2 w-full bg-white text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 pr-8"
          >
            <option value="">-- Select an Account --</option>
            {accounts.map((account) => (
              <option
                key={account.id}
                value={account.id}
                disabled={uploadedAccounts.includes(account.id)}
              >
                {account.name}{" "}
                {uploadedAccounts.includes(account.id) ? "(Uploaded)" : ""}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-2.5 text-gray-500 h-4 w-4 pointer-events-none" />
        </div>

        {/* Compact uploaded status list */}
        <div className="mt-2 w-full md:w-3/4 flex flex-wrap gap-2 max-h-32 overflow-y-auto">
          {accounts.map((acc) => (
            <div
              key={acc.id}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm ${
                uploadedAccounts.includes(acc.id)
                  ? "bg-green-50 border-green-300 text-green-700"
                  : "bg-gray-50 border-gray-200 text-gray-500"
              }`}
            >
              <span className="truncate">{acc.name}</span>
              {uploadedAccounts.includes(acc.id) && (
                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedAccount && !uploadedAccounts.includes(selectedAccount.id) && (
        <>
          <p className="text-gray-600 text-center text-sm">
            Please upload required documents for{" "}
            <strong className="text-gray-800">{selectedAccount.name}</strong>
          </p>

          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm text-center">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-2 rounded-md text-sm text-center">
              {successMessage}
            </div>
          )}

          {/* Upload Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {files.map((input) => (
              <label
                key={input.key}
                className="border border-gray-200 rounded-lg p-3 flex flex-col items-start gap-2 bg-gray-50 hover:bg-gray-100 transition cursor-pointer text-sm"
              >
                <div className="flex items-center gap-2">
                  <FileUp className={`h-4 w-4 ${input.color}`} />
                  <span className="font-medium text-gray-700">
                    {input.label}
                  </span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, input.key)}
                />
                {input.file ? (
                  <span className="text-xs text-blue-600 truncate">
                    📄 {input.file.name}
                  </span>
                ) : (
                  <span className="text-xs text-gray-400 italic">
                    No file selected
                  </span>
                )}
              </label>
            ))}
          </div>

          <button
            onClick={handleUploadFiles}
            className="mt-5 self-center bg-blue-600 text-white font-medium px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 transition text-sm"
          >
            <Upload className="inline-block mr-2 h-4 w-4" />
            Upload Files for {selectedAccount.name}
          </button>
        </>
      )}

      {/* Uploaded file list */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4 bg-green-50 border border-green-300 rounded-lg p-3 text-sm">
          <h4 className="text-base font-semibold text-green-700 mb-1">
            Uploaded Documents:
          </h4>
          <ul className="list-disc ml-5 text-green-700 space-y-0.5">
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
