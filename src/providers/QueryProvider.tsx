"use client";

import { getQueryClient } from "@/lib/query";
import { QueryClientProvider } from "@tanstack/react-query";

interface Props {
  children: React.ReactNode;
}

export function QueryProvider({ children }: Props) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
