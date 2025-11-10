import React, { useState, useEffect } from "react";
import { Contact } from "./CompleteSignupSteps/ContactManager";
import Step1SelectAccountType from "./CompleteSignupSteps/Step1SelectAccountType";
import BeneficialTrustSteps from "./CompleteSignupSteps/Step2GiveDetails";
import UploadDocumentsStep from "./UploadDocumentsStep";
import { parseJWT } from "../utils/parseTokenId";

interface User {
  email: string;
  username: string;
  given_name: string;
}

const CompleteSignupDialog = ({ isOpen, onClose, startStep }: any) => {
  const [step, setStep] = useState(startStep || 1);
  const [user, setUser] = useState<User | null>(null);
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
    state: "",
    registeredAgent: "",
    stateOfFormation: "",
    stateFilingNumber: "",
    website: "",
    phone: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

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
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3 * 1000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

const handleAccountCreation = async () => {
  try {
    setErrors([]);
    setSuccessMessage("");

    // Validation
    const newErrors: string[] = [];
    if (!formData.accountType) newErrors.push("Account Type is required");
    if (!formData.accountName) newErrors.push("Account Name is required");
    if (!user) newErrors.push("User not found. Please log in again.");
    if (newErrors.length) {
      setErrors(newErrors);
      return;
    }

    // Get token
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    if (!token) throw new Error("Missing access token");

    // API call
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/zoho/create-account`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ accountData: formData, userData: user }),
      }
    );

    const response = await res.json();

    console.log("response from create-account:", response);
    // Handle errors
    if(response.errors?.length) {
      const flattenErrors = (errObj: any): string[] => {
        const messages: string[] = [];
        if (Array.isArray(errObj)) {
          errObj.forEach((e) => messages.push(...flattenErrors(e)));
        } else if (typeof errObj === "object" && errObj !== null) {
          if (errObj.message) messages.push(errObj.message);
          Object.values(errObj).forEach((v) =>
            messages.push(...flattenErrors(v))
          );
        }
        return messages;
      };

      const allErrorMessages = flattenErrors(response.errors);
      setErrors(
        allErrorMessages.length
          ? allErrorMessages
          : ["Failed to create account. Please try again."]
      );
      return;
    }

    // Success: extract data
    const { accountId, workdriveLink, contacts } = response.data;
    console.log("Account ID:", accountId);
    console.log("Workdrive Link:", workdriveLink);
    console.log("Contacts:", contacts);

    // You can update formData or state if needed
    setFormData((prev) => ({
      ...prev,
      workDriveLink: workdriveLink,
    }));

    setSuccessMessage("Account and contacts created successfully!");
    setStep(3); // Move to Upload Step after success
  } catch (err) {
    console.error(err);
    setErrors(["Error creating account. Please try again."]);
  }
};


  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1SelectAccountType
            onNext={() => setStep(2)}
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
      case 3:
        return (
          <UploadDocumentsStep
            onClose={onClose}
            accountName={formData.accountName}
          />
        ); // Pure presentational
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[95vw] max-w-[1500px] h-[85vh] overflow-y-auto p-10 shadow-2xl relative">
        {/* Top right error display */}

        {/* Success message */}
        {successMessage && (
          <div className="absolute top-4 left-8 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-md shadow-md max-w-[400px]">
            {successMessage}
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Complete Signup</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-gray-700 transition"
          >
            &times;
          </button>
        </div>

        {/* Step content */}
        <div className="flex-1">{renderStep()}</div>
        {errors.length > 0 && (
          <div className="absolute top-4 right-8 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-md shadow-md">
            {errors.map((err, i) => (
              <div key={i}>{err}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompleteSignupDialog;
