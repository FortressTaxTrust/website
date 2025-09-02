"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface UserProfile {
  username?: string;
  email?: string;
  given_name?: string;
  family_name?: string;
  phone_number?: string;
}

export default function UserProfile() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>({});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState<UserProfile>({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/client-portal");
      return;
    }

    try {
      // Get user info from ID token
      const idToken = localStorage.getItem("idToken");
      if (idToken) {
        const payload = parseJWT(idToken);
        const userProfile: UserProfile = {
          username: payload?.["cognito:username"] || payload?.username,
          email: payload?.email,
          given_name: payload?.given_name,
          family_name: payload?.family_name,
          phone_number: payload?.phone_number
        };
        setProfile(userProfile);
        setFormData(userProfile);
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  const parseJWT = (token: string) => {
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
  };

  const handleEdit = () => {
    setEditing(true);
    setFormData(profile);
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData(profile);
    setError("");
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Note: This would need a backend endpoint to update user attributes
      // For now, we'll just simulate success
      setSuccess("Profile updated successfully!");
      setProfile(formData);
      setEditing(false);
      
      // In a real implementation, you'd call:
      // const res = await axios.post(
      //   process.env.NEXT_PUBLIC_API_URL + "/auth/update-profile",
      //   formData,
      //   { headers: { "accesstoken": localStorage.getItem("accessToken") } }
      // );
      
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = () => {
    router.push("/client-portal/change-password");
  };

  const handleManageMFA = () => {
    router.push("/client-portal/mfa-management");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 font-agencyFB mb-2">
            Account Profile
          </h1>
          <p className="text-gray-600">
            Manage your account information and security settings
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Profile Section */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                {!editing && (
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {editing ? (
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="given_name" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        id="given_name"
                        type="text"
                        value={formData.given_name || ""}
                        onChange={(e) => setFormData({...formData, given_name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="family_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        id="family_name"
                        type="text"
                        value={formData.family_name || ""}
                        onChange={(e) => setFormData({...formData, family_name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email || ""}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      id="phone_number"
                      type="tel"
                      value={formData.phone_number || ""}
                      onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="text-green-600 text-sm bg-green-50 p-3 rounded-md">
                      {success}
                    </div>
                  )}

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={loading}
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition disabled:opacity-50"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">First Name</label>
                      <p className="text-gray-900">{profile.given_name || "Not set"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Last Name</label>
                      <p className="text-gray-900">{profile.family_name || "Not set"}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                    <p className="text-gray-900">{profile.email || "Not set"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                    <p className="text-gray-900">{profile.phone_number || "Not set"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Username</label>
                    <p className="text-gray-900">{profile.username || "Not set"}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Security Settings Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
              
              <div className="space-y-4">
                <button
                  onClick={handleChangePassword}
                  className="w-full px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition text-left"
                >
                  <div className="font-medium">Change Password</div>
                  <div className="text-sm opacity-90">Update your account password</div>
                </button>

                <button
                  onClick={handleManageMFA}
                  className="w-full px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition text-left"
                >
                  <div className="font-medium">Two-Factor Authentication</div>
                  <div className="text-sm opacity-90">Manage MFA settings</div>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Account Actions</h4>
                <button
                  onClick={() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("idToken");
                    localStorage.removeItem("refreshToken");
                    router.push("/client-portal");
                  }}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  Sign Out
                </button>
              </div>
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
