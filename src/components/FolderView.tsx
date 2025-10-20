import { useState } from "react";
import { FiDownload } from "react-icons/fi";

export interface FolderItem {
  id?: string;
  name?: string;
  type?: "folder" | "file";
  link?: string;
  storage?: {
    size?: string;
    size_in_bytes?: number;
    files_count?: number;
    folders_count?: number;
  };
  accountId?: string;
  workdriveFolderId?: string;
  workdriveFolderLink?: string;
}

interface FolderViewProps {
  data: FolderItem[];
  onFolderClick: (item: FolderItem) => void;
}

export default function FolderView({ data, onFolderClick }: FolderViewProps) {
  const token = localStorage.getItem("accessToken");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 📌 Preview inside iframe
  const handlePreview = async (id?: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!id) return;

    try {
      setError(null); // reset error before new request
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/zoho/workdrive/${id}/preview`,
        { headers: { Authorization: `Bearer ${token}` }, method: "GET" }
      );
      const response = await res.json();

      if (!res.ok || response.errors) {
        throw new Error(response?.errors?.[0]?.title || "Failed to preview");
      }

      setPreviewUrl(response.permalink);
    } catch (err: any) {
      setError(err.message || "Error previewing file");
    }
  };

  // 📌 Download without redirect
  const handleDownload = async (id?: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!id) return;

    try {
      setError(null);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/zoho/workdrive/download/${id}`,
        { headers: { Authorization: `Bearer ${token}` }, method: "GET" }
      );
      const response = await res.json();

      if (!res.ok || response.errors) {
        throw new Error(response?.errors?.[0]?.title || "Failed to download");
      }

      // Create invisible <a> and trigger download
      const link = document.createElement("a");
      link.href = response.downloadUrl;
      link.download = response.filename || "file";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err: any) {
      setError(err.message || "Error downloading file");
    }
  };

  return (
    <div>
      {/* 🔴 Error Banner */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 text-sm underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Folder/File Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {data.map((item, index) => {
          const filesCount = item.storage?.files_count ?? 0;
          const foldersCount = item.storage?.folders_count ?? 0;
          const sizeInBytes = item.storage?.size_in_bytes ?? 0;
          const hasContent = sizeInBytes > 0;
          const borderColor = hasContent ? "border-green-500" : "border-red-500";

          return (
            <div
              key={item.id || index}
              className={`relative bg-white rounded-lg flex-col items-start p-3 sm:p-4 shadow hover:shadow-lg transition cursor-pointer border-l-4 ${borderColor} flex flex-col`}
              onClick={(e) =>
                item.type === "folder"
                  ? onFolderClick(item)
                  : handlePreview(item.id, e)
              }
            >
            {/* Action buttons */}
            {/* Top-right action buttons for files */}
            {/* {item.workdriveFolderLink && (
            <div className="absolute top-2 right-2 flex gap-1 sm:gap-2">
              <button
                className="p-1 sm:p-1.5 bg-gray-100 rounded hover:bg-gray-200"
                title="Preview in Zoho"
                onClick={(e) => handlePreview(item.workdriveFolderLink, e)}
              >
                <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600" />
              </button>
            </div>
          )} */}
            <div className="absolute top-2 right-2 flex gap-1 sm:gap-2">
              {/* Preview button - always visible */}
              {/* <button
              className="p-1 sm:p-1.5 bg-gray-100 rounded hover:bg-gray-200"
              title="Preview in Zoho"
              onClick={(e) => handlePreview(item.workdriveFolderLink ? item.workdriveFolderLink : item.link, e)}
            >
              <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600" />
            </button> */}

              {/* Download button - only if NOT folder */}
              {item.type !== "folder" && (
                <button
                  className="p-1 sm:p-1.5 bg-gray-100 rounded hover:bg-gray-200"
                  title="Download"
                  onClick={(e) => item.id && handleDownload(item.id, e)}
                >
                  <FiDownload className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" />
                </button>
              )}
            </div>

            {/* Icon */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center mb-2 sm:mb-3">
              {item.type === "folder" ? (
                <div className="w-full h-full bg-yellow-300 rounded flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                </div>
              ) : (
                <div className="w-full h-full bg-blue-300 rounded flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6l-6-4H8z" />
                  </svg>
                </div>
              )}
            </div>

              {/* Folder/File Name */}
            <p className="font-bold text-gray-900 mb-0.5 sm:mb-1 truncate w-full text-xs sm:text-sm md:text-base">
              {item.name || "Workdrive"}
            </p>

            {/* Type & Info */}
            {item.type === "folder" ? (
              <p className="text-[10px] sm:text-xs text-gray-600 mt-1">
                {foldersCount} folders • {filesCount} files •{" "}
                {item.storage?.size || "0 byte"}
              </p>
            ) : (
              <p className="text-[10px] sm:text-xs text-gray-600 mt-1">
                File • {item.storage?.size || "Unknown size"}
              </p>
            )}
          </div>
        ); 
        })}
      </div>

      {/* Iframe Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 h-5/6 rounded-xl shadow-lg overflow-hidden relative">
            <button
              className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => setPreviewUrl(null)}
            >
              ✕
            </button>
            <iframe
              src={previewUrl}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
