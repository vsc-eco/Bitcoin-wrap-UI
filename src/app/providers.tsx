//TODO: configure the theme and the font style

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
  components: {
    colors: {
      transparent: "transparent",
      black: "#000",
      white: "#fff",
      gray: {
        50: "#f7fafc",
        900: "#171923",
      },
      indigo: {
        900: "rgb(123, 138, 238)",
        700: "#a6aff7",
        500: "",
      },
    },
    Button: {
      baseStyle: {
        fontWeight: "regular",
        bg: "gray.50"
      },
      sizes: {
        lg: {
          width: "200px",
          height: "50px",
        },
        md: {
          width: "150px",
          height: "45px",
        },
        sm: {
          width: "100px",
          height: "40px",
        },
      },

      variants: {
        primary: {
          bg: "indigo.700",
          color: "white",
          _hover: {
            bg: "indigo.900",
          },
        },
        secondary: {
          bg: "indigo.500",
          color: "white",
          _hover: {
            bg: "indigo.700",
          },
        },
      },

      defaultProps: {
        size: "sm", // default is md
        variant: "primary", // default is solid
        colorScheme: "gray", // default is gray
      },
    },
  },
  fonts: {
    heading: `var(--font-arcadia)`,
    body: `var(--font-arcadia)`,
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
