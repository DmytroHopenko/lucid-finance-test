"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC } from "react";

interface ReactQueryProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const ReactQueryProvider: FC<ReactQueryProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
