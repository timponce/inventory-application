import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Core/Header";
import Footer from "../Core/Footer";
import Loading from "../Core/Loading";
import {
  Heading,
  Box,
  Flex,
  Image,
  Container,
  Button,
  VStack,
  AspectRatio,
  useBreakpointValue,
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

  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Container maxW="1600px" p="0">
      <Header />
      {filmDetailData.length !== 0 ? (
        <Box>
          <Heading as="h1" size="4xl" textAlign="center" mb="20px">
            {filmDetailData.title}
          </Heading>
          <Flex
            mx={{ base: "0", md: "60px" }}
            flexDir={{ base: "column", md: "row" }}
            align="center"
            justify="center"
            gap="20px"
          >
            <AspectRatio
              ratio={2 / 3}
              w="100%"
              maxW={{ base: "none", md: "480px" }}
              flex="1 1 auto"
            >
              <Image src={filmDetailData.image} alt="Movie Poster" />
            </AspectRatio>
            <VStack spacing="20px" align="start">
              <VStack spacing="20px" align="start">
                <Heading as="h4" fontSize={{ base: "lg", md: "3xl" }}>
                  Directed by:
                </Heading>
                <Button
                  as="a"
                  href={"/director/" + filmDetailData.director._id}
                  size={buttonSize}
                >
                  {filmDetailData.director.first_name +
                    " " +
                    filmDetailData.director.last_name}{" "}
                </Button>
              </VStack>
              <VStack spacing="20px" align="start">
                <Heading as="h4" fontSize={{ base: "lg", md: "3xl" }}>
                  Release Date:{" "}
                </Heading>
                <Button as="a" href="a" size={buttonSize}>
                  {format(parseISO(filmDetailData.release), "MMMM do y")}
                </Button>
              </VStack>
              <VStack spacing="20px" align="start">
                <Heading as="h4" fontSize={{ base: "lg", md: "3xl" }}>
                  Genre:{" "}
                </Heading>
                <Flex wrap="wrap" gap="20px">
                  {filmDetailData.genre.map((genre, i) => (
                    <Button as="a" href="#" size={buttonSize} key={i}>
                      {genre.name}
                    </Button>
                  ))}
                </Flex>
              </VStack>
              <VStack spacing="20px" align="start">
                <Heading as="h4" fontSize={{ base: "lg", md: "3xl" }}>
                  Starring:{" "}
                </Heading>
                <Flex wrap="wrap" gap="20px">
                  {["Placeholder 1", "Placeholder 2", "Placeholder 3"].map(
                    (item, i) => (
                      <Button as="a" href="#" size={buttonSize} key={i}>
                        {item}
                      </Button>
                    )
                  )}
                </Flex>
              </VStack>
            </VStack>
          </Flex>
        </Box>
      ) : (
        <Loading />
      )}
      <Footer />
    </Container>
  );
}
