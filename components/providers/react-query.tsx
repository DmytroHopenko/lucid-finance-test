"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ReactQueryProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const ReactQueryProvider = ({ children }: ReactQueryProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
