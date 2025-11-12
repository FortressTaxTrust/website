"use client";

import { useState, useEffect } from "react";
import ContactManager, {
  type Contact,
} from "./CompleteSignupSteps/ContactManager";
import Step1SelectAccountType from "./CompleteSignupSteps/Step1SelectAccountType";
import Step2GiveDetails from "./CompleteSignupSteps/Step2GiveDetails";
import { parseJWT } from "../utils/parseTokenId";

interface User {
  email: string;
  username: string;
  given_name: string;
}

export interface FormDataStep1 {
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

const defaultBusiness: FormDataStep1 = {
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
  accountType: "Business Trust",
  connectedContacts: [],
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
};

const genId = () => Math.random().toString(36).slice(2, 9);

interface CompleteSignupDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompleteSignupDialog = ({
  isOpen,
  onClose,
}: CompleteSignupDialogProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [formDataArray, setFormDataArray] = useState<FormDataStep1[]>([
    { ...defaultBusiness },
  ]);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [addingSpouse, setAddingSpouse] = useState(false);
  const [addingChildren, setAddingChildren] = useState(false);
  const [checkedChild, setCheckedChild] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [addingBusinessIndex, setAddingBusinessIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    const idToken =
      typeof window !== "undefined" ? localStorage.getItem("idToken") : null;
    if (idToken) {
      const payload = parseJWT(idToken);
      const firstName = payload?.given_name || "";
      const lastName = payload?.family_name || "";

      setUser({
        email: payload?.email,
        username: payload?.username || payload?.["cognito:username"],
        given_name: firstName,
      });

      // Initialize main account with current user
      setFormDataArray((prev) => {
        const updated = [...prev];
        updated[0] = {
          ...updated[0],
          accountType: "Individual",
          accountName: `${firstName}'s Individual Account`,
          connectedContacts: [
            {
              id: "1",
              firstName: firstName,
              lastName: lastName,
              email: payload?.email || "",
              type: "own",
              secondaryEmail: "",
              fax: "",
              tin: "",
              importantNotes: "",
              dateOfBirth: "",
              phone: "",
              billingStreet: "",
              billingCity: "",
              billingState: "",
              billingCode: "",
              billingZip: "",
            },
          ],
        };
        return updated;
      });
    }
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  console.log("form data", formDataArray);
  const addOrIgnoreContact = (contact: Contact) => {
    setFormDataArray((prev) => {
      const updated = [...prev];
      if (!updated[0].connectedContacts.find((c) => c.id === contact.id)) {
        updated[0] = {
          ...updated[0],
          connectedContacts: [...updated[0].connectedContacts, contact],
        };
      }
      return updated;
    });
  };

  const removeContact = (id?: string) => {
    if (!id) return;
    setFormDataArray((prev) => {
      const updated = [...prev];
      updated[0] = {
        ...updated[0],
        connectedContacts: updated[0].connectedContacts.filter(
          (c) => c.id !== id
        ),
      };
      return updated;
    });
  };

  const goNextStep = () => setCurrentStep((prev) => prev + 1);
  const goPrevStep = () => setCurrentStep((prev) => (prev > 0 ? prev - 1 : 0));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[100vw] max-w-[1100px] h-[95vh] overflow-y-auto p-10 shadow-2xl relative">
        {successMessage && (
          <div className="absolute top-4 left-8 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-md shadow-md max-w-[400px]">
            {successMessage}
          </div>
        )}
        {errors.length > 0 && (
          <div className="absolute top-4 right-8 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-md shadow-md max-w-[300px]">
            {errors.map((err, i) => (
              <div key={i} className="text-sm">
                {err}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Complete Your Profile
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-gray-700 transition"
          >
            &times;
          </button>
        </div>

        {currentStep === 0 && (
          <div className="space-y-6">
            {/* List of Connected Contacts */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Connected Contacts</h3>
              {formDataArray[0].connectedContacts.length === 0 && (
                <p className="text-sm text-gray-500">
                  No connected accounts yet.
                </p>
              )}
              <ul>
                {formDataArray[0].connectedContacts.map((c) => (
                  <li
                    key={c.id}
                    className="flex justify-between items-center py-1"
                  >
                    <span>
                      {c.firstName} {c.lastName} ({c.type})
                    </span>
                    {c.type !== "own" && (
                      <button
                        className="text-red-500 text-sm"
                        onClick={() => removeContact(c.id)}
                      >
                        Remove
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Spouse / Dependents */}
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Contact Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: "firstName",
                      label: "First Name",
                      required: true,
                      disabled: true,
                    },
                    {
                      name: "lastName",
                      label: "Last Name",
                      required: true,
                      disabled: true,
                    },
                    {
                      name: "email",
                      label: "Email",
                      required: true,
                      disabled: true,
                    },
                    { name: "secondaryEmail", label: "Secondary Email" },
                    { name: "fax", label: "Fax" },
                    { name: "tin", label: "TIN" },
                    { name: "importantNotes", label: "Important Notes" },
                    { name: "dateOfBirth", label: "Date of Birth" },
                    { name: "phone", label: "Phone" },
                    { name: "billingStreet", label: "Mailing Street" },
                    { name: "billingCity", label: "Mailing City" },
                    { name: "billingState", label: "Mailing State" },
                    { name: "billingCode", label: "Mailing Code" },
                    { name: "billingZip", label: "Mailing Zip" },
                  ].map((field) => {
                    const mainContact =
                      formDataArray[0].connectedContacts?.[0] || {};
                    return (
                      <div key={field.name} className="flex flex-col">
                        <label className="text-sm font-medium mb-1">
                          {field.label}
                          {field.required && "*"}
                        </label>
                        <input
                          type={field.name === "dateOfBirth" ? "date" : "text"}
                          disabled={field.disabled}
                          value={(mainContact as any)[field.name] || ""}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          onChange={(e) => {
                            if (field.disabled) return;
                            setFormDataArray((prev) => {
                              const updated = [...prev];
                              (updated[0].connectedContacts[0] as any)[
                                field.name
                              ] = e.target.value;
                              return updated;
                            });
                          }}
                          className={`border rounded-lg px-3 py-2 text-sm ${
                            field.disabled
                              ? "bg-gray-100 cursor-not-allowed"
                              : ""
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Spouse Section */}
              <div className="border rounded-lg p-4">
                <label className="inline-flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={
                      !!formDataArray[0].connectedContacts.find(
                        (c) => c.type === "Spouse"
                      )
                    }
                    disabled={
                      !!formDataArray[0].connectedContacts.find(
                        (c) => c.type === "Spouse"
                      )
                    }
                    onChange={(e) => setAddingSpouse(e.target.checked)}
                    className="form-checkbox h-4 w-4"
                  />
                  <span className="font-medium">
                    Do you have a spouse? (Joint Account)
                  </span>
                </label>
                {addingSpouse &&
                  !formDataArray[0].connectedContacts.find(
                    (c) => c.type === "Spouse"
                  ) && (
                    <ContactManager
                      existing={formDataArray[0].connectedContacts}
                      selected={formDataArray[0].connectedContacts
                        .map((c) => c.id)
                        .filter((id): id is string => Boolean(id))}
                      onClose={() => setAddingSpouse(false)}
                      onCreate={(c) =>
                        addOrIgnoreContact({ ...c, type: "Spouse" })
                      }
                      onSelect={(c) =>
                        addOrIgnoreContact({ ...c, type: "Spouse" })
                      }
                    />
                  )}
              </div>

              {/* Dependents Section */}
              <div className="border rounded-lg p-4">
                <label className="inline-flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={
                      formDataArray[0].connectedContacts.find(
                        (c) => c.type === "Dependent"
                      )
                        ? true
                        : checkedChild
                    }
                    className="form-checkbox h-4 w-4"
                    onChange={(e) =>
                      formDataArray[0].connectedContacts.find(
                        (c) => c.type === "Dependent"
                      )
                        ? true
                        : setCheckedChild(e.target.checked)
                    }
                  />
                  <span className="font-medium">Do you have dependents?</span>
                </label>
                {addingChildren && (
                  <ContactManager
                    existing={formDataArray[0].connectedContacts}
                    selected={formDataArray[0].connectedContacts
                      .map((c) => c.id)
                      .filter((id): id is string => Boolean(id))}
                    onClose={() => setAddingChildren(false)}
                    onCreate={(c) =>
                      addOrIgnoreContact({ ...c, type: "Dependent" })
                    }
                    onSelect={(c) =>
                      addOrIgnoreContact({ ...c, type: "Dependent" })
                    }
                  />
                )}
              </div>
              <div>
                {checkedChild && (
                  <button
                    type="button"
                    className="mt-2 px-2 py-1 w-32 border rounded text-sm hover:bg-gray-50"
                    onClick={() => setAddingChildren(true)}
                  >
                    + Add
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={goPrevStep}
                  className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100 transition"
                  style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
                >
                  Back
                </button>

                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100 transition"
                  style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
                >
                  Cancel
                </button>

                <button
                  onClick={goNextStep}
                  className="px-4 py-2 rounded-lg hover:bg-[#4f5a50] transition"
                  style={{ backgroundColor: "#5A6863", color: "#FFFFFF" }}
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <Step1SelectAccountType
            formDataArray={formDataArray}
            setFormDataArray={setFormDataArray}
            onNext={goNextStep}
            onBack={goPrevStep}
            onSetAddingBusinessIndex={setAddingBusinessIndex}
          />
        )}

        {currentStep === 2 && (
          <Step2GiveDetails
            formDataArray={formDataArray}
            setFormDataArray={setFormDataArray}
            onBack={goPrevStep}
            addingBusinessIndex={addingBusinessIndex ?? undefined}
            onFinish={() => {
              setSuccessMessage("✓ Profile setup complete!");
              console.log("Finished:", formDataArray);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CompleteSignupDialog;
