import axios from 'axios';

export interface TokenResponse {
  accessToken: string;
  idToken: string;
  expiresIn: number;
}

export const refreshTokens = async (): Promise<TokenResponse | null> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const username = localStorage.getItem('username'); // You might need to store username separately
    
    if (!refreshToken || !username) {
      return null;
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      { refreshToken, username },
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (response.data.status === 'success') {
      const { accessToken, idToken, expiresIn } = response.data.tokens;
      
      // Update stored tokens
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('idToken', idToken);
      localStorage.setItem('expiresIn', expiresIn);
      
      return { accessToken, idToken, expiresIn };
    }
    
    return null;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
};

export const isTokenExpired = (): boolean => {
  const expiresIn = localStorage.getItem('expiresIn');
  if (!expiresIn) return true;
  
  const expiryTime = parseInt(expiresIn) * 1000; // Convert to milliseconds
  const currentTime = Date.now();
  
  return currentTime >= expiryTime;
};

export const getValidAccessToken = async (): Promise<string | null> => {
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken || isTokenExpired()) {
    const refreshed = await refreshTokens();
    return refreshed?.accessToken || null;
  }
  
  return accessToken;
};

export const signOut = () => {
  const accessToken = localStorage.getItem('accessToken');
  
  // Call global signout endpoint if token exists
  if (accessToken) {
    axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signout`,
      { accessToken },
      { headers: { 'Content-Type': 'application/json' } }
    ).catch(console.error); // Don't block signout on error
  }
  
  // Clear local storage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('idToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('expiresIn');
  localStorage.removeItem('username');
  
  // Clear session storage
  sessionStorage.removeItem('mfa_session');
  sessionStorage.removeItem('mfa_username');
};

export const setupTokenRefresh = () => {
  // Check token expiry every minute
  setInterval(() => {
    if (isTokenExpired()) {
      refreshTokens().catch(console.error);
    }
  }, 60000);
};
