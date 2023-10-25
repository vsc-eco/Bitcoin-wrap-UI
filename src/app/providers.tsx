// app/providers.tsx
'use client'
import { extendTheme } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
//import relevant font weights
import '@fontsource/ia-writer-quattro/400.css'
import '@fontsource/open-sans/700.css'


const colors = {
  brand: {
    50: '#fffdfc',
    100: "#cce4f6", // Lighter Blue
    500: "#4099ed ", // Normal Blue
    900: "#001a33" // Darker Blue
  },
}


export const theme = extendTheme({
 colors,
 fonts: {
  heading: `'Open Sans', sans-serif`,
  body: `'ia-writer-quattro', sans-serif`,
},
})

export function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {children}Dard0409*
      </ChakraProvider>
    </CacheProvider>
  )
}