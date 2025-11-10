import React, { useState, useEffect } from "react";
import ContactManager, { Contact } from "./ContactManager";

// Form data type
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
  connectedContacts: Contact[];
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
    "Client Note",
    "Account Information",
    "Address Information",
    "Account Portal Links",
    "Description",
  ],
  Individual: [
    "Client Note",
    "Account Information",
    "Address Information",
    "Account Portal Links",
    "Description",
  ],
  Partnership: [
    "Client Note",
    "Account Information",
    "Address Information",
    "Account Portal Links",
    "Description",
  ],

   'S-Corporation': [
    "Client Note",
    "Account Information",
    "Address Information",
    "Account Portal Links",
    "Description",
  ],
  "Non-Profit": ["Account Information", "Account Portal Links"],
  "Beneficial Trust": [
    "Client Note",
    "Account Information",
    "Address Information",
    "Account Portal Links",
    "Description",
  ],
  "Business Trust": [
    "Client Note",
    "Account Information",
    "Address Information",
    "Account Portal Links",
    "Description",
  ],
};

const step3Fields: {
  name: keyof FormData;
  label: string;
  required?: boolean;
}[] = [
  { name: "billingStreet", label: "Billing Street", required: true },
  { name: "billingCity", label: "Billing City", required: true },
  { name: "billingState", label: "Billing State", required: true },
  { name: "billingCountry", label: "Billing Country", required: true },
  { name: "billingCode", label: "Billing Code" },
];

