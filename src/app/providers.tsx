// app/providers.tsx
'use client'
import { extendTheme } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

const colors = {
  brand: {
    100: "#cce4f6", // Lighter Blue
    500: "#4099ed ", // Normal Blue
    900: "#001a33" // Darker Blue
  },
}

export const theme = extendTheme({colors})

export function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}