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
  color: 'indigo.900',
})

const inline = defineStyle({
  _active: {
    backgroundColor: 'indigo.900',
    border: '1px solid',
    borderColor: 'indigo.900',
    color: 'white',
  },
  _hover: {
    backgroundColor: 'gray.70',
    color: 'indigo.900',
  },
  borderRadius: 24,
  fontWeight: 'bold',
  backgroundColor: 'indigo.900',
  color: 'white',
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
    backgroundColor: 'transparent',
    color: 'gray.900',
  }),
  variants: { outline, circle, inline },
})
