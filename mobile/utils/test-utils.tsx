import React, { ReactNode } from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTamagui, TamaguiProvider } from 'tamagui';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { AuthProvider } from './authContext';
import { defaultConfig } from '@tamagui/config/v4';

const queryClient = new QueryClient();

const config = createTamagui(defaultConfig);

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(),
}));

export function ProvidersWrapper({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config}>
        <ThemeProvider value={DefaultTheme}>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}

export async function renderWithProviders(ui: React.ReactElement) {
  return await waitFor(() => render(ui, { wrapper: ProvidersWrapper }));
}
