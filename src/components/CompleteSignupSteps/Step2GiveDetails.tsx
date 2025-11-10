import React, { useState } from "react";
import ContactManager, { Contact } from "./ContactManager";

interface FormData {
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const totalSteps = 6;

  // Reusable label function
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
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
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
    switch (step) {
      case 1:
        if (!formData.clientNote.trim())
          newErrors.clientNote = "Client note is required";
        break;
      case 2:
        ["accountName", "taxId", "clientId"].forEach((f) => {
          if (!formData[f as keyof FormData].toString().trim()) {
            newErrors[f] = `${f} is required`;
          }
        });
        break;
      case 3:
        [
          "billingStreet",
          "billingCity",
          "billingState",
          "billingCountry",
        ].forEach((f) => {
          if (!formData[f as keyof FormData].toString().trim()) {
            newErrors[f] = `${f} is required`;
          }
        });
        break;
      case 4:
        if (!formData.accountType || formData.accountType == "-None-") {
          newErrors.accountType = "Account type is required";
        }
        break;
      case 5:
        ["url2"].forEach((f) => {
          const isValid =
            /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i.test(formData[f as keyof FormData].toString().trim());
          console.log(isValid, f);
          if (!isValid && formData[f as keyof FormData].toString().trim()) {
            newErrors[f] = `${f} should bevalid URL`;
          }
        });
        break;
      case 6:
        if (!formData.description.trim())
          newErrors.description = "Description is required";
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    if (step < totalSteps) setStep((s) => s + 1);
    else onFinish();
  };

  const prevStep = () => (step > 1 ? setStep((s) => s - 1) : onBack());

  const stepTitles = [
    "Permanent Client Note",
    "Account Information",
    "Address Information",
    "Account Type",
    "Account Portal Links",
    "Description Information",
  ];

  // Step field definitions
  const step2Fields: {
    name: keyof FormData;
    label: string;
    required?: boolean;
  }[] = [
    { name: "accountName", label: "Account Name", required: true },
    { name: "taxId", label: "Tax ID", required: true },
    { name: "clientId", label: "Client Id", required: true },
    { name: "trustee", label: "Trustee" },
    { name: "complianceOfficer", label: "Compliance Officer" },
    { name: "dateCreated", label: "Date Created" },
    { name: "phone1", label: "Phone #1" },
    { name: "trusteeName", label: "Trustee Name" },
  ];

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

  const step5Fields: { name: keyof FormData; label: string }[] = [
    { name: "url2", label: "URL 2" },
  ];

  return (
    <div className="relative">
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
          />
        </div>
      </div>

      {/* Step content */}
      <div className="space-y-6 overflow-y-auto max-h-[60vh] pr-2">
        {/* Step 1 */}
        {step === 1 && (
          <div>
            {renderLabel("Client Note", true)}
            <input
              name="clientNote"
              value={formData.clientNote || ""}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 ${
                errors.clientNote ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter client note"
            />
            {errors.clientNote && (
              <p className="text-xs text-red-500">{errors.clientNote}</p>
            )}
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="grid grid-cols-2 gap-4">
            {step2Fields.map((field) => (
              <div key={field.name}>
                {renderLabel(field.label, field.required)}
                <input
                  name={field.name}
                  value={String(formData[field.name] ?? "")}
                  onChange={handleChange}
                  placeholder={field.label}
                  className={`border rounded-md px-3 py-2 w-full ${
                    errors[field.name] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors[field.name] && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="grid grid-cols-2 gap-4">
            {step3Fields.map((field) => (
              <div key={field.name}>
                {renderLabel(field.label, field.required)}
                <input
                  name={field.name}
                  value={String(formData[field.name] ?? "")}
                  onChange={handleChange}
                  placeholder={field.label}
                  className={`border rounded-md px-3 py-2 w-full ${
                    errors[field.name] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors[field.name] && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div>
            {renderLabel("Account Type", true)}
            <input
              name="accountType"
              value={formData.accountType || ""}
              readOnly
              className={`w-full border rounded-md px-3 py-2 bg-gray-100 ${
                errors.accountType ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.accountType && (
              <p className="text-xs text-red-500 mt-1">{errors.accountType}</p>
            )}
          </div>
        )}

        {/* Step 5 */}
        {step === 5 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              {renderLabel("Connected Contacts")}

              {/* Conditional tooltip */}
              {formData.accountType === "Partnership" && (
                <div className="relative inline-block group">
                  <span className="text-gray-400 cursor-pointer font-bold">
                    ?
                  </span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                    Connected contacts allow you to link other individuals
                    associated with this account, such as spouses, attorneys, or
                    other stakeholders.
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
                  onCreate={(c) => addOrIgnoreContact(c)}
                  onSelect={(c) => addOrIgnoreContact(c)}
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {step5Fields.map((field) => (
                <div key={field.name}>
                  {renderLabel(field.label)}
                  <input
                    name={field.name}
                    value={String(formData[field.name] ?? "")}
                    onChange={handleChange}
                    placeholder="Enter valid URL (https://...)"
                    className="border rounded-md px-3 py-2 w-full"
                  />
                  {errors[field.name] && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 6 */}
        {step === 6 && (
          <div>
            {renderLabel("Description", true)}
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              rows={3}
              className={`w-full border rounded-md px-3 py-2 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter description"
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description}</p>
            )}
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
