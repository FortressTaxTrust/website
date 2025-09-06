"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function MFAManagement() {
  const router = useRouter();
  const [step, setStep] = useState<"overview" | "setup" | "verify">("overview");
  const [mfaPreferences, setMfaPreferences] = useState<any>(null);
  const [qrCode, setQrCode] = useState<string>("");
  const [secretCode, setSecretCode] = useState<string>("");
  const [session, setSession] = useState<string>("");
  const [userCode, setUserCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [setupLoading, setSetupLoading] = useState(false);

  useEffect(() => {
    fetchMFAPreferences();
  }, []);

  const fetchMFAPreferences = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/client-portal");
      return;
    }

    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/auth/mfa-preferences",
        { 
          headers: { 
            "Content-Type": "application/json",
            "accesstoken": accessToken
          } 
        }
      );
      
      if (res.data.status === "success") {
        setMfaPreferences(res.data);
      }
    } catch (err: any) {
      console.error("Failed to fetch MFA preferences:", err);
      // If MFA is forced by Cognito, assume it's enabled
      setMfaPreferences({ preferredMfa: 'SOFTWARE_TOKEN_MFA' });
    }
  };

  const handleSetupAuthenticator = async () => {
    setSetupLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/setup-authenticator",
        { accessToken },
        { headers: { "Content-Type": "application/json" } }
      );
      
      if (res.data.status === "success") {
        setQrCode(res.data.qrCode);
        setSecretCode(res.data.secretCode);
        setSession(res.data.session);
        setStep("setup");
      } else {
        setError("Failed to setup authenticator");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to setup authenticator"
      );
    } finally {
      setSetupLoading(false);
    }
  };

  const handleVerifyAuthenticator = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    const accessToken = localStorage.getItem("accessToken");
    
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/verify-authenticator",
        { 
          accessToken, 
          userCode, 
          session 
        },
        { headers: { "Content-Type": "application/json" } }
      );
      
      if (res.data.status === "SUCCESS") {
        setSuccess("Authenticator setup successful!");
        setStep("overview");
        fetchMFAPreferences(); // Refresh preferences
        setUserCode("");
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };


  if (step === "overview") {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 font-agencyFB mb-2">
              Two-Factor Authentication
            </h1>
            <p className="text-gray-600">
              Manage your account security with two-factor authentication
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Current Status</h2>
              <div className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Required
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                Two-factor authentication is required for your account. 
                You'll need to enter a code from your authenticator app when signing in.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={handleSetupAuthenticator}
                  disabled={setupLoading}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition disabled:opacity-50"
                >
                  {setupLoading ? "Setting up..." : "Setup/Reconfigure MFA"}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">How it works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl font-bold">1</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Download App</h4>
                <p className="text-sm text-gray-600">
                  Download an authenticator app like Google Authenticator or Authy
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl font-bold">2</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Scan QR Code</h4>
                <p className="text-sm text-gray-600">
                  Scan the QR code with your authenticator app
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl font-bold">3</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Enter Code</h4>
                <p className="text-sm text-gray-600">
                  Enter the 6-digit code when signing in
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => router.push("/client-portal/dashboard")}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "setup") {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 font-agencyFB mb-2 text-center">
              Setup Authenticator
            </h1>
            <p className="text-gray-600 text-center">
              Scan the QR code with your authenticator app
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            {/* QR Code */}
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg border">
                {qrCode && (
                  <Image
                    src={qrCode}
                    alt="QR Code for authenticator setup"
                    width={200}
                    height={200}
                    className="mx-auto"
                  />
                )}
              </div>
            </div>

            {/* Manual Entry Code */}
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-600 mb-2">Or enter this code manually:</p>
              <div className="flex items-center justify-between">
                <code className="bg-white px-3 py-2 rounded border font-mono text-sm">
                  {secretCode}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(secretCode)}
                  className="ml-2 px-3 py-1 text-xs bg-primary text-white rounded hover:bg-primary/90 transition"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-semibold text-blue-900 mb-2">Instructions:</h4>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Download an authenticator app (Google Authenticator, Authy, etc.)</li>
                <li>2. Scan the QR code or enter the manual code</li>
                <li>3. Click "Continue" when ready</li>
              </ol>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep("verify")}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
              >
                Continue
              </button>
              <button
                onClick={() => setStep("overview")}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "verify") {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 font-agencyFB mb-2 text-center">
              Verify Authenticator
            </h1>
            <p className="text-gray-600 text-center">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleVerifyAuthenticator} className="space-y-6">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                  Authentication Code
                </label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  required
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-center tracking-widest"
                  placeholder="000000"
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

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition"
                >
                  {loading ? "Verifying..." : "Verify & Enable"}
                </button>
                
                <button
                  type="button"
                  onClick={() => setStep("setup")}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
