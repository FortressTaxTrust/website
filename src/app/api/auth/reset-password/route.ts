import { NextResponse } from 'next/server';
import { CognitoIdentityProviderClient, ConfirmForgotPasswordCommand } from '@aws-sdk/client-cognito-identity-provider';
import { calculateSecretHash } from '@/utils/cognito-utils';

const cognitoClient = new CognitoIdentityProviderClient({
    region: process.env.NEXT_PUBLIC_AWS_REGION
});

export async function POST(request: Request) {
    try {
        const { username, code, newPassword } = await request.json();

        if (!username || !code || !newPassword) {
            return NextResponse.json(
                { error: 'Username, code, and new password are required' },
                { status: 400 }
            );
        }

        const params = {
            ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
            Username: username,
            ConfirmationCode: code,
            Password: newPassword,
            ...(process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET && {
                SecretHash: calculateSecretHash(username)
            })
        };

        console.log('Confirming password reset for:', username);

        const command = new ConfirmForgotPasswordCommand(params);
        await cognitoClient.send(command);

        return NextResponse.json({ 
            success: true,
            message: 'Password has been reset successfully'
        });

    } catch (error: any) {
        console.error('Reset password error:', error);

        return NextResponse.json({ 
            error: 'Failed to reset password. Please check your verification code and try again.'
        }, { status: 400 });
    }
} 