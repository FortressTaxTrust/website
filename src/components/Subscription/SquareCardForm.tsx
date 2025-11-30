"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface User {
  id: string;
  email: string;
  givenName: string;
  familyName: string;
}

interface Props {
  user: User;
  address: Address;
  onCardSaved: (cardId: string, customerId: string) => void;
  submissionStatus: "idle" | "savingCard" | "creatingSubscription";
  setSubmissionStatus: (
    status: "idle" | "savingCard" | "creatingSubscription"
  ) => void;
}

declare global {
  interface Window {
    Square: any;
  }
}

const SquareCardForm: React.FC<Props> = ({
  user,
  address,
  onCardSaved,
  submissionStatus,
  setSubmissionStatus,
}) => {
  const payments = useRef<any>(null);

  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [cardReady, setCardReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID! || "sandbox-sq0idb-aDqfJYN8w4TBmSx507Y5ng";
  const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID! || "LJT99M9JCVW26";
  // Using a ref for the card element to avoid re-renders
  const cardRef = useRef<any>(null);

  /** ---------------------------------------------------
   *  Initialize Square after script loads
   * --------------------------------------------------- */
  const initializeSquare = useCallback(async () => {
    try {
      if (!window.Square) {
        setError("Square SDK failed to load. Please refresh the page.");
        return;
      }

      // Prevent double init
      if (payments.current) return;

      payments.current = await window.Square.payments(appId, locationId);

      const cardElement = await payments.current.card();
      await cardElement.attach("#sq-card-container");

      cardRef.current = cardElement;
      setCardReady(true);
    } catch (err) {
      console.error("Square Init Error:", err);
      setError("Failed to initialize payment form.");
    }
  }, [appId, locationId]);

  // Effect to load the Square SDK script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sandbox.web.squarecdn.com/v1/square.js";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.onload = () => setSdkLoaded(true);
    script.onerror = () => setError("Failed to load Square SDK.");
    document.head.appendChild(script);

    return () => {
      // Clean up script from document head
      const existingScript = document.querySelector(
        `script[src="${script.src}"]`
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  useEffect(() => {
    if (sdkLoaded) {
      initializeSquare();
    }
  }, [sdkLoaded, initializeSquare]);

  /** ---------------------------------------------------
   *  Submit Handler
   * --------------------------------------------------- */
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!cardRef.current || !cardReady || submissionStatus !== "idle") return;

    setError(null);
    setSubmissionStatus("savingCard");

    try {
      const tokenResult = await cardRef.current.tokenize();


      if (tokenResult.status !== "OK") {
        console.error("Tokenization failed:", tokenResult.errors);
        throw new Error(
          tokenResult.errors?.[0]?.message || "Card tokenization failed."
        );
      }

      console.log("Source ID:", tokenResult.token);

      // 2. Save the card to your backend
      // Note: The backend endpoint in your code was `/square/save-card`, so I've updated the path.
      const token = localStorage.getItem("accessToken");
      const saveCardRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/subscriptions/square/save-card`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: user.id,
            source_id: tokenResult.token,
            card_information : {
              ...address
            }
          }),
        }
      );

      const saveData = await saveCardRes.json();
      if (!saveCardRes.ok || saveData.status !== "success") {
        throw new Error(saveData.message || "Failed to save payment method.");
      }

      console.log("saved", saveData)

      // 3. Pass the new card ID to the parent
      onCardSaved(saveData.card.id, saveData.card.customerId);
    } catch (err: any) {
      // If saving the card fails, reset the state to idle
      setSubmissionStatus("idle");
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="space-y-3">
      {/* Card Container */}
      <div
        id="sq-card-container"
        className={`min-h-[60px] rounded-md border p-3 transition ${
          !cardReady ? "animate-pulse bg-gray-100" : "bg-white"
        }`}
      ></div>

      {/* Error Message */}
      {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

      {/* Button */}
      <button
        onClick={handleSubmit}
        disabled={!sdkLoaded || !cardReady || submissionStatus !== "idle"}
        className="w-full py-3 rounded-lg bg-primary text-primary-foreground 
          hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed
          font-semibold tracking-wide transition text-white"
      >
        {(() => {
          if (!sdkLoaded) return "Loading...";
          if (!cardReady) return "Preparing...";
          switch (submissionStatus) {
            case "savingCard":
              return "Verifying Card Details...";
            case "creatingSubscription":
              return "Creating Subscription...";
            default:
              return  "Confirm Payment";
          }
        })()}
      </button>
    </div>
  );
};

export default SquareCardForm;
