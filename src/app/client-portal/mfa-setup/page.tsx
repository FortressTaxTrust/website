"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function MFASetup() {
  const router = useRouter();
  const [step, setStep] = useState<"qr" | "verify">("qr");
  const [qrCode, setQrCode] = useState<string>("");
  const [secretCode, setSecretCode] = useState<string>("");
  const [session, setSession] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [userCode, setUserCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [setupLoading, setSetupLoading] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const setupAuthenticator = useCallback(async () => {
    if (setupLoading || isSetupComplete) return; // Prevent multiple calls
    
    setSetupLoading(true);
    setError("");
    
    try {
      const storedSession = sessionStorage.getItem("mfa_session");
      const storedUsername = sessionStorage.getItem("mfa_username");
      
      if (!storedSession || !storedUsername) {
        setError("Session expired. Please log in again.");
        router.push("/client-portal");
        return;
      }

      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/setup-authenticator-challenge",
        { session: storedSession, username: storedUsername },
        { headers: { "Content-Type": "application/json" } }
      );
      
      if (res.data.status === "success") {
        setQrCode(res.data.qrCode);
        setSecretCode(res.data.secretCode);
        setSession(res.data.session);
        setIsSetupComplete(true);
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
  }, [setupLoading, isSetupComplete, router]);

  useEffect(() => {
    const storedSession = sessionStorage.getItem("mfa_session");
    const storedUsername = sessionStorage.getItem("mfa_username");
    
    if (!storedSession || !storedUsername) {
      router.push("/client-portal");
      return;
    }

    setSession(storedSession);
    setUsername(storedUsername);
    
    // Start MFA setup process only if not already completed
    if (!isSetupComplete && !setupLoading) {
      setupAuthenticator();
    }
  }, [router, isSetupComplete, setupLoading, setupAuthenticator]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions
    
    setError("");
    setLoading(true);
    
    try {
      const storedSession = sessionStorage.getItem("mfa_session");
      const storedUsername = sessionStorage.getItem("mfa_username");
      
      if (!storedSession || !storedUsername) {
        setError("Session expired. Please log in again.");
        router.push("/client-portal");
        return;
      }

      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/verify-authenticator-challenge",
        { session: storedSession, userCode, username: storedUsername },
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
        router.push("/client-portal/dashboard");
      } else {
        setError("Invalid code. Please try again.");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.response?.data?.error || "Verification failed";
      
      // Handle specific error cases
      if (errorMessage.includes("Invalid session")) {
        setError("Session expired. Please start the login process again.");
        setTimeout(() => {
          router.push("/client-portal");
        }, 2000);
      } else if (errorMessage.includes("Invalid code")) {
        setError("Invalid verification code. Please check your authenticator app and try again.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  if (setupLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Setting up authenticator...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-agencyFB">
            Setup Two-Factor Authentication
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {step === "qr" 
              ? "Scan the QR code with your authenticator app"
              : "Enter the 6-digit code from your authenticator app"
            }
          </p>
        </div>

        {step === "qr" && (
          <div className="space-y-6">
            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}
            
            {/* QR Code */}
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg shadow-md">
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

            <div className="space-y-3">
              <button
                onClick={() => setStep("verify")}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition"
              >
                Continue
              </button>
              
              {error && (
                <button
                  onClick={() => {
                    setError("");
                    setIsSetupComplete(false);
                    setupAuthenticator();
                  }}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition"
                >
                  Retry Setup
                </button>
              )}
            </div>
          </div>
        )}

        {step === "verify" && (
          <form className="mt-8 space-y-6" onSubmit={handleVerify}>
            <div>
              <label htmlFor="code" className="sr-only">
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

            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition"
              >
                {loading ? "Verifying..." : "Verify & Complete Setup"}
              </button>
              
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setStep("qr")}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition"
                >
                  Back to QR Code
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    sessionStorage.removeItem("mfa_session");
                    sessionStorage.removeItem("mfa_username");
                    router.push("/client-portal");
                  }}
                  className="w-full flex justify-center py-2 px-4 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
                >
                  Start Over
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
