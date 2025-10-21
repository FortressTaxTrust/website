"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function ForgotPassword() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [step, setStep] = useState<"request" | "confirm">("request");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  // Check password requirements
  useEffect(() => {
    setPasswordRequirements({
      length: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      number: /\d/.test(newPassword),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
    });
  }, [newPassword]);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/forgot-password",
        { username },
        { headers: { "Content-Type": "application/json" } }
      );
      
      if (res.data.status === "success") {
        setSuccess("Verification code sent to your email");
        setStep("confirm");
      } else {
        setError("Failed to send verification code");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to send verification code"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Check if all requirements are met
    if (!Object.values(passwordRequirements).every(Boolean)) {
      setError("Please ensure your password meets all requirements");
      return;
    }

    setLoading(true);
    
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/confirm-forgot-password",
        { username, code, newPassword },
        { headers: { "Content-Type": "application/json" } }
      );
      
      if (res.data.status === "success") {
        setSuccess("Password reset successful! You can now log in with your new password.");
        setTimeout(() => {
          router.push("/client-portal");
        }, 2000);
      } else {
        setError("Failed to reset password");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  const allRequirementsMet = Object.values(passwordRequirements).every(Boolean);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-agencyFB">
            {step === "request" ? "Reset Password" : "Enter Verification Code"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {step === "request" 
              ? "Enter your username to receive a verification code"
              : "Enter the verification code sent to your email and set a new password"
            }
          </p>
        </div>

        {step === "request" && (
          <form className="mt-8 space-y-6" onSubmit={handleRequestReset}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter your username"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition"
            >
              {loading ? "Sending..." : "Send Verification Code"}
            </button>

            <div className="text-center">
              <Link 
                href="/client-portal"
                className="text-primary hover:text-primary/80 text-sm font-medium"
              >
                Back to Login
              </Link>
            </div>
          </form>
        )}

        {step === "confirm" && (
          <form className="mt-8 space-y-6" onSubmit={handleConfirmReset}>
            <div className="space-y-4">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Code
                </label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Enter verification code"
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Confirm new password"
                />
              </div>
              {confirmPassword &&
                  newPassword !== confirmPassword && (
                    <p className="text-red-600 text-sm mt-1">
                      Passwords do not match
                    </p>
                )}
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-semibold text-gray-900 mb-3">Password Requirements:</h4>
              <div className="space-y-2 text-sm">
                <div className={`flex items-center ${passwordRequirements.length ? 'text-green-600' : 'text-gray-500'}`}>
                  <div className={`w-4 h-4 rounded-full mr-2 ${passwordRequirements.length ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  At least 8 characters
                </div>
                <div className={`flex items-center ${passwordRequirements.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                  <div className={`w-4 h-4 rounded-full mr-2 ${passwordRequirements.uppercase ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  One uppercase letter
                </div>
                <div className={`flex items-center ${passwordRequirements.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                  <div className={`w-4 h-4 rounded-full mr-2 ${passwordRequirements.lowercase ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  One lowercase letter
                </div>
                <div className={`flex items-center ${passwordRequirements.number ? 'text-green-600' : 'text-gray-500'}`}>
                  <div className={`w-4 h-4 rounded-full mr-2 ${passwordRequirements.number ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  One number
                </div>
                <div className={`flex items-center ${passwordRequirements.special ? 'text-green-600' : 'text-gray-500'}`}>
                  <div className={`w-4 h-4 rounded-full mr-2 ${passwordRequirements.special ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  One special character
                </div>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-600 text-sm text-center bg-green-50 p-3 rounded-md">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !allRequirementsMet}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep("request")}
                className="text-primary hover:text-primary/80 text-sm font-medium"
              >
                Back to Request Reset
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
