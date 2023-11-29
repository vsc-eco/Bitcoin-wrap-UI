"use client";
// app/providers.tsx
import { extendTheme } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { AccountContext } from "../context/AccountContext";

//import relevant font weights
import "@fontsource/ia-writer-quattro/400.css";
import "@fontsource/open-sans/700.css";
import { client } from "../apollo/client";

const colors = {
  brand: {
    50: "#fffdfc",
    100: "#cce4f6", // Lighter Blue
    500: "#4099ed ", // Normal Blue
    900: "#001a33", // Darker Blue
  },
};

export const theme = extendTheme({
  colors,
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'ia-writer-quattro', sans-serif`,
  },
});

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <CacheProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
      </ApolloProvider>
    </QueryClientProvider>
  );
}
