'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type LoginStep = 'credentials' | 'mfa';

export default function PartnerPortalPage() {
    const [step, setStep] = useState<LoginStep>('credentials');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mfaCode, setMfaCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState('');
    const router = useRouter();

    const handleCredentialsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: email, password })
            });

            const data = await response.json();

            if (data.challenge === 'MFA_REQUIRED') {
                setSession(data.session);
                setStep('mfa');
            } else if (data.success) {
                router.push('/partner-portal/dashboard');
            } else {
                setError(data.error || 'Authentication failed');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleMfaSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'x-session': session
                },
                body: JSON.stringify({ 
                    username: email, 
                    password,
                    mfaCode 
                })
            });

            const data = await response.json();

            if (data.success) {
                router.push('/partner-portal/dashboard');
            } else {
                setError(data.error || 'MFA verification failed');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to verify MFA. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            {/* Header */}
            <Header />

            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            {step === 'credentials' ? 'Sign in to your account' : 'Enter verification code'}
                        </h2>
                        {step === 'mfa' && (
                            <p className="mt-2 text-center text-sm text-gray-600">
                                Please enter the verification code from your authenticator app
                            </p>
                        )}
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {step === 'credentials' ? (
                        <form className="mt-8 space-y-6" onSubmit={handleCredentialsSubmit}>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="email" className="sr-only">Email address</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <Link 
                                        href="/partner-portal/forgot-password" 
                                        className="font-medium text-primary hover:text-primary-dark"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <div className="text-sm">
                                    <Link 
                                        href="/partner-portal/create-account" 
                                        className="font-medium text-primary hover:text-primary-dark"
                                    >
                                        Create account
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                                >
                                    {loading ? 'Signing in...' : 'Sign in'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form className="mt-8 space-y-6" onSubmit={handleMfaSubmit}>
                            <div>
                                <label htmlFor="mfaCode" className="sr-only">Verification code</label>
                                <input
                                    id="mfaCode"
                                    name="mfaCode"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={6}
                                    required
                                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                    placeholder="Enter 6-digit code"
                                    value={mfaCode}
                                    onChange={(e) => setMfaCode(e.target.value.replace(/[^0-9]/g, ''))}
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                                >
                                    {loading ? 'Verifying...' : 'Verify'}
                                </button>
                            </div>

                            <div className="text-sm text-center">
                                <button
                                    type="button"
                                    onClick={() => setStep('credentials')}
                                    className="font-medium text-primary hover:text-primary-dark"
                                >
                                    Back to login
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </main>
    );
} 