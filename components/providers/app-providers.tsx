'use client';

import { useState } from 'react';
import { ThemeProvider } from 'next-themes';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import NextTopLoader from 'nextjs-toploader';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  // const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
