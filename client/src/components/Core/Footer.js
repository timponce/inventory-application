import {
  Center,
  HStack,
  IconButton,
  Link,
  VStack,
  Text,
} from "@chakra-ui/react";
import {
  BsPersonFill,
  BsGithub,
  BsLinkedin,
  BsEnvelopeFill,
} from "react-icons/bs";
import React from "react";

export default function Footer() {
  return (
    <footer>
      <Center>
        <VStack>
          <HStack>
            <IconButton
              aria-label="Go to Tim's Linkedin"
              variant="unstyled"
              icon={<BsLinkedin />}
            />
            <IconButton
              aria-label="Go to Tim's GitHub"
              variant="unstyled"
              icon={<BsGithub />}
            />
            <IconButton
              aria-label="Go to Tim's Website"
              variant="unstyled"
              icon={<BsPersonFill />}
            />
            <IconButton
              aria-label="Draft an email to Tim"
              variant="unstyled"
              icon={<BsEnvelopeFill />}
            />
          </HStack>
          <HStack spacing="48px">
            <Link
              href="https://github.com/timponce/inventory-application"
              isExternal
            >
              Source Code
            </Link>
            <Link
              href="https://github.com/timponce/inventory-application"
              isExternal
            >
              About This Project
            </Link>
            <Link
              href="https://github.com/timponce/inventory-application"
              isExternal
            >
              Resources Used
            </Link>
          </HStack>
          <Text color="gray.500" pt="10px">
            © 2022 MovieBox by Timothy Ponce
          </Text>
        </VStack>
      </Center>
    </footer>
  );
}
