"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function NewPassword() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
    givenName: "",
    familyName: ""
  });
  const [session, setSession] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  useEffect(() => {
    const storedSession = sessionStorage.getItem("mfa_session");
    const storedUsername = sessionStorage.getItem("mfa_username");
    
    if (!storedSession || !storedUsername) {
      router.push("/client-portal");
      return;
    }

    setSession(storedSession);
    setUsername(storedUsername);
  }, [router]);

  useEffect(() => {
    // Check password requirements
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

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
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
        process.env.NEXT_PUBLIC_API_URL + "/auth/respond-new-password",
        { 
          session, 
          username, 
          newPassword: formData.newPassword,
          givenName: formData.givenName,
          familyName: formData.familyName
        },
        { headers: { "Content-Type": "application/json" } }
      );
      
      if (res.data.status === "success") {
        // Store tokens and redirect to dashboard
        localStorage.setItem("accessToken", res.data.tokens.accessToken);
        localStorage.setItem("idToken", res.data.tokens.idToken);
        localStorage.setItem("refreshToken", res.data.tokens.refreshToken);
        localStorage.setItem("expiresIn", res.data.tokens.expiresIn);
        sessionStorage.removeItem("mfa_session");
        sessionStorage.removeItem("mfa_username");
        const redirect = sessionStorage.getItem("redirect_after_login");
        if (redirect) {
          sessionStorage.removeItem("redirect_after_login");
          router.push(redirect);
        } else router.push("/client-portal/dashboard");
      } else if (res.data.status === "challenge_required" && res.data.challengeName === "MFA_SETUP") {
        // Password set successfully, now need to setup MFA
        sessionStorage.setItem("mfa_session", res.data.session);
        sessionStorage.setItem("mfa_username", res.data.username);
        router.push("/client-portal/mfa-setup");
      } else {
        setError("Failed to set new password");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to set new password"
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
            Set New Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please set a new password for your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
                Confirm Password
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
              {formData.confirmPassword &&
                  formData.newPassword !== formData.confirmPassword && (
                    <p className="text-red-600 text-sm mt-1">
                      Passwords do not match
                    </p>
                )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="givenName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  id="givenName"
                  name="givenName"
                  type="text"
                  value={formData.givenName}
                  onChange={(e) => setFormData({...formData, givenName: e.target.value})}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label htmlFor="familyName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  id="familyName"
                  name="familyName"
                  type="text"
                  value={formData.familyName}
                  onChange={(e) => setFormData({...formData, familyName: e.target.value})}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Enter your last name"
                />
              </div>
            </div>


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

          <button
            type="submit"
            disabled={loading || !allRequirementsMet}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Setting Password..." : "Set New Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
