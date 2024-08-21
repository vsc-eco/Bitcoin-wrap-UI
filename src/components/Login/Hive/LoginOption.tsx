import { Button, Flex, GridItem, Icon, VStack, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

import styles from "./Hive.module.css";
import type { LoginOptionName, LoginOptionType } from "./HiveModal";

const DEFAULT_AUTH_OPTION: LoginOptionName = "Keychain";
export const LOGIN_METHOD_FIELD = "loginMethod";

export function LoginOption({ option }: { option: LoginOptionType }) {
  return (
    <GridItem>
      <VStack>
        <Flex gap={1} alignItems={"center"} position={"relative"}>
          <Button
            as="label"
            colorScheme="gray"
            w={125}
            className={`${styles.container} ${
              option.disabled ? styles.disabled : ""
            }`}
          >
            <Image
              alt={`${option.name} Logo`}
              height={option.name === "Hivesigner" ? 20 : 25}
              width={option.name === "Hivesigner" ? 20 : 25}
              src={option.image}
              objectFit="contain"
            />
            <Text fontSize={"sm"}>{option.name}</Text>
            <input
              type="radio"
              name={LOGIN_METHOD_FIELD}
              value={option.name}
              defaultChecked={option.name === DEFAULT_AUTH_OPTION}
              disabled={option.disabled}
            />
            <span className={styles.checkmark}>
              <Icon className={styles.icon} as={FaCheckCircle} />
            </span>
          </Button>
        </Flex>
      </VStack>
    </GridItem>
  );
}
