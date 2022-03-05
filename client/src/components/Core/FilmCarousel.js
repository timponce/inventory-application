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
    <Box m="60px">
      <Flex justify="space-between">
        <Heading as="h3" size="lg" mb="40px">
          {props.title}
        </Heading>
        <Link href="#" color="red">
          <HStack>
            <Text>See more</Text>
            <Icon as={FiChevronRight} fontSize="18px" />
          </HStack>
        </Link>
      </Flex>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "null",
          lg: "repeat(4, 1fr)",
        }}
      >
        {carouselFilms.map((item, i) => (
          <LinkBox as="section">
            <VStack key={i} h="fit-content" w="250px" align="start">
              <Image src={item.image} h="370px" w="250px" />
              <Text>{format(parseISO(item.release), "yyyy")}</Text>
              <Heading as="h6" size="sm">
                <LinkOverlay href={"/film/" + item._id}>
                  {item.title}
                </LinkOverlay>
              </Heading>
              <HStack>
                {item.genre.map((genre, i) => (
                  <Tag key={i}>{genre.name}</Tag>
                ))}
              </HStack>
            </VStack>
          </LinkBox>
        ))}
      </Grid>
    </Box>
  );
}
