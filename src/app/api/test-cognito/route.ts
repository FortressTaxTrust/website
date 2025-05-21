import { NextResponse } from 'next/server';
import { testCognitoConnection } from '@/utils/cognito-test';

export async function GET() {
    try {
        const result = await testCognitoConnection();
        return NextResponse.json(result);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to test Cognito connection' },
            { status: 500 }
        );
    }
} 