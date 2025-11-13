"use client";

import { FileUp } from "lucide-react";

import type React from "react";
import { useState, useEffect } from "react";

const accountTypes = [
  "-None-",
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
      // { name: "clientId", label: "Client ID", required: true },
      { name: "trustee", label: "Trustee" },
      { name: "complianceOfficer", label: "Compliance Overseer" },
      // { name: "dateCreated", label: "Date Created" },
      // { name: "fax", label: "Fax" },
      // { name: "phone1", label: "Phone #1" },
    ],
    2: [
      { name: "billingStreet", label: "Company Street", required: true },
      { name: "billingCity", label: "Company City", required: true },
      { name: "billingState", label: "Company State", required: true },
      { name: "billingCountry", label: "Company Country", required: true },
      { name: "billingCode", label: "Company Code" },
    ],
    3: [{ name: "description", label: "Description" }],
  },
  // ... existing code for other types ...
  "Business Trust": {
    1: [
      { name: "accountName", label: "Account Name", required: true },
      { name: "taxId", label: "Tax ID", required: true },
      // { name: "clientId", label: "Client ID", required: true },
      { name: "trustee", label: "Trustee" },
      { name: "complianceOfficer", label: "Compliance Overseer" },
      // { name: "dateCreated", label: "Date Created" },
      // { name: "fax", label: "Fax" },
      // { name: "phone1", label: "Phone #1" },
    ],
    2: [
      { name: "billingStreet", label: "Company Street", required: true },
      { name: "billingCity", label: "Company City", required: true },
      { name: "billingState", label: "Company State", required: true },
      { name: "billingCountry", label: "Company Country", required: true },
      { name: "billingCode", label: "Company Code" },
    ],
    3: [{ name: "description", label: "Description" }],
  },
  "C-Corporation": {
    1: [
      { name: "accountName", label: "Account Name", required: true },
      { name: "state", label: "State", required: true },
      { name: "taxId", label: "Tax ID", required: true },
      // { name: "clientId", label: "Client ID", required: true },
      // { name: "dateCreated", label: "Date Created" },
      { name: "registeredAgent", label: "Registered Agent" },
      { name: "stateOfFormation", label: "State Of Formation" },
      { name: "phone1", label: "Phone #1" },
      { name: "stateFilingNumber", label: "State Filing Number(s)" },
      { name: "website", label: "Website" },
    ],
    2: [
      { name: "billingStreet", label: "Company Street", required: true },
      { name: "billingCity", label: "Company City", required: true },
      { name: "billingState", label: "Company State", required: true },
      { name: "billingCountry", label: "Company Country", required: true },
      { name: "billingCode", label: "Company Code" },
    ],
    3: [{ name: "description", label: "Description" }],
  },
  Individual: {
    1: [
      { name: "accountName", label: "Account Name", required: true },
      { name: "taxId", label: "SSN", required: true },
      // { name: "clientId", label: "Client ID", required: true },
      { name: "phone1", label: "Phone #1" },
    ],
    2: [
      { name: "billingStreet", label: "Mailing Street", required: true },
      { name: "billingCity", label: "Mailing City", required: true },
      { name: "billingState", label: "Mailing State", required: true },
      { name: "billingCode", label: "Mailing Code" },
    ],
    3: [{ name: "description", label: "Description" }],
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
      // { name: "clientId", label: "Client ID", required: true },
      { name: "dateCreated", label: "Date Created" },
      { name: "complianceOfficer", label: "Compliance Officer" },
      { name: "registeredAgent", label: "Registered Agent" },
      { name: "phone", label: "Phone" },
      { name: "phone1", label: "Phone #1" },
    ],
    2: [
      { name: "billingStreet", label: "Company Street", required: true },
      { name: "billingCity", label: "Company City", required: true },
      { name: "billingState", label: "Company State", required: true },
      { name: "billingCountry", label: "Company Country", required: true },
      { name: "billingCode", label: "Company Code" },
    ],
    3: [{ name: "description", label: "Description" }],
  },
  Partnership: {
    1: [
      { name: "accountName", label: "Account Name", required: true },
      { name: "state", label: "State", required: true },
      { name: "taxId", label: "Tax ID", required: true },
      // { name: "clientId", label: "Client ID", required: true },
      { name: "dateCreated", label: "Date Created" },
      { name: "registeredAgent", label: "Registered Agent" },
      { name: "stateOfFormation", label: "State Of Formation" },
      { name: "phone1", label: "Phone #1" },
      { name: "stateFilingNumber", label: "State Filing Number(s)" },
      { name: "website", label: "Website" },
    ],
    2: [
      { name: "billingStreet", label: "Company Street", required: true },
      { name: "billingCity", label: "Company City", required: true },
      { name: "billingState", label: "Company State", required: true },
      { name: "billingCountry", label: "Company Country", required: true },
      { name: "billingCode", label: "Company Code" },
    ],
    3: [{ name: "description", label: "Description" }],
  },
  "S-Corporation": {
    1: [
      { name: "accountName", label: "Account Name", required: true },
      { name: "state", label: "State", required: true },
      { name: "taxId", label: "Tax ID", required: true },
      // { name: "clientId", label: "Client ID", required: true },
      { name: "dateCreated", label: "Date Created" },
      { name: "registeredAgent", label: "Registered Agent" },
      { name: "stateOfFormation", label: "State Of Formation" },
      { name: "phone1", label: "Phone #1" },
      { name: "stateFilingNumber", label: "State Filing Number(s)" },
      { name: "website", label: "Website" },
    ],
    2: [
      { name: "billingStreet", label: "Company Street", required: true },
      { name: "billingCity", label: "Company City", required: true },
      { name: "billingState", label: "Company State", required: true },
      { name: "billingCountry", label: "Company Country", required: true },
      { name: "billingCode", label: "Company Code" },
    ],
    3: [{ name: "description", label: "Description" }],
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
    formDataArray?.forEach((account, idx) => {
      const accountType = account.accountType?.trim();
      if (accountType == "Individual") {
        return;
      }
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
    // Validate only the current step
    if (!validateStep()) return;

    const isLastStepForCurrentAccount = step === totalSteps;
    const isLastAccount = currentIndex === (formDataArray?.length ?? 0) - 1;

    if (isLastStepForCurrentAccount) {
      if (!isLastAccount) {
        // Move to next account
        setSelectedAccountIndex((i) => i + 1);
        setStep(1);
        setErrors({});
      }
    } else {
      // Move to next step
      setStep((s) => s + 1);
      setErrors({});
    }
  };

  useEffect(() => {
    if (errors.general) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.general;
        return updated;
      });
    }
  }, [currentFormData, step]);
  const handleFinish = () => {
    if (validateAllAccounts()) {
      console.log("✅ All accounts validated. Finishing...");
      onFinish();
    } else {
      setErrors((prev) => ({
        ...prev,
        general: "Please fill required fields before finishing!",
      }));
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    } else if (currentIndex > 0) {
      setSelectedAccountIndex((i) => i - 1);
      const prevAccountType = formDataArray?.[currentIndex - 1]?.accountType;
      const prevTotalSteps = stepTitles[prevAccountType]?.length ?? 0;
      setStep(prevTotalSteps);
    } else {
      if (isNewBusiness && currentIndex === (formDataArray?.length ?? 0) - 1) {
        console.log("[v0] Removing unsaved business at index", currentIndex);
        // The parent component handles this via onBack
      }
      onBack();
    }
  };

  return (
    <div className="space-y-6">
      {/* show on right side */}
      {errors.general && (
        <div className="absolute top-4 right-8 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-md shadow-md max-w-[300px]">
          {errors.general && <p className="text-red-600">{errors.general}</p>}
        </div>
      )}
      <h3 className="text-2xl font-bold text-black">Step 2: Account Details</h3>

      {!isNewBusiness && (
        <div className="flex gap-2 flex-wrap">
          {formDataArray?.map((account, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedAccountIndex(idx);
                setStep(1);
                setErrors({});
              }}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedAccountIndex === idx
                  ? "bg-primary text-white"
                  : "bg-gray-light text-black hover:bg-gray-medium"
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
              ? "bg-blue-50 border-gray-light"
              : "bg-gray-light border-gray-medium"
          }`}
        >
          <p className="text-lg font-semibold text-black">{accountLabel}</p>
          <p className="text-sm text-gray-600 mt-1">
            Type: {currentFormData?.accountType}
          </p>
          {isIndividualAccount &&
            currentFormData?.connectedContacts &&
            currentFormData.connectedContacts.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-medium">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Account Details:
                </p>
                <div className="text-sm text-gray-700">
                  {currentFormData.connectedContacts[0] && (
                    <div className="space-y-2">
                      {Object.entries(currentFormData.connectedContacts[0])
                        .filter(
                          ([key]) =>
                            key !== "id" &&
                            key !== "type" &&
                            key.toLowerCase() !== "fax" &&
                            key !== "billingCode"
                        )
                        .map(([key, value]) => (
                          <p key={key}>
                            <strong>
                              {key
                                .replace(/billing/g, "Mailing")
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

      {/* Step Progress */}
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
                        ? "bg-primary text-white"
                        : "bg-gray-light text-black"
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
          <div className="relative w-full h-2 bg-gray-medium rounded-full">
            <div
              className="absolute h-2 bg-primary rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            {fieldsForCurrentStep.map((field) => (
              <div key={field.name}>
                {renderLabel(
                  field.label.replace(/Billing/g, "Mailing"),
                  field.required
                )}
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
                    placeholder={field.label.replace(/Billing/g, "Mailing")}
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
            {currentFormData.accountType &&
              stepTitles[currentFormData.accountType]?.[step - 1] ===
                "Address Information" && (
                <div className="flex justify-start mt-6">
                  <div className="relative group inline-block">
                    <button
                      type="button"
                      onClick={() => {
                        const individualAccountData =
                          formDataArray?.[0]?.connectedContacts?.[0] || null;

                        if (!individualAccountData) return;

                        const mailingFields: (keyof FormData)[] = [
                          "billingStreet",
                          "billingCity",
                          "billingState",
                          "billingCode",
                          "billingCountry",
                        ];

                        setFormDataArray((prev) => {
                          const updated = [...prev];
                          const current = { ...updated[currentIndex] };

                          mailingFields.forEach((key) => {
                            if (key === "billingCode") {
                              const zip =
                                "billingZip" as keyof typeof individualAccountData;
                              current[key] = individualAccountData[zip] || "";
                            } else {
                              current[key] = individualAccountData[key] || "";
                            }
                          });

                          updated[currentIndex] = current;
                          return updated;
                        });
                      }}
                      className="flex items-center gap-4 text-sm bg-gray-600 text-white px-2 py-[10px] rounded-md hover:bg-blue-700 transition"
                    >
                      <FileUp className="w-4 h-4" />
                    </button>

                    {/* Tooltip */}
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Copy address info from the individual account
                    </span>
                  </div>
                </div>
              )}
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
          className="px-4 py-2 border border-gray-medium rounded-lg hover:bg-gray-light font-medium transition"
        >
          {isNewBusiness ? "Cancel" : "Previous"}
        </button>

        <div className="flex gap-2">
          {/* Show Finish only when last account and last step OR individual */}
          {(isIndividualAccount ||
            (currentIndex === (formDataArray?.length ?? 0) - 1 &&
              step === totalSteps)) && (
            <button
              onClick={handleFinish}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition"
            >
              Finish
            </button>
          )}

          {/* Always show Next unless we're on final step of last account */}
          {!(
            isIndividualAccount ||
            (currentIndex === formDataArray.length - 1 && step === totalSteps)
          ) && (
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-black font-medium transition"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2GiveDetails;
