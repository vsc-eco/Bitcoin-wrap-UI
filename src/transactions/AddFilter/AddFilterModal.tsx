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
} from '@chakra-ui/react'
import styles from './AddFilterModal.module.css'
import CalendarComponent from "./CalendarComponent"
import { FaCalendarAlt } from 'react-icons/fa'
import { MdOutlineCurrencyExchange } from 'react-icons/md'
import { CgOptions } from 'react-icons/cg'
import Currency from './Currency'

type FilterModalProps = {
  isOpen: boolean
  onClose: () => void
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
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
  ]

  //by default the first item is selected
  const [selectedItem, setSelectedItem] = useState(filterOptions[0].id)
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
    >
      <ModalContent>
        <ModalCloseButton />
        <Flex className={styles.parent_container}>
          <Box className={styles.leftbar}>
            <Flex
              w="full"
              justifyContent={'space-between'}
              alignItems={'center'}
              className={styles.heading}
            >
              <Text>My transactions</Text>
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
          {selectedItem == 2 ? <Currency /> : <CalendarComponent />}
        </Flex>
      </ModalContent>
    </Modal>
  )
}

export default FilterModal
