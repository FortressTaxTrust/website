"use client";

import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb, { BreadcrumbItem } from "@/components/Breadcrumb";
import UploadModal from "@/components/UploadModal";
import { UploadCloud, ShieldAlert } from "lucide-react";
import CompleteSignupDialog from "@/components/CompleteSignupDialog";
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
  const [user, setUser] = useState<{
    email?: string;
    username?: string;
    given_name?: string;
  } | null>(null);
  const [contact, setContact] = useState<any>(null);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState({ contact: true, accounts: true });
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState<{ cognitoUserId?: string }>({});
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);

  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);
  const handleNavigateAccount = (accountName: string, accountId: string) => {
    router.push(`/client-portal/dashboard/${accountId}`);
  };

  const handleUpload = async (
    files: File[],
    accountId: string,
    payload: Array<{
      filename: string;
      fileType: string;
      selectedFolderPath?: {
        folder_id: string | null;
        parent_id: string | null;
        name: string | null;
      } | null;
      documentType?: string | null;
      analysis?: any | null;
    }>
  ) => {
    if (!files.length || !accountId) return;

    // Clear previous notifications
    setNotification(null);
    // Close the modal and show loading state
    setIsUploadOpen(false);

    try {
      setLoading((prev) => ({ ...prev, accounts: true }));
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      formData.append("accountId", accountId);
      formData.append("payload", JSON.stringify(payload));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/documents/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      setNotification({ type: 'success', message: 'Uploaded successfully!' });
    } catch (err: any) {
      console.error(err);
      setNotification({ type: 'error', message: err.message || 'Error uploading!' });
    } finally {
      setLoading((prev) => ({ ...prev, accounts: false }));
    }
  };
  useEffect(() => {
    const initializeDashboard = async () => {
      if (typeof window === "undefined") return;

      const idToken = localStorage.getItem("idToken");
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        router.replace("/client-portal");
        return;
      }

      setToken(accessToken);

      // 1. Check subscription status first
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/profile`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        const data = await res.json();
        const userData = data.user_data;

        const isSubscribed = userData?.subscription_status === 'active';
        const endDate = userData?.end_date ? new Date(userData.end_date) : null;
        const hasExpired = endDate ? endDate.getTime() < new Date().getTime() : false;

        // Show dialog if the API call fails, subscription is not active, or it has expired.
        if (!res.ok || !isSubscribed || hasExpired) {
          setShowSubscriptionDialog(true);
          return; // Stop further execution if not subscribed
        }
      } catch (error) {
        console.error("Failed to check subscription status:", error);
        // Decide if you want to block the user or not on API failure.
        // For now, we'll let them proceed.
      }

      // 2. If subscribed, proceed to fetch user info and contact details
      if (idToken) {
        const payload = parseJWT(idToken);
        setUser({
          email: payload?.email,
          username: payload?.["cognito:username"] || payload?.username,
          given_name: payload?.given_name,
        });
      }

      fetchContact(accessToken);
    };

    initializeDashboard();
  }, []);

  useEffect(() => {
    if (token && contact && userData?.cognitoUserId) {
      fetchLinkedAccounts(token, userData.cognitoUserId);
    }
  }, [contact, userData, token]);

  useEffect(() => {
    if (token && userData.cognitoUserId) {
      if (isSignupDialogOpen === false) {
        fetchContact(token);
        fetchLinkedAccounts(token, userData.cognitoUserId);
      }
    }
  }, [isSignupDialogOpen]);

  const fetchContact = async (accessToken: string) => {
    setLoading((prev) => ({ ...prev, contact: true }));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/zoho/crm/my-contact`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch contact info");

      const data = await res.json();
      if (data.contactData === null) setIsSignupDialogOpen(true);
      setContact(data.contactData || data.data?.[0] || null);
      setUserData(data.userInfo || {});
    } catch (err) {
      console.error(err);
      setContact(null);
    } finally {
      setLoading((prev) => ({ ...prev, contact: false }));
    }
  };
  const isProspect = contact?.Contact_Type === "Prospect";

  const fetchLinkedAccounts = async (
    accessToken: string,
    cognitoId: string
  ) => {
    setLoading((prev) => ({ ...prev, accounts: true }));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/zoho/linked-accounts-by-cognito/${cognitoId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (!res.ok) throw new Error("Failed to fetch linked accounts");

      const data = await res.json();
      setAccounts(data.linkedAccounts || []);
    } catch (err) {
      console.error(err);
      setAccounts([]);
    } finally {
      setLoading((prev) => ({ ...prev, accounts: false }));
    }
  };

  const filteredAccounts = accounts.filter((acc) =>
    acc.accountName?.toLowerCase().includes(search.toLowerCase())
  );

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Dashboard", href: "/client-portal/dashboard" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 px-4 sm:px-10 py-6">
      <Breadcrumb items={breadcrumbItems} />

      {/* Search & Header */}
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        {showSubscriptionDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 transition-opacity">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 text-yellow-500">
                <ShieldAlert className="h-8 w-8" />
              </div>

              <h3 className="mt-5 text-2xl font-bold text-gray-900">
                Subscription Inactive
              </h3>

              <p className="mt-3 text-base text-gray-600">
                Your access is limited because your subscription is inactive or
                has expired. Please renew to unlock all features.
              </p>

              <button
                onClick={() => router.push("/subscription")}
                className="mt-8 w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-6 py-3 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm transition-colors"
              >
                Manage Subscription
              </button>
            </div>
          </div>
        )}
        {/* Left side: Title */}
        <h2 className="text-xl font-semibold text-gray-900">Linked Accounts</h2>

        {isSignupDialogOpen && (
          <CompleteSignupDialog
            isOpen={isSignupDialogOpen}
            onClose={() => setIsSignupDialogOpen(false)}
          />
        )}

        {/* Right side: Search + Upload */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative group">
            <button
              onClick={() => !isProspect && setIsUploadOpen(true)}
              className={`py-2 px-4 text-sm font-inter font-medium text-white rounded-md bg-[#5A6863] 
                hover:bg-[#535353] transition-colors flex items-center gap-2
                ${isProspect ? "opacity-60 cursor-not-allowed" : ""}`}
              disabled={loading.accounts}
            >
              <UploadCloud className="w-4 h-4" />
              Upload
              {isProspect && (
                <span className="ml-2 text-gray-300 text-sm">🔒</span>
              )}
            </button>

            {isProspect && (
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Access restricted until admin approval
              </span>
            )}
          </div>

          <input
            type="text"
            placeholder="Search accounts..."
            className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <UploadModal
          isOpen={isUploadOpen}
          accountsData={accounts || []}
          onClose={() => setIsUploadOpen(false)}
          onUpload={handleUpload}
        />
      </div>

      {/* Error Message */}
      {notification && (
        <div className="mb-4 flex justify-center">
          <div className={`px-6 py-4 rounded-lg text-center font-medium shadow-md ${
            notification.type === 'success' ? 'bg-green-100 border border-green-400 text-green-800' : 'bg-red-100 border border-red-400 text-red-800'
          }`}>
            {notification.message}
          </div>
        </div>
      )}

      {/* Account Cards / Loading / Empty */}
      <div className="flex-1">
        {loading.accounts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow p-6 animate-pulse"
              >
                <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredAccounts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAccounts.map((acc) => {
              return (
                <div key={acc.accountId} className="relative group">
                  <div
                    onClick={() =>
                      !isProspect &&
                      handleNavigateAccount(acc.accountName, acc.accountId)
                    }
                    className={`bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer border-l-4 border-primary flex flex-col ${
                      isProspect ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate flex items-center justify-between">
                      {acc.accountName}
                      {isProspect && (
                        <span className="ml-2 text-gray-400 text-sm">🔒</span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {acc.accountType}
                    </p>
                  </div>

                  {isProspect && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 w-max bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      Access restricted until admin approval
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[50vh]">
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-6 py-4 rounded-lg text-center text-lg font-semibold shadow-md">
              No Accounts found.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
