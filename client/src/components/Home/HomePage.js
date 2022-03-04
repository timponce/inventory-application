import React from "react";
import Header from "../Core/Header";
import Footer from "../Core/Footer";
import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Img,
  Spacer,
  Spinner,
  Text,
  VStack,
  Button,
  Link,
  LinkBox,
} from "@chakra-ui/react";

export default function HomePage(props) {
  return (
    <Container maxW="1600px" p="0">
      <Header position="relative" />
      {props.directorData.length !== 0 &&
      props.filmData.length !== 0 &&
      props.genreData.length !== 0 ? (
        <Container
          maxW="100%"
          p="0"
          h="600px"
          bgImage="https://ntvb.tmsimg.com/assets/p16645155_v_h8_ae.jpg?w=1280&h=720"
          bgSize="cover"
          bgRepeat="no-repeat"
          bgPos="center"
        >
          <Flex
            h="inherit"
            opacity="80%"
            bgGradient="linear(to-r, black, transparent)"
          >
            <VStack maxW="30%" ml="60px">
              <Spacer />
              <Heading as="h1" size="4xl" color="white" alignSelf="start">
                {props.filmData[0].title}
              </Heading>
              <Text color="white" decoration="ActiveBorder">
                {props.filmData[0].summary}
              </Text>
              <Link href={"/film/" + props.filmData[0]._id} alignSelf="start">
                <Button
                  bgColor="red"
                  color="white"
                  _hover={{ bgColor: "red.600" }}
                  _active={{ bgColor: "red.700" }}
                >
                  See details
                </Button>
              </Link>
              <Spacer />
            </VStack>
            <Spacer />
          </Flex>
        </Container>
      ) : (
        <Center>
          <VStack>
            <Heading as="h1" size="4xl">
              Fetching Data
            </Heading>
            <Spinner
              size="xl"
              thickness="8px"
              color="blue.500"
              emptyColor="gray.200"
            />
          </VStack>
        </Center>
      )}
      <Footer />
    </Container>
  );
}
