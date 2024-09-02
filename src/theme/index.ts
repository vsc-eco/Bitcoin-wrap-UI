//TODO: feat: dark theme

import {
  ChakraTheme,
  Theme,
  extendTheme,
  type ThemeConfig,
} from '@chakra-ui/react'
import { modalTheme } from './modal'
import { buttonTheme } from './button'
import { cardTheme } from './card'
import { fonts } from './fonts'
import { colors } from './colors'

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}
export const theme = extendTheme({
  colors,
  components: {
    Modal: modalTheme,
    Button: buttonTheme,
    Card: cardTheme,
  },
  fonts,
  config,
} satisfies Partial<ChakraTheme>)
