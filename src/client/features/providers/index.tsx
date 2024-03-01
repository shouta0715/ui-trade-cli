import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SubscriptionProvider } from "@/client/features/subscription";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SubscriptionProvider>{children}</SubscriptionProvider>
    </QueryClientProvider>
  );
}
