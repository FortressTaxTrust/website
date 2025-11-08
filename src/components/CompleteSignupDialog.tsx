import React, { useState } from "react";
import Step1SelectAccountType from "./CompleteSignupSteps/Step1SelectAccountType";
import BeneficialTrustSteps from "./CompleteSignupSteps/BuisnessAndBeneficialTrustSteps";
import CCorporationSteps from "./CompleteSignupSteps/CCorporationSteps";
import FirmAccountSteps from "./CompleteSignupSteps/FirmAccountSteps";
import IndividualSteps from "./CompleteSignupSteps/IndividualSteps";
import NonProfitSteps from "./CompleteSignupSteps/NonProfitSteps";
import PartnershipAndSCorp from "./CompleteSignupSteps/PartnershipAndSCorp";

const CompleteSignupDialog = ({ isOpen, onClose }: any) => {
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleNext = (selectedType: string) => {
    setAccountType(selectedType);
    setStep(2);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1SelectAccountType onNext={handleNext} />;
      case 2:
        return (
          <div className="space-y-6">
            {(accountType === "Beneficial Trust" || accountType === "Business Trust") && (
              <BeneficialTrustSteps onBack={() => setStep(1)} accountType={accountType} />
            )}
            {accountType === "C-Corporation" && (
              <CCorporationSteps onBack={() => setStep(1)} accountType={accountType} />
            )}
            {accountType === "Firm Account" && (
              <FirmAccountSteps onBack={() => setStep(1)} accountType={accountType} />
            )}
            {accountType === "Individual" && (
              <IndividualSteps onBack={() => setStep(1)} accountType={accountType} />
            )}
            {accountType === "Non-Profit" && (
              <NonProfitSteps onBack={() => setStep(1)} accountType={accountType} />

            )} 
            {(accountType === "Partnership" || accountType == 'SCorporation') && (
              <PartnershipAndSCorp onBack={() => setStep(1)} accountType={accountType} />
            )}
            

          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[95vw] max-w-[1500px] h-[85vh] overflow-y-auto p-10 shadow-2xl relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Complete Signup</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default CompleteSignupDialog;

// ========== NEXT WORK ==============   
// fix form fields and complete them                                                      // Saturday
// make common data components for each account                                           // Saturday
// make upload document step as last step                                                 // Saturday
// explore zoho api to create contact                                                     // Saturday
// make contacts and new contacts api and frontend to create and select contacts          // Saturday/Sunday
// make make api finish step and complete data api upload to zoho acconts                 // Sunday
// Testing Fixes and Issues                                                               // Sunday or Monday
// =================================
