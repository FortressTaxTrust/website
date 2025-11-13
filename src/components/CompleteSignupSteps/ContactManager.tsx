import React, { useState, useEffect } from "react";

export type Contact = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  secondaryEmail?: string;
  fax?: string;
  type?: string;
  ssn?: string;
  importantNotes?: string;
  dateOfBirth?: string;
  phone?: string;
  billingStreet?: string;
  billingCity?: string;
  billingState?: string;
  billingCode?: string;
  billingZip?: string;
  billingCountry?: string;
};

interface ContactManagerProps {
  onClose: () => void;
  onCreate: (c: Contact) => void;
  onSelect: (c: Contact) => void;
  existing?: Contact[];
  selected?: string[];
}

const genId = () => Math.random().toString(36).slice(2, 9);

const ContactManager: React.FC<ContactManagerProps> = ({
  onClose,
  onCreate,
  onSelect,
  existing = [],
  selected = [],
}) => {
  const [contacts, setContacts] = useState<Contact[]>(existing);
  const [form, setForm] = useState<Contact>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    secondaryEmail: "",
    fax: "",
    type: "",
    ssn: "",
    importantNotes: "",
    dateOfBirth: "",
    phone: "",
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingCountry: "",
    billingCode: "",
    billingZip: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedIds, setSelectedIds] = useState<string[]>(selected);

  const validateContact = (form: Contact): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    contactFields.forEach((field) => {
      const value = (form[field.name] ?? "").toString().trim();
      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }
      if (!value) return;
      switch (field.name) {
        case "email":
        case "secondaryEmail":
          if (!/^\S+@\S+\.\S+$/.test(value)) {
            newErrors[field.name] = `${field.label} is not a valid email`;
          }
          break;
        case "phone":
          if (!/^\+?\d{7,15}$/.test(value)) {
            newErrors[
              field.name
            ] = `${field.label} must be a valid phone number`;
          }
          break;
        case "dateOfBirth":
          if (isNaN(Date.parse(value))) {
            newErrors[field.name] = `${field.label} must be a valid date`;
          }
          break;
        case "ssn":
          if (!/^\d{9,15}$/.test(value)) {
            newErrors[field.name] = `${field.label} must be a valid SSN`;
          }
          break;
        case "billingZip":
          if (!/^\d{4,10}$/.test(value)) {
            newErrors[field.name] = `${field.label} must be a valid ZIP code`;
          }
          break;
        default:
          break;
      }
    });

    return newErrors;
  };

  const handleCreate = () => {
    const validationErrors = validateContact(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const contact: Contact = { ...form, id: genId() };
    setContacts((s) => [contact, ...s]);
    onCreate(contact);
    setForm({});
    setErrors({});
  };

  // Dynamically generate all fields from Contact interface
  const contactFields: {
    name: keyof Contact;
    label: string;
    required?: boolean;
  }[] = [
    { name: "firstName", label: "First Name", required: true },
    { name: "lastName", label: "Last Name", required: true },
    { name: "email", label: "Email" },
    { name: "secondaryEmail", label: "Secondary Email" },
    { name: "fax", label: "Fax" },
    { name: "ssn", label: "SSN" },
    { name: "importantNotes", label: "Important Notes" },
    { name: "dateOfBirth", label: "Date of Birth" },
    { name: "phone", label: "Phone" },
    { name: "billingStreet", label: "Mailing Street" },
    { name: "billingCity", label: "Mailing City" },
    { name: "billingState", label: "Mailing State" },
    // { name: "billingCode", label: "Mailing Code" },
    { name: "billingZip", label: "Mailing Zip" },
    { name: "billingCountry", label: "Mailing Country" },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-700 text-lg">
            Contact Manager
          </h4>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contactFields.map((field) => (
              <div key={field.name as string}>
                <label className="text-sm font-medium text-gray-700">
                  {field.label}{" "}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={field.name === "dateOfBirth" ? "date" : "text"}
                  placeholder={`Enter ${field.label}`}
                  value={(form[field.name] as string) || ""}
                  onChange={(e) =>
                    setForm({ ...form, [field.name]: e.target.value })
                  }
                  className="border rounded px-3 py-2 w-full"
                />
                {errors[field.name] && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>

        {/* Contact List */}
        <div className="border-t pt-3 max-h-64 overflow-y-auto">
          {contacts.length === 0 ? (
            <div className="text-sm text-gray-500">No contacts yet</div>
          ) : (
            contacts.map((c) => {
              const isSelected = c.id ? selectedIds.includes(c.id) : false;
              return (
                <div
                  key={c.id}
                  className={`p-3 rounded-lg cursor-pointer flex items-center justify-between transition ${
                    isSelected
                      ? "bg-blue-100 border border-blue-400"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => onSelect(c)}
                >
                  <div>
                    <div className="text-sm font-medium">{`${
                      c.firstName || ""
                    } ${c.lastName || ""}`}</div>
                    <div className="text-xs text-gray-500">
                      {c.email || c.type}
                    </div>
                  </div>
                  <div
                    className={`text-xs font-medium ${
                      isSelected ? "text-blue-600" : "text-gray-500"
                    }`}
                  >
                    {isSelected ? "Selected" : "Select"}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactManager;
