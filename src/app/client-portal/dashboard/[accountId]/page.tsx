"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Breadcrumb, { BreadcrumbItem } from "../../../../components/Breadcrumb";
import FolderView, { FolderItem } from "../../../../components/FolderView";

interface AccountRootProps {
  params: { accountId: string };
}

export default function AccountRoot({ params }: AccountRootProps) {
  const { accountId } = params;
  const router = useRouter();
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchRoot() {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Access token missing. Please login again.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/zoho/accounts-workdrive-folders",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ accountIds: [accountId] }),
          }
        );

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to fetch folders");
        }

        const data = await res.json();
        if (!data.accounts || data.accounts.length === 0) {
          setError("No folders found for this account.");
          setFolders([]);
        } else {
          setFolders(data.accounts);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong while fetching folders.");
        setFolders([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRoot();
  }, [accountId]);

  const handleFolderClick = (item: FolderItem) => {
    if (item.workdriveFolderId) {
      router.push(
        `/client-portal/dashboard/${accountId}/${item.workdriveFolderId}`
      );
    }
  };

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Dashboard", href: "/client-portal/dashboard" },
    { label: `Workdrive`, href: `/client-portal/dashboard/${accountId}` },
  ];

  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse flex flex-col items-start p-4 bg-white rounded-lg shadow hover:shadow-md cursor-pointer"
            >
              {/* Folder Icon */}
              <div className="w-12 h-12 bg-yellow-300 rounded flex items-center justify-center mb-3">
                <svg
                  className="w-6 h-6 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
              </div>

              {/* Folder Name Skeleton */}
              <div className="h-5 w-3/4 bg-gray-300 rounded mb-2"></div>

              {/* Optional Metadata Skeleton */}
              <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="bg-red-100 border border-red-400 text-red-800 px-6 py-4 rounded-lg text-center text-lg font-semibold my-4 shadow-md">
            {error}
          </div>
        </div>
      ) : folders.length === 0 ? (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-6 py-4 rounded-lg text-center text-lg font-semibold shadow-md">
            No files or folders found.
          </div>
        </div>
      ) : (
        <FolderView data={folders.map(folder => ({ ...folder, type: "folder" }))} onFolderClick={handleFolderClick} />
      )
      }
    </div>
  );
}
