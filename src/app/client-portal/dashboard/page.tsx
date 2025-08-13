"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function parseJWT(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export default function ClientPortalDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ email?: string; username?: string; given_name?: string } | null>(null);
  const [contact, setContact] = useState<any>(null);
  const [contactLoading, setContactLoading] = useState(true);
  const [contactError, setContactError] = useState("");
  const [accounts, setAccounts] = useState<any[]>([]);
  const [accountsLoading, setAccountsLoading] = useState(true);
  const [accountsError, setAccountsError] = useState("");
  const [workdriveFolders, setWorkdriveFolders] = useState<{ [accountId: string]: any }>({});
  const [workdriveLoading, setWorkdriveLoading] = useState<{ [accountId: string]: boolean }>({});
  const [workdriveError, setWorkdriveError] = useState<{ [accountId: string]: string }>({});
  const [browsedFolders, setBrowsedFolders] = useState<{ [accountId: string]: { folderId: string, path: string[], contents: any[], loading: boolean, error: string } }>({});

  useEffect(() => {
    const token = typeof window !== "undefined" && localStorage.getItem("accessToken");
    if (!token) {
      router.replace("/client-portal");
      return;
    }
    const idToken = typeof window !== "undefined" && localStorage.getItem("idToken");
    if (idToken) {
      const payload = parseJWT(idToken);
      setUser({
        email: payload?.email,
        username: payload?.["cognito:username"] || payload?.username,
        given_name: payload?.given_name,
      });
    }
    fetchContact(token);
    fetchLinkedAccounts(token);
    // eslint-disable-next-line
  }, [router]);

  const fetchContact = async (accessToken: string) => {
    setContactLoading(true);
    setContactError("");
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/zoho/crm/my-contact",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!res.ok) throw new Error((await res.json()).message || "Failed to fetch contact info");
      const data = await res.json();
      setContact(data.contactData || data.data?.[0] || null);
    } catch (err: any) {
      setContactError(err.message || "Failed to fetch contact info");
    } finally {
      setContactLoading(false);
    }
  };

  const fetchLinkedAccounts = async (accessToken: string) => {
    setAccountsLoading(true);
    setAccountsError("");
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/zoho/crm/linked-accounts-by-cognito",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!res.ok) throw new Error((await res.json()).message || "Failed to fetch linked accounts");
      const data = await res.json();
      setAccounts(data.linkedAccounts || []);
    } catch (err: any) {
      setAccountsError(err.message || "Failed to fetch linked accounts");
    } finally {
      setAccountsLoading(false);
    }
  };

  const handleViewWorkdrive = async (accountId: string) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;
    setWorkdriveLoading((prev) => ({ ...prev, [accountId]: true }));
    setWorkdriveError((prev) => ({ ...prev, [accountId]: "" }));
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/zoho/accounts-workdrive-folders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ accountIds: [accountId] }),
        }
      );
      if (!res.ok) throw new Error((await res.json()).message || "Failed to fetch WorkDrive folder");
      const data = await res.json();
      setWorkdriveFolders((prev) => ({ ...prev, [accountId]: data.accounts?.[0] || null }));
    } catch (err: any) {
      setWorkdriveError((prev) => ({ ...prev, [accountId]: err.message || "Failed to fetch WorkDrive folder" }));
    } finally {
      setWorkdriveLoading((prev) => ({ ...prev, [accountId]: false }));
    }
  };

  const handleBrowseFolder = async (accountId: string, folderId: string, path: string[] = []) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken || !folderId) return;
    setBrowsedFolders((prev) => ({
      ...prev,
      [accountId]: { ...prev[accountId], loading: true, error: "" }
    }));
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/zoho/workdrive/folder/${folderId}/contents`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!res.ok) throw new Error((await res.json()).message || "Failed to fetch folder contents");
      const data = await res.json();
      setBrowsedFolders((prev) => ({
        ...prev,
        [accountId]: {
          folderId,
          path,
          contents: data.files || [],
          loading: false,
          error: ""
        }
      }));
    } catch (err: any) {
      setBrowsedFolders((prev) => ({
        ...prev,
        [accountId]: {
          ...prev[accountId],
          loading: false,
          error: err.message || "Failed to fetch folder contents"
        }
      }));
    }
  };

  const handleNavigateFolder = (accountId: string, folderId: string, path: string[]) => {
    handleBrowseFolder(accountId, folderId, path);
  };

  const handleBackFolder = (accountId: string, path: string[]) => {
    if (path.length > 1) {
      // Remove last folder from path and fetch previous
      const newPath = path.slice(0, -1);
      const parentFolderId = browsedFolders[accountId]?.contents.find(
        (item: any) => item.name === newPath[newPath.length - 1] && item.type === "folder"
      )?.id;
      if (parentFolderId) {
        handleBrowseFolder(accountId, parentFolderId, newPath);
      }
    } else {
      setBrowsedFolders((prev) => ({ ...prev, [accountId]: { folderId: '', path: [], contents: [], loading: false, error: '' } }));
    }
  };

  const welcomeName = user?.given_name || user?.username || user?.email;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Contact Info Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          {contactLoading ? (
            <div className="text-center text-gray-500">Loading your info...</div>
          ) : contactError ? (
            <div className="text-center text-red-600">{contactError}</div>
          ) : contact ? (
            <>
              <div className="text-xl font-semibold text-gray-900 mb-2">Your Contact Info</div>
              <div className="mb-1"><span className="font-medium">Name:</span> {contact.Full_Name || contact.Name || welcomeName}</div>
              <div className="mb-1"><span className="font-medium">Email:</span> {contact.Email}</div>
              {contact.Phone && <div className="mb-1"><span className="font-medium">Phone:</span> {contact.Phone}</div>}
              {contact.WorkDrive_Link && (
                <div className="mb-1">
                  <span className="font-medium">WorkDrive:</span> <a href={contact.WorkDrive_Link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Folder</a>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-500">No contact info found.</div>
          )}
        </div>
        {/* Linked Accounts Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <div className="text-xl font-semibold text-gray-900 mb-2">Linked Accounts</div>
          {accountsLoading ? (
            <div className="text-center text-gray-500">Loading linked accounts...</div>
          ) : accountsError ? (
            <div className="text-center text-red-600">{accountsError}</div>
          ) : accounts.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {accounts.map((acc, i) => {
                const folderInfo = workdriveFolders[acc.accountId];
                const browse = browsedFolders[acc.accountId];
                return (
                  <li key={acc.accountId || i} className="py-2">
                    <div className="font-medium text-gray-800">{acc.accountName}</div>
                    <div className="text-sm text-gray-600">
                      {acc.accountType && <span>{acc.accountType}</span>}
                      {acc.industry && <span> &middot; {acc.industry}</span>}
                    </div>
                    <div className="text-sm text-gray-600">
                      {acc.contactName && <span>Contact: {acc.contactName}</span>}
                      {acc.contactEmail && <span> &middot; {acc.contactEmail}</span>}
                      {acc.contactPhone && <span> &middot; {acc.contactPhone}</span>}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleViewWorkdrive(acc.accountId)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                        disabled={workdriveLoading[acc.accountId]}
                      >
                        {workdriveLoading[acc.accountId] ? "Loading..." : "View WorkDrive"}
                      </button>
                      {folderInfo?.workdriveFolderId && (
                        <button
                          onClick={() => handleBrowseFolder(acc.accountId, folderInfo.workdriveFolderId, [acc.accountName])}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                          disabled={browse?.loading}
                        >
                          {browse?.loading ? "Loading..." : "Browse Folder"}
                        </button>
                      )}
                    </div>
                    {workdriveError[acc.accountId] && (
                      <div className="text-xs text-red-600 mt-1">{workdriveError[acc.accountId]}</div>
                    )}
                    {folderInfo && (
                      <div className="mt-2 text-xs bg-gray-100 p-2 rounded">
                        <div><span className="font-medium">Folder Link:</span> {folderInfo.workdriveFolderLink ? <a href={folderInfo.workdriveFolderLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Open</a> : "N/A"}</div>
                        <div><span className="font-medium">Folder ID:</span> {folderInfo.workdriveFolderId || "N/A"}</div>
                      </div>
                    )}
                    {/* WorkDrive Folder Browser */}
                    {browse && (
                      <div className="mt-2 bg-gray-50 border rounded p-2">
                        <div className="mb-2 flex items-center gap-2 text-xs">
                          <span className="font-medium">Path:</span>
                          {(browse.path || []).map((p, idx) => (
                            <span key={idx} className="text-gray-700">{p}{idx < (browse.path?.length || 0) - 1 && <span className="mx-1">/</span>}</span>
                          ))}
                          {browse.path && browse.path.length > 1 && (
                            <button
                              onClick={() => handleBackFolder(acc.accountId, browse.path)}
                              className="ml-2 text-blue-600 underline"
                            >Back</button>
                          )}
                        </div>
                        {browse.loading ? (
                          <div className="text-gray-500">Loading folder contents...</div>
                        ) : browse.error ? (
                          <div className="text-red-600">{browse.error}</div>
                        ) : browse.contents.length > 0 ? (
                          <ul>
                            {browse.contents.map((item: any) => (
                              <li key={item.id} className="flex items-center gap-2 py-1 text-xs">
                                {item.type === "folder" ? (
                                  <button
                                    className="text-green-700 underline"
                                    onClick={() => handleNavigateFolder(acc.accountId, item.id, [...browse.path, item.name])}
                                  >
                                    📁 {item.name}
                                  </button>
                                ) : (
                                  <>
                                    <span>📄 {item.name}</span>
                                    {item.permalink && (
                                      <a href={item.permalink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-2">View</a>
                                    )}
                                    {item.download_url && (
                                      <a href={item.download_url} download className="text-blue-600 underline ml-2">Download</a>
                                    )}
                                  </>
                                )}
                                <span className="ml-auto text-gray-400">{new Date(item.created_time).toLocaleDateString()}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-gray-500">No files or folders found.</div>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="text-center text-gray-500">No linked accounts found.</div>
          )}
        </div>
        {/* Welcome and sign out */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {welcomeName ? `Welcome, ${welcomeName}!` : "Welcome to your Dashboard"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            This is a protected area. You are signed in.
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("idToken");
              localStorage.removeItem("refreshToken");
              localStorage.removeItem("expiresIn");
              router.push("/client-portal");
            }}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
} 