import React, { useState } from "react";

const accountTypes = [
  "-None-",
  "Beneficial Trust",
  "Business Trust",
  "C-Corporation",
  "Firm Account",
  "Individual",
  "Non-Profit",
  "Partnership",
  "S-Corporation",
];

const Step1SelectAccountType = ({
  onNext,
}: {
  onNext: (type: string) => void;
}) => {
  const [accountType, setAccountType] = useState("-None-");

  const handleContinue = () => {
    if (accountType === "-None-") return alert("Please select an account type");
    onNext(accountType);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800">Account Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Name
          </label>
          <input
            type="text"
            placeholder="Enter account name"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone 1
          </label>
          <input
            type="text"
            placeholder="Enter phone number"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Account Type
        </label>
        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          className={`w-full border ${
            accountType === "-None-" ? "border-red-400" : "border-gray-300"
          } rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none`}
        >
          {accountTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleContinue}
          className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark disabled:opacity-50"
          disabled={accountType === "-None-"}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Step1SelectAccountType;
