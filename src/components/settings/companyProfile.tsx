import React, { useRef, useState } from 'react'
import Image from 'next/image'
import {
  Box,
  VStack,
  HStack,
  Text,
  Link,
  Divider,
  Badge,
  Icon,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Textarea,
  Button,
  ModalFooter,
  Input,
} from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'
import { IoIosArrowForward } from 'react-icons/io'
import { RxAvatar } from 'react-icons/rx'
import { FaCopy } from 'react-icons/fa'
import { FaCheckSquare } from 'react-icons/fa'
import { useAuth } from '../../hooks/auth'
import { Popover } from '@chakra-ui/react'
import { FaUpload } from 'react-icons/fa6'
import LogoComponent from '../Logo/LogoComponent'

interface Props {}

const CompanyProfile: React.FC<Props> = () => {
  const [copied, setCopy] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [editField, setEditField] = useState<string>('')

  //for file upload
  const [logo, setLogo] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profileData, setProfileData] = useState({
    profileName: 'VSC Project',
    profilePicture: '',
    about: 'VSC Defi, Incorporated',
    website: 'https://vsc.eco',
    location: 'SF, California, USA',
  })

  //function for handleCopy
  function handleCopy(value: string) {
    navigator.clipboard.writeText(value).then(() => {
      setCopy(true)
      setTimeout(() => {
        setCopy(false)
      }, 1000)
    })
  }

  // Open the modal for editing
  const openModal = (field: string) => {
    setEditField(field)
    setModalOpen(true)
  }

  // Update the profile data
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setProfileData({ ...profileData, [editField]: e.target.value })
  }

  // Close the modal after editing
  const handleModalClose = () => {
    setModalOpen(false)
    setEditField('')
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

  const auth = useAuth()

  return (
    <Box
      maxWidth="800px"
      margin="auto"
      padding={8}
    >
      <HStack
        spacing={4}
        alignItems="center"
        marginBottom={6}
      >
        <Box borderRadius="md">
          <Image
            src={'/VSC-Logo.png'}
            alt="Mercury Demo Logo"
            width={80}
            height={80}
          />
        </Box>
        <Text
          fontSize="2xl"
          fontWeight="bold"
        >
          VSC Demo
        </Text>
      </HStack>

      <VStack
        spacing={6}
        align="stretch"
      >
        <InfoRow
          label="Profile name"
          value={profileData.profileName}
          subtext="This is the name that appears on VSC and in your notifications."
          editable
          onEdit={() => openModal('Profile name')}
        />

        <InfoRow
          label="Profile Picture"
          value={
            <Box borderRadius="md">
              <Icon
                as={RxAvatar}
                width={70}
                height={70}
              />
            </Box>
          }
          subtext="This will appear on VSC next to your company name."
          editable
          onEdit={() => openModal('Profile Picture')}
        />

        <InfoRow
          label="About"
          value={profileData.about}
          editable
          onEdit={() => openModal('About')}
        />

        <InfoRow
          label="Website"
          value={profileData.website}
          subtext="This is the webiste link."
          editable
          onEdit={() => openModal('Website')}
        />

        <InfoRow
          label="Location"
          value={profileData.location}
          editable
          onEdit={() => openModal('location')}
        />
        <InfoRow
          label="User ID"
          value={auth.authenticated ? auth.userId : ''}
          icon={
            !copied ? (
              <FaCopy
                cursor={'pointer'}
                onClick={() =>
                  handleCopy(auth.authenticated ? auth.userId : '')
                }
              />
            ) : (
              <FaCheckSquare />
            )
          }
          editable={false}
        />
      </VStack>

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
                placeholder={`Edit ${editField} here`}
                value={profileData[editField]}
                onChange={handleInputChange}
              />
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              variant={'outline'}
              onClick={handleModalClose}
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
    </Box>
  )
}

interface InfoRowProps {
  label: string
  value: React.ReactNode
  subtext?: string
  icon?: React.ReactNode
  editable?: boolean
  onEdit?: () => void
}

const InfoRow: React.FC<InfoRowProps> = ({
  label,
  value,
  subtext,
  icon,
  editable,
  onEdit,
}) => (
  <Box>
    <HStack
      w={700}
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Text
        fontWeight="medium"
        color="gray.600"
      >
        {label}
      </Text>
      <VStack
        align="flex-end"
        spacing={1}
      >
        <HStack>
          {typeof value === 'string' ? <Text>{value}</Text> : value}
          {icon}
        </HStack>
        {editable && (
          <Link
            color="blue.500"
            fontSize="sm"
          >
            <Flex
              gap={1}
              alignItems={'center'}
              onClick={onEdit}
            >
              <Text>Edit</Text>
              <Icon as={IoIosArrowForward} />
            </Flex>
          </Link>
        )}
      </VStack>
    </HStack>
    {subtext && (
      <Text
        fontSize="sm"
        color="gray.500"
        mt={1}
      >
        {subtext}
      </Text>
    )}
    <Divider mt={4} />
  </Box>
)

export default CompanyProfile
