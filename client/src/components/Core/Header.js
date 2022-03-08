import React from "react";
import {
  IconButton,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Flex,
  Spacer,
  Box,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
} from "@chakra-ui/react";
import { BsFilm, BsSearch, BsList } from "react-icons/bs";

export default function Header() {
  return (
    <header>
      <Flex
        px={{ base: "10px", md: "60px" }}
        py="20px"
        flexDir={{ base: "column", md: "row" }}
      >
        <Box>
          <HStack>
            <Link href="/">
              <IconButton
                aria-label="Return to Home Page"
                colorScheme="red"
                fontSize="20px"
                isRound="true"
                icon={<BsFilm />}
              />
            </Link>
            <Heading as="h3" size="lg">
              MovieBox
            </Heading>
          </HStack>
        </Box>
        <Spacer />
        <Box flexGrow="1">
          <InputGroup>
            <Input placeholder="What do you want to watch?" />
            <InputRightElement children={<BsSearch />} />
          </InputGroup>
        </Box>
        <Spacer />
        <Box>
          <Button variant="ghost">Sign in</Button>
          <Menu placement="bottom-end">
            <MenuButton
              as={IconButton}
              aria-label="Menu"
              colorScheme="red"
              fontSize="24px"
              isRound="true"
              icon={<BsList />}
            ></MenuButton>
            <MenuList>
              <MenuGroup title="View">
                <MenuItem>All Films</MenuItem>
                <MenuItem>All Directors</MenuItem>
                <MenuItem>All Genres</MenuItem>
              </MenuGroup>
              <MenuGroup title="Create">
                <MenuItem>Add Film</MenuItem>
                <MenuItem>Add Director</MenuItem>
                <MenuItem>Add Genre</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </header>
  );
}
