//TODO: rectify the positioning

import React, { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalCloseButton,
  Text,
  Switch,
  Box,
  Flex,
  Icon,
  ResponsiveValue,
} from '@chakra-ui/react'
import styles from './AddFilterModal.module.css'
import CalendarComponent from './CalendarComponent'
import { FaCalendarAlt } from 'react-icons/fa'
import { MdOutlineCurrencyExchange } from 'react-icons/md'
import { HiStatusOnline } from 'react-icons/hi'
import Currency from './Currency'
import StatusOption from './StatusOption'
import Leftbar from './Leftbar'

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
      size="xl"
    >
      <ModalContent
        top={top}
        left={left}
        style={{ height: '500px', maxHeight: '100vh' }}
      >
        <ModalCloseButton />

        {/* TODO: This is the leftbar make it a separate component */}

        {/* TODO: make the styles inline and use theme where possible*/}

        <Flex className={styles.parent_container}>
          <Leftbar
            filterOptions={filterOptions}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          {selectedItem == 1 && <CalendarComponent />}
          {selectedItem == 2 && <Currency />}
          {selectedItem == 3 && <StatusOption />}
        </Flex>
      </ModalContent>
    </Modal>
  )
}

export default FilterModal
