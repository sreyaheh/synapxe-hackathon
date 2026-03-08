import { createContext, useContext, useMemo, useState } from 'react';
import { Platform } from 'react-native';

type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type RegisterPayload = {
  fullName: string;
  username: string;
  password: string;
};

type ProfileParticulars = {
  dateOfBirth: string;
  phone: string;
  address: string;
  emergencyContact: string;
  medicalConditions: string[];
  medicationList: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  needsProfileSetup: boolean;
  profileParticulars: ProfileParticulars | null;
  loginWithSingpass: (username: string, password: string) => Promise<void>;
  registerWithSingpass: (payload: RegisterPayload) => Promise<void>;
  completeProfileSetup: (payload: ProfileParticulars) => void;
  logout: () => void;
};

const defaultApiBase = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://127.0.0.1:8000';
const API_BASE = process.env.EXPO_PUBLIC_API_BASE_URL ?? defaultApiBase;
const REQUEST_TIMEOUT_MS = 10000;

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading] = useState(false);
  const [needsProfileSetup, setNeedsProfileSetup] = useState(false);
  const [profileParticulars, setProfileParticulars] = useState<ProfileParticulars | null>(null);

  const postWithTimeout = async (path: string, body: Record<string, unknown>) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      return await fetch(`${API_BASE}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const loginWithSingpass = async (username: string, password: string) => {
    let res: Response;
    try {
      res = await postWithTimeout('/auth/login', { username, password });
    } catch {
      throw new Error('Cannot reach backend. Check EXPO_PUBLIC_API_BASE_URL and backend server.');
    }

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.detail ?? 'Invalid username/password');
    }

    const data = await res.json();
    const nextUser = data.user as AuthUser;
    if (nextUser.role !== 'patient') {
      throw new Error('Mobile app login is currently enabled for patient accounts only.');
    }

    setToken(data.access_token as string);
    setUser(nextUser);
    setNeedsProfileSetup(false);
  };

  const registerWithSingpass = async (payload: RegisterPayload) => {
    let res: Response;
    try {
      res = await postWithTimeout('/auth/register', {
        username: payload.username,
        password: payload.password,
        full_name: payload.fullName,
        role: 'patient',
      });
    } catch {
      throw new Error('Cannot reach backend. Check EXPO_PUBLIC_API_BASE_URL and backend server.');
    }

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.detail ?? 'Registration failed');
    }

    const data = await res.json();
    const nextUser = data.user as AuthUser;
    if (nextUser.role !== 'patient') {
      throw new Error('Mobile app registration is currently enabled for patient accounts only.');
    }

    setToken(data.access_token as string);
    setUser(nextUser);
    setNeedsProfileSetup(true);
    setProfileParticulars(null);
  };

  const completeProfileSetup = (payload: ProfileParticulars) => {
    setProfileParticulars(payload);
    setNeedsProfileSetup(false);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setNeedsProfileSetup(false);
    setProfileParticulars(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      isLoading,
      needsProfileSetup,
      profileParticulars,
      loginWithSingpass,
      registerWithSingpass,
      completeProfileSetup,
      logout,
    }),
    [isLoading, needsProfileSetup, profileParticulars, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
