import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Core/Header";
import Footer from "../Core/Footer";
import Loading from "../Core/Loading";
import {
  Heading,
  Box,
  Flex,
  Img,
  Grid,
  Container,
  Link,
  Button,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import { format, parseISO } from "date-fns";

export default function FilmDetail() {
  const [filmDetailData, setFilmDetailData] = React.useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/film/${id}`)
      .then((res) => res.json())
      .then((data) => setFilmDetailData(data));
  }, []);

  // const chakraColorfulThemes = [
  //   "red",
  //   "orange",
  //   "yellow",
  //   "green",
  //   "teal",
  //   "blue",
  //   "cyan",
  //   "purple",
  //   "pink",
  // ];

  // function getRandomFromArray(array) {
  //   return array[Math.floor(Math.random() * array.length)];
  // }

  return (
    <Container maxW="1600px" p="0">
      <Header />
      {filmDetailData.length !== 0 ? (
        <Box>
          <Heading as="h1" size="4xl" textAlign="center">
            {filmDetailData.title}
          </Heading>
          <Box
            display={{ lg: "flex" }}
            mx="60px"
            my="60px"
            justify="space-around"
          >
            <Spacer />
            <Img
              src={filmDetailData.image}
              maxW="50%"
              maxH="720px"
              alt="Movie Poster"
              margin="0 auto"
            ></Img>
            <VStack ml={{ lg: "60px" }} spacing="40px" textAlign="center">
              <VStack spacing="20px">
                <Heading as="h4" size="lg">
                  Directed by:
                </Heading>
                <Link>
                  <Button>
                    {filmDetailData.director.first_name +
                      " " +
                      filmDetailData.director.last_name}{" "}
                  </Button>
                </Link>
              </VStack>
              <VStack spacing="20px">
                <Heading as="h4" size="lg">
                  Release Date:{" "}
                </Heading>
                <Button>
                  {format(parseISO(filmDetailData.release), "MMMM do y")}{" "}
                </Button>
              </VStack>
              <VStack spacing="20px">
                <Heading as="h4" size="lg">
                  Genre:{" "}
                </Heading>
                <Flex wrap="wrap" justify="space-around" gap="20px">
                  {filmDetailData.genre.map((genre, i) => (
                    <Link key={i}>
                      <Button>{genre.name}</Button>
                    </Link>
                  ))}
                </Flex>
              </VStack>
              <VStack spacing="20px">
                <Heading as="h4" size="lg">
                  Starring:{" "}
                </Heading>
                <Flex wrap="wrap" justify="space-around" gap="20px">
                  {["Placeholder 1", "Placeholder 2", "Placeholder 3"].map(
                    (item, i) => (
                      <Link key={i}>
                        <Button>{item}</Button>
                      </Link>
                    )
                  )}
                </Flex>
              </VStack>
            </VStack>
            <Spacer />
          </Box>
        </Box>
      ) : (
        <Loading />
      )}
      <Footer />
    </Container>
  );
}
