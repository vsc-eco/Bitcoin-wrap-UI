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
  PopoverContent,
  Button,
} from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'
import { IoIosArrowForward } from 'react-icons/io'
import { RxAvatar } from 'react-icons/rx'
import { FaCopy } from 'react-icons/fa'
import { FaCheckSquare } from 'react-icons/fa'
import { useAuth } from '../../hooks/auth'
import { Popover } from '@chakra-ui/react'
import { FaCheck, FaUpload } from 'react-icons/fa6'
import LogoComponent from '../Logo/LogoComponent'
import EditModal from './EditModal'

interface Props {}

const CompanyProfile: React.FC<Props> = () => {
  const [copied, setCopy] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [editField, setEditField] = useState<string>('')
  const [saveForm, setSaveForm] = useState(false)

  //for file upload
  const [logo, setLogo] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profileData, setProfileData] = useState({
    profileName: 'VSC Project',
    profilePicture: null,
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
    setEditField(field) //editField === Profile Name || profileName
    setModalOpen(true)
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
          value={profileData.profileName}
          subtext="This is the name that appears on VSC and in your notifications."
          editable
          onEdit={() => openModal('profileName')}
        />

        <InfoRow
          label="Profile Picture"
          value={
            <Box>
              {logo ? (
                <Image
                  src={URL.createObjectURL(logo)}
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
          onEdit={() => openModal('profilePicture')}
        />

        <InfoRow
          label="About"
          value={profileData.about}
          editable
          onEdit={() => openModal('about')}
        />

        <InfoRow
          label="Website"
          value={profileData.website}
          subtext="This is the webiste link."
          editable
          onEdit={() => openModal('website')}
        />

        <InfoRow
          label="Location"
          value={profileData.location}
          editable
          onEdit={() => openModal('location')}
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
        >
          Save
        </Button>
      </VStack>

      <EditModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        setEditField={setEditField}
        setLogo={setLogo}
        saveForm={saveForm}
        setSaveForm={setSaveForm}
        editField={editField}
        logo={logo}
        fileInputRef={fileInputRef}
        profileData={profileData}
        setProfileData={setProfileData}
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
}

const InfoRow: React.FC<InfoRowProps> = ({
  label,
  value,
  subtext,
  icon,
  editable,
  onEdit,
  logo,
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
          {/* {copied ? (
            <Box position={'absolute'}>
              <Popover>
                <PopoverContent>Copied!</PopoverContent>
              </Popover>
            </Box>
          ) : null} */}
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
