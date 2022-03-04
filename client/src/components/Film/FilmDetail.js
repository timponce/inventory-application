import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Core/Header";
import Footer from "../Core/Footer";
import {
  Heading,
  Box,
  Flex,
  Img,
  SimpleGrid,
  GridItem,
  Text,
  Center,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { format, parseISO } from "date-fns";

export default function FilmDetail() {
  const [filmDetailData, setFilmDetailData] = React.useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/film/${id}`)
      .then((res) => res.json())
      .then((data) => setFilmDetailData(data));
  }, [id]);

  return (
    <div>
      <Header />
      {filmDetailData.length !== 0 ? (
        <Box>
          <Heading as="h1" size="4xl" textAlign="center">
            {filmDetailData.title}
          </Heading>
          <Flex mx="60px" my="60px" gap="40px">
            <Img src={filmDetailData.image} alt="Movie Poster" maxW="50%"></Img>
            <SimpleGrid columns={{ sm: 1, md: 2 }} flexGrow="1">
              <GridItem>
                <Text>Directed by: </Text>
              </GridItem>
              <GridItem>
                <Text>
                  {filmDetailData.director.first_name +
                    " " +
                    filmDetailData.director.last_name}{" "}
                </Text>
              </GridItem>
              <GridItem>
                <Text>Release Date: </Text>
              </GridItem>
              <GridItem>
                <Text>
                  {format(parseISO(filmDetailData.release), "MMMM do y")}{" "}
                </Text>
              </GridItem>
              <GridItem>
                <Text>Genre: </Text>
              </GridItem>
              <GridItem>
                {filmDetailData.genre.map((genre, i) => (
                  <Text key={i}>{genre.name}</Text>
                ))}
              </GridItem>
              <GridItem>
                <Text>Starring: </Text>
              </GridItem>
              <GridItem>
                <Text>Placeholder </Text>
              </GridItem>
            </SimpleGrid>
          </Flex>
        </Box>
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
    </div>
  );
}
