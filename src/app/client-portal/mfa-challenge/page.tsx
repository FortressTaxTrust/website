"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function MFAChallenge() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const session = sessionStorage.getItem("mfa_session");
      const username = sessionStorage.getItem("mfa_username");
      if (!session || !username) {
        setError("Session expired. Please log in again.");
        router.push("/client-portal");
        return;
      }
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/respond-to-mfa",
        { session, code, username },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data.status === "success") {
        localStorage.setItem("accessToken", res.data.tokens.accessToken);
        localStorage.setItem("idToken", res.data.tokens.idToken);
        localStorage.setItem("refreshToken", res.data.tokens.refreshToken);
        localStorage.setItem("expiresIn", res.data.tokens.expiresIn);
        sessionStorage.removeItem("mfa_session");
        sessionStorage.removeItem("mfa_username");
        router.push("/client-portal/dashboard");
      } else {
        setError(res.data.message || "Invalid code.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Enter MFA Code
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the 6-digit code from your authenticator app.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              value={code}
              onChange={e => setCode(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-center tracking-widest"
              placeholder="000000"
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm mt-2 text-center">{error}</div>
          )}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 