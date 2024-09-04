import React, { useState } from 'react'
import { Checkbox, CheckboxGroup, Icon } from '@chakra-ui/react'
import { Flex, Box, Text, Input } from '@chakra-ui/react'
import styles from './Currency.module.css'
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
    <Box
      className={styles.parent}
      h="300px"
      px={4}
      py={12}
    >
      <Box>
        <Flex
          gap={4}
          alignItems={'center'}
          position={'relative'}
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
          className={styles.cotainer}
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
                    src={'./Hive.svg'}
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
                    src={'./HBD_green.svg'}
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
    </Box>
  )
}

export default Currency
