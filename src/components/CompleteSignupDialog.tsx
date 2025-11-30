"use client";

import { useState, useEffect } from "react";
import ContactManager, {
  type Contact,
} from "./CompleteSignupSteps/ContactManager";
import Step1SelectAccountType from "./CompleteSignupSteps/Step1SelectAccountType";
import Step2GiveDetails from "./CompleteSignupSteps/Step2GiveDetails";
import { parseJWT } from "../utils/parseTokenId";
import { Upload } from "lucide-react";
import UploadDocumentsStep from "./UploadDocumentsStep";

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
  const [loader , setLoader] = useState(false);
  const [addingSpouse, setAddingSpouse] = useState(false);
  const [addingChildren, setAddingChildren] = useState(false);
  const [checkedChild, setCheckedChild] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [accounts, setAccounts] = useState<[]>([]);
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
          accountName: `${firstName} ${lastName}`,

          connectedContacts: [
            {
              id: "1",
              firstName: firstName,
              lastName: lastName,
              email: payload?.email || "",
              type: "own",
              secondaryEmail: "",
              fax: "",
              ssn: "",
              importantNotes: "",
              dateOfBirth: "",
              phone: "",
              billingStreet: "",
              billingCity: "",
              billingState: "",
              billingCode: "",
              billingZip: "",
              billingCountry: "",
            },
          ],
        };
        return updated;
      });
    }
  }, []);
  useEffect(() => {
    setErrors(validateForm());
  }, [formDataArray]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
    if (errors) {
      const timer = setTimeout(() => setErrors([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errors]);

  const validateForm = (): string[] => {
    const errors: string[] = [];

    formDataArray.forEach((business) => {
      // Required business fields
      ["accountName", "accountType"].forEach((key) => {
        const v = (business as any)[key];
        if (!v || String(v).trim() === "") {
          errors.push(`${key} is required`);
        }
      });

      // Contacts
      business.connectedContacts.forEach((c) => {
        // Required contact fields
        ["firstName", "lastName", "email"].forEach((key) => {
          const v = (c as any)[key];
          if (!v || String(v).trim() === "") {
            errors.push(`${key} is required`);
          }
        });
        if (c.email && !/^\S+@\S+\.\S+$/.test(c.email)) {
          errors.push(`Email is invalid`);
        }
        if (c.secondaryEmail && !/^\S+@\S+\.\S+$/.test(c.secondaryEmail)) {
          errors.push(`Secondary Email is invalid`);
        }
        if (c.phone && !/^\+?\d{7,15}$/.test(c.phone)) {
          errors.push(`Phone is invalid`);
        }
        if (c.dateOfBirth && isNaN(Date.parse(c.dateOfBirth))) {
          errors.push(`Date of Birth is invalid`);
        }
        const cleanSSN = (c.ssn || "").trim();
        if (cleanSSN) {
          if (cleanSSN.length < 9 || cleanSSN.length > 12) {
            errors.push("SSN must contain 9 to 12 digits");
          }
        }
      });
    });

    return errors;
  };

  const handleAccountCreation = async () => {
    try {
      setErrors([]);
      setSuccessMessage("");

      const newErrors = validateForm();
      if (newErrors.length) {
        setErrors(newErrors);
        return;
      }

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;
      if (!token) throw new Error("Missing access token");

      setLoader(true)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/zoho/create/multiple-account`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ accountData: formDataArray, userData: user }),
        }
      );

      const response = await res.json();

      if (response.error || response.errors?.length) {
        console.log("response", response);

        if (response?.error) {
          setErrors([response.error]);
          return;
        }

        const flattenErrors = (errObj: any): string[] => {
          const messages: string[] = [];

          if (Array.isArray(errObj)) {
            errObj.forEach((e) => {
              if (typeof e === "string") {
                messages.push(e);
              } else if (e.message) {
                messages.push(e.message);
              } else {
                messages.push(...flattenErrors(e));
              }
            });
          } else if (typeof errObj === "object" && errObj !== null) {
            if (errObj.message) messages.push(errObj.message);
            Object.values(errObj).forEach((v) => {
              messages.push(...flattenErrors(v));
            });
          }

          return messages;
        };
        if(response.error) {
          setErrors([response.error]);
        } else {
          const allErrorMessages = flattenErrors(response.errors);
          console.log(allErrorMessages);
          setErrors(allErrorMessages.length ? allErrorMessages : ["Failed to create account."]);
        }
      } else {
        setSuccessMessage("Account and contacts created successfully!");
        setAccounts(response.data.accounts || []);
        console.log("Created accounts:", response.data.accounts);
        console.log("Created contacts:", response.data.contacts);
        setCurrentStep(3);
      }
      setLoader(false)

    } catch (err) {
      console.error(err);
       setLoader(false)
      setErrors(["Error creating account. Please try again."]);
    }
  };

  const goNextStep = () => {
    const errs = validateForm();
    if (errs.length > 0) {
      setErrors(errs);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };
  const goPrevStep = () => {
    const errs = validateForm();
    if (errs.length > 0) {
      setErrors(errs);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : 0));

  };

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

  console.log(formDataArray)
  if (!isOpen) return null;

  const formatSSN = (value: string) => {
    if (!value) return "";
    const digits = value.replace(/\D/g, "").slice(0, 12);
    if (digits.length <= 3) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    if (digits.length <= 9) return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;
    
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

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[100vw] max-w-[1100px] h-[95vh] overflow-y-auto p-10 shadow-2xl relative">
        {/* Success message */}
        {successMessage && (
          <div className="absolute top-4 left-8 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-md shadow-md max-w-[400px]">
            {successMessage}
          </div>
        )}

        {/* Error messages */}
        {errors.length > 0 && (
          <div className="absolute top-4 right-8 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-md shadow-md max-w-[300px]">
            {Array.from(new Set(errors)).map((err, i) => (
              <div key={i} className="text-sm w-full text-red-600">
                {err}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Complete Your Profile
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-gray-700 transition"
          >
            &times;
          </button>
        </div>

        {/* Step 0 */}
        {currentStep === 0 && (
          <div className="space-y-6">
            {/* Connected Contacts */}
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

            {/* Contact Details */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Contact Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "firstName", label: "First Name", required: true, disabled: true, placeholder: "Jhon", type: "text" },
                  { name: "lastName", label: "Last Name", required: true, disabled: true, placeholder: "Doe", type: "text" },
                  { name: "email", label: "Email", required: true, disabled: true, placeholder: "example@gmail.com", type: "email" },
                  { name: "secondaryEmail", label: "Secondary Email", placeholder: "example@gmail.com", type: "email" },
                  { name: "ssn", label: "SSN",  required: true, placeholder: "123-45-6789", type: "tel" },
                  { name: "importantNotes", label: "Important Notes", placeholder: "notes", type: "text" },
                  { name: "dateOfBirth", label: "Date of Birth", placeholder: "Select your date of birth", type: "date" },
                  { name: "phone", label: "Phone", placeholder: "(123) 456-7890", type: "tel" },
                  { name: "billingStreet", label: "Mailing Street", placeholder: "1234 Main st", type: "text" },
                  { name: "billingCity", label: "Mailing City", placeholder: "New York", type: "text" },
                  { name: "billingState", label: "Mailing State", placeholder: "NY", type: "text" },
                  { name: "billingZip", label: "Mailing Zip", placeholder: "10001", type: "tel" },
                  { name: "billingCountry", label: "Mailing Country", placeholder: "USA", type: "text" }
                ].map((field) => {
                  const mainContact = formDataArray[0].connectedContacts?.[0] || {};
                  return (
                    <div key={field.name} className="flex flex-col">
                      <label className="text-sm font-medium mb-1">
                        {field.label}
                        {field.required && "*"}
                      </label>
                      <input
                        type={  field.type || "text"}
                        disabled={field.disabled}
                        value={
                                  field.name.toLowerCase() === "ssn"
                                    ? formatSSN((mainContact as any)[field.name])
                                    : field.name.toLowerCase() === "phone"
                                    ? formatPhone((mainContact as any)[field.name])
                                    : (mainContact as any)[field.name] || ""
                                }
                        placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                        onChange={(e) => {
                          if (field.disabled) return;
                          let value = e.target.value;
                          setFormDataArray((prev) => {
                            const updated = [...prev];
                            const mainAccount = { ...updated[0] };
                            const contact = { ...mainAccount.connectedContacts[0] };
                            (mainAccount as any)[field.name] = value;
                            (contact as any)[field.name] = value;
                            if (field.name.toLowerCase() === "ssn") {
                              mainAccount.taxId = value.replace(/\D/g, "");
                              contact.ssn = value.replace(/\D/g, "");;
                            }
                            if (field.name.toLowerCase() === "phone") {
                              mainAccount.phone1 = value.replace(/\D/g, "");
                              mainAccount.phone = value.replace(/\D/g, "");
                              contact.phone = value.replace(/\D/g, "");
                            }
                            if (field.name.toLowerCase() === "billingzip") {
                              mainAccount.billingCode = value;
                              contact.billingZip = value;
                            }
                            mainAccount.connectedContacts[0] = contact;
                            updated[0] = mainAccount;
                            return updated;
                          });
                        }}
                        className={`border rounded-lg px-3 py-2 text-sm ${
                          field.disabled ? "bg-gray-100 cursor-not-allowed" : ""
                        } ${
                          errors.find((err) => err.includes(field.name))
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Spouse and Dependents */}
            <div className="space-y-4">
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

        {/* Step 1 */}
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
              handleAccountCreation();
              console.log("Finished:", formDataArray);
            }}
            loader= {loader}
          />
        )}

        {currentStep === 3 && (
          <UploadDocumentsStep onClose={onClose} accounts={accounts} />
        )}
      </div>
    </div>
  );
};

export default CompleteSignupDialog;
