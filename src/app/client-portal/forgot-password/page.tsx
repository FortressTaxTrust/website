'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Loader2, Mail, Key } from 'lucide-react';
import Link from 'next/link';
import { forgotPassword, confirmForgotPassword } from '@/utils/auth';

interface StepOneFormData {
  username: string;
}

interface StepTwoFormData {
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const stepOneForm = useForm<StepOneFormData>();
  const stepTwoForm = useForm<StepTwoFormData>();

  const onSubmitStepOne = async (data: StepOneFormData) => {
    setIsSubmitting(true);
    try {
      const response = await forgotPassword(data.username);
      
      if (response.status === 'success') {
        setUsername(data.username);
        setStep(2);
        toast.success('Verification code sent to your email!');
      }
    } catch (error: any) {
      console.error('Forgot password error:', error);
      const message = error.response?.data?.message || 'Failed to send reset code';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitStepTwo = async (data: StepTwoFormData) => {
    setIsSubmitting(true);
    try {
      const response = await confirmForgotPassword(username, data.code, data.newPassword);
      
      if (response.status === 'success') {
        toast.success('Password reset successfully! You can now log in.');
        router.push('/client-portal');
      }
    } catch (error: any) {
      console.error('Password reset error:', error);
      const message = error.response?.data?.message || 'Failed to reset password';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const password = stepTwoForm.watch('newPassword');

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {step === 1 ? (
          <>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Reset your password
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Enter your username and we'll send you a verification code
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={stepOneForm.handleSubmit(onSubmitStepOne)}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  {...stepOneForm.register('username', { required: 'Username is required' })}
                  id="username"
                  type="text"
                  autoComplete="username"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your username"
                />
                {stepOneForm.formState.errors.username && (
                  <p className="mt-1 text-xs text-red-600">
                    {stepOneForm.formState.errors.username.message}
                  </p>
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
                      Sending code...
                    </>
                  ) : (
                    'Send Reset Code'
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <Key className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Create new password
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Enter the code from your email and create a new password
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={stepTwoForm.handleSubmit(onSubmitStepTwo)}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                    Verification Code
                  </label>
                  <input
                    {...stepTwoForm.register('code', { required: 'Verification code is required' })}
                    id="code"
                    type="text"
                    placeholder="Enter verification code"
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  />
                  {stepTwoForm.formState.errors.code && (
                    <p className="mt-1 text-xs text-red-600">
                      {stepTwoForm.formState.errors.code.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    {...stepTwoForm.register('newPassword', {
                      required: 'New password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                        message: 'Password must contain uppercase, lowercase, number and special character',
                      },
                    })}
                    id="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="••••••••"
                  />
                  {stepTwoForm.formState.errors.newPassword && (
                    <p className="mt-1 text-xs text-red-600">
                      {stepTwoForm.formState.errors.newPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    {...stepTwoForm.register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: value => value === password || 'Passwords do not match',
                    })}
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="••••••••"
                  />
                  {stepTwoForm.formState.errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-600">
                      {stepTwoForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>
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
                      Resetting password...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </div>
            </form>
          </>
        )}

        <div className="text-center">
          <Link href="/client-portal" className="text-sm text-blue-600 hover:text-blue-500">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}