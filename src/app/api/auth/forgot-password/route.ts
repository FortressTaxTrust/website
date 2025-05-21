import { NextResponse } from 'next/server';
import { CognitoIdentityProviderClient, ForgotPasswordCommand } from '@aws-sdk/client-cognito-identity-provider';
import { calculateSecretHash } from '@/utils/cognito-utils';

const cognitoClient = new CognitoIdentityProviderClient({
    region: process.env.NEXT_PUBLIC_AWS_REGION
});

export async function POST(request: Request) {
    try {
        const { username } = await request.json();

        if (!username) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        const params = {
            ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
            Username: username,
            ...(process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET && {
                SecretHash: calculateSecretHash(username)
            })
        };

        console.log('Initiating forgot password flow for:', username);

        const command = new ForgotPasswordCommand(params);
        await cognitoClient.send(command);

        return NextResponse.json({ 
            success: true,
            message: 'If an account exists with this email, you will receive a verification code.'
        });

    } catch (error: any) {
        console.error('Forgot password error:', error);

        // Don't expose whether the email exists or not
        return NextResponse.json({ 
            success: true,
            message: 'If an account exists with this email, you will receive a verification code.'
        });
    }
} 