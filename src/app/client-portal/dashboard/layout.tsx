"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaPhone, FaFolder, FaExternalLinkAlt } from "react-icons/fa";

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

interface ClientPortalLayoutProps {
  children: ReactNode;
}

export default function ClientPortalLayout({ children }: ClientPortalLayoutProps) {
  const router = useRouter();
  const [user, setUser] = useState<{ given_name?: string; username?: string; email?: string } | null>(null);
  const [contact, setContact] = useState<any>(null);
  const [contactLoading, setContactLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  useEffect(() => {
    if (!token) router.replace("/client-portal");

    const idToken = typeof window !== "undefined" ? localStorage.getItem("idToken") : null;
    if (idToken) {
      const payload = parseJWT(idToken);
      setUser({
        email: payload?.email,
        username: payload?.username || payload?.["cognito:username"],
        given_name: payload?.given_name,
      });
    }

    fetchContact(token!);
  }, [router]);

  const fetchContact = async (accessToken: string) => {
    setContactLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/zoho/crm/my-contact`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      setContact(data.contactData || data.data?.[0] || null);
    } catch {
      setContact(null);
    } finally {
      setContactLoading(false);
    }
  };

  const welcomeName = user?.given_name || user?.username || user?.email;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-10 py-6 bg-primary text-white">
        <h1 className="text-2xl font-semibold mb-2 sm:mb-0">
       {welcomeName ? `Welcome, ${welcomeName.charAt(0).toUpperCase() + welcomeName.slice(1)}!` : "Welcome!"}
        </h1>
        <div className="flex space-x-3">
          <button
            onClick={() => router.push("/client-portal/profile")}
            className="px-4 py-2 bg-white text-primary font-medium rounded-md hover:bg-gray-100 transition"
          >
            Profile
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("idToken");
              router.push("/client-portal");
            }}
            className="px-4 py-2 bg-white text-primary font-medium rounded-md hover:bg-gray-100 transition"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white p-4 sm:p-6 shadow flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
        {contactLoading ? (
          <div className="animate-pulse space-y-2 flex-1">
            <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
          </div>
        ) : contact ? (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center flex-1 flex-wrap">
            <p className="flex items-center gap-2 text-gray-900">
              <FaUser className="text-primary" /> {contact.Full_Name || contact.Name || welcomeName}
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <FaEnvelope className="text-primary" /> {contact.Email}
            </p>
            {contact.Phone && (
              <p className="flex items-center gap-2 text-gray-700">
                <FaPhone className="text-primary" /> {contact.Phone}
              </p>
            )}
            {contact.WorkDrive_Link && (
              <p className="flex items-center gap-2 text-gray-700">
                <FaFolder className="text-primary" />{" "}
                <a
                  href={contact.WorkDrive_Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary flex items-center gap-1"
                >
                  WorkDrive <FaExternalLinkAlt className="text-xs" />
                </a>
              </p>
            )}
          </div>
        ) : (
            <div className="flex items-center justify-center w-full">
                <p className="text-gray-500 text-lg font-medium">No contact info found.</p>
            </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-10">{children}</main>
    </div>
  );
}
