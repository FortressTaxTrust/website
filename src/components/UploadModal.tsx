// components/UploadModal.tsx
import { useState } from "react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File | null, subfolder: string, currentPath: string[]) => void;
  currentPath: string[];
}

export default function UploadModal({ isOpen, onClose, onUpload, currentPath }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [subfolder, setSubfolder] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h3 className="text-lg font-semibold mb-4">Upload File / Subfolder</h3>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Subfolder Name</label>
          <input
            type="text"
            value={subfolder}
            onChange={(e) => setSubfolder(e.target.value)}
            className="w-full border p-2 rounded text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">File</label>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          <button
            onClick={() => onUpload(file, subfolder, currentPath)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
