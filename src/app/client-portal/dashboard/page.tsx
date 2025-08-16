"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb, { BreadcrumbItem } from "../../../components/Breadcrumb";

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
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState({ contact: true, accounts: true });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState<{ cognitoUserId?: string }>({});

  const token = localStorage.getItem("accessToken");

  const handleNavigateAccount = (accountName: string, accountId: string) => {
    router.push(`/client-portal/dashboard/${accountId}`);
  };

  useEffect(() => {
    if (!token) return router.replace("/client-portal");

    const idToken = localStorage.getItem("idToken");
    if (idToken) {
      const payload = parseJWT(idToken);
      setUser({
        email: payload?.email,
        username: payload?.["cognito:username"] || payload?.username,
        given_name: payload?.given_name,
      });
    }

    fetchContact(token);
  }, [router]);

  useEffect(() => {
    if (token && contact && userData?.cognitoUserId) {
      fetchLinkedAccounts(token, userData.cognitoUserId);
    }
  }, [contact, userData]);

  const fetchContact = async (accessToken: string) => {
    setLoading((prev) => ({ ...prev, contact: true }));
    setErrorMessage(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/zoho/crm/my-contact`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error("Failed to fetch contact info");

      const data = await res.json();
      setContact(data.contactData || data.data?.[0] || null);
      setUserData(data.userInfo || {});
    } catch (err: any) {
      console.error(err);
      // setErrorMessage(err.message || "Error fetching contact");
      setLoading((prev) => ({ ...prev, accounts: false }));
      setContact(null);
    } finally {
      setLoading((prev) => ({ ...prev, contact: false }));
    }
  };

  const fetchLinkedAccounts = async (accessToken: string, cognitoId: string) => {
    setLoading((prev) => ({ ...prev, accounts: true }));
    setErrorMessage(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/zoho/linked-accounts-by-cognito/${cognitoId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (!res.ok) throw new Error("Failed to fetch linked accounts");

      const data = await res.json();
      setAccounts(data.linkedAccounts || []);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Error fetching accounts");
      setLoading((prev) => ({ ...prev, accounts: false }));
      setAccounts([]);
    } finally {
      setLoading((prev) => ({ ...prev, accounts: false }));
    }
  };

  const filteredAccounts = accounts.filter((acc) =>
    acc.accountName.toLowerCase().includes(search.toLowerCase())
  );

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Dashboard", href: "/client-portal/dashboard" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 px-4 sm:px-10 py-6">
      <Breadcrumb items={breadcrumbItems} />

      {/* Search & Header */}
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <h2 className="text-xl font-semibold text-gray-900">Linked Accounts</h2>
        <input
          type="text"
          placeholder="Search accounts..."
          className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Error Message */}
      {/* {errorMessage && (
        <div className="mb-4 flex justify-center">
          <div className="bg-red-100 border border-red-400 text-red-800 px-6 py-4 rounded-lg text-center font-medium shadow-md">
            {errorMessage}
          </div>
        </div>
      )} */}

      {/* Account Cards / Loading / Empty */}
      <div className="flex-1">
        {loading.accounts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6 animate-pulse">
                <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredAccounts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAccounts.map((acc) => (
              <div
                key={acc.accountId}
                onClick={() => handleNavigateAccount(acc.accountName, acc.accountId)}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer border-l-4 border-primary flex flex-col"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                  {acc.accountName}
                </h3>
                <p className="text-sm text-gray-600 truncate">{acc.accountType}</p>
              </div>
            ))}
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
