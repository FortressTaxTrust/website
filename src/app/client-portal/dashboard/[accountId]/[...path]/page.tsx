"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Breadcrumb, {
  BreadcrumbItem,
} from "../../../../../components/Breadcrumb";
import FolderView, { FolderItem } from "../../../../../components/FolderView";

interface NestedFolderProps {
  params: {
    accountId: string;
    accountName?: string;
    path: string[];
  };
}

export default function NestedFolder({ params }: NestedFolderProps) {
  const { accountId, accountName, path } = params;
  const router = useRouter();

  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [folderNames, setFolderNames] = useState<BreadcrumbItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const [currentFolder, setCurrentFolder] = useState<{
    id?: string;
    name?: string;
    type?: "folder" | "file";
    link?: string;
  }>();
  const [filteredFolders, setFilteredFolders] = useState<FolderItem[]>([]);


  // for search
  useEffect(() => {
    setSearchLoading(true);
    const timer = setTimeout(() => {
      const results = folders.filter((folder) =>
        folder?.name?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredFolders(results);
      setSearchLoading(false);
    }, 400); 
    return () => clearTimeout(timer);
}, [search]);


// Get folder and breadcrumb
  useEffect(() => {
    async function fetchFolderContents() {
      if (!path || path.length === 0) return;

      setLoading(true);
      setError("");
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("No access token found");
        setLoading(false);
        return;
      }

      const folderId = path[path.length - 1];

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/zoho/workdrive/folder/${folderId}/contents`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error("Failed to fetch folder contents");

        const data = await res.json();

        const folderInfo = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/zoho/workdrive/file/${folderId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!folderInfo.ok) throw new Error("Failed to fetch folder contents");

        const folderInfoData = await folderInfo.json();
        console.log("folderInfoData", folderInfoData);
        const current = {
          id: folderInfoData.fileId,
          name: folderInfoData?.metadata?.attributes.name,
          type: folderInfoData?.metadata?.attributes.type,
          link:
            folderInfoData?.metadata?.attributes.permalink ||
            folderInfoData?.metadata?.attributes?.download_url,
        };
        console.log("current", current);
        setCurrentFolder(current);

        // Map folder/file data for display
        setFolders(
          (data.files || []).map((f: any) => ({
            id: f.id,
            name: f.attributes.name,
            type: f.attributes.type,
            link: f.attributes.permalink || f.attributes.download_url,
          }))
        );

        const crumb = data.breadcrumbData?.[0]?.attributes?.parent_ids || [];

        if (Array.isArray(crumb) && crumb.length > 0) {
          console.log("crumb", crumb);

          let cumulativePath: string[] = [];
          const breadcrumbPath: BreadcrumbItem[] = [
            { label: "Dashboard", href: "/client-portal/dashboard" },
            {
              label: "Workdrive",
              href: `/client-portal/dashboard/${accountId}`,
            },
          ];

          crumb
            .filter(
              (p: any) => p.res_type !== "team" && p.res_type !== "workspace"
            ) // Skip team if you don't want it clickable
            .forEach((p: any) => {
              cumulativePath.push(p.resource_id);
              breadcrumbPath.push({
                label: p.name,
                href: `/client-portal/dashboard/${accountId}/${cumulativePath.join(
                  "/"
                )}`,
              });
            });

          // Add current folder at the end (non-clickable)

          breadcrumbPath.push({ label: current?.name || "Current Folder" });

          console.log("breadcrumbPath", breadcrumbPath);
          setFolderNames(breadcrumbPath);
        }
      } catch (err: any) {
        console.error("Error fetching folder:", err);
        setError(
          err.message || "Something went wrong while fetching folder contents"
        );
        setFolders([]);
      } finally {
        setLoading(false);
      }
    }

    fetchFolderContents();
  }, [path, accountId]);

  const handleFolderClick = (item: FolderItem) => {
    if (item.type === "folder" && item.id) {
      router.push(
        `/client-portal/dashboard/${accountId}/${[...path, item.id].join("/")}`
      );
    } else if (item.type !== "file" && item.link) {
      window.open(item.link, "_blank");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 px-4 sm:px-10 py-6">
      <Breadcrumb items={folderNames} />
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <h2 className="text-xl font-semibold text-gray-900">
          {currentFolder?.name}
        </h2>
        <input
          type="text"
          placeholder="Search folder or a file..."
          className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {loading ||searchLoading ? (
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse flex flex-col items-start p-4 bg-white rounded-lg shadow hover:shadow-md cursor-pointer"
            >
              <div className="w-12 h-12 bg-yellow-300 rounded flex items-center justify-center mb-3">
                <svg
                  className="w-6 h-6 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
              </div>
              <div className="h-5 w-3/4 bg-gray-300 rounded mb-2"></div>
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
      ) : filteredFolders.length > 0 ? (
        <FolderView data={filteredFolders} onFolderClick={handleFolderClick} />
      ) : folders.length > 0 && !search ? (
        <FolderView data={folders} onFolderClick={handleFolderClick} />
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-6 py-4 rounded-lg text-center text-lg font-semibold shadow-md">
            No files or folders found.
          </div>
        </div>
      )}
    </div>
  );
}
