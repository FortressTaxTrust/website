// CCorporationSteps.tsx
import React, { useMemo, useState } from "react";


export type CCorpFormData = {
  // Step 1 - Permanent Client Note
  clientNote: string;

  // Step 2 - Account Information
  accountName: string;
  phone1: string;
  state: string;
  accountOwner: string;
  taxId: string;
  stateFilingNumber: string;
  clientId: string;
  website: string;
  dateCreated: string;
  registeredAgent: string;
  stateOfFormation: string;

  // Step 3 - Address Information
  billingStreet: string;
  billingCity: string;
  billingState: string;
  billingCode: string;
  billingCountry: string;

  // Step 4 - Account Type (read-only for C-Corp)
  accountType: string;

  // Step 5 - Account Portal Links
  connectedContacts: string;
  workdriveFolderId: string;
  openCorpPage: string;
  url2: string;
  workdriveLink: string;

  // Step 6 - Description
  description: string;
};

const initialData: CCorpFormData = {
  clientNote: "",
  accountName: "",
  phone1: "",
  state: "",
  accountOwner: "",
  taxId: "",
  stateFilingNumber: "",
  clientId: "",
  website: "",
  dateCreated: "",
  registeredAgent: "",
  stateOfFormation: "-None-",
  billingStreet: "",
  billingCity: "",
  billingState: "",
  billingCode: "",
  billingCountry: "",
  accountType : "",
  connectedContacts: "",
  workdriveFolderId: "",
  openCorpPage: "",
  url2: "",
  workdriveLink: "",
  description: "",
};

