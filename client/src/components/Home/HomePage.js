import React from "react";
import Header from "../Core/Header";
import Footer from "../Core/Footer";
import Loading from "../Core/Loading";
import {
  Container,
  Flex,
  Heading,
  Spacer,
  Text,
  VStack,
  Button,
  Link,
} from "@chakra-ui/react";
import FilmCarousel from "../Core/FilmCarousel";

export default function HomePage(props) {
  return (
    <Container maxW="1600px" p="0">
      <Header />
      {props.directorData.length !== 0 &&
      props.filmData.length !== 0 &&
      props.genreData.length !== 0 ? (
        <Container maxW="1600px" p="0">
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
          <FilmCarousel title={"Featured Movies"} filmData={props.filmData} />
          <FilmCarousel title={"Recently Added"} filmData={props.filmData} />
        </Container>
      ) : (
        <Loading />
      )}
      <Footer />
    </Container>
  );
}
