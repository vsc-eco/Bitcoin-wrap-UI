import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
    borderRadius: 12,
    px: 2,
    py: 1,
    boxShadow:
      '0 2px 4px 0 rgba(4, 4, 52, 0.06), 0 0 2px 0 rgba(91, 95, 107, 0.24)',
  },
  _dark: {
    backgroundColor: 'gray.600',
    _hover: {
      backgroundColor: 'gray.550',
    },
  },
})

const sizes = {
  //   md: definePartsStyle({
  //     container: {
  //       borderRadius: '0px',
  //     },
  //   }),
}

export const cardTheme = defineMultiStyleConfig({ baseStyle, sizes })
