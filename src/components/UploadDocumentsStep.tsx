"use client";

import React, { useState } from "react";
import { Upload, CheckCircle, ChevronDown, FileUp, X } from "lucide-react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";

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
  files?: File[];
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
      color: "text-gray-500",
      files: [],
    },
    {
      key: "priorYearReturns",
      label: "Prior Year Tax Returns (2023, 2022)",
      color: "text-green-500",
      files: [],
    },
    {
      key: "sourceDocs2024",
      label: "Any Source Documents for 2024",
      color: "text-purple-500",
      files: [],
    },
  ]);

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [uploadedAccounts, setUploadedAccounts] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const resetMessages = () => {
    setError(null);
    setSuccessMessage(null);
    setUploadedFiles([]);
  };

  const handleAccountSelect = (accountId: string) => {
    const selected = accounts.find((a) => a.id === accountId) || null;
    setSelectedAccount(selected);
    setFiles((prev) => prev.map((item) => ({ ...item, files: [] })));
    resetMessages();
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) =>
        prev.map((item) =>
          item.key === key ? { ...item, files: [...(item.files || []), ...newFiles] } : item
        )
      );
    }
  };

  const handleRemoveFile = (key: string, fileIndex: number) => {
    setFiles((prev) =>
      prev.map((item) =>
        item.key === key
          ? { ...item, files: item.files!.filter((_, idx) => idx !== fileIndex) }
          : item
      )
    );
  };

  const handleUploadFiles = async () => {
    try {
      resetMessages();

      if (!selectedAccount) throw new Error("Please select an account before uploading files.");

      const missingFiles = files.filter((f) => !f.files || f.files.length === 0);
      if (missingFiles.length > 0) {
        throw new Error(
          `Please select all required files. Missing: ${missingFiles
            .map((f) => f.label)
            .join(", ")}`
        );
      }
      setLoading(true);
      const formData = new FormData();
      files.forEach((item) =>
        item.files?.forEach((file) => formData.append("files", file, file.name))
      );
      formData.append("type", "prospect_documents");
      formData.append("accountName", selectedAccount.name);

      const token =
        typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
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
      setUploadedFiles(files.flatMap((f) => f.files?.map((file) => file.name) || []));
      setUploadedAccounts((prev) => [...prev, selectedAccount.id]);
      setLoading(false);
      // Clear selected files
      setFiles((prev) => prev.map((item) => ({ ...item, files: [] })));
    } catch (err: any) {
      setLoading(false);
      console.error(err);
      setError(err.message || "Error uploading files. Please try again.");
    }
  };

  return (
    <div className="mt-6 flex flex-col gap-5 max-w-2xl mx-auto ">
      <h3 className="text-xl font-semibold mb-2 text-center text-gray-800">
        Upload Required Documents
      </h3>

      <label className="text-gray-700 text-sm font-medium">Select Account</label>
      <FormControl fullWidth size="small">
        <Select
          value={selectedAccount?.id || ""}
          onChange={(e) => handleAccountSelect(e.target.value)}
          disabled={accounts.length === 0}
          className="bg-white text-gray-700 text-sm"
          sx={{
            fontSize: "0.875rem",
            borderRadius: "0.5rem",
            backgroundColor: "#fff",
          }}
          IconComponent={() => (
            <ChevronDown className="absolute right-2 top-2.5 text-gray-500 h-4 w-4 pointer-events-none" />
          )}
        >
          <MenuItem value="">-- Select an Account --</MenuItem>
          {accounts.map((account) => (
            <MenuItem
              key={account.id}
              value={account.id}
              disabled={uploadedAccounts.includes(account.id)}
            >
              {account.name}{" "}
              {uploadedAccounts.includes(account.id) && (
                <CheckCircle className="mx-2 h-4 w-4 text-green-600 flex-shrink-0" />
              )}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* File Inputs */}
      {selectedAccount && !uploadedAccounts.includes(selectedAccount.id) && (
        <>
          <p className="text-gray-600 text-center text-sm mt-2">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {files.map((input) => (
              <label
                key={input.key}
                className="border border-gray-200 rounded-lg p-3 flex flex-col items-start gap-2 bg-gray-50 hover:bg-gray-100 transition cursor-pointer text-sm"
              >
                <div className="flex items-center gap-2">
                  <FileUp className={`h-4 w-4 ${input.color}`} />
                  <span className="font-medium text-gray-700">{input.label}</span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={(e) => handleFileChange(e, input.key)}
                />
                {input.files && input.files.length > 0 ? (
                  <div className="flex flex-col gap-1 mt-1 w-full">
                    {input.files.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-gray-100 px-2 py-1 rounded text-xs text-gray-700"
                      >
                        <span className="truncate">{file.name}</span>
                        <X
                          className="h-3 w-3 text-red-500 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFile(input.key, idx);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-gray-400 italic mt-1">No file selected</span>
                )}
              </label>
            ))}
          </div>

          <button
            onClick={handleUploadFiles}
            className="mt-5 self-center bg-gray-600 text-white font-medium px-5 py-2.5 rounded-lg shadow hover:bg-gray-700 transition text-sm flex items-center gap-2"
          >
            {loading ? (
              <>
                <CircularProgress size={16} className="inline-block" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="inline-block h-4 w-4" />
                {`Upload Files for ${selectedAccount.name}`}
              </>
            )}
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
