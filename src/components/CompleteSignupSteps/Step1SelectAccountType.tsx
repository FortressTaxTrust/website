"use client"

import type React from "react"
import { useState } from "react"

const accountTypes = [
  "Beneficial Trust",
  "Business Trust",
  "C-Corporation",
  "FIRM ACCOUNT",
  "Non-Profit",
  "Partnership",
  "S-Corporation",
]

export interface FormDataStep1 {
  clientNote: string
  accountName: string
  taxId: string
  clientId: string
  trustee: string
  complianceOfficer: string
  dateCreated: string
  phone1: string
  fax: string
  accountOwner: string
  trusteeName: string
  billingStreet: string
  billingCity: string
  billingState: string
  billingCountry: string
  billingCode: string
  accountType: string
  connectedContacts: any[]
  openCorpPage: string
  workDriveId: string
  url2: string
  workDriveLink: string
  description: string
  state: string
  registeredAgent: string
  stateOfFormation: string
  stateFilingNumber: string
  website: string
  phone: string
}

interface Step1Props {
  formDataArray: FormDataStep1[]
  setFormDataArray: React.Dispatch<React.SetStateAction<FormDataStep1[]>>
  onNext: () => void
  onBack: () => void
  onSetAddingBusinessIndex?: (index: number | null) => void
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
}

const Step1SelectAccountType: React.FC<Step1Props> = ({
  formDataArray,
  setFormDataArray,
  onNext,
  onBack,
  onSetAddingBusinessIndex,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [addingBusinessIndex, setAddingBusinessIndex] = useState<number | null>(null)

  const individualAccount = formDataArray[0]
  const businessAccounts = formDataArray.slice(1)

  const handleAddBusiness = () => {
    const newIndex = businessAccounts.length
    setAddingBusinessIndex(newIndex)
    onSetAddingBusinessIndex?.(newIndex + 1)
    setFormDataArray((prev) => [...prev, { ...defaultBusiness, accountType: "Business Trust" }])
  }

  const handleCancelAddBusiness = () => {
    if (addingBusinessIndex !== null) {
      setFormDataArray((prev) => prev.slice(0, -1))
      setAddingBusinessIndex(null)
      onSetAddingBusinessIndex?.(null)
    }
  }

  const handleChangeBusinessName = (index: number, name: string) => {
    setFormDataArray((prev) => {
      const updated = [...prev]
      updated[index + 1].accountName = name
      return updated
    })
  }

  const handleChangeBusinessType = (index: number, type: string) => {
    setFormDataArray((prev) => {
      const updated = [...prev]
      updated[index + 1].accountType = type
      return updated
    })
  }

  const handleRemoveBusiness = (index: number) => {
    setFormDataArray((prev) => prev.filter((_, i) => i !== index + 1))
    if (addingBusinessIndex === index) {
      setAddingBusinessIndex(null)
      onSetAddingBusinessIndex?.(null)
    }
  }

  const handleContinue = () => {
    const newErrors: { [key: string]: string } = {}

    businessAccounts.forEach((b, i) => {
      if (!b.accountName.trim()) newErrors[`business-${i}`] = "Account name cannot be empty"
      if (b.accountType === "-None-" || !b.accountType) newErrors[`business-type-${i}`] = "Select an account type"
    })

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      setAddingBusinessIndex(null)
      onSetAddingBusinessIndex?.(null)
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800">Step 1: Your Accounts</h3>

      {/* Individual Account (Read-only) */}
      <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Individual Account</p>
            <p className="text-lg font-semibold text-gray-800">{individualAccount.accountName}</p>
          </div>
          <div className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded">Individual</div>
        </div>
      </div>

      {/* Business Accounts */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-3">Business Accounts</h4>
        {businessAccounts.length === 0 ? (
          <p className="text-gray-500 text-sm py-4">No business accounts added yet</p>
        ) : (
          <div className="space-y-3 mb-4">
            {businessAccounts.map((b, idx) => (
              <div key={idx} className="p-4 border border-gray-300 rounded-lg space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                    <input
                      type="text"
                      placeholder="Enter business account name"
                      value={b.accountName}
                      onChange={(e) => handleChangeBusinessName(idx, e.target.value)}
                      className={`w-full border rounded-lg px-3 py-2 text-sm ${
                        errors[`business-${idx}`] ? "border-red-500 bg-red-50" : "border-gray-300"
                      }`}
                    />
                    {errors[`business-${idx}`] && (
                      <p className="text-xs text-red-600 mt-1">{errors[`business-${idx}`]}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveBusiness(idx)}
                    className="self-end px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-300 text-sm font-medium transition"
                  >
                    Remove
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                  <select
                    value={b.accountType}
                    onChange={(e) => handleChangeBusinessType(idx, e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 text-sm ${
                      errors[`business-type-${idx}`] ? "border-red-500 bg-red-50" : "border-gray-300"
                    }`}
                  >
                    {accountTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors[`business-type-${idx}`] && (
                    <p className="text-xs text-red-600 mt-1">{errors[`business-type-${idx}`]}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={handleAddBusiness}
          className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-700 hover:border-blue-500 hover:bg-blue-50 font-medium transition"
        >
          + Add Business Account
        </button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-3 mt-8">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleContinue}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Step1SelectAccountType