// Field and step configuration
type FieldConfig = { name: keyof FormData; label: string; required?: boolean };
type StepConfig = Record<number, FieldConfig[]>;
const accountTypeStepConfig: Record<string, StepConfig> = {
  "Beneficial Trust": {
    1: [{ name: "clientNote", label: "Client Note", required: true }],
    2: [
      { name: "accountName", label: "Account Name", required: true },
      { name: "taxId", label: "Tax ID", required: true },
      { name: "clientId", label: "Client Id", required: true },
      { name: "trustee", label: "Trustee" },
      { name: "complianceOfficer", label: "Compliance Officer" },
      { name: "dateCreated", label: "Date Created" },
      { name: "fax", label: "Fax" },
      { name: "phone1", label: "Phone #1" },
      // { name: "trusteeName", label: "Trustee Name" },
    ],
    3: step3Fields,
    4: [
      { name: "connectedContacts", label: "Connected Contacts" },
      { name: "url2", label: "URL 2" },
    ],
    5: [{ name: "description", label: "Description", required: true }],
  },
  "Business Trust": {
    1: [{ name: "clientNote", label: "Client Note", required: true }],
    2: [
      { name: "accountName", label: "Account Name", required: true },
      { name: "taxId", label: "Tax ID", required: true },
      { name: "clientId", label: "Client Id", required: true },
      { name: "trustee", label: "Trustee" },
      { name: "complianceOfficer", label: "Compliance Officer" },
      { name: "dateCreated", label: "Date Created" },
      { name: "fax", label: "Fax" },
      { name: "phone1", label: "Phone #1" },
      // { name: "trusteeName", label: "Trustee Name" },
    ],
    3: step3Fields,
    4: [
      { name: "connectedContacts", label: "Connected Contacts" },
      { name: "url2", label: "URL 2" },
    ],
    5: [{ name: "description", label: "Description", required: true }],
  },
  "C-Corporation": {
    1: [{ name: "clientNote", label: "Client Note", required: true }],
    2: [
      { name: "accountName", label: "Account Name", required: true },
      { name: "state", label: "State", required: true },
      { name: "taxId", label: "Tax ID", required: true },
      { name: "clientId", label: "Client Id", required: true },
      { name: "dateCreated", label: "Date Created" },
      { name: "registeredAgent", label: "Registered Agent" },
      { name: "stateOfFormation", label: "State Of Formation" },
      { name: "phone1", label: "Phone #1" },
      { name: "stateFilingNumber", label: "State Filing Number(s)" },
      { name: "website", label: "Website" },
    ],
    3: step3Fields,
    4: [
      { name: "connectedContacts", label: "Connected Contacts" },
      { name: "url2", label: "URL 2" },
    ],
    5: [{ name: "description", label: "Description", required: true }],
  },
  "FIRM ACCOUNT": {
    1: [
      { name: "accountName", label: "Account Name", required: true },
      { name: "clientId", label: "Client Id", required: true },
      { name: "dateCreated", label: "Date Created" },
      { name: "complianceOfficer", label: "Compliance Officer" },
      { name: "registeredAgent", label: "Registered Agent" },
      { name: "phone", label: "Phone" },
      { name: "phone1", label: "Phone #1" },
    ],
    2: step3Fields,
    3: [
      { name: "connectedContacts", label: "Connected Contacts" },
      { name: "url2", label: "URL 2" },
    ],
    4: [{ name: "description", label: "Description", required: true }],
  },
  Individual: {
    1: [{ name: "clientNote", label: "Client Note", required: true }],
    2: [
      { name: "accountName", label: "Account Name", required: true },
      { name: "taxId", label: "Tax ID", required: true },
      { name: "clientId", label: "Client Id", required: true },
      { name: "phone1", label: "Phone #1" },
    ],
    3: [
      { name: "billingStreet", label: "Billing Street", required: true },
      { name: "billingCity", label: "Billing City", required: true },
      { name: "billingState", label: "Billing State", required: true },
      { name: "billingCode", label: "Billing Code" },
    ],
    4: [
      { name: "connectedContacts", label: "Connected Contacts" },
      { name: "url2", label: "URL 2" },
    ],
    5: [{ name: "description", label: "Description", required: true }],
  },
  Partnership: {
    1: [{ name: "clientNote", label: "Client Note", required: true }],
    2: [
      { name: "accountName", label: "Account Name", required: true },
      { name: "state", label: "State", required: true },
      { name: "taxId", label: "Tax ID", required: true },
      { name: "clientId", label: "Client Id", required: true },
      { name: "dateCreated", label: "Date Created" },
      { name: "registeredAgent", label: "Registered Agent" },
      { name: "stateOfFormation", label: "State Of Formation" },
      { name: "phone1", label: "Phone #1" },
      { name: "stateFilingNumber", label: "State Filing Number(s)" },
      { name: "website", label: "Website" },
    ],
    3: step3Fields,
    4: [
      { name: "connectedContacts", label: "Connected Contacts" },
      { name: "url2", label: "URL 2" },
    ],
    5: [{ name: "description", label: "Description", required: true }],
  },
  "S-Corporation": {
    1: [{ name: "clientNote", label: "Client Note", required: true }],
    2: [
      { name: "accountName", label: "Account Name", required: true },
      { name: "state", label: "State", required: true },
      { name: "taxId", label: "Tax ID", required: true },
      { name: "clientId", label: "Client Id", required: true },
      { name: "dateCreated", label: "Date Created" },
      { name: "registeredAgent", label: "Registered Agent" },
      { name: "stateOfFormation", label: "State Of Formation" },
      { name: "phone1", label: "Phone #1" },
      { name: "stateFilingNumber", label: "State Filing Number(s)" },
      { name: "website", label: "Website" },
    ],
    3: step3Fields,
    4: [
      { name: "connectedContacts", label: "Connected Contacts" },
      { name: "url2", label: "URL 2" },
    ],
    5: [{ name: "description", label: "Description", required: true }],
  },
  "Non-Profit": {
    1: [
      { name: "accountName", label: "Account Name", required: true },
      { name: "phone1", label: "Phone #1" },
    ],
    2: [
      { name: "connectedContacts", label: "Connected Contacts" },
      { name: "url2", label: "URL 2" },
    ],
  },
};

// Component Props
interface Props {
  onBack: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onFinish: () => void;
}

