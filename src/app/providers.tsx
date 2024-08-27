//TODO: configure the theme and the font style

'use client'
// app/providers.tsx
import { extendTheme, useColorMode } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { client } from '../apollo/client'
import { ShowComponentProvider } from '../context/ShowComponent'
import { createWeb3Modal } from '@web3modal/wagmi'
import { multiConfig, projectId } from '../hooks/auth/wagmi-web3modal/config'
import { PropsWithChildren, useEffect } from 'react'
import { State } from '@wagmi/core'
import { Hydrate } from 'wagmi'

import { modalAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(modalAnatomy.keys)

const action = definePartsStyle({
  header: {
    fontWeight: 'hairline',
    lineHeight: 10,
    fontSize: 'xl',
  },
})

export const modalTheme = defineMultiStyleConfig({
  variants: { action },
  defaultProps: {
    variant: 'action',
  },
})

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const web3Modal = createWeb3Modal({
  wagmiConfig: multiConfig,
  allowUnsupportedChain: true,
  projectId,
})

export const theme = extendTheme({
  colors: {
    transparent: 'transparent',
    black: '#000',
    white: '#fff',
    gray: {
      50: '#f7fafc',
      900: '#171923',
    },
    indigo: {
      900: 'rgb(123, 138, 238)',
      700: '#a6aff7',
      500: '',
    },
  },
  Button: {
    baseStyle: {
      fontWeight: 'regular',
      bg: 'gray.100',
    },
    sizes: {
      lg: {
        width: '200px',
        height: '50px',
      },
      md: {
        width: '150px',
        height: '45px',
      },
      sm: {
        width: '100px',
        height: '40px',
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        gray: {
          50: '#f7fafc',
          // ...
          900: '#171923',
        },
      },
    },
  },
  components: {
    Modal: modalTheme,
  },
  fonts: {
    heading: `var(--font-arcadia)`,
    body: `var(--font-arcadia)`,
  },
})

const queryClient = new QueryClient()

const Web3ModalThemeUpdater = ({ children }: PropsWithChildren<{}>) => {
  const { colorMode } = useColorMode()
  useEffect(() => {
    const { loading } = web3Modal.getState()
    const updater = () => {
      if (colorMode === 'light') {
        web3Modal.setThemeMode('light')
      } else {
        web3Modal.setThemeMode('dark')
      }
    }
    if (loading) {
      const unsubscribe = web3Modal.subscribeState(({ loading }) => {
        if (!loading) {
          unsubscribe()
          updater()
        }
      })
      return unsubscribe
    } else {
      updater()
    }
  }, [colorMode])

  return children
}

export let cookies: string | null = null

export function Providers({
  children,
  initialState,
  cookies: pCookies,
}: PropsWithChildren<{
  initialState: State | undefined
  cookies: string | null
}>) {
  cookies = pCookies
  return (
    <Hydrate
      config={multiConfig}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={client}>
          <CacheProvider>
            <ChakraProvider theme={theme}>
              <Web3ModalThemeUpdater>
                <ShowComponentProvider>{children}</ShowComponentProvider>
              </Web3ModalThemeUpdater>
            </ChakraProvider>
          </CacheProvider>
        </ApolloProvider>
      </QueryClientProvider>
    </Hydrate>
  )
}
