import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const circle = defineStyle({
  backgroundColor: 'gray.500',
  borderRadius: '50%',
  padding: '1',
  _hover: {
    backgroundColor: 'gray.200',
  },
})

export const buttonTheme = defineStyleConfig({
  variants: { circle },
})
