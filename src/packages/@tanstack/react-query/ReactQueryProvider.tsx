import {
  QueryClient,
  QueryClientProvider,
  QueryClientConfig,
} from '@tanstack/react-query';

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: Infinity,
      cacheTime: 0,
    },
    mutations: {
      retry: 0,
      cacheTime: 0,
    },
  },
};

const queryClient = new QueryClient(queryClientConfig);

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