export default function CCorporationSteps({ onBack , accountType }: { onBack: () => void , accountType : string}) {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<CCorpFormData>(initialData);

  const totalSteps = 6;

  const setField = <K extends keyof CCorpFormData>(
    key: K,
    value: CCorpFormData[K]
  ) => setForm((s) => ({ ...s, [key]: value }));

  const stepTitle = useMemo(() => {
    switch (step) {
      case 1:
        return "Permanent Client Note";
      case 2:
        return "Account Information";
      case 3:
        return "Address Information";
      case 4:
        return "Account Type";
      case 5:
        return "Account Portal Links";
      case 6:
        return "Description Information";
      default:
        return "";
    }
  }, [step]);

  // basic validation per step; extend as needed
  const valid = useMemo(() => {
    switch (step) {
      case 1:
        return form.clientNote.trim().length > 0;
      case 2:
        return (
          form.accountName.trim().length > 0 && form.taxId.trim().length > 0
        );
      case 3:
        return (
          form.billingStreet.trim().length > 0 &&
          form.billingCity.trim().length > 0
        );
      case 4:
        return form.accountType === accountType;
      case 5:
        // optional - allow skipping links but require at least one
        return (
          form.connectedContacts.trim().length > 0 ||
          form.workdriveFolderId.trim().length > 0 ||
          form.openCorpPage.trim().length > 0 ||
          form.workdriveLink.trim().length > 0 ||
          form.url2.trim().length > 0
        );
      case 6:
        return form.description.trim().length > 0;
      default:
        return false;
    }
  }, [step, form]);

  const goNext = () => {
    if (!valid) return;
    if (step < totalSteps) setStep((s) => s + 1);
  };

  const goPrev = () => {
    if (step === 1) return onBack();
    setStep((s) => s - 1);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header inside step */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="font-medium text-gray-700">
            Step {step} of {totalSteps}
          </span>
          <span className="text-gray-600">{stepTitle}</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Scrollable content region */}
      <div className="flex-1 overflow-y-auto pr-4 pb-6">
        {/* Step 1 - Permanent Client Note */}
        {step === 1 && (
          <section className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Client Note
              </label>
              <input
                name="clientNote"
                value={form.clientNote}
                onChange={(e) => setField("clientNote", e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Enter client note"
              />
            </div>
          </section>
        )}

        {/* Step 2 - Account Information */}
        {step === 2 && (
          <section className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">
                  Account Name <span className="text-red-500">*</span>
                </label>
                <input
                  value={form.accountName}
                  onChange={(e) => setField("accountName", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Phone 1</label>
                <input
                  value={form.phone1}
                  onChange={(e) => setField("phone1", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">State</label>
                <input
                  value={form.state}
                  onChange={(e) => setField("state", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Account Owner</label>
                <input
                  value={form.accountOwner}
                  onChange={(e) => setField("accountOwner", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Tax ID (EIN) <span className="text-red-500">*</span>
                </label>
                <input
                  value={form.taxId}
                  onChange={(e) => setField("taxId", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="XX-XXXXXXX"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  State Filing Number(s)
                </label>
                <input
                  value={form.stateFilingNumber}
                  onChange={(e) =>
                    setField("stateFilingNumber", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Client ID</label>
                <input
                  value={form.clientId}
                  onChange={(e) => setField("clientId", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Website</label>
                <input
                  value={form.website}
                  onChange={(e) => setField("website", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Date Created</label>
                <input
                  type="date"
                  value={form.dateCreated}
                  onChange={(e) => setField("dateCreated", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Registered Agent
                </label>
                <input
                  value={form.registeredAgent}
                  onChange={(e) => setField("registeredAgent", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  State of Formation
                </label>
                <select
                  value={form.stateOfFormation}
                  onChange={(e) => setField("stateOfFormation", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option>-None-</option>
                  <option>Alabama</option>
                  <option>Alaska</option>
                  <option>Arizona</option>
                  <option>California</option>
                  <option>Delaware</option>
                  {/* add full list as required */}
                </select>
              </div>
            </div>
          </section>
        )}

        {/* Step 3 - Address Information */}
        {step === 3 && (
          <section className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Billing Street</label>
                <input
                  value={form.billingStreet}
                  onChange={(e) => setField("billingStreet", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Billing City</label>
                <input
                  value={form.billingCity}
                  onChange={(e) => setField("billingCity", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Billing State</label>
                <input
                  value={form.billingState}
                  onChange={(e) => setField("billingState", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Billing Code</label>
                <input
                  value={form.billingCode}
                  onChange={(e) => setField("billingCode", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Billing Country</label>
                <input
                  value={form.billingCountry}
                  onChange={(e) => setField("billingCountry", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
          </section>
        )}

        {/* Step 4 - Account Type (read-only) */}
        {step === 4 && (
          <section className="space-y-4">
            <label className="text-sm text-gray-600">Account Type</label>
            <input
              value={form.accountType}
              readOnly
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2"
            />
            <p className="text-sm text-gray-500">
              C-Corporation selected — tax and reporting settings will follow
              this type.
            </p>
          </section>
        )}

        {/* Step 5 - Account Portal Links */}
        {step === 5 && (
          <section className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">
                  Connected Contacts
                </label>
                <input
                  value={form.connectedContacts}
                  onChange={(e) =>
                    setField("connectedContacts", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Contact IDs or emails"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Workdrive Folder ID (EXT)
                </label>
                <input
                  value={form.workdriveFolderId}
                  onChange={(e) =>
                    setField("workdriveFolderId", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">OpenCorp Page</label>
                <input
                  value={form.openCorpPage}
                  onChange={(e) => setField("openCorpPage", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">URL 2</label>
                <input
                  value={form.url2}
                  onChange={(e) => setField("url2", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Workdrive Link</label>
                <input
                  value={form.workdriveLink}
                  onChange={(e) => setField("workdriveLink", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
          </section>
        )}

        {/* Step 6 - Description */}
        {step === 6 && (
          <section className="space-y-4">
            <label className="text-sm text-gray-600">
              Description <span className="text-gray-400">(Required)</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              rows={5}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </section>
        )}
      </div>

      {/* Footer / Navigation */}
      <div className="mt-4 border-t border-gray-100 pt-4 flex items-center justify-between">
        <div>
          <button
            type="button"
            onClick={goPrev}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
          >
            {step === 1 ? "Back" : "Previous"}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              // optional quick save/draft: emit intermediate data
              // onFinish(form) - but we only finish at last step
              // For now keep it for final submission only
            }}
            className="px-3 py-2 rounded-md text-sm border border-gray-200 hover:bg-gray-50 hidden"
          >
            Save Draft
          </button>

          <button
            type="button"
            onClick={goNext}
            disabled={!valid}
            className={`px-5 py-2 rounded-md text-white ${
              valid
                ? "bg-primary hover:bg-primary-dark"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {step === totalSteps ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
