import { ChakraTheme, Theme, extendTheme } from '@chakra-ui/react'
import { modalTheme } from './modal'
import { buttonTheme } from './button'
import { cardTheme } from './card'
import { fonts } from './fonts'
import { colors } from './colors'

export const theme = extendTheme({
  colors,
  components: {
    Modal: modalTheme,
    Button: buttonTheme,
    Card: cardTheme,
  },
  fonts,
} satisfies Partial<ChakraTheme>)
