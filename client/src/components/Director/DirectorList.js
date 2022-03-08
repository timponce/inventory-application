import React, { useEffect } from "react";
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
} from "@chakra-ui/react";
import { format, parseISO } from "date-fns";

export default function DirectorList() {
  const [directorListData, setDirectorListData] = React.useState([]);

  useEffect(() => {
    fetch(`/api/directors`)
      .then((res) => res.json())
      .then((data) => setDirectorListData(data));
  }, []);

  const directorListElement = directorListData.map((director, i) => {
    let directorFullName = "";
    if (director.first_name && director.last_name) {
      directorFullName = director.first_name + " " + director.last_name;
    }
    if (!director.first_name || !director.last_name) {
      directorFullName = "";
    }
    let directorLifespan = "";
    if (director.date_of_birth) {
      directorLifespan = format(parseISO(director.date_of_birth), "y");
    }
    directorLifespan += " - ";
    if (director.date_of_death) {
      directorLifespan += format(parseISO(director.date_of_death), "y");
    }
    return (
      <LinkBox key={i} as="section">
        <VStack align="start">
          <AspectRatio alignSelf="stretch" ratio={2 / 3}>
            <Image src={director.image} alt="director placeholder image" />
          </AspectRatio>
          <Heading as="h6" size="sm">
            <LinkOverlay href={"/director/" + director._id}>
              {directorFullName}
            </LinkOverlay>
          </Heading>
          <Text>{directorLifespan}</Text>
        </VStack>
      </LinkBox>
    );
  });

  return (
    <Container maxW="1600px" p="0">
      <Header />
      {directorListData.length !== 0 ? (
        <Box mx={{ base: "10px", md: "60px" }}>
          <Heading as="h1" size="4xl" textAlign="center" mb="20px">
            All Directors
          </Heading>
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={{
              base: "10px",
              md: "40px",
              lg: "20px",
              xl: "60px",
            }}
            flex="1 1 auto"
          >
            {directorListElement}
          </Grid>
        </Box>
      ) : (
        <Loading />
      )}
      <Footer />
    </Container>
  );
}
