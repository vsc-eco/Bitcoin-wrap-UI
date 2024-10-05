import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  ModalFooter,
  Input,
  Text,
  Box,
  Icon,
  Flex,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaUpload } from 'react-icons/fa6'
import { RxAvatar } from 'react-icons/rx'

type Props = {
  isModalOpen: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setEditField: React.Dispatch<React.SetStateAction<string>>
  setLogo: React.Dispatch<React.SetStateAction<File | null>>
  editField: string
  logo: File | null
  fileInputRef: React.RefObject<HTMLInputElement>
  profileData: {
    profileName: string
    profilePicture: string
    about: string
    website: string
    location: string
  }
  setProfileData: React.Dispatch<
    React.SetStateAction<{
      profileName: string
      profilePicture: string
      about: string
      website: string
      location: string
    }>
  >
}

const EditModal = ({
  isModalOpen,
  setModalOpen,
  setEditField,
  setLogo,
  editField,
  logo,
  fileInputRef,
  profileData,
  setProfileData,
}: Props) => {
  const [tempData, setTempData] = useState<string>('')

  // Close the modal after editing
  const handleModalClose = () => {
    setModalOpen(false)
    setEditField('')
    setTempData('')
  }

  //making functions for the file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogo(event.target.files[0])
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setLogo(event.dataTransfer.files[0])
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleRemove = () => {
    setLogo(null)
  }

  // Update the profile data
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTempData(e.target.value) //tempData = the
  }

  //function for saving the data
  const handleSave = () => {
    setProfileData({ ...profileData, [editField]: tempData })
    handleModalClose()
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleModalClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody mt={10}>
          {editField === 'Profile Picture' ? (
            <>
              <Text
                size={'xl'}
                fontWeight={'bold'}
                py={2}
              >
                Edit Logo
              </Text>
              {logo ? (
                <Flex
                  gap={2}
                  alignItems={'center'}
                  justifyContent={'space-evenly'}
                >
                  <Box>
                    <Icon
                      as={RxAvatar}
                      boxSize={'32px'}
                    />
                  </Box>
                  <Text>logo name</Text>
                  <Button
                    variant={'outline'}
                    onClick={handleRemove}
                  >
                    Remove
                  </Button>
                </Flex>
              ) : (
                <Flex
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  py={4}
                >
                  <Flex
                    alignItems={'center'}
                    gap={1}
                  >
                    <Icon
                      as={RxAvatar}
                      boxSize={'48px'}
                    />
                    <Text>logo name</Text>
                  </Flex>
                  <Button
                    variant={'outline'}
                    size={'xs'}
                    onClick={handleRemove}
                  >
                    Remove
                  </Button>
                </Flex>
              )}
              <Text>Upload a new logo</Text>
              <Flex
                border={'1px solid'}
                borderRadius={'12px'}
                height={200}
                width={400}
                position={'relative'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Flex
                  justifyContent={'center'}
                  gap={2}
                  alignItems={'center'}
                >
                  <Icon
                    as={FaUpload}
                    height={50}
                    width={70}
                  />
                  <Text>Click Here to Upload</Text>
                </Flex>
                <Input
                  position={'absolute'}
                  top={0}
                  left={0}
                  height={'full'}
                  width={'full'}
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  opacity={0}
                  cursor={'pointer'}
                />
              </Flex>
            </>
          ) : (
            <Input
              placeholder={
                editField === 'profileName'
                  ? 'Profile Name'
                  : editField === 'about'
                    ? 'Enter new about here'
                    : editField === 'website'
                      ? 'Enter new website here'
                      : 'Enter the new location here'
              }
              value={tempData}
              onChange={handleInputChange}
            />
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            variant={'outline'}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            variant={'inline'}
            onClick={handleModalClose}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditModal
