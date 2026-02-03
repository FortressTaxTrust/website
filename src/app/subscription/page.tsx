"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon } from "lucide-react";
import SquareCardForm from "@/components/Subscription/SquareCardForm";

interface Plan {
  id: string;
  name: string;
  price: string;
  duration_days: number;
  benefits: string[];
  metadata: JSON;
  square_plan_id?: string; // Kept for flexibility, but will use 'id' if not present
}

interface User {
  id: string;
  email: string;
  givenName: string;
  familyName: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export default function SubscriptionPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [address, setAddress] = useState<Address>({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });
  const [cardId, setCardId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'savingCard' | 'creatingSubscription'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [redirectPath, setRedirectPath] = useState<string>("/case-studies");

  useEffect(() => {
    const initialize = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        // Corrected redirect path
        sessionStorage.setItem("redirect_after_login", "/subscription");
        router.push("/client-portal");
        return;
      }

      // Get the redirect path from session storage, or use a default.
      const path = sessionStorage.getItem("redirect_after_login");
      if (path) {
        setRedirectPath(path);
      }

      try {
        // Fetch user profile to get user ID
        const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Handle invalid token gracefully
        if (!userRes.ok) {
          localStorage.removeItem("accessToken");
          sessionStorage.setItem("redirect_after_login", "/subscription");
          router.push("/client-portal");
          return;
        }
        const userData = await userRes.json();
        setUser({
          id: userData.user_data.id,
          email: userData.user_data.email,
          givenName: userData.user_data.first_name || '',
          familyName: userData.user_data.last_name || '',
        });
        
        // Auto-fill address if available from user profile
        setAddress(prevAddress => ({
          street: userData.user_data.street || prevAddress.street,
          city: userData.user_data.city || prevAddress.city,
          state: userData.user_data.state || prevAddress.state,
          zip: userData.user_data.zip || prevAddress.zip,
          country: userData.user_data.country || prevAddress.country,
        }));

        // Fetch subscription plans - this is a public endpoint
        const plansRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/plans`);
        if (!plansRes.ok) throw new Error("Failed to fetch subscription plans.");
        const plansData = await plansRes.json();
        setPlans(plansData.plans);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [router]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: name === 'country' && value.trim() === '' ? 'US' : value,
    }));
  };

  const handleSubscribe = async (savedCardId: string, customerId: string) => {
    console.log("")
    if (!selectedPlan || !user || !savedCardId || !customerId ) {
      setError("Please select a plan and save your card.");
      setSubmissionStatus('idle');
      return;
    }
    
    setError(null);
    setSubmissionStatus('creatingSubscription');
    try {
      const token = localStorage.getItem("accessToken");
      // The endpoint in your backend code was `/square/create-subscription`, let's align with that.
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/square/create-subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: user.id,
          subscription_id: selectedPlan.id, // Use the correct plan ID from your API
          card_id: savedCardId,
          customer_id: customerId
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        // Check for Square's specific internal server error
        if (result.errors && result.errors.some((e: any) => e.code === 'INTERNAL_SERVER_ERROR')) {
          throw new Error("There was an issue processing your payment with the provider. Please try again or use a different payment method.");
        }
        // Use the message from our backend, or a generic one
        throw new Error("Failed to create the subscription.");
      }

      router.push(`${redirectPath}`);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmissionStatus('idle');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold sm:text-5xl">Complete Your Subscription</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Just a few more steps to unlock premium access.
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Plan Selection */}
        <div>
          <h2 className="text-2xl font-bold mb-6">1. Select Your Plan</h2>
          <div className="space-y-4">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={`p-6 cursor-pointer border-2 transition-all ${
                  selectedPlan?.id === plan.id ? "border-primary shadow-lg" : "border-muted hover:border-primary/50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                    <div className="text-right lg:hidden">
                      <p className="text-3xl font-bold">${plan.price}</p>
                      <p className="text-muted-foreground text-sm">/{plan.duration_days <= 31 ? 'month' : 'year'}</p>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      {plan.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center">
                          <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-right hidden lg:block ml-4">
                    <p className="text-3xl font-bold">${plan.price}</p>
                    <p className="text-muted-foreground text-sm">/{plan.duration_days <= 31 ? 'month' : 'year'}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Address and Payment */}
        <div className={!selectedPlan ? "opacity-50 pointer-events-none" : ""}>
          <h2 className="text-2xl font-bold mb-6">2. Billing Information</h2>
          <Card className="p-6">
            <div className="space-y-6">
              {/* Address Form */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Billing Address</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input id="street" name="street" value={address.street} onChange={handleAddressChange} placeholder="123 Main St" />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={address.city} onChange={handleAddressChange} placeholder="Anytown" />
                  </div>
                  <div>
                    <Label htmlFor="state">State / Province</Label>
                    <Input id="state" name="state" value={address.state} onChange={handleAddressChange} placeholder="CA" />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP / Postal Code</Label>
                    <Input id="zip" name="zip" value={address.zip} onChange={handleAddressChange} placeholder="12345" />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" name="country" value={address.country} onChange={handleAddressChange} />
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
                {!loading && user ? (
                  <SquareCardForm
                    user={user}
                    address={address}
                    onCardSaved={(savedCardId, customerId) => handleSubscribe(savedCardId, customerId)}
                    submissionStatus={submissionStatus}
                    setSubmissionStatus={setSubmissionStatus}
                  />
                ) : (
                  <p className="text-muted-foreground">Loading payment form...</p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}