import React, { useEffect } from "react";
import Header from "../Core/Header";
import Footer from "../Core/Footer";
import Loading from "../Core/Loading";
import { Heading, Box, Container, Button, Grid } from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";

export default function GenreList() {
  const [genreListData, setGenreListData] = React.useState([]);

  useEffect(() => {
    fetch(`/api/genres`)
      .then((res) => res.json())
      .then((data) => setGenreListData(data));
  }, []);

  return (
    <Container maxW="1600px" p="0">
      <Header />
      {genreListData.length !== 0 ? (
        <Box mx={{ base: "10px", md: "60px" }}>
          <Heading as="h1" size="4xl" textAlign="center" mb="20px">
            All Genres
          </Heading>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap="20px"
          >
            {genreListData.map((genre, i) => (
              <Button
                as="a"
                href={"/genre/" + genre._id}
                size="lg"
                justifyContent="start"
                rightIcon={<FiChevronRight />}
                iconSpacing="auto"
                key={i}
              >
                {genre.name}
              </Button>
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
