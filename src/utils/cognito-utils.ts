import { createHmac } from 'crypto';

export function calculateSecretHash(username: string): string {
    const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!;
    const clientSecret = process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET!;

    const message = username + clientId;
    const hmac = createHmac('sha256', clientSecret);
    hmac.update(message);
    return hmac.digest('base64');
} 