import React, { useState, useEffect } from "react";

export type Contact = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  type?: string;
  taxId?: string;
  phone1?: string;
  billingStreet?: string;
  billingCity?: string;
  billingState?: string;
  billingCode?: string;
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
    firstName: "",
    lastName: "",
    email: "",
    type: "",
    taxId: "",
    phone1: "",
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingCode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedIds, setSelectedIds] = useState<string[]>(selected);

  useEffect(() => setSelectedIds(selected), [selected]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.lastName?.trim()) newErrors.lastName = "Last name is required";
    if (!form.firstName?.trim()) newErrors.firstName = "First name is required";
    return newErrors;
  };

  const handleCreate = () => {
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const contact: Contact = { ...form, id: genId() };
    setContacts((s) => [contact, ...s]);
    onCreate(contact);
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      type: "",
      taxId: "",
      phone1: "",
      billingStreet: "",
      billingCity: "",
      billingState: "",
      billingCode: "",
    });
    setErrors({});
  };

  const mainFields = [
    { name: "taxId", label: "Tax ID" },
    { name: "phone1", label: "Phone #1" },
    { name: "billingStreet", label: "Mailing Street" },
    { name: "billingCity", label: "Mailing City" },
    { name: "billingState", label: "Mailing State" },
    { name: "billingCode", label: "Mailing Code" },
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
            {/* Last Name */}

            {/* Contact Type */}
            {/* <div>
              <label className="text-sm font-medium text-gray-700">Type <span className="text-red-500">*</span></label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="border rounded px-3 py-2 w-full"
              >
                <option value="">-None-</option>
                <option>Client</option>
                <option>Firm Contact</option>
                <option>Client Connected</option>
                <option>Attorney</option>
                <option>CPA</option>
                <option>Prospect</option>
              </select>
              {errors.type && <p className="text-xs text-red-500 mt-1">{errors.type}</p>}
            </div> */}

            {/* First Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                className="border rounded px-3 py-2 w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                placeholder="Enter last name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="border rounded px-3 py-2 w-full"
              />
              {errors.lastName && (
                <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border rounded px-3 py-2 w-full"
              />
            </div>

            {/* Main User Fields */}
            {mainFields.map((field) => (
              <div key={field.name}>
                <label className="text-sm font-medium text-gray-700">
                  {field.label}{" "}
                  {field && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  value={(form as any)[field.name] || ""}
                  onChange={(e) =>
                    setForm({ ...form, [field.name]: e.target.value })
                  }
                  className="border rounded px-3 py-2 w-full"
                />
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
                    } ${c.lastName}`}</div>
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
