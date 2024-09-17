import React, { useState } from 'react'
import { Checkbox, CheckboxGroup, Icon } from '@chakra-ui/react'
import { Flex, Box, Text, Input } from '@chakra-ui/react'
import Image from 'next/image'
import { CiSearch } from 'react-icons/ci'

//TODO: Pictures are not getting rendered
//TODO: Add the logic for search filter and underline the word according to the input

type Props = {}

const Currency = (props: Props) => {
  const [currency, setCurrency] = useState<string>('')
  const handleCheckboxChange = (checkboxId: string) => {
    setCurrency(prev => (prev === checkboxId ? 'HIVE' : checkboxId))
  }

  const handleSearch = (event: any) => {
    setCurrency(event.target.value)
  }

  return (
    <Flex
      justifyContent={'center'}
      paddingLeft={'8px'}
      height={500}
    >
      <Box>
        <Flex
          gap={4}
          position={'relative'}
          alignItems={'center'}
        >
          <Icon
            as={CiSearch}
            position={'absolute'}
            left={1}
            size={'lg'}
          />
          <Input
            value={currency}
            px={8}
            onChange={handleSearch}
            defaultValue={'Search Currency'}
          />
        </Flex>
        <Box
          gap={6}
          justifyContent={'center'}
        >
          <CheckboxGroup>
            <Flex
              gap={4}
              py={4}
            >
              <Checkbox
                isChecked={currency === 'HIVE'}
                onChange={() => handleCheckboxChange('HIVE')}
              >
                <Flex gap={1}>
                  <Image
                    src={'./hive.svg'}
                    alt={'Hive coin'}
                    height={20}
                    width={20}
                  />
                  <Text>HIVE</Text>
                </Flex>
              </Checkbox>
            </Flex>
            <Flex gap={4}>
              <Checkbox
                isChecked={currency === 'HBD'}
                onChange={() => handleCheckboxChange('HBD')}
              >
                <Flex gap={1}>
                  <Image
                    src={'./hbd_green.svg'}
                    alt={'HBD coin'}
                    height={20}
                    width={20}
                  />
                  HBD
                </Flex>
              </Checkbox>
            </Flex>
          </CheckboxGroup>
        </Box>
      </Box>
    </Flex>
  )
}

export default Currency
