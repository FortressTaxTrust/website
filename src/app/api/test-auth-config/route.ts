import { NextResponse } from 'next/server';
import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import { createHmac } from 'crypto';

function calculateSecretHash(username: string, clientId: string, clientSecret: string) {
    const message = username + clientId;
    const hmac = createHmac('SHA256', clientSecret);
    hmac.update(message);
    return hmac.digest('base64');
}

export async function GET() {
    try {
        const client = new CognitoIdentityProviderClient({
            region: process.env.NEXT_PUBLIC_AWS_REGION,
        });

        // Test client secret
        const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
        const clientSecret = process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET;
        
        if (!clientId || !clientSecret) {
            return NextResponse.json({
                success: false,
                error: 'Missing client ID or client secret',
                config: {
                    hasClientId: !!clientId,
                    hasClientSecret: !!clientSecret,
                    region: process.env.NEXT_PUBLIC_AWS_REGION,
                    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID
                }
            });
        }

        // Test secret hash calculation
        const testUsername = 'test@example.com';
        const secretHash = calculateSecretHash(testUsername, clientId, clientSecret);

        // Test identity pool if configured
        const identityPoolId = process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID;

        return NextResponse.json({
            success: true,
            config: {
                region: process.env.NEXT_PUBLIC_AWS_REGION,
                userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
                clientId: clientId,
                hasClientSecret: !!clientSecret,
                hasIdentityPool: !!identityPoolId,
                secretHashLength: secretHash.length
            }
        });
    } catch (error: any) {
        console.error('Error testing auth config:', error);
        return NextResponse.json({
            success: false,
            error: error.message,
            config: {
                region: process.env.NEXT_PUBLIC_AWS_REGION,
                userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
                hasClientId: !!process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
                hasClientSecret: !!process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET,
                hasIdentityPool: !!process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID
            }
        });
    }
} 