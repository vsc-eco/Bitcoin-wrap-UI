import { ChakraTheme, extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { modalTheme } from './modal'
import { buttonTheme } from './button'
import { cardTheme } from './card'
import { fonts } from './fonts'
import { colors } from './colors'
import { switchTheme } from './switch'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export const theme = extendTheme({
  colors,
  components: {
    Modal: modalTheme,
    Button: buttonTheme,
    Card: cardTheme,
    Switch: switchTheme,
  },
  fonts,
  config,
} satisfies Partial<ChakraTheme>)
