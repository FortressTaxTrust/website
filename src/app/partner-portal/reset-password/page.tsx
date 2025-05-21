'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ResetPasswordPage() {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    const validatePassword = (password: string) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isLongEnough = password.length >= 8;

        const errors = [];
        if (!isLongEnough) errors.push('At least 8 characters');
        if (!hasUpperCase) errors.push('One uppercase letter');
        if (!hasLowerCase) errors.push('One lowercase letter');
        if (!hasNumbers) errors.push('One number');
        if (!hasSpecialChar) errors.push('One special character');

        return errors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!email) {
            setError('Email is required');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const passwordErrors = validatePassword(newPassword);
        if (passwordErrors.length > 0) {
            setError(`Password must contain: ${passwordErrors.join(', ')}`);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: email,
                    code,
                    newPassword
                })
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                // Redirect to login after 3 seconds
                setTimeout(() => {
                    router.push('/partner-portal');
                }, 3000);
            } else {
                setError(data.error || 'Failed to reset password. Please try again.');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to reset password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!email) {
        return (
            <main>
                <Header />
                <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">Invalid reset link. Please request a new password reset.</span>
                        </div>
                        <div className="text-center">
                            <Link 
                                href="/partner-portal/forgot-password" 
                                className="font-medium text-primary hover:text-primary-dark"
                            >
                                Request password reset
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Reset your password
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Enter the verification code sent to your email and your new password.
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {success ? (
                        <div className="rounded-md bg-green-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-green-800">
                                        Password reset successful! Redirecting to login...
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="code" className="sr-only">Verification code</label>
                                    <input
                                        id="code"
                                        name="code"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                        placeholder="Verification code"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="new-password" className="sr-only">New Password</label>
                                    <input
                                        id="new-password"
                                        name="new-password"
                                        type="password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="sr-only">Confirm New Password</label>
                                    <input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type="password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                        placeholder="Confirm New Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="text-sm text-gray-600">
                                <p className="font-medium mb-2">Password requirements:</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>At least 8 characters</li>
                                    <li>One uppercase letter</li>
                                    <li>One lowercase letter</li>
                                    <li>One number</li>
                                    <li>One special character (!@#$%^&*(),.?":{}|&lt;&gt;)</li>
                                </ul>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                                >
                                    {loading ? 'Resetting password...' : 'Reset password'}
                                </button>
                            </div>

                            <div className="text-sm text-center">
                                <Link 
                                    href="/partner-portal" 
                                    className="font-medium text-primary hover:text-primary-dark"
                                >
                                    Back to login
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
} 