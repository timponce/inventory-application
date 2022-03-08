import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Core/Header";
import Footer from "../Core/Footer";
import Loading from "../Core/Loading";
import {
  Heading,
  Text,
  Box,
  Container,
  VStack,
  Grid,
  LinkBox,
  AspectRatio,
  Image,
  LinkOverlay,
  HStack,
  Tag,
} from "@chakra-ui/react";
import { format, parseISO } from "date-fns";

export default function GenreDetail() {
  const [genreDetailData, setGenreDetailData] = React.useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/genre/${id}`)
      .then((res) => res.json())
      .then((data) => setGenreDetailData(data));
  }, []);

  console.log(genreDetailData);

  return (
    <Container maxW="1600px" p="0">
      <Header />
      {genreDetailData.length !== 0 ? (
        <Box mx="60px">
          <Heading as="h1" size="4xl" textAlign="center">
            {genreDetailData.genre.name}
          </Heading>
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "null",
              lg: "repeat(4, 1fr)",
            }}
            gap={{
              base: "10px",
              sm: "null",
              md: "40px",
              lg: "20px",
              xl: "60px",
            }}
            flex="1 1 auto"
            mt="40px"
          >
            {genreDetailData.genre_films.map((film, i) => (
              <LinkBox key={i} as="section">
                <VStack align="start">
                  <AspectRatio alignSelf="stretch" ratio={2 / 3}>
                    <Image src={film.image} alt="Film cover art" />
                  </AspectRatio>
                  <Text>{format(parseISO(film.release), "yyyy")}</Text>
                  <Heading as="h6" size="sm">
                    <LinkOverlay href={"/film/" + film._id}>
                      {film.title}
                    </LinkOverlay>
                  </Heading>
                  <HStack>
                    {film.genre.map((genre, i) => (
                      <Tag key={i}>{genre.name}</Tag>
                    ))}
                  </HStack>
                </VStack>
              </LinkBox>
            ))}
          </Grid>
        </Box>
      ) : (
        <Loading />
      )}
      <Footer />
    </Container>
  );
}
