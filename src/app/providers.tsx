"use client";
// app/providers.tsx
import { extendTheme } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"; 
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AccountContext } from "../context/AccountContext";
import { client } from "../apollo/client";
import { ShowComponentProvider } from "../context/ShowComponent";



export const theme = extendTheme({
  colors: {
    transparent: "transparent",
    black: "#000",
    white: "#fff",
    gray: {
      50: "#f7fafc",
      900: "#171923",
    },
  },
  fonts: {
    heading: ``,
    body: ``,
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <CacheProvider>
          <ChakraProvider theme={theme}>
            <ShowComponentProvider>{children}</ShowComponentProvider>
          </ChakraProvider>
        </CacheProvider>
      </ApolloProvider>
    </QueryClientProvider>
  );
}
