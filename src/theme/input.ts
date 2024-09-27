import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
  _focus: {
    borderBottom: '2px solid',
    borderColor: 'indigo.500',
    outline: 'none',
  },
})

export const buttonTheme = defineStyleConfig({
  baseStyle,
})
