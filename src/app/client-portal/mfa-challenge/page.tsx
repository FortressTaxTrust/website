"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";

function storeTokens(tokens: any) {
  if (!tokens) return;
  const { accessToken, idToken, refreshToken, expiresIn } = tokens;
  const expiration = Date.now() + (expiresIn ? expiresIn * 1000 : 3600 * 1000);
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("idToken", idToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("tokenExpiration", expiration.toString());
}

export default function MfaChallengePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session = searchParams.get("session") || "";
  const username = searchParams.get("username") || "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      const response = await fetch(`${API_BASE_URL}/respond-to-mfa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session, code, username }),
      });
      const data = await response.json();
      if (data.status === "success") {
        storeTokens(data.tokens);
        router.push("/client-portal/dashboard");
      } else {
        setError(data.message || "Invalid code. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to verify code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Enter MFA Code
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please enter the 6-digit code from your authenticator app
            </p>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="code" className="sr-only">
                MFA Code
              </label>
              <input
                id="code"
                name="code"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Enter 6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
                autoFocus
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify"}
              </button>
            </div>
            <div className="text-sm text-center">
              <button
                type="button"
                onClick={() => router.push("/client-portal")}
                className="font-medium text-primary hover:text-primary-dark"
              >
                Back to login
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}