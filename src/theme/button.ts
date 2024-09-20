import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
  _dark: {
    backgroundColor: '', // color,
  },
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: '24px',
  fontcolor: '#4F4F58',
})

const circle = defineStyle({
  backgroundColor: 'gray.500',
  borderRadius: '50%',
  padding: '1',
  _hover: {
    backgroundColor: 'gray.200',
  },
})

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants: { circle },
})
