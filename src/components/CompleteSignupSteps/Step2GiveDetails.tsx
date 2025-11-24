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
    "Notes",
  ],
  Individual: ["Account Information", "Address Information", "Notes"],
  Partnership: ["Account Information", "Address Information", "Notes"],
  "FIRM ACCOUNT": ["Account Information", "Address Information", "Notes"],
  "S-Corporation": [
    "Account Information",
    "Address Information",
    "Notes",
  ],
  "Non-Profit": ["Account Information"],
  "Beneficial Trust": [
    "Account Information",
    "Address Information",
    "Notes",
  ],
  "Business Trust": [
    "Account Information",
    "Address Information",
    "Notes",
  ],
};

type FieldConfig = { name: keyof FormData; label: string; required?: boolean , placeholder?:string , type?:string };
type StepConfig = Record<number, FieldConfig[]>;

const accountTypeStepConfig: Record<string, StepConfig> = {
  "Beneficial Trust": {
    1: [
      { name: "accountName", label: "Account Name", required: true, placeholder: "Example Beneficial Trust", type: "text" },
      { name: "taxId", label: "Tax ID", required: true, placeholder: "12-3456789", type: "tel" },
      { name: "trustee", label: "Trustee", placeholder: "John Doe", type: "text" },
      { name: "complianceOfficer", label: "Compliance Overseer", placeholder: "Jane Smith", type: "text" },
    ],
    2: [
      { name: "billingStreet", label: "Company Street", required: true, placeholder: "1234 Main St", type: "text" },
      { name: "billingCity", label: "Company City", required: true, placeholder: "New York", type: "text" },
      { name: "billingState", label: "Company State", required: true, placeholder: "NY", type: "text" },
      { name: "billingCode", label: "Company Zip Code", placeholder: "10001", type: "tel" },
      { name: "billingCountry", label: "Company Country", required: true, placeholder: "USA", type: "text" },
    ],
    3: [{ name: "description", label: "Are there any special considerations we should be aware of?", placeholder: "Write details or notes", type: "text" }],
  },

  "Business Trust": {
    1: [
      { name: "accountName", label: "Account Name", required: true, placeholder: "Example Business Trust", type: "text" },
      { name: "taxId", label: "Tax ID", required: true, placeholder: "12-3456789", type: "tel" },
      { name: "trustee", label: "Trustee", placeholder: "John Doe", type: "text" },
      { name: "complianceOfficer", label: "Compliance Overseer", placeholder: "Jane Smith", type: "text" },
    ],
    2: [
      { name: "billingStreet", label: "Company Street", required: true, placeholder: "1234 Main St", type: "text" },
      { name: "billingCity", label: "Company City", required: true, placeholder: "Chicago", type: "text" },
      { name: "billingState", label: "Company State", required: true, placeholder: "IL", type: "text" },
      { name: "billingCode", label: "Company Zip Code", placeholder: "60007", type: "tel" },
      { name: "billingCountry", label: "Company Country", required: true, placeholder: "USA", type: "text" },
    ],
    3: [{ name: "description", label: "Are there any special considerations we should be aware of?", placeholder: "Write details or notes", type: "text" }],
  },

  "C-Corporation": {
    1: [
      { name: "accountName", label: "Account Name", required: true, placeholder: "ABC Corporation", type: "text" },
      { name: "state", label: "State", required: true, placeholder: "CA", type: "text" },
      { name: "taxId", label: "Tax ID", required: true, placeholder: "12-3456789", type: "tel" },
      { name: "registeredAgent", label: "Registered Agent", placeholder: "John Smith", type: "text" },
      { name: "stateOfFormation", label: "State Of Formation", placeholder: "Delaware", type: "text" },
      { name: "phone1", label: "Phone #1", placeholder: "(123) 456-7890", type: "tel" },
      { name: "stateFilingNumber", label: "State Filing Number(s)", placeholder: "1234567", type: "text" },
      { name: "website", label: "Website", placeholder: "https://example.com", type: "text" },
    ],
    2: [
      { name: "billingStreet", label: "Company Street", required: true, placeholder: "123 Market St", type: "text" },
      { name: "billingCity", label: "Company City", required: true, placeholder: "San Francisco", type: "text" },
      { name: "billingState", label: "Company State", required: true, placeholder: "CA", type: "text" },
      { name: "billingCode", label: "Company Zip Code", placeholder: "94103", type: "tel" },
      { name: "billingCountry", label: "Company Country", required: true, placeholder: "USA", type: "text" },
    ],
    3: [{ name: "description", label: "Are there any special considerations we should be aware of?", placeholder: "Write details or notes", type: "text" }],
  },

  Individual: {
    1: [
      { name: "accountName", label: "Account Name", required: true, placeholder: "John Doe", type: "text" },
      { name: "taxId", label: "SSN", required: true, placeholder: "12-3456789", type: "tel" },
      { name: "phone1", label: "Phone #1", placeholder: "(123) 456-7890", type: "tel" },
    ],
    2: [
      { name: "billingStreet", label: "Mailing Street", required: true, placeholder: "123 Main St", type: "text" },
      { name: "billingCity", label: "Mailing City", required: true, placeholder: "Los Angeles", type: "text" },
      { name: "billingState", label: "Mailing State", required: true, placeholder: "CA", type: "text" },
      { name: "billingCode", label: "Mailing Code", placeholder: "90001", type: "tel" },
    ],
    3: [{ name: "description", label: "Are there any special considerations we should be aware of?", placeholder: "Write details or notes", type: "text" }],
  },

  "Non-Profit": {
    1: [
      { name: "accountName", label: "Account Name", required: true, placeholder: "Non-Profit Org Name", type: "text" },
      { name: "phone1", label: "Phone #1", placeholder: "(123) 456-7890", type: "tel" },
    ],
  },

  "FIRM ACCOUNT": {
    1: [
      { name: "accountName", label: "Account Name", required: true, placeholder: "Firm Name", type: "text" },
      { name: "dateCreated", label: "Date Created", placeholder: "2024-05-01", type: "date" },
      { name: "complianceOfficer", label: "Compliance Officer", placeholder: "Jane Smith", type: "text" },
      { name: "registeredAgent", label: "Registered Agent", placeholder: "John Doe", type: "text" },
      { name: "phone", label: "Phone", placeholder: "(123) 456-7890", type: "tel" },
      { name: "phone1", label: "Phone #1", placeholder: "(123) 456-7890", type: "tel" },
    ],
    2: [
      { name: "billingStreet", label: "Company Street", required: true, placeholder: "500 Oak St", type: "text" },
      { name: "billingCity", label: "Company City", required: true, placeholder: "Miami", type: "text" },
      { name: "billingState", label: "Company State", required: true, placeholder: "FL", type: "text" },
      { name: "billingCode", label: "Company Zip Code", placeholder: "33010", type: "tel" },
      { name: "billingCountry", label: "Company Country", required: true, placeholder: "USA", type: "text" },
    ],
    3: [{ name: "description", label: "Are there any special considerations we should be aware of?", placeholder: "Write details or notes", type: "text" }],
  },

  Partnership: {
    1: [
      { name: "accountName", label: "Account Name", required: true, placeholder: "Partnership Name", type: "text" },
      { name: "state", label: "State", required: true, placeholder: "TX", type: "text" },
      { name: "taxId", label: "Tax ID", required: true, placeholder: "12-3456789", type: "tel" },
      { name: "dateCreated", label: "Date Created", placeholder: "2024-05-01", type: "date" },
      { name: "registeredAgent", label: "Registered Agent", placeholder: "John Doe", type: "text" },
      { name: "stateOfFormation", label: "State Of Formation", placeholder: "Texas", type: "text" },
      { name: "phone1", label: "Phone #1", placeholder: "(123) 456-7890", type: "tel" },
      { name: "stateFilingNumber", label: "State Filing Number(s)", placeholder: "1234567", type: "text" },
      { name: "website", label: "Website", placeholder: "https://example.com", type: "text" },
    ],
    2: [
      { name: "billingStreet", label: "Company Street", required: true, placeholder: "700 Main St", type: "text" },
      { name: "billingCity", label: "Company City", required: true, placeholder: "Austin", type: "text" },
      { name: "billingState", label: "Company State", required: true, placeholder: "TX", type: "text" },
      { name: "billingCode", label: "Company Zip Code", placeholder: "73301", type: "tel" },
      { name: "billingCountry", label: "Company Country", required: true, placeholder: "USA", type: "text" },
    ],
    3: [{ name: "description", label: "Are there any special considerations we should be aware of?", placeholder: "Write details or notes", type: "text" }],
  },

  "S-Corporation": {
    1: [
      { name: "accountName", label: "Account Name", required: true, placeholder: "S-Corp Name", type: "text" },
      { name: "state", label: "State", required: true, placeholder: "CA", type: "text" },
      { name: "taxId", label: "Tax ID", required: true, placeholder: "12-3456789", type: "tel" },
      { name: "dateCreated", label: "Date Created", placeholder: "2024-05-01", type: "date" },
      { name: "registeredAgent", label: "Registered Agent", placeholder: "John Doe", type: "text" },
      { name: "stateOfFormation", label: "State Of Formation", placeholder: "California", type: "text" },
      { name: "phone1", label: "Phone #1", placeholder: "(123) 456-7890", type: "tel" },
      { name: "stateFilingNumber", label: "State Filing Number(s)", placeholder: "1234567", type: "text" },
      { name: "website", label: "Website", placeholder: "https://example.com", type: "text" },
    ],
    2: [
      { name: "billingStreet", label: "Company Street", required: true, placeholder: "400 Elm St", type: "text" },
      { name: "billingCity", label: "Company City", required: true, placeholder: "Sacramento", type: "text" },
      { name: "billingState", label: "Company State", required: true, placeholder: "CA", type: "text" },
      { name: "billingCode", label: "Company Zip Code", placeholder: "94203", type: "tel" },
      { name: "billingCountry", label: "Company Country", required: true, placeholder: "USA", type: "text" },
    ],
    3: [{ name: "description", label: "Are there any special considerations we should be aware of?", placeholder: "Write details or notes", type: "text" }],
  },
};


