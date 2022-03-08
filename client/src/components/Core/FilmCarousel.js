import {
  Box,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Text,
  Tag,
  VStack,
  LinkBox,
  LinkOverlay,
  Center,
  AspectRatio,
} from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import React from "react";
import { FiChevronRight } from "react-icons/fi";

export default function FilmCarousel(props) {
  const carouselFilms = [];

  for (let i = 0; i < 4; i++) {
    carouselFilms.push(props.filmData[i]);
  }

  return (
    <Box m={{ base: "10px", md: "60px" }}>
      <Flex
        justify={{ base: "center", sm: "space-between" }}
        flexDir={{ base: "column", sm: "row" }}
        mb={{ base: "20px", sm: "40px" }}
      >
        <Heading as="h3" size="lg">
          {props.title}
        </Heading>
        <Link href="#" color="red">
          <HStack>
            <Text>See more</Text>
            <Icon as={FiChevronRight} fontSize="18px" />
          </HStack>
        </Link>
      </Flex>
      <Center>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "null",
            lg: "repeat(4, 1fr)",
          }}
          gap={{ base: "10px", sm: "null", md: "40px", lg: "20px", xl: "60px" }}
          flex="1 1 auto"
        >
          {carouselFilms.map((item, i) => (
            <LinkBox key={i} as="section">
              <VStack align="start">
                <AspectRatio alignSelf="stretch" ratio={2 / 3}>
                  <Image src={item.image} alt="Film cover art" />
                </AspectRatio>
                <Text>{format(parseISO(item.release), "yyyy")}</Text>
                <Heading as="h6" size="sm">
                  <LinkOverlay href={"/film/" + item._id}>
                    {item.title}
                  </LinkOverlay>
                </Heading>
                <HStack>
                  {item.genre.map((genre, i) => (
                    <Tag as="a" href={"/genre/" + genre._id} key={i}>
                      {genre.name}
                    </Tag>
                  ))}
                </HStack>
              </VStack>
            </LinkBox>
          ))}
        </Grid>
      </Center>
    </Box>
  );
}
