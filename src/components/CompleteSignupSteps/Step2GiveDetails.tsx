"use client";

import type React from "react";
import { useState, useEffect } from "react";

const accountTypes = [
  "Beneficial Trust",
  "Business Trust",
  "C-Corporation",
  "FIRM ACCOUNT",
  "Individual",
  "Non-Profit",
  "Partnership",
  "S-Corporation",
];

export interface FormData {
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
  connectedContacts: any[];
  openCorpPage: string;
  workDriveId: string;
  url2: string;
  workDriveLink: string;
  description: string;
  state: string;
  registeredAgent: string;
  stateOfFormation: string;
  stateFilingNumber: string;
  website: string;
  phone: string;
}

const stepTitles: Record<string, string[]> = {
  "C-Corporation": [
    "Account Information",
    "Address Information",
    "Description",
  ],
  Individual: ["Account Information", "Address Information", "Description"],
  Partnership: ["Account Information", "Address Information", "Description"],
  "FIRM ACCOUNT": ["Account Information", "Address Information", "Description"],
  "S-Corporation": [
    "Account Information",
    "Address Information",
    "Description",
  ],
  "Non-Profit": ["Account Information"],
  "Beneficial Trust": [
    "Account Information",
    "Address Information",
    "Description",
  ],
  "Business Trust": [
    "Account Information",
    "Address Information",
    "Description",
  ],
};

type FieldConfig = { name: keyof FormData; label: string; required?: boolean };
type StepConfig = Record<number, FieldConfig[]>;

