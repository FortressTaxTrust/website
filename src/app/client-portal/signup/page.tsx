"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [step, setStep] = useState<"signup" | "confirm">("signup");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [code, setCode] = useState("");
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
      length: formData.password.length >= 8,
      uppercase: /[A-Z]/.test(formData.password),
      lowercase: /[a-z]/.test(formData.password),
      number: /\d/.test(formData.password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
    });
  }, [formData.password]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
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
        process.env.NEXT_PUBLIC_API_URL + "/auth/signup",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password
        },
        { headers: { "Content-Type": "application/json" } }
      );
      
      if (res.data.status === "success") {
        setSuccess("Account created successfully! Please check your email for verification code.");
        setStep("confirm");
      } else {
        setError("Failed to create account");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to create account"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/confirm-signup",
        {
          username: formData.username,
          code: code
        },
        { headers: { "Content-Type": "application/json" } }
      );
      
      if (res.data.status === "success") {
        setSuccess("Account confirmed successfully! You can now log in.");
        setTimeout(() => {
          router.push("/client-portal");
        }, 2000);
      } else {
        setError("Failed to confirm account");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to confirm account"
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
            {step === "signup" ? "Create Account" : "Verify Email"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {step === "signup" 
              ? "Sign up for your Tax Fortress account"
              : "Enter the verification code sent to your email"
            }
          </p>
        </div>

        {step === "signup" && (
          <form className="mt-8 space-y-6" onSubmit={handleSignup}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Choose a username"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Create a password"
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
                  placeholder="Confirm your password"
                />
              </div>
              {formData.confirmPassword &&
                  formData.password !== formData.confirmPassword && (
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

            <button
              type="submit"
              disabled={loading || !allRequirementsMet}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="text-center">
              <Link 
                href="/client-portal"
                className="text-primary hover:text-primary/80 text-sm font-medium"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        )}

        {step === "confirm" && (
          <form className="mt-8 space-y-6" onSubmit={handleConfirm}>
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
                autoFocus
              />
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
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition"
            >
              {loading ? "Verifying..." : "Verify Account"}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep("signup")}
                className="text-primary hover:text-primary/80 text-sm font-medium"
              >
                Back to Signup
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
