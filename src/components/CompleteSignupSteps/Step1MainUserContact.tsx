import React from "react";

interface MainUserContact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Props {
  contact: MainUserContact;
  setContact: React.Dispatch<React.SetStateAction<MainUserContact>>;
  onNext: () => void;
}

const Step1MainUserContact: React.FC<Props> = ({ contact, setContact }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
        Main User Contact Information
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            First Name
          </label>
          <input
            type="text"
            value={contact.firstName}
            onChange={(e) =>
              setContact((prev) => ({ ...prev, firstName: e.target.value }))
            }
            className="w-full border border-gray-400 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Last Name
          </label>
          <input
            type="text"
            value={contact.lastName}
            onChange={(e) =>
              setContact((prev) => ({ ...prev, lastName: e.target.value }))
            }
            className="w-full border border-gray-400 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Email
          </label>
          <input
            type="email"
            value={contact.email}
            onChange={(e) =>
              setContact((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full border border-gray-400 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Phone
          </label>
          <input
            type="text"
            value={contact.phone}
            onChange={(e) =>
              setContact((prev) => ({ ...prev, phone: e.target.value }))
            }
            className="w-full border border-gray-400 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Step1MainUserContact;