const accountTypeStepConfig: Record<string, StepConfig> = {
  "Beneficial Trust": {
    1: [
      { name: "accountName", label: "Account Name", required: true },
      { name: "taxId", label: "Tax ID", required: true },
      { name: "clientId", label: "Client ID", required: true },
      { name: "trustee", label: "Trustee" },
      { name: "complianceOfficer", label: "Compliance Officer" },
      { name: "dateCreated", label: "Date Created" },
      { name: "fax", label: "Fax" },
      { name: "phone1", label: "Phone #1" },
    ],
    2: [
      { name: "billingStreet", label: "Billing Street", required: true },
      { name: "billingCity", label: "Billing City", required: true },
      { name: "billingState", label: "Billing State", required: true },
      { name: "billingCountry", label: "Billing Country", required: true },
      { name: "billingCode", label: "Billing Code" },
    ],
    3: [{ name: "description", label: "Description", required: true }],
  },
  // ... existing code for other types ...
  "Business Trust": {
    1: [
      { name: "accountName", label: "Account Name", required: true },
      { name: "taxId", label: "Tax ID", required: true },
      { name: "clientId", label: "Client ID", required: true },
      { name: "trustee", label: "Trustee" },
      { name: "complianceOfficer", label: "Compliance Officer" },
      { name: "dateCreated", label: "Date Created" },
      { name: "fax", label: "Fax" },
      { name: "phone1", label: "Phone #1" },
    ],
    2: [
      { name: "billingStreet", label: "Billing Street", required: true },
      { name: "billingCity", label: "Billing City", required: true },
      { name: "billingState", label: "Billing State", required: true },
      { name: "billingCountry", label: "Billing Country", required: true },
      { name: "billingCode", label: "Billing Code" },
    ],
    3: [{ name: "description", label: "Description", required: true }],
  },
  "C-Corporation": {
    1: [
      { name: "accountName", label: "Account Name", required: true },
      { name: "state", label: "State", required: true },
      { name: "taxId", label: "Tax ID", required: true },
      { name: "clientId", label: "Client ID", required: true },
      { name: "dateCreated", label: "Date Created" },
      { name: "registeredAgent", label: "Registered Agent" },
      { name: "stateOfFormation", label: "State Of Formation" },
      { name: "phone1", label: "Phone #1" },
      { name: "stateFilingNumber", label: "State Filing Number(s)" },
      { name: "website", label: "Website" },
    ],
    2: [
      { name: "billingStreet", label: "Billing Street", required: true },
      { name: "billingCity", label: "Billing City", required: true },
      { name: "billingState", label: "Billing State", required: true },
      { name: "billingCountry", label: "Billing Country", required: true },
      { name: "billingCode", label: "Billing Code" },
    ],
    3: [{ name: "description", label: "Description", required: true }],
  },
  Individual: {
    1: [
      { name: "accountName", label: "Account Name", required: true },
      { name: "taxId", label: "Tax ID", required: true },
      { name: "clientId", label: "Client ID", required: true },
      { name: "phone1", label: "Phone #1" },
    ],
    2: [
      { name: "billingStreet", label: "Billing Street", required: true },
      { name: "billingCity", label: "Billing City", required: true },
      { name: "billingState", label: "Billing State", required: true },
      { name: "billingCode", label: "Billing Code" },
    ],
    3: [{ name: "description", label: "Description", required: true }],
  },
  "Non-Profit": {
    1: [
      { name: "accountName", label: "Account Name", required: true },
      { name: "phone1", label: "Phone #1" },
    ],
  },
  "FIRM ACCOUNT": {
    1: [
      { name: "accountName", label: "Account Name", required: true },
      { name: "clientId", label: "Client ID", required: true },
      { name: "dateCreated", label: "Date Created" },
      { name: "complianceOfficer", label: "Compliance Officer" },
      { name: "registeredAgent", label: "Registered Agent" },
      { name: "phone", label: "Phone" },
      { name: "phone1", label: "Phone #1" },
    ],
    2: [
      { name: "billingStreet", label: "Billing Street", required: true },
      { name: "billingCity", label: "Billing City", required: true },
      { name: "billingState", label: "Billing State", required: true },
      { name: "billingCountry", label: "Billing Country", required: true },
      { name: "billingCode", label: "Billing Code" },
    ],
    3: [{ name: "description", label: "Description", required: true }],
  },
  Partnership: {
    1: [
      { name: "accountName", label: "Account Name", required: true },
      { name: "state", label: "State", required: true },
      { name: "taxId", label: "Tax ID", required: true },
      { name: "clientId", label: "Client ID", required: true },
      { name: "dateCreated", label: "Date Created" },
      { name: "registeredAgent", label: "Registered Agent" },
      { name: "stateOfFormation", label: "State Of Formation" },
      { name: "phone1", label: "Phone #1" },
      { name: "stateFilingNumber", label: "State Filing Number(s)" },
      { name: "website", label: "Website" },
    ],
    2: [
      { name: "billingStreet", label: "Billing Street", required: true },
      { name: "billingCity", label: "Billing City", required: true },
      { name: "billingState", label: "Billing State", required: true },
      { name: "billingCountry", label: "Billing Country", required: true },
      { name: "billingCode", label: "Billing Code" },
    ],
    3: [{ name: "description", label: "Description", required: true }],
  },
  "S-Corporation": {
    1: [
      { name: "accountName", label: "Account Name", required: true },
      { name: "state", label: "State", required: true },
      { name: "taxId", label: "Tax ID", required: true },
      { name: "clientId", label: "Client ID", required: true },
      { name: "dateCreated", label: "Date Created" },
      { name: "registeredAgent", label: "Registered Agent" },
      { name: "stateOfFormation", label: "State Of Formation" },
      { name: "phone1", label: "Phone #1" },
      { name: "stateFilingNumber", label: "State Filing Number(s)" },
      { name: "website", label: "Website" },
    ],
    2: [
      { name: "billingStreet", label: "Billing Street", required: true },
      { name: "billingCity", label: "Billing City", required: true },
      { name: "billingState", label: "Billing State", required: true },
      { name: "billingCountry", label: "Billing Country", required: true },
      { name: "billingCode", label: "Billing Code" },
    ],
    3: [{ name: "description", label: "Description", required: true }],
  },
};

