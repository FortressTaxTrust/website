import React, { useState } from "react";
import { Contact } from "./ContactManager";

const accountTypes = [
  "-None-",
  "Beneficial Trust",
  "Business Trust",
  "C-Corporation",
  "Firm Account",
  "Individual",
  "Non-Profit",
  "Partnership",
  "S-Corporation",
];

interface FormDataStep1 {
  clientNote: string;
  accountName: string;
  taxId: string;
  clientId: string;
  trustee: string;
  complianceOfficer: string;
  dateCreated: string;
  phone1: string;
  fax: string;
  accountOwner: string;
  trusteeName: string;
  billingStreet: string;
  billingCity: string;
  billingState: string;
  billingCountry: string;
  billingCode: string;
  accountType: string;
  connectedContacts: Contact[];
  openCorpPage: string;
  workDriveId: string;
  url2: string;
  workDriveLink: string;
  description: string;
}

interface Step1Props {
  formData: FormDataStep1;
  setFormData: React.Dispatch<React.SetStateAction<FormDataStep1>>;
  onNext: () => void;
}

const Step1SelectAccountType: React.FC<Step1Props> = ({
  formData,
  setFormData,
  onNext,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleContinue = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.accountName.trim()) {
      newErrors.accountName = "Account Name cannot be empty.";
    }
    if (formData.accountType === "-None-") {
      newErrors.accountType = "Select an Account Type to proceed.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext(); // Only proceed if no errors
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800">Account Information</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Account Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Name
          </label>
          <input
            type="text"
            placeholder="Enter account name"
            value={formData.accountName}
            onChange={(e) =>
              setFormData((s) => ({ ...s, accountName: e.target.value }))
            }
            className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none ${
              errors.accountName ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.accountName && (
            <p className="text-xs text-red-500 mt-1">{errors.accountName}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone 1
          </label>
          <input
            type="text"
            placeholder="Enter phone number"
            value={formData.phone1}
            onChange={(e) =>
              setFormData((s) => ({ ...s, phone1: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Account Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Account Type
        </label>
        <select
          value={formData.accountType}
          onChange={(e) =>
            setFormData((s) => ({ ...s, accountType: e.target.value }))
          }
          className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none ${
            errors.accountType ? "border-red-400" : "border-gray-300"
          }`}
        >
          {accountTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.accountType && (
          <p className="text-xs text-red-500 mt-1">{errors.accountType}</p>
        )}
      </div>

      {/* Continue button */}
      <div className="flex justify-end">
        <button
          onClick={handleContinue}
          className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Step1SelectAccountType;
