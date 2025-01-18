import React, { useState } from 'react'
import { Checkbox, CheckboxGroup, Icon } from '@chakra-ui/react'
import { Flex, Box, Text, Input } from '@chakra-ui/react'
import Image from 'next/image'
import { CiSearch } from 'react-icons/ci'

type Props = {}

const Currency = (props: Props) => {
  const [currency, setCurrency] = useState<string[]>(['HIVE', 'HBD'])
  const handleCheckboxChange = (checkboxId: string) => {
    for (let cur of currency) {
      if (cur === checkboxId) {
        setCurrency(currency.filter(item => item !== checkboxId))
        return
      }
    }
    setCurrency([...currency, checkboxId])
  }

  const handleSearch = (event: any) => {
    setCurrency(event.target.value)
  }

  return (
    <Flex
      paddingTop={'36px'}
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
                isChecked={currency.includes('HIVE')}
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
                isChecked={currency.includes('HBD')}
                onChange={() => handleCheckboxChange('HBD')}
              >
                <Flex gap={1}>
                  <Image
                    src={'./hbd_green.svg'}
                    alt={'HBD coin'}
                    height={20}
                    width={20}
                  />
                  Hive Dollar
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
