import React, { useState, useEffect } from "react";

export type Contact = {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  type?: string;
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
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    type: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedIds, setSelectedIds] = useState<string[]>(selected);

  useEffect(() => setSelectedIds(selected), [selected]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email address";
    if (form.phone && !/^\+?[0-9\s-]{7,15}$/.test(form.phone))
      newErrors.phone = "Invalid phone number";
    return newErrors;
  };

  const handleCreate = () => {
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const contact: Contact = {
      id: genId(),
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      type: form.type.trim() || "Client",
    };

    setContacts((s) => [contact, ...s]);
    onCreate(contact);
    setForm({ firstName: "", lastName: "", email: "", phone: "", type: "" });
    setErrors({});
  };

  const renderLabel = (label: string, required = false) => (
    <label className="text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
  );

  return (
    // Overlay + Centering
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6">
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

        {/* Create Contact Form */}
        <div className="space-y-4 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              {renderLabel("First name", true)}
              <input
                placeholder="Enter first name"
                value={form.firstName}
                onChange={(e) =>
                  setForm((s) => ({ ...s, firstName: e.target.value }))
                }
                className="border rounded px-3 py-2 w-full"
              />
              {errors.firstName && (
                <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              {renderLabel("Last name", true)}
              <input
                placeholder="Enter last name"
                value={form.lastName}
                onChange={(e) =>
                  setForm((s) => ({ ...s, lastName: e.target.value }))
                }
                className="border rounded px-3 py-2 w-full"
              />
              {errors.lastName && (
                <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              {renderLabel("Email", true)}
              <input
                placeholder="Enter email"
                value={form.email}
                onChange={(e) =>
                  setForm((s) => ({ ...s, email: e.target.value }))
                }
                className="border rounded px-3 py-2 w-full"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              {renderLabel("Phone")}
              <input
                placeholder="Enter phone number"
                value={form.phone}
                onChange={(e) =>
                  setForm((s) => ({ ...s, phone: e.target.value }))
                }
                className="border rounded px-3 py-2 w-full"
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 items-end">
            <div className="flex-1">
              {renderLabel("Type")}
              <select
                value={form.type}
                onChange={(e) =>
                  setForm((s) => ({ ...s, type: e.target.value }))
                }
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
            </div>

            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg h-fit"
            >
              + Add
            </button>
          </div>
        </div>

        {/* Contact List */}
        <div className="border-t pt-3 max-h-64 overflow-y-auto">
          {contacts.length === 0 ? (
            <div className="text-sm text-gray-500">No contacts yet</div>
          ) : (
            contacts.map((c) => {
              const isSelected = selectedIds.includes(c.id);
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
                    <div className="text-sm font-medium">
                      {`${c.firstName ? c.firstName + " " : ""}${c.lastName}`}
                    </div>
                    <div className="text-xs text-gray-500">
                      {c.email || c.phone || c.type}
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
