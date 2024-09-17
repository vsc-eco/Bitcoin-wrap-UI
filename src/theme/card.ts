import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

//TODO: dark theme
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
  //   header: {
  //     paddingBottom: '2px',
  //   },
  //   body: {
  //     paddingTop: '2px',
  //   },
  //   footer: {
  //     paddingTop: '2px',
  //   },
})

const sizes = {
  //   md: definePartsStyle({
  //     container: {
  //       borderRadius: '0px',
  //     },
  //   }),
}

export const cardTheme = defineMultiStyleConfig({ baseStyle, sizes })
