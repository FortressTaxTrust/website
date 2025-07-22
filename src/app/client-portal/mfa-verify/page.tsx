'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Loader2, Smartphone } from 'lucide-react';
import { respondToMFA, saveTokens } from '@/utils/auth';
import { useAuth } from '@/contexts/AuthContext';

interface MFAFormData {
  code: string;
}

export default function MFAVerifyPage() {
  const router = useRouter();
  const { checkAuth } = useAuth();
  const [isVerifying, setIsVerifying] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MFAFormData>();

  const onSubmit = async (data: MFAFormData) => {
    setIsVerifying(true);
    try {
      const session = sessionStorage.getItem('mfa_session');
      const username = sessionStorage.getItem('mfa_username');
      
      if (!session || !username) {
        toast.error('Session expired. Please login again.');
        router.push('/client-portal');
        return;
      }

      const response = await respondToMFA(username, data.code, session);
      
      if (response.status === 'success') {
        // Save tokens and clear session storage
        saveTokens(response.tokens);
        sessionStorage.removeItem('mfa_session');
        sessionStorage.removeItem('mfa_username');
        
        // Update auth context
        checkAuth();
        
        toast.success('Login successful!');
        router.push('/client-portal/dashboard');
      }
    } catch (error: any) {
      console.error('MFA verification error:', error);
      toast.error(error.response?.data?.message || 'Invalid code. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
            <Smartphone className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Two-Factor Authentication
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the 6-digit code from your authenticator app
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <input
              {...register('code', {
                required: 'Verification code is required',
                pattern: {
                  value: /^\d{6}$/,
                  message: 'Code must be 6 digits',
                },
              })}
              id="code"
              type="text"
              maxLength={6}
              placeholder="000000"
              autoComplete="one-time-code"
              className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-lg text-center font-mono"
            />
            {errors.code && (
              <p className="mt-1 text-xs text-red-600">{errors.code.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isVerifying}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Verifying...
                </>
              ) : (
                'Verify Code'
              )}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                sessionStorage.clear();
                router.push('/client-portal');
              }}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Cancel and return to login
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Having trouble? Make sure your device's time is synchronized correctly.
          </p>
        </div>
      </div>
    </div>
  );
}