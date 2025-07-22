'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import QRCode from 'qrcode.react';
import toast from 'react-hot-toast';
import { Loader2, Copy, Check } from 'lucide-react';
import { setupAuthenticator, verifyAuthenticator, login, saveTokens } from '@/utils/auth';
import { useAuth } from '@/contexts/AuthContext';

interface VerifyFormData {
  code: string;
}

export default function MFASetupPage() {
  const router = useRouter();
  const { checkAuth } = useAuth();
  const [qrCodeUri, setQrCodeUri] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [isLoadingQR, setIsLoadingQR] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyFormData>();

  useEffect(() => {
    const setupMFA = async () => {
      const session = sessionStorage.getItem('mfa_session');
      const username = sessionStorage.getItem('mfa_username');
      const password = sessionStorage.getItem('temp_password');
      
      if (!session || !username || !password) {
        toast.error('Session expired. Please login again.');
        router.push('/client-portal');
        return;
      }

      try {
        // First, we need to complete a full login to get access token
        const loginResponse = await login(username, password);
        
        if (loginResponse.status === 'MFA_SETUP_REQUIRED') {
          // Now setup authenticator
          const setupResponse = await setupAuthenticator(
            loginResponse.session, // Using session as temporary token
            username // Using username as email for now
          );
          
          setQrCodeUri(setupResponse.qrCode);
          setSecretCode(setupResponse.secretCode);
        }
      } catch (error: any) {
        console.error('MFA setup error:', error);
        toast.error('Failed to setup MFA. Please try again.');
        router.push('/client-portal');
      } finally {
        setIsLoadingQR(false);
      }
    };

    setupMFA();
  }, [router]);

  const onSubmit = async (data: VerifyFormData) => {
    setIsVerifying(true);
    try {
      const session = sessionStorage.getItem('mfa_session');
      const username = sessionStorage.getItem('mfa_username');
      
      if (!session || !username) {
        throw new Error('Session expired');
      }

      // First verify the authenticator
      const verifyResponse = await verifyAuthenticator(
        session, // Using session as access token
        data.code,
        session
      );

      if (verifyResponse.status === 'SUCCESS') {
        // Clear temporary storage
        sessionStorage.removeItem('mfa_session');
        sessionStorage.removeItem('mfa_username');
        sessionStorage.removeItem('temp_password');
        
        toast.success('MFA setup successful! Please login again.');
        router.push('/client-portal');
      } else {
        toast.error('Invalid code. Please try again.');
      }
    } catch (error: any) {
      console.error('Verification error:', error);
      toast.error(error.response?.data?.message || 'Failed to verify code');
    } finally {
      setIsVerifying(false);
    }
  };

  const copySecretCode = () => {
    navigator.clipboard.writeText(secretCode);
    setCopiedSecret(true);
    setTimeout(() => setCopiedSecret(false), 2000);
    toast.success('Secret code copied to clipboard');
  };

  if (isLoadingQR) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Set Up Two-Factor Authentication
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Scan the QR code with your authenticator app
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {/* QR Code Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-center mb-4">
              {qrCodeUri && (
                <QRCode
                  value={qrCodeUri}
                  size={200}
                  level="M"
                  includeMargin={true}
                />
              )}
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">
                Can't scan? Enter this code manually:
              </p>
              <div className="flex items-center space-x-2">
                <code className="flex-1 px-3 py-2 bg-gray-100 rounded text-xs font-mono break-all">
                  {secretCode}
                </code>
                <button
                  type="button"
                  onClick={copySecretCode}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {copiedSecret ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Verification Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Enter verification code from your app
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
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-center text-lg font-mono"
              />
              {errors.code && (
                <p className="mt-1 text-xs text-red-600">{errors.code.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Verifying...
                </>
              ) : (
                'Verify and Complete Setup'
              )}
            </button>
          </form>

          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Save your secret code in a safe place. 
              You'll need it if you ever need to set up authentication on a new device.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}