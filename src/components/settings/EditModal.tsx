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
import React, { useEffect, useState } from 'react'
import { FaUpload } from 'react-icons/fa6'
import { RxAvatar } from 'react-icons/rx'
//import the useQuery and useMutation hook here
import { useAuth } from '../../hooks/auth'
import { BlockchainActions } from '../../hooks/blockchain'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PostingJsonMetadata, Profile } from '../../hooks/VSC'

type Props = {
  isModalOpen: boolean
  saveForm: boolean
  setSaveForm: React.Dispatch<React.SetStateAction<boolean>>
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setEditField: React.Dispatch<React.SetStateAction<keyof Profile | undefined>>
  editField: keyof Profile | undefined
  fileInputRef: React.RefObject<HTMLInputElement>
  profile_image: string | undefined
}

const EditModal = ({
  isModalOpen,
  setModalOpen,
  setEditField,
  editField,
  fileInputRef,
  setSaveForm,
  profile_image,
}: Props) => {
  const auth = useAuth()
  const [tempData, setTempData] = useState<string>('')
  const [profileImg, setProfileImg] = useState<File | null>()
  const queryClient = useQueryClient()

  //use mutation hook
  const { data, error, mutate } = useMutation({
    mutationKey: ['account_status', auth.authenticated ? auth : ''],

    mutationFn: async (newData: File | string) => {
      if (!auth.authenticated) {
        throw new Error('User is not authenticated')
      }

      if (editField === 'profile_image') {
        const file = newData as Blob
        const username = auth.authenticated && auth.userId.replace('hive:', '')
        const res = await BlockchainActions('hive', 'signProfilePicture', file)

        if (!res.success) throw new Error('Failed to sign the profile')
        console.log('result', res)

        const bodyFormData = new FormData()
        bodyFormData.append('file', file)
        const signatureUrl = `https://images.hive.blog/${username}/${res.result}`
        // console.log(signatureUrl)
        const uploadResponse = await axios.post(signatureUrl, bodyFormData)

        console.log('uploadResponse', uploadResponse.data.url)
        return uploadResponse.data.url
      }
    },

    //this will mutate the text data that has been passed
    onMutate: async newData => {
      if (!auth.authenticated) {
        throw new Error('User is not authenticated')
      }

      if (typeof editField === 'undefined') {
        throw new Error('editField is not defined')
      }

      const queryKey = ['account_status', auth.userId] as const
      await queryClient.cancelQueries({
        queryKey,
      })

      const previousData: PostingJsonMetadata | null | undefined =
        queryClient.getQueryData(queryKey)

      queryClient.setQueryData<PostingJsonMetadata | null>(queryKey, old => {
        const res = {
          ...old,
          profile: { ...old?.profile, [editField]: newData }, //updated
        }

        return res
      })
      return { previousData }
    },

    onSuccess: newImgUrl => {
      if (!auth.authenticated) {
        throw new Error('Auth is not defined')
      }

      if (editField === 'profile_image') {
        const queryKey = ['account_status', auth.userId]

        queryClient.setQueryData<PostingJsonMetadata | null>(queryKey, old => {
          return {
            ...old,
            profile: {
              ...old?.profile,
              profile_image: newImgUrl,
            },
          }
        })
      }
    },

    //this is for if it gives out error then we would render back the previous data stored in cache
    onError(error, newData, context) {
      queryClient.setQueryData(
        ['account_status', auth.authenticated ? auth.userId : ''],
        context?.previousData,
      )
    },
  })

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0] && auth.authenticated) {
      const file = event.target.files[0]
      setProfileImg(file)

      console.log('Already doing the file change here! ')
      mutate(file)
    } else {
      alert('not logged in')
    }
  }

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    https: event.preventDefault()
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0]
      mutate(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleRemove = () => {
    setProfileImg(null)
  }

  // Update the profile data
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTempData(e.target.value) //tempData = the
  }

  // Close the modal after editing
  const handleModalClose = () => {
    setModalOpen(false)
    setEditField(undefined)
    setTempData('')
  }

  //function for saving the data
  const handleSave = () => {
    // editFeild === 'profile_image'
    if (typeof editField === 'string' && editField !== 'profile_image') {
      mutate(tempData)
    }
    //We wont be changing the file here in the UI we would upload it
    setSaveForm(true)
    console.log('Mutation of the image should be shown!')

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
          {editField === 'profile_image' ? (
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
                  {profile_image ? (
                    <>
                      <Image
                        src={profile_image}
                        alt="profilePicture"
                        boxSize={'24px'}
                        borderRadius={'2xl'}
                      />

                      <Text>Profile Picture</Text>
                    </>
                  ) : (
                    <Icon
                      as={RxAvatar}
                      boxSize={'28px'}
                    />
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
              <Text>Upload a new Image</Text>
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
                <Flex>
                  <Flex
                    justifyContent={'center'}
                    gap={2}
                    alignItems={'center'}
                  >
                    {profileImg ? (
                      <>
                        <Image
                          alt="profilepic"
                          src={URL.createObjectURL(profileImg)}
                          borderRadius={'lg'}
                          width={400}
                          height={199}
                        />
                      </>
                    ) : (
                      <>
                        <Icon
                          as={FaUpload}
                          height={50}
                          width={70}
                        />
                        <Text>Click Here to Upload</Text>
                      </>
                    )}
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
              </Flex>
            </>
          ) : (
            <Input
              placeholder={
                editField === 'name'
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
              if (editField === 'profile_image') {
                handleRemove()
              }
              handleModalClose()
            }}
          >
            Cancel
          </Button>
          <Button
            ml={3}
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
