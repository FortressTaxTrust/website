import { Amplify } from 'aws-amplify';

const awsConfig = {
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
            userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
            userPoolClientSecret: process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET!,
            signUpVerificationMethod: 'code' as const,
            loginWith: {
                email: true,
                phone: false,
                username: true
            }
        }
    },
    region: process.env.NEXT_PUBLIC_AWS_REGION
};

// Log the configuration for debugging (without sensitive data)
console.log('Amplify Config:', {
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
    userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    hasClientSecret: !!process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET
});

// Initialize Amplify
Amplify.configure(awsConfig);

export default awsConfig; 