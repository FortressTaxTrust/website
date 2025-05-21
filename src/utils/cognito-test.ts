import { CognitoIdentityProviderClient, ListUsersCommand } from "@aws-sdk/client-cognito-identity-provider";

// Create a Cognito client
const client = new CognitoIdentityProviderClient({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
});

export async function testCognitoConnection() {
    try {
        // Try to list users (this will fail if we don't have proper credentials)
        const command = new ListUsersCommand({
            UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
        });

        const response = await client.send(command);
        console.log('Successfully connected to Cognito!');
        console.log('User Pool:', process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID);
        console.log('Region:', process.env.NEXT_PUBLIC_AWS_REGION);
        return { success: true, data: response };
    } catch (error) {
        console.error('Error connecting to Cognito:', error);
        return { success: false, error };
    }
} 