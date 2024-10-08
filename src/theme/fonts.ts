import { Theme } from '@chakra-ui/react'

export const fonts = {
  heading: `var(--font-arcadia)`,
  body: `var(--font-arcadia)`,
} satisfies Partial<Theme['fonts']>

const styles = {
  global: {
    'html, body, heading': {
      color: 'black',
    },
  },
}