interface Props {
  onBack: () => void;
  formDataArray: FormData[];
  setFormDataArray: React.Dispatch<React.SetStateAction<FormData[]>>;
  onFinish: () => void;
  addingBusinessIndex?: number;
}

const Step2GiveDetails: React.FC<Props> = ({
  onBack,
  formDataArray,
  setFormDataArray,
  onFinish,
  addingBusinessIndex,
}) => {
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);
  const [step, setStep] = useState(1);
  const [fieldsForCurrentStep, setFieldsForCurrentStep] = useState<
    FieldConfig[]
  >([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentIndex =
    addingBusinessIndex !== undefined
      ? addingBusinessIndex
      : selectedAccountIndex;
  const currentFormData = formDataArray[currentIndex];
  const totalSteps = stepTitles[currentFormData?.accountType]?.length ?? 0;
  const accountLabel =
    currentIndex === 0
      ? "Individual Account"
      : `Business Account ${currentIndex}`;
  const isIndividualAccount = currentIndex === 0;
  const isNewBusiness = addingBusinessIndex !== undefined;

  useEffect(() => {
    const accountType = currentFormData?.accountType?.trim();
    if (accountType && accountType !== "-None-") {
      const fields = accountTypeStepConfig[accountType]?.[step] ?? [];
      setFieldsForCurrentStep(fields);
    } else {
      setFieldsForCurrentStep([]);
    }
  }, [currentFormData?.accountType, step]);

  const renderLabel = (label: string, required = false) => (
    <label className="text-sm font-medium text-gray-700 mb-1 block">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormDataArray((prev) => {
      const updated = [...prev];
      updated[currentIndex] = {
        ...updated[currentIndex],
        [name]: value,
      };
      return updated;
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    fieldsForCurrentStep.forEach((f) => {
      const value = String(currentFormData[f.name] ?? "").trim();
      if (f.required && !value) newErrors[f.name] = `${f.label} is required`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAllAccounts = (): boolean => {
    const newErrors: Record<string, string> = {};
    formDataArray.forEach((account, idx) => {
      const accountType = account.accountType?.trim();
      if (!accountType || accountType === "-None-") {
        newErrors[`accountType_${idx}`] = "Account type is required";
        return;
      }
      const totalStepsForAccount = Object.keys(
        accountTypeStepConfig[accountType] ?? {}
      ).length;
      for (let s = 1; s <= totalStepsForAccount; s++) {
        const fields = accountTypeStepConfig[accountType][s] ?? [];
        fields.forEach((f) => {
          const value = String(account[f.name] ?? "").trim();
          if (f.required && !value) {
            newErrors[`${f.name}_${idx}`] = `${f.label} is required`;
          }
        });
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return; // current step validation

    const isLastAccount = currentIndex === formDataArray.length - 1;
    const isLastStepForCurrentAccount = step === totalSteps;

    if (
      (isIndividualAccount || (isLastAccount && isLastStepForCurrentAccount)) &&
      validateAllAccounts()
    ) {
      onFinish();
      return;
    }

    if (step < totalSteps) {
      setStep((s) => s + 1);
      setErrors({});
    } else if (currentIndex < formDataArray.length - 1) {
      setSelectedAccountIndex((i) => i + 1);
      setStep(1);
      setErrors({});
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    } else if (currentIndex > 0) {
      setSelectedAccountIndex((i) => i - 1);
      const prevAccountType = formDataArray[currentIndex - 1].accountType;
      const prevTotalSteps = stepTitles[prevAccountType]?.length ?? 0;
      setStep(prevTotalSteps);
    } else {
      if (isNewBusiness && currentIndex === formDataArray.length - 1) {
        console.log("[v0] Removing unsaved business at index", currentIndex);
        // The parent component handles this via onBack
      }
      onBack();
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800">
        Step 2: Account Details
      </h3>

      {!isNewBusiness && (
        <div className="flex gap-2 flex-wrap">
          {formDataArray.map((account, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedAccountIndex(idx);
                setStep(1);
                setErrors({});
              }}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedAccountIndex === idx
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {idx === 0
                ? "Individual"
                : `${account.accountName} (${account.accountType})`}
            </button>
          ))}
        </div>
      )}

      {!isNewBusiness && (
        <div
          className={`p-4 border rounded-lg ${
            isIndividualAccount
              ? "bg-blue-50 border-blue-200"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          {/* <p className="text-sm text-gray-600">Editing:</p> */}
          <p className="text-lg font-semibold text-gray-800">{accountLabel}</p>
          <p className="text-sm text-gray-600 mt-1">
            Type: {currentFormData?.accountType}
          </p>
          {isIndividualAccount &&
            currentFormData?.connectedContacts &&
            currentFormData.connectedContacts.length > 0 && (
              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Primary Contact:
                </p>
                <div className="text-sm text-gray-700">
                  {currentFormData.connectedContacts[0] && (
                    <div className="space-y-2">
                      {Object.entries(currentFormData.connectedContacts[0])
                        .filter(([key]) => key !== "id" && key !== "type") // skip id and type
                        .map(([key, value]) => (
                          <p key={key}>
                            <strong>
                              {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                              :
                            </strong>{" "}
                            {String(value) || "N/A"}
                          </p>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )}
        </div>
      )}

      {(!currentFormData?.accountType ||
        currentFormData?.accountType === "-None-") &&
      isNewBusiness ? (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <p className="text-lg text-gray-600">Loading account type...</p>
            <p className="text-sm text-gray-500 mt-2">
              Please go back and select an account type.
            </p>
          </div>
        </div>
      ) : currentFormData?.accountType &&
        currentFormData?.accountType !== "-None-" &&
        !isIndividualAccount ? (
        <>
          {/* Step Progress */}
          <div className="flex justify-between items-center mb-6">
            {stepTitles[currentFormData.accountType]?.map((title, index) => {
              const isActive = index + 1 === step;
              const isCompleted = index + 1 < step;
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isActive
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-xs text-center mt-1 text-gray-600">
                    {title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-2 bg-gray-200 rounded-full">
            <div
              className="absolute h-2 bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            {fieldsForCurrentStep.map((field) => (
              <div key={field.name}>
                {renderLabel(field.label, field.required)}
                {field.name === "description" ? (
                  <textarea
                    name={field.name}
                    value={String(currentFormData[field.name] ?? "")}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Enter description or notes"
                    disabled={isIndividualAccount}
                    className={`w-full border rounded-lg px-3 py-2 text-sm ${
                      errors[field.name]
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    } ${
                      isIndividualAccount
                        ? "bg-gray-100 cursor-not-allowed"
                        : ""
                    }`}
                  />
                ) : (
                  <input
                    type="text"
                    name={field.name}
                    value={String(currentFormData[field.name] ?? "")}
                    onChange={handleChange}
                    placeholder={field.label}
                    disabled={isIndividualAccount}
                    className={`w-full border rounded-lg px-3 py-2 text-sm ${
                      errors[field.name]
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    } ${
                      isIndividualAccount
                        ? "bg-gray-100 cursor-not-allowed"
                        : ""
                    }`}
                  />
                )}
                {errors[field.name] && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Navigation */}
        </>
      ) : !isIndividualAccount ? (
        <div className="flex items-center justify-center py-16">
          <p className="text-gray-600">Please select a valid account type.</p>
        </div>
      ) : null}

      <div className="flex justify-between gap-3 mt-8">
        <button
          onClick={prevStep}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition"
        >
          {isNewBusiness ? "Cancel" : "Previous"}
        </button>
        <button
          onClick={nextStep}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
        >
          {(step === totalSteps || isIndividualAccount) &&
          currentIndex === formDataArray.length - 1
            ? "Finish"
            : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Step2GiveDetails;
