//TODO: rectify the positioning

import React, { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Switch,
  Input,
  Select,
  Box,
  Flex,
  Grid,
  Icon,
  ResponsiveValue,
} from '@chakra-ui/react'
import styles from './AddFilterModal.module.css'
import CalendarComponent from './CalendarComponent'
import { FaCalendarAlt } from 'react-icons/fa'
import { MdOutlineCurrencyExchange } from 'react-icons/md'
import { CgOptions } from 'react-icons/cg'
import { HiStatusOnline } from 'react-icons/hi'
import Currency from './Currency'
import StatusOption from './StatusOption'

type FilterModalProps = {
  isOpen: boolean
  onClose: () => void
  top:
    | ResponsiveValue<
        | number
        | (string & {})
        | '-moz-initial'
        | 'inherit'
        | 'initial'
        | 'revert'
        | 'revert-layer'
        | 'unset'
        | 'auto'
      >
    | undefined
  left:
    | ResponsiveValue<
        | number
        | (string & {})
        | '-moz-initial'
        | 'inherit'
        | 'initial'
        | 'revert'
        | 'revert-layer'
        | 'unset'
        | 'auto'
      >
    | undefined
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  top,
  left,
}) => {
  const filterOptions = [
    {
      id: 1,
      name: 'Date',
      icon: FaCalendarAlt,
    },
    {
      id: 2,
      name: 'Currency',
      icon: MdOutlineCurrencyExchange,
    },
    {
      id: 3,
      name: 'Status',
      icon: HiStatusOnline,
    },
  ]

  //by default the first item is selected
  const [selectedItem, setSelectedItem] = useState(filterOptions[0].id)
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
    >
      <ModalContent
        top={top}
        left={left}
        style={{ height: '400px', maxHeight: '100vh' }}
      >
        <ModalCloseButton />
        <Flex className={styles.parent_container}>
          <Box className={styles.leftbar}>
            <Flex
              w="full"
              justifyContent={'center'}
              alignItems={'center'}
              className={styles.heading}
              gap={2}
            >
              <Text size={'sm'}>My transactions</Text>
              <Switch size={'sm'} />
            </Flex>
            {filterOptions.map(option => (
              <Flex
                key={option.id}
                w="full"
                bgColor={selectedItem === option.id ? '#f3f4f7' : 'transparent'}
                className={styles.leftItem}
                onClick={() => setSelectedItem(option.id)}
              >
                <Icon
                  as={option.icon}
                  className={styles.icon}
                />
                <Text className={styles.option}>{option.name}</Text>
              </Flex>
            ))}
          </Box>
          {selectedItem == 1 && <CalendarComponent />}
          {selectedItem == 2 && <Currency />}
          {selectedItem == 3 && <StatusOption />}
        </Flex>
      </ModalContent>
    </Modal>
  )
}

export default FilterModal
