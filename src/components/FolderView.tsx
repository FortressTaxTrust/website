import { FiDownload, FiExternalLink } from "react-icons/fi";

export interface FolderItem {
  id?: string;
  name?: string;
  type?: "folder" | "file";
  link?: string;
  accountId?: string;
  workdriveFolderId?: string;
  workdriveFolderLink?: string;
}

interface FolderViewProps {
  data: FolderItem[];
  onFolderClick: (item: FolderItem) => void;
}

export default function FolderView({ data, onFolderClick }: FolderViewProps) {
  const handlePreview = (link?: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    console.log("Previewing:", link);

    if (link) window.open(link, "_blank");
  };

  const handleDownload = (id?: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (id) {
      const downloadUrl = `https://workdrive.zoho.com/api/v1/download/${id}`;
      window.open(downloadUrl, "_blank");
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
      {data.map((item, index) => (
        <div
          key={item.id || item.accountId || index}
          className="relative flex flex-col items-start p-3 sm:p-4 bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer"
          onClick={() => item.type === "folder" && onFolderClick(item)}
        >
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
            <button
              className="p-1 sm:p-1.5 bg-gray-100 rounded hover:bg-gray-200"
              title="Preview in Zoho"
              onClick={(e) => handlePreview(item.workdriveFolderLink ? item.workdriveFolderLink : item.link, e)}
            >
              <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600" />
            </button>

            {/* Download button - only if NOT folder */}
            {item.type !== "folder" && (
              <button
                className="p-1 sm:p-1.5 bg-gray-100 rounded hover:bg-gray-200"
                title="Download"
                onClick={(e) => handleDownload(item.id, e)}
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
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
              </div>
            ) : (
              <div className="w-full h-full bg-blue-300 rounded flex items-center justify-center">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6l-6-4H8z" />
                </svg>
              </div>
            )}
          </div>

          {/* Name */}
          <p className="font-bold text-gray-900 mb-0.5 sm:mb-1 truncate w-full text-xs sm:text-sm md:text-base">
            {item.name || "Workdrive"}
          </p>

          {/* Type/Info */}
          {item.type && (
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">
              {item.type === "folder" ? "Folder" : "File"}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
