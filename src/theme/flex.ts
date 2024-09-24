import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
  _dark: {
    backgroundColor: '',
  },
  backgroundColor: '',
  padding: '4',
  alignItems: 'center',
})

const rounded = defineStyle({
  borderRadius: '12px',
  padding: '4',
  backgroundColor: '',
})

export const flexTheme = defineStyleConfig({
  baseStyle,
  variants: { rounded },
})
