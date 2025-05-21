'use client';

import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            {children}
        </div>
    );
} 