"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ChangePassword() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
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

  // Check if user is authenticated
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/client-portal");
      return;
    }
  }, [router]);

  // Check password requirements
  useEffect(() => {
    setPasswordRequirements({
      length: formData.newPassword.length >= 8,
      uppercase: /[A-Z]/.test(formData.newPassword),
      lowercase: /[a-z]/.test(formData.newPassword),
      number: /\d/.test(formData.newPassword),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword)
    });
  }, [formData.newPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    // Check if all requirements are met
    if (!Object.values(passwordRequirements).every(Boolean)) {
      setError("Please ensure your new password meets all requirements");
      return;
    }

    setLoading(true);
    
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("Access token not found. Please log in again.");
        return;
      }

      console.log("Changing password with access token");

      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/change-password",
        {
          accessToken: accessToken,
          previousPassword: formData.currentPassword,
          proposedPassword: formData.newPassword
        },
        { headers: { "Content-Type": "application/json" } }
      );
      
      console.log("Change password response:", res.data);
      
      if (res.data.status === "success") {
        setSuccess("Password changed successfully!");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      } else {
        setError(res.data.message || "Failed to change password");
      }
      
    } catch (err: any) {
      console.error("Change password error:", err.response?.data || err.message);
      
      const errorMessage = err.response?.data?.message || err.response?.data?.error || "Failed to change password";
      
      // Handle specific error cases from backend
      if (err.response?.status === 401) {
        setError("Invalid access token or previous password. Please log in again.");
        setTimeout(() => {
          router.push("/client-portal");
        }, 2000);
      } else if (err.response?.status === 400) {
        if (errorMessage.includes("does not meet requirements")) {
          setError("New password does not meet security requirements. Please check the requirements below.");
        } else if (errorMessage.includes("matches a previous password")) {
          setError("New password must be different from your previous passwords.");
        } else if (errorMessage.includes("Password reset is required")) {
          setError("Password reset is required. Please use the forgot password feature.");
        } else if (errorMessage.includes("Too many requests")) {
          setError("Too many attempts. Please wait a moment and try again.");
        } else {
          setError(errorMessage);
        }
      } else if (err.response?.status === 404) {
        setError("User not found. Please log in again.");
        setTimeout(() => {
          router.push("/client-portal");
        }, 2000);
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const allRequirementsMet = Object.values(passwordRequirements).every(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 font-agencyFB mb-2 text-center">
            Change Password
          </h1>
          <p className="text-gray-600 text-center">
            Update your account password
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                required
                value={formData.currentPassword}
                onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter current password"
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
                value={formData.newPassword}
                onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Confirm new password"
              />
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
              {loading ? "Changing Password..." : "Change Password"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/client-portal/profile")}
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              Back to Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