const Step2GiveDetails: React.FC<Props> = ({
  onBack,
  formData,
  setFormData,
  onFinish,
}) => {
  const [step, setStep] = useState(1);
  const [showContactManager, setShowContactManager] = useState(false);
  const [fieldsForCurrentStep, setFieldsForCurrentStep] = useState<
    FieldConfig[]
  >([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const totalSteps = stepTitles[formData.accountType]?.length ?? 0;

  useEffect(() => {
    const accountType = formData.accountType?.trim();
    if (accountType) {
      const fields = accountTypeStepConfig[accountType]?.[step] ?? [];
      setFieldsForCurrentStep(fields);
    } else {
      setFieldsForCurrentStep([]);
    }
  }, [formData.accountType, step]);

  const renderLabel = (label: string, required = false) => (
    <label className="text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const addOrIgnoreContact = (contact: Contact) => {
    setFormData((prev) => {
      const exists = prev.connectedContacts.some((c) => c.id === contact.id);
      if (exists) return prev;
      return {
        ...prev,
        connectedContacts: [contact, ...prev.connectedContacts],
      };
    });
  };

  const removeContact = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      connectedContacts: prev.connectedContacts.filter((c) => c.id !== id),
    }));
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    const fieldsToValidate = fieldsForCurrentStep;

    fieldsToValidate.forEach((f) => {
      const value = String(formData[f.name] ?? "").trim();
      if (f.required && !value) newErrors[f.name] = `${f.label} is required`;
      if (f.name === "url2" && value) {
        const isValid = /^(https?:\/\/)[\w-]+(\.[\w-]+)+[/#?]?.*$/.test(value);
        if (!isValid) newErrors[f.name] = `${f.label} must be a valid URL`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    if (step < totalSteps) setStep((s) => s + 1);
    else onFinish();
  };

  const prevStep = () => (step > 1 ? setStep((s) => s - 1) : onBack());

  return (
    <div className="relative">
      {/* Step header */}
      <div className="mb-6">
        {/* Step numbers with titles */}
        <div className="flex justify-between items-center mb-3">
          {stepTitles[formData.accountType]?.map((title, index) => {
            const isActive = index + 1 === step;
            const isCompleted = index + 1 < step;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
              ${isCompleted ? "bg-green-500 text-white" : ""}
              ${
                isActive ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
              }
            `}
                >
                  {index + 1}
                </div>
                <span className="text-xs text-center mt-1">{title}</span>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="relative w-full h-2 bg-gray-200 rounded-full">
          <div
            className="absolute top-0 left-0 h-2 bg-primary rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step fields */}
      <div className="space-y-6 overflow-y-auto max-h-[60vh] pr-2">
        {formData.accountType &&
          Object.entries(
            accountTypeStepConfig[formData.accountType] || {}
          ).some(
            ([stepNum, fields]) =>
              fields.some((f) => f.name === "connectedContacts") &&
              Number(stepNum) === step
          ) && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                {renderLabel("Connected Contacts")}
                {formData.accountType === "Partnership" && (
                  <div className="relative inline-block group">
                    <span className="text-gray-400 cursor-pointer font-bold">
                      ?
                    </span>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                      Connected contacts allow you to link other individuals
                      associated with this account.
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-2 items-center mb-2 flex-wrap">
                {formData.connectedContacts.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center bg-gray-100 px-2 py-1 rounded text-sm"
                  >
                    <span className="mr-2">{`${c.firstName ?? ""} ${
                      c.lastName ?? ""
                    }`}</span>
                    <button
                      onClick={() => removeContact(c.id)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setShowContactManager((s) => !s)}
                  className="inline-flex items-center gap-2 px-3 py-1 border rounded text-sm hover:bg-gray-50"
                >
                  + Add / Select
                </button>
              </div>
              {showContactManager && (
                <div className="absolute z-50 mt-2 bg-white p-3 rounded shadow-lg w-[480px]">
                  <ContactManager
                    existing={formData.connectedContacts}
                    selected={formData.connectedContacts.map((c) => c.id)}
                    onClose={() => setShowContactManager(false)}
                    onCreate={addOrIgnoreContact}
                    onSelect={addOrIgnoreContact}
                  />
                </div>
              )}
            </div>
          )}

        <div className="grid grid-cols-2 gap-4">
          {fieldsForCurrentStep
            .filter((f) => f.name !== "connectedContacts")
            .map((field) => (
              <div key={field.name}>
                {renderLabel(field.label, field.required)}
                {field.name === "description" ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full border rounded-md px-3 py-2 ${
                      errors[field.name] ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                ) : (
                  <input
                    name={field.name}
                    value={String(formData[field.name] ?? "")}
                    onChange={handleChange}
                    placeholder={field.label}
                    className={`border rounded-md px-3 py-2 w-full ${
                      errors[field.name] ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                )}
                {errors[field.name] && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="px-4 py-2 border rounded-md hover:bg-gray-100"
        >
          {step === 1 ? "Back" : "Previous"}
        </button>
        <button
          onClick={nextStep}
          className={`px-4 py-2 rounded-md ${
            step === totalSteps
              ? "bg-green-600 hover:bg-green-700"
              : "bg-primary hover:bg-primary-dark"
          } text-white`}
        >
          {step === totalSteps ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Step2GiveDetails;
