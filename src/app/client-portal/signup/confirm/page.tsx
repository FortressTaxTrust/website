'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Loader2, CheckCircle } from 'lucide-react';
import { confirmSignup } from '@/utils/auth';

interface ConfirmFormData {
  code: string;
}

export default function ConfirmSignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmFormData>();

  useEffect(() => {
    const savedUsername = sessionStorage.getItem('signup_username');
    if (!savedUsername) {
      toast.error('No signup session found. Please sign up again.');
      router.push('/client-portal/signup');
    } else {
      setUsername(savedUsername);
    }
  }, [router]);

  const onSubmit = async (data: ConfirmFormData) => {
    setIsSubmitting(true);
    try {
      const response = await confirmSignup(username, data.code);
      
      if (response.status === 'success') {
        sessionStorage.removeItem('signup_username');
        toast.success('Email verified successfully! You can now log in.');
        router.push('/client-portal');
      }
    } catch (error: any) {
      console.error('Confirmation error:', error);
      const message = error.response?.data?.message || 'Failed to verify email';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a verification code to your email address
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
                minLength: {
                  value: 6,
                  message: 'Code must be at least 6 characters',
                },
              })}
              id="code"
              type="text"
              placeholder="Enter your verification code"
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            />
            {errors.code && (
              <p className="mt-1 text-xs text-red-600">{errors.code.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Verifying...
                </>
              ) : (
                'Verify Email'
              )}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem('signup_username');
                router.push('/client-portal/signup');
              }}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Start over with a new account
            </button>
          </div>
        </form>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> The verification code was sent to the email address you provided during signup. 
            Please check your spam folder if you don't see it in your inbox.
          </p>
        </div>
      </div>
    </div>
  );
}