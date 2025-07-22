import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

// API base URL - adjust this to match your backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Token storage keys
const TOKEN_KEYS = {
  ACCESS_TOKEN: 'access_token',
  ID_TOKEN: 'id_token',
  REFRESH_TOKEN: 'refresh_token',
  TOKEN_EXPIRY: 'token_expiry',
  USER_DATA: 'user_data'
};

// API client with interceptors
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear auth and redirect to login
      clearAuth();
      if (typeof window !== 'undefined') {
        window.location.href = '/client-portal';
      }
    }
    return Promise.reject(error);
  }
);

// Token management functions
export const saveTokens = (tokens: {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresIn: number;
}) => {
  const expiryTime = new Date().getTime() + (tokens.expiresIn * 1000);
  
  // Use secure cookies for production
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieOptions = {
    secure: isProduction,
    sameSite: 'strict' as const,
    expires: new Date(expiryTime)
  };
  
  Cookies.set(TOKEN_KEYS.ACCESS_TOKEN, tokens.accessToken, cookieOptions);
  Cookies.set(TOKEN_KEYS.ID_TOKEN, tokens.idToken, cookieOptions);
  Cookies.set(TOKEN_KEYS.REFRESH_TOKEN, tokens.refreshToken, cookieOptions);
  Cookies.set(TOKEN_KEYS.TOKEN_EXPIRY, expiryTime.toString(), cookieOptions);
};

export const getAccessToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEYS.ACCESS_TOKEN);
};

export const getIdToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEYS.ID_TOKEN);
};

export const getRefreshToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEYS.REFRESH_TOKEN);
};

export const isTokenExpired = (): boolean => {
  const expiry = Cookies.get(TOKEN_KEYS.TOKEN_EXPIRY);
  if (!expiry) return true;
  return new Date().getTime() > parseInt(expiry, 10);
};

export const clearAuth = () => {
  Object.values(TOKEN_KEYS).forEach(key => {
    Cookies.remove(key);
  });
};

export const saveUserData = (userData: any) => {
  localStorage.setItem(TOKEN_KEYS.USER_DATA, JSON.stringify(userData));
};

export const getUserData = () => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(TOKEN_KEYS.USER_DATA);
  return data ? JSON.parse(data) : null;
};

export const isAuthenticated = (): boolean => {
  return !!getAccessToken() && !isTokenExpired();
};

// Auth API calls
export const login = async (username: string, password: string) => {
  const response = await api.post('/login', { username, password });
  return response.data;
};

export const respondToMFA = async (username: string, code: string, session: string) => {
  const response = await api.post('/respond-to-mfa', { username, code, session });
  return response.data;
};

export const setupAuthenticator = async (accessToken: string, email: string) => {
  const response = await api.post('/setup-authenticator', { accessToken, email });
  return response.data;
};

export const verifyAuthenticator = async (accessToken: string, userCode: string, session?: string) => {
  const response = await api.post('/verify-authenticator', { accessToken, userCode, session });
  return response.data;
};

export const forgotPassword = async (username: string) => {
  const response = await api.post('/forgot-password', { username });
  return response.data;
};

export const confirmForgotPassword = async (username: string, code: string, newPassword: string) => {
  const response = await api.post('/confirm-forgot-password', { username, code, newPassword });
  return response.data;
};

export const signup = async (username: string, password: string, email: string) => {
  const response = await api.post('/signup', { username, password, email });
  return response.data;
};

export const confirmSignup = async (username: string, code: string) => {
  const response = await api.post('/confirm-signup', { username, code });
  return response.data;
};

// Parse JWT token to get user info
export const parseJWT = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
};

// Get current user info from ID token
export const getCurrentUser = () => {
  const idToken = getIdToken();
  if (!idToken) return null;
  
  const tokenData = parseJWT(idToken);
  return {
    username: tokenData?.['cognito:username'],
    email: tokenData?.email,
    sub: tokenData?.sub,
    given_name: tokenData?.given_name,
    family_name: tokenData?.family_name,
    email_verified: tokenData?.email_verified
  };
};
