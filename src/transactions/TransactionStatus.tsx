import { Box, ResponsiveValue } from '@chakra-ui/react'
import type { Property } from 'csstype'

export function TransactionStatus({
  text,
  textColor,
  borderColor,
}: {
  text: string
  textColor?: ResponsiveValue<Property.Color>
  borderColor: ResponsiveValue<Property.Color>
}) {
  return (
    <Box
      px={2}
      py="2px"
      borderRadius="6px"
      fontWeight="normal"
      border="1px solid"
      borderColor={borderColor}
      color={textColor}
      fontSize="10px"
    >
      {text}
    </Box>
  )
}
