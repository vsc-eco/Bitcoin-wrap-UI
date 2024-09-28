import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const outline = defineStyle({
  _active: {
    backgroundColor: 'indigo.900',
    border: '1px solid',
    borderColor: 'indigo.900',
    color: 'white',
  },
  _hover: {
    backgroundColor: 'indigo.900',
    color: 'white',
  },
  borderRadius: 24,
  fontWeight: 'bold',
  backgroundColor: 'gray.70',
  color: 'gray.850',
})

const circle = defineStyle({
  backgroundColor: 'gray.70',
  color: 'gray.850',
  borderRadius: '50%',
  padding: '1',
  _hover: {
    backgroundColor: 'indigo.900',
    color: 'white',
  },
})

export const buttonTheme = defineStyleConfig({
  baseStyle: defineStyle({
    backgroundColor: 'red',
    color: 'white',
  }),
  variants: { outline, circle },
})