interface Props {
  onBack: () => void;
  formDataArray: FormData[];
  setFormDataArray: React.Dispatch<React.SetStateAction<FormData[]>>;
  onFinish: () => void;
  addingBusinessIndex?: number;
  loader?:boolean
}

const Step2GiveDetails: React.FC<Props> = ({
  onBack,
  formDataArray,
  setFormDataArray,
  onFinish,
  addingBusinessIndex,
  loader,
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
   const accountType = currentFormData?.accountType?.trim();

  const accountLabel =
    currentIndex === 0
      ? "Individual Account"
      : `${currentFormData?.accountName} (${accountType})`;
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
      {label.toLowerCase().includes("account") ?  `${accountType}` + label.replace(/account/gi, "") : label.toLowerCase().includes("company") ? `${accountType}` + label.replace(/Company/gi, "") : label}{" "}

      {required && <span className="text-red-500">*</span>}
    </label>

  );

const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) => {
  const { name, value } = e.target;
  let rawValue = value;

  if (["ssn", "taxid"].includes(name.toLowerCase())) {
    rawValue = value.replace(/\D/g, ""); 
  } else if (["phone", "phone1",  "billingzip"].includes(name.toLowerCase())) {
    rawValue = value.replace(/\D/g, ""); 
  }

  setFormDataArray((prev) => {
    const updated = [...prev];
    updated[currentIndex] = {
      ...updated[currentIndex],
      [name]: rawValue, // store raw value
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

  // this is taxid pattern
  const formatSSN = (value: string) => {
    if (!value) return "";
    const digits = value.replace(/\D/g, "").slice(0, 9);
    if (digits.length <= 2) return digits;
    if (digits.length <= 9) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    return digits;
  };

  
  const formatPhone = (value: string) => {
    if (!value) return "";
    let digits = value.replace(/\D/g, "");

    // Limit digits
    if (digits.length <= 10) {
      digits = digits.slice(0, 10);
      // US-style formatting
      return digits.replace(/(\d{3})(\d{3})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
    } else {
      digits = digits.slice(0, 15); // max 15 digits for international
      const country = digits.slice(0, digits.length - 10);
      const number = digits.slice(-10);
      return `+${country} (${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6, 10)}`;
    }
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
    if(currentIndex === 0) onBack()
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
                : `${account.accountType} ${account.accountName}`}
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
                    placeholder={field.placeholder}
                    disabled={isIndividualAccount}
                    className={`w-full border rounded-lg px-3 py-2 text-sm ${
                      errors[field.name] ? "border-red-500 bg-red-50" : "border-gray-300"
                    } ${isIndividualAccount ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={
                      field.name.toLowerCase() === "taxid"
                        ? formatSSN(currentFormData[field.name] as string)
                        : field.name.toLowerCase() === "phone" ||
                          field.name.toLowerCase() === "phone1"
                        ? formatPhone(currentFormData[field.name] as string)
                        : currentFormData[field.name] || ""
                    }
                    onChange={handleChange}
                    placeholder={
                      field.placeholder
                    }
                    disabled={isIndividualAccount}
                    className={`w-full border rounded-lg px-3 py-2 text-sm ${
                      errors[field.name] ? "border-red-500 bg-red-50" : "border-gray-300"
                    } ${isIndividualAccount ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  />
                )}

                {errors[field.name] && (
                  <p className="text-xs text-red-600 mt-1">{errors[field.name]}</p>
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
             {loader ? "Submitting..." : "Finish"}
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
