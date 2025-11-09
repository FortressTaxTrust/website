import React, { useState,useEffect } from "react";
import { Contact } from "./CompleteSignupSteps/ContactManager";
import Step1SelectAccountType from "./CompleteSignupSteps/Step1SelectAccountType";
import BeneficialTrustSteps from "./CompleteSignupSteps/Step2GiveDetails";
import axios from "axios";
import { parseJWT } from "../utils/parseTokenId";

interface User {
  email: string;
  username: string;
  given_name: string;
}

const CompleteSignupDialog = ({ isOpen, onClose }: any) => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const idToken =
      typeof window !== "undefined" ? localStorage.getItem("idToken") : null;
    if (idToken) {
      const payload = parseJWT(idToken);
      setUser({
        email: payload?.email,
        username: payload?.username || payload?.["cognito:username"],
        given_name: payload?.given_name,
      });
    }
  }, []);

  const [formData, setFormData] = useState({
    clientNote: "",
    accountName: "",
    taxId: "",
    clientId: "",
    trustee: "",
    complianceOfficer: "",
    dateCreated: "",
    phone1: "",
    fax: "",
    accountOwner: "",
    trusteeName: "",
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingCountry: "",
    billingCode: "",
    accountType: "",
    connectedContacts: [] as Contact[],
    openCorpPage: "",
    workDriveId: "",
    url2: "",
    workDriveLink: "",
    description: "",
  });

  const [errors, setErrors] = useState<string[]>([]); // <-- Store errors here

  const handleAccountCreation = async () => {
    try {
      setErrors([]); // clear previous errors

      // Example validation before POST
      const newErrors: string[] = [];
      if (!formData.accountType) newErrors.push("Account Type is required");
      if (!formData.accountName) newErrors.push("Account Name is required");
      if (!user) newErrors.push("Something went wrong. Please log in again.");

      if (newErrors.length) {
        setErrors(newErrors);
        return;
      }
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;
      if (!token) throw new Error("Missing token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/zoho/create-account`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ accountData : formData, userData: user }),
        }
      );
      const response = await res.json();

      if (!res.ok || response.errors) {
        throw new Error(response?.errors?.[0]?.title || "Failed to download");
      }

      const data = await response.data;
      alert("Your account has been created successfully!");
      console.log("Account created:", data);
    } catch (err) {
      console.error(err);
      setErrors(["Error creating account. Please try again."]);
    }
  };

  if (!isOpen) return null;

  const handleNext = () => setStep(2);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1SelectAccountType
            onNext={handleNext}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 2:
        return (
          <BeneficialTrustSteps
            onBack={() => setStep(1)}
            formData={formData}
            setFormData={setFormData}
            onFinish={handleAccountCreation}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[95vw] max-w-[1500px] h-[85vh] overflow-y-auto p-10 shadow-2xl relative">
        {/* Top right error display */}
        {errors.length > 0 && (
          <div className="absolute top-4 right-8 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-md shadow-md">
            {errors.map((err, i) => (
              <div key={i}>{err}</div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Complete Signup</h2>
          {/* <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700"
          >
            &times;
          </button> */}
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default CompleteSignupDialog;
