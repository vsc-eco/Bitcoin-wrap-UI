//TODO: replace the icon logo
import React, { useRef, useState } from 'react'
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
  Image,
  Button,
} from '@chakra-ui/react'
import { IoIosArrowForward } from 'react-icons/io'
import { RxAvatar } from 'react-icons/rx'
import { FaCopy } from 'react-icons/fa'
import { useAuth } from '../../hooks/auth'
import { FaCheck, FaPlus } from 'react-icons/fa6'
import EditModal from './EditModal'
import { useDetails } from '../../hooks/AccountData/getDetails'
import { PostingJsonMetadata, Profile } from '../../hooks/VSC'
import { BlockchainActions } from '../../hooks/blockchain'

interface Props {}

const CompanyProfile: React.FC<Props> = () => {
  const [copied, setCopy] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [editField, setEditField] = useState<keyof Profile>()
  const [saveForm, setSaveForm] = useState(false)

  //for file upload
  //   const [logo, setLogo] = useState<Boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
  const openModal = (field: keyof Profile) => {
    setEditField(field) //editField === Profile Name || profileName
    setModalOpen(true)
  }

  const auth = useAuth()

  const details: PostingJsonMetadata | null | undefined = useDetails()

  /**
   * This function will be hooked up to the save button at the end of the form
   */

  const handleFormSave = async () => {
    if (typeof details === 'undefined' || details === null) {
      throw new Error('details is null or undefined!')
    }
    const updateProfile = await BlockchainActions(
      'hive',
      'updateProfile',
      details,
    )
    if (!updateProfile.success) {
      console.log('error -> ', updateProfile.error)
      console.log('error code ->', updateProfile.errorCode)
      throw new Error('Failed to update profile')
    }
    if (updateProfile.success) {
      console.log('Successfully uploaded!')
      console.log(updateProfile.result)
    }
  }

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
            src={'/vsc.svg'}
            alt="Mercury Demo Logo"
            width={20}
            height={20}
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
          value={details?.profile?.name}
          subtext="This is the name that appears on VSC and in your notifications."
          onEdit={() => openModal('name')}
          editable
          isEmpty={!details?.profile?.name}
        />

        <InfoRow
          label="Profile Picture"
          value={
            <Box>
              {details?.profile?.profile_image ? (
                <Image
                  src={details?.profile.profile_image}
                  alt="profile picture"
                  width={100}
                  height={100}
                  borderRadius="50%"
                />
              ) : (
                <Icon
                  as={RxAvatar}
                  boxSize={'32px'}
                />
              )}
            </Box>
          }
          subtext="This will appear on VSC next to your company name."
          editable
          onEdit={() => openModal('profile_image')}
          isEmpty={!details?.profile?.profile_image}
        />

        <InfoRow
          label="About"
          value={details?.profile?.about}
          editable
          onEdit={() => openModal('about')}
          isEmpty={!details?.profile?.about}
        />

        <InfoRow
          label="Website"
          value={details?.profile?.website}
          subtext="This is the webiste link."
          editable
          onEdit={() => openModal('website')}
          isEmpty={!details?.profile?.website}
        />

        <InfoRow
          label="Location"
          value={details?.profile?.location}
          editable
          onEdit={() => openModal('location')}
          isEmpty={!details?.profile?.location}
        />
        <InfoRow
          label="User ID"
          value={
            <Flex alignItems="center">
              {auth.authenticated
                ? auth.userId.startsWith('hive:')
                  ? auth.userId.replace('hive:', '@')
                  : auth.userId.replace('did:pkh:eip155:1:', '')
                : ''}
              {auth.authenticated && auth.userId.startsWith('hive:') && (
                <Image
                  src="./hive.svg"
                  alt="Hive Logo"
                  boxSize={'18px'}
                  marginLeft="8px"
                />
              )}
              {auth.authenticated &&
                auth.userId.startsWith('did:pkh:eip155:1:') && (
                  <Image
                    src="./eth.svg"
                    alt="Ethereum Logo"
                    boxSize={'18px'}
                    marginLeft="8px"
                  />
                )}
            </Flex>
          }
          icon={
            !copied ? (
              <FaCopy
                cursor={'pointer'}
                onClick={() =>
                  handleCopy(
                    auth.authenticated ? auth.userId.replace('hive:', '@') : '',
                  )
                }
              />
            ) : (
              <FaCheck color="green" />
            )
          }
          editable={false}
        />

        <Button
          mr={3}
          variant={'outline'}
          isDisabled={!saveForm}
          onClick={handleFormSave}
        >
          Save
        </Button>
      </VStack>

      <EditModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        setEditField={setEditField}
        saveForm={saveForm}
        setSaveForm={setSaveForm}
        editField={editField}
        fileInputRef={fileInputRef}
        profile_image={details?.profile?.profile_image}
      />
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
  logo?: React.ReactNode
  isEmpty?: boolean
}

const InfoRow: React.FC<InfoRowProps> = ({
  label,
  value,
  subtext,
  icon,
  editable,
  onEdit,
  logo,
  isEmpty,
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
        <HStack position={'relative'}>
          {typeof value === 'string' ? (
            <Flex
              gap={1}
              alignItems={'center'}
            >
              <Text>{value}</Text>
              <Text>{label === 'User ID' && logo}</Text>
            </Flex>
          ) : (
            value
          )}
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
              color={'indigo.900'}
              textDecoration={'none'}
            >
              <Text>{isEmpty ? 'Add' : 'Edit'}</Text>
              <Icon as={isEmpty ? FaPlus : IoIosArrowForward} />
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
