"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MessagesProvider } from "../context/messages";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MessagesProvider>{children}</MessagesProvider>
    </QueryClientProvider>
  );
};

export default Providers;
