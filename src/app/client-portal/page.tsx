"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ClientPortalLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data.status === "success") {
        // Store tokens
        localStorage.setItem("accessToken", res.data.tokens.accessToken);
        localStorage.setItem("idToken", res.data.tokens.idToken);
        localStorage.setItem("refreshToken", res.data.tokens.refreshToken);
        localStorage.setItem("expiresIn", res.data.tokens.expiresIn);
        router.push("/client-portal/dashboard");
      } else if (res.data.status === "TOTP_MFA_REQUIRED") {
        // Store session and username for MFA
        sessionStorage.setItem("mfa_session", res.data.session);
        sessionStorage.setItem("mfa_username", username);
        router.push("/client-portal/mfa-challenge");
      } else if (res.data.status === "MFA_SETUP_REQUIRED") {
        sessionStorage.setItem("mfa_session", res.data.session);
        sessionStorage.setItem("mfa_username", username);
        router.push("/client-portal/mfa-setup");
      } else {
        setError(res.data.message || "Unknown error");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Login failed. Please try again."
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
            Client Portal Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
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
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 