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
  Image,
  Icon,
  Flex,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaUpload } from 'react-icons/fa6'
import { RxAvatar } from 'react-icons/rx'
import { CgProfile } from 'react-icons/cg'

type Props = {
  isModalOpen: boolean
  saveForm: boolean
  setSaveForm: React.Dispatch<React.SetStateAction<boolean>>
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setEditField: React.Dispatch<React.SetStateAction<string>>
  setLogo: React.Dispatch<React.SetStateAction<File | null>>
  editField: string
  logo: File | null
  fileInputRef: React.RefObject<HTMLInputElement>
  profileData: {
    profileName: string
    profilePicture: File | null
    about: string
    website: string
    location: string
  }
  setProfileData: React.Dispatch<
    React.SetStateAction<{
      profileName: string
      profilePicture: File | null
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
  setSaveForm,
}: Props) => {
  const [tempData, setTempData] = useState<string>('')
  const [profilePic, setProfilePic] = useState<File | null>(null)

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
    if (editField === 'profilePicture') {
      setProfileData({ ...profileData, [editField]: logo })
      setSaveForm(true)
      handleModalClose()
    }
    setProfileData({ ...profileData, [editField]: tempData })
    setSaveForm(true)
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
          {editField === 'profilePicture' ? (
            <>
              <Text
                size={'xl'}
                fontWeight={'bold'}
                py={2}
              >
                Edit Logo
              </Text>
              <Flex
                alignItems={'center'}
                justifyContent={'space-between'}
                py={4}
              >
                <Flex
                  alignItems={'center'}
                  gap={1}
                >
                  {logo ? (
                    <>
                      <Image
                        src={URL.createObjectURL(logo)}
                        alt="profilePicture"
                        boxSize={'24px'}
                        borderRadius={'2xl'}
                      />
                      <Text>{logo.name}</Text>
                    </>
                  ) : (
                    <>
                      <Icon
                        as={RxAvatar}
                        boxSize={'48px'}
                      />
                      <Text>Logo name</Text>
                    </>
                  )}
                </Flex>
                <Button
                  variant={'outline'}
                  size={'xs'}
                  onClick={handleRemove}
                >
                  Remove
                </Button>
              </Flex>
              <Text>{logo ? logo.name : 'Upload a new Image'}</Text>
              <Flex
                border={'1px solid'}
                borderRadius={'12px'}
                height={200}
                width={400}
                position={'relative'}
                justifyContent={'center'}
                alignItems={'center'}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {logo ? (
                  <>
                    <Image
                      src={URL.createObjectURL(logo)}
                      width={'full'}
                      height={'full'}
                      borderRadius={'12px'}
                      alt="Uploaded Image"
                    />
                  </>
                ) : (
                  <Flex>
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
                      cursor="pointer"
                    />
                  </Flex>
                )}
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
            variant={'inline'}
            onClick={() => {
              if (editField === 'profilePicture') {
                handleRemove()
              }
              handleModalClose()
            }}
          >
            Cancel
          </Button>
          <Button
            mr={3}
            variant={'outline'}
            onClick={handleSave}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditModal
