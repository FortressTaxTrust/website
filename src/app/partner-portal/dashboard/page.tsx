'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Check if user is logged in
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            router.push('/partner-portal/login');
            return;
        }

        // Parse the JWT token to get user info
        try {
            const payload = JSON.parse(atob(accessToken.split('.')[1]));
            setUser(payload);
        } catch (error) {
            console.error('Error parsing token:', error);
            router.push('/partner-portal/login');
        }
    }, [router]);

    const handleSignOut = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('idToken');
        localStorage.removeItem('refreshToken');
        router.push('/partner-portal/login');
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <button
                            onClick={handleSignOut}
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Sign Out
                        </button>
                    </div>
                    
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Welcome, {user.email}</h2>
                        <div className="bg-gray-50 p-4 rounded-md">
                            <h3 className="text-lg font-medium mb-2">User Information</h3>
                            <pre className="text-sm text-gray-600 overflow-auto">
                                {JSON.stringify(user, null, 2)}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 