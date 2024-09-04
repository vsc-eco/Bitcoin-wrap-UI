import React from 'react'
import { Flex, Box, Input, CheckboxGroup, Checkbox } from '@chakra-ui/react'
type Props = {}

const StatusOption = (props: Props) => {
  return (
    <Flex>
      <Box>
        <CheckboxGroup>
          <Box>
            <Checkbox color={'green'}>Confirmed</Checkbox>
          </Box>
          <Box>
            <Checkbox color={'yellow'}>Pending</Checkbox>
          </Box>
          <Box>
            <Checkbox color={'red'}>Failed</Checkbox>
          </Box>
        </CheckboxGroup>
      </Box>
    </Flex>
  )
}

export default StatusOption
