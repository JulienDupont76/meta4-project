import { urlAPI } from '@/constants/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { createContext, PropsWithChildren, use, useContext, useEffect, useState } from 'react';

type AuthState = {
  isLoggedIn: boolean;
  isReady: boolean;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const authStorageKey = 'auth-key';

const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isReady: false,
  logIn: () => {},
  logOut: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const storeAuthState = async (state: { isLoggedIn: boolean }) => {
    try {
      const jsonValue = JSON.stringify(state);
      await AsyncStorage.setItem(authStorageKey, jsonValue);
    } catch (error) {
      console.error('Error storing auth state:', error);
    }
  };

  const APILogin = async (data: { email: string; password: string }) => {
    console.log('API Login called');
    const response = await fetch(`${urlAPI}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('Response status:', response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    console.log('Response data:', responseData);

    if (responseData.errors) {
      // Optionally, throw the first error or the entire errors object
      throw new Error(responseData.errors[0]?.message || 'Login failed');
    }

    const token = responseData.token?.token;

    if (!token) {
      throw new Error('No token received');
    }
    return token;
  };

  const login = useMutation({
    mutationFn: APILogin,
    onSuccess: (token) => {
      // store token, navigate, etc.
      console.log('Token received:', token);
    },
    onError: (error) => {
      console.error('Error during login:', error);
    },
  });

  const logIn = (email: string, password: string) => {
    console.log('Logging in with email:', email, 'and password:', password);
    login.mutate({ email, password });
    setIsLoggedIn(true);
    storeAuthState({ isLoggedIn: true });
    router.replace('/');
  };

  const logOut = () => {
    setIsLoggedIn(false);
    storeAuthState({ isLoggedIn: false });
    router.replace('/login');
  };

  useEffect(() => {
    const getAuthFromStorage = async () => {
      try {
        const value = await AsyncStorage.getItem(authStorageKey);
        if (value !== null) {
          const auth = JSON.parse(value);
          setIsLoggedIn(auth.isLoggedIn);
        }
      } catch (error) {
        console.error('Error retrieving auth state:', error);
      }
      setIsReady(true);
    };
    getAuthFromStorage();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isReady, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
