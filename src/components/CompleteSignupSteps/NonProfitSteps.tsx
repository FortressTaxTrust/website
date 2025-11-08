import React, { useState } from "react";

const NonProfitSteps = ({ onBack , accountType}: { onBack: () => void , accountType : string}) => {
  const [step, setStep] = useState(1);
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
    accountType: "Beneficial Trust",
    connectedContacts: "",
    openCorpPage: "",
    workDriveId: "",
    url2: "",
    workDriveLink: "",
    description: "",
  });

  const totalSteps = 6;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const nextStep = () => step < totalSteps && setStep(step + 1);
  const prevStep = () => (step > 1 ? setStep(step - 1) : onBack());

  const stepTitles = [
    "Permanent Client Note",
    "Account Information",
    "Address Information",
    "Account Type",
    "Account Portal Links",
    "Description Information",
  ];

  return (
    <div>
      {/* Step header */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="font-medium text-gray-700">
            Step {step} of {totalSteps}
          </span>
          <span className="text-gray-600">{stepTitles[step - 1]}</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step content */}
      <div className="space-y-6 overflow-y-auto max-h-[60vh] pr-2">
        {step === 1 && (
          <div>
            <label className="block text-sm font-medium mb-1">Client Note</label>
            <input
              name="clientNote"
              value={formData.clientNote}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Enter client note"
            />
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-2 gap-4">
            {["accountName", "taxId", "clientId", "trustee", "complianceOfficer", "dateCreated", "phone1", "fax", "accountOwner", "trusteeName"].map((field) => (
              <input
                key={field}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                placeholder={field.replace(/([A-Z])/g, " $1")}
                className="border rounded-md px-3 py-2 w-full"
              />
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-2 gap-4">
            {["billingStreet", "billingCity", "billingState", "billingCountry", "billingCode"].map((field) => (
              <input
                key={field}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                placeholder={field.replace(/([A-Z])/g, " $1")}
                className="border rounded-md px-3 py-2 w-full"
              />
            ))}
          </div>
        )}

        {step === 4 && (
          <div>
            <label className="block text-sm font-medium mb-1">Account Type</label>
            <input
              name="accountType"
              value={formData.accountType}
              readOnly
              className="w-full border rounded-md px-3 py-2 bg-gray-100"
            />
          </div>
        )}

        {step === 5 && (
          <div className="grid grid-cols-2 gap-4">
            {["connectedContacts", "openCorpPage", "workDriveId", "url2", "workDriveLink"].map((field) => (
              <input
                key={field}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                placeholder={field.replace(/([A-Z])/g, " $1")}
                className="border rounded-md px-3 py-2 w-full"
              />
            ))}
          </div>
        )}

        {step === 6 && (
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Enter description"
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="px-4 py-2 border rounded-md hover:bg-gray-100"
        >
          {step === 1 ? "Back" : "Previous"}
        </button>

        <button
          onClick={nextStep}
          disabled={!formData.clientNote && step === 1}
          className={`px-4 py-2 rounded-md ${
            step === totalSteps
              ? "bg-green-600 hover:bg-green-700"
              : "bg-primary hover:bg-primary-dark"
          } text-white disabled:opacity-50`}
        >
          {step === totalSteps ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default NonProfitSteps;
