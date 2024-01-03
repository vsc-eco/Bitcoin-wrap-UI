import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Image,
  Text,
  Link,
  Center,
  Flex,
} from "@chakra-ui/react";
import { PiGoogleChromeLogoBold } from "react-icons/pi";
import { FaGithub, FaDiscord } from "react-icons/fa";

export default function SignUpComponent() {
  if (process.env.NEXT_PUBLIC_DEV_FEATURE === "true") {
    return (
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Center
          p={1}
          flexDir="column"
          height="60vh"
          width="600px"
          boxShadow="lg"
        >
          <Box mb={8}>
            <Image
              alt="Logo"
              width={36}
              height={32}
              objectFit="cover"
              src="/logo.svg"
            />
          </Box>
          <Box width="full" maxWidth="md" p={1}>
            <VStack spacing={4}>
              <Button
                leftIcon={<Image src="/hive.svg" alt="Hive logo" boxSize="6" />}
                variant="outline"
                width="full"
              >
                Sign in with Hive
              </Button>
              <Button
                leftIcon={<PiGoogleChromeLogoBold fontSize={"2xl"} />}
                variant="outline"
                width="full"
              >
                Sign up with Google
              </Button>
              <Button
                leftIcon={<FaGithub fontSize={"2xl"} />}
                variant="outline"
                width="full"
              >
                Sign up with Github
              </Button>
              <Button
                leftIcon={<FaDiscord fontSize={"2xl"} />}
                variant="outline"
                width="full"
              >
                Sign up with Discord
              </Button>
            </VStack>
          </Box>
        </Center>
      </Flex>
    );
  } else {
    return (
      <Flex h={720} w={720} alignItems={"center"} justifyContent={"center"}>
        <Text fontSize={"2xl"}>Coming soon in production!</Text>
      </Flex>
    );
  }
}
