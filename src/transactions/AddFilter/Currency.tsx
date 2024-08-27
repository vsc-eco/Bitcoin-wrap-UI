import React, { useState } from 'react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { Flex, Box, Text, Input } from '@chakra-ui/react'
import styles from './Currency.module.css'
import Image from 'next/image'

type Props = {}

const Currency = (props: Props) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState<string>('HIVE')

  const handleCheckboxChange = (checkboxId: string) => {
    setSelectedCheckbox(prev => (prev === checkboxId ? 'HIVE' : checkboxId))
  }

  return (
    <Box
      className={styles.parent}
      h="300px"
      alignItems={'center'}
      px={8}
    >
      <Box>
        <Input value={selectedCheckbox} />

        <Flex
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
                isChecked={selectedCheckbox === 'HIVE'}
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
                isChecked={selectedCheckbox === 'HBD'}
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
        </Flex>
      </Box>
    </Box>
  )
}

export default Currency
