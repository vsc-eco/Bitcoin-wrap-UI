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
