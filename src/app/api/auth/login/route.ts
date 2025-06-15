import { NextResponse } from 'next/server';
import { CognitoIdentityProviderClient, InitiateAuthCommand, RespondToAuthChallengeCommand } from "@aws-sdk/client-cognito-identity-provider";
import { createHmac } from 'crypto';

function calculateSecretHash(username: string, clientId: string, clientSecret: string) {
    const message = username + clientId;
    const hmac = createHmac('SHA256', clientSecret);
    hmac.update(message);
    return hmac.digest('base64');
}

export async function POST(request: Request) {
    try {
        // Get credentials from request
        const { username, password, mfaCode } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            );
        }

        // Create Cognito client
        const client = new CognitoIdentityProviderClient({
            region: process.env.NEXT_PUBLIC_AWS_REGION,
        });

        // Calculate secret hash
        const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!;
        const clientSecret = process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET!;
        const secretHash = calculateSecretHash(username, clientId, clientSecret);

        console.log('Attempting login with:', {
            username,
            clientId,
            hasSecretHash: !!secretHash,
            region: process.env.NEXT_PUBLIC_AWS_REGION,
            hasMfaCode: !!mfaCode
        });

        let response;
        
        if (mfaCode) {
            // Handle MFA challenge
            const challengeCommand = new RespondToAuthChallengeCommand({
                ChallengeName: "SOFTWARE_TOKEN_MFA",
                ClientId: clientId,
                ChallengeResponses: {
                    USERNAME: username,
                    SOFTWARE_TOKEN_MFA_CODE: mfaCode,
                    SECRET_HASH: secretHash
                },
                Session: request.headers.get('x-session') || undefined
            });
            
            response = await client.send(challengeCommand);
        } else {
            // Initial authentication
            const command = new InitiateAuthCommand({
                AuthFlow: "USER_PASSWORD_AUTH",
                ClientId: clientId,
                AuthParameters: {
                    USERNAME: username,
                    PASSWORD: password,
                    SECRET_HASH: secretHash
                },
            });

            response = await client.send(command);
        }

        console.log('Auth response received:', {
            challengeName: response.ChallengeName,
            hasSession: !!response.Session,
            hasAuthResult: !!response.AuthenticationResult
        });

        if (response.ChallengeName === "SOFTWARE_TOKEN_MFA") {
            return NextResponse.json(
                { 
                    challenge: "MFA_REQUIRED",
                    session: response.Session
                },
                { status: 200 }
            );
        }

        if (response.AuthenticationResult) {
            // Set cookies with detailed logging
            console.log('Setting cookies with auth result:', {
                hasAccessToken: !!response.AuthenticationResult?.AccessToken,
                hasIdToken: !!response.AuthenticationResult?.IdToken,
                hasRefreshToken: !!response.AuthenticationResult?.RefreshToken,
                accessTokenLength: response.AuthenticationResult?.AccessToken?.length,
                idTokenLength: response.AuthenticationResult?.IdToken?.length,
                refreshTokenLength: response.AuthenticationResult?.RefreshToken?.length
            });

            // Create response with cookies
            const nextResponse = NextResponse.json(
                { success: true },
                {
                    status: 200,
                    headers: {
                        'Set-Cookie': [
                            `accessToken=${response.AuthenticationResult?.AccessToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600`,
                            `idToken=${response.AuthenticationResult?.IdToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600`,
                            `refreshToken=${response.AuthenticationResult?.RefreshToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`
                        ].join(', ')
                    }
                }
            );

            // Log the response headers
            console.log('Response headers after setting cookies:', {
                hasSetCookie: nextResponse.headers.has('Set-Cookie'),
                setCookieHeader: nextResponse.headers.get('Set-Cookie'),
                allHeaders: Object.fromEntries(nextResponse.headers.entries())
            });

            return nextResponse;
        }

        return NextResponse.json(
            { error: 'Authentication failed' },
            { status: 401 }
        );

    } catch (error: any) {
        console.error('Login error details:', {
            name: error.name,
            message: error.message,
            code: error.code,
            requestId: error.$metadata?.requestId
        });

        return NextResponse.json(
            { 
                error: 'Authentication failed',
                details: {
                    name: error.name,
                    message: error.message,
                    code: error.code
                }
            },
            { status: 401 }
        );
    }
} 