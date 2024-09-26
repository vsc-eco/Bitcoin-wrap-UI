import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: '24px',
  fontcolor: 'gray.800',
})

const circle = defineStyle({
  backgroundColor: 'red',
  borderRadius: '50%',
  padding: '1',
  _hover: {
    backgroundColor: 'red',
  },
})

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants: { circle },
})
