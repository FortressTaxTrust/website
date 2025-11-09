import React, { useState } from "react";

type Contact = {
  owner: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: string;
};

interface Props {
  onClose: () => void;
  onSave: (contact: Contact) => void;
}

const CreateContactDialog: React.FC<Props> = ({ onClose, onSave }) => {
  const [form, setForm] = useState<Contact>({
    owner: "Kevin MacKenzie",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    type: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.lastName || !form.type) return alert("Please fill all required fields");
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[450px] p-6 animate-fadeIn relative">
        <h2 className="text-lg font-semibold mb-4">Quick Create: Contact</h2>

        {/* Owner */}
        <div className="mb-3">
          <label className="text-sm text-gray-700">Contact Owner</label>
          <input
            type="text"
            name="owner"
            value={form.owner}
            disabled
            className="border rounded-md p-2 w-full bg-gray-100"
          />
        </div>

        {/* First + Last Name */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-sm text-gray-700">First Name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">Last Name <span className="text-red-500">*</span></label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="text-sm text-gray-700">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="text-sm text-gray-700">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>

        {/* Contact Type */}
        <div className="mb-6">
          <label className="text-sm text-gray-700">Contact Type <span className="text-red-500">*</span></label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
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

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded-md hover:bg-gray-100">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save and Associate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContactDialog;
