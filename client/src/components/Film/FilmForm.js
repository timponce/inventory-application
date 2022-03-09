import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Icon,
  Tooltip,
  CheckboxGroup,
  Stack,
  Checkbox,
  Button,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Header from "../Core/Header";
import Footer from "../Core/Footer";
import Loading from "../Core/Loading";
import { BsFillQuestionCircleFill } from "react-icons/bs";

export default function FilmForm() {
  const [filmData, setFilmData] = React.useState([]);

  useEffect(() => {
    fetch("/api/film/create")
      .then((res) => res.json())
      .then((data) => setFilmData(data));
  }, []);

  return (
    <Container maxW="1600px" p="0">
      <Header />
      {filmData.length !== 0 ? (
        <Box mx={{ base: "10px", md: "60px" }}>
          <Heading as="h1" size="4xl" textAlign="center" mb="20px">
            {filmData.title}
          </Heading>
          <form method="POST" action="">
            <FormControl isRequired>
              <FormLabel htmlFor="title" mt="20px">
                Title
              </FormLabel>
              <Input id="title" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="director" mt="20px">
                Director
              </FormLabel>
              <Select id="director" placeholder="Select director">
                {filmData.directors.map((director) => (
                  <option key={director._id} value={director._id}>
                    {director.first_name + " " + director.last_name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="release" mt="20px">
                Release Date
              </FormLabel>
              <Input id="date" type="date" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="summary" mt="20px">
                Summary
                <Tooltip
                  label="Copy and paste a summary of the film here. Or write your own."
                  aria-label="A tooltip"
                  hasArrow
                  placement="right"
                >
                  <span>
                    <Icon as={BsFillQuestionCircleFill} ml="10px" />
                  </span>
                </Tooltip>
              </FormLabel>
              <Textarea id="summary" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="genre" mt="20px">
                Genre
              </FormLabel>
              <CheckboxGroup>
                <Stack spacing="10px" direction={{ base: "column", md: "row" }}>
                  {filmData.genres.map((genre) => (
                    <Checkbox key={genre._id} id={genre._id}>
                      {genre.name}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="imageUrl" mt="20px">
                Image URL
                <Tooltip
                  label="Perform an online image search for the film title. Preferably, filter the results for large images only (for google.com: select 'Tools', 'Size' dropdown, 'Large'). Right click image and select 'Open Image in New Tab'. Copy and paste the url here."
                  aria-label="A tooltip"
                  hasArrow
                  placement="right"
                >
                  <span>
                    <Icon as={BsFillQuestionCircleFill} ml="10px" />
                  </span>
                </Tooltip>
              </FormLabel>
              <Input id="imageUrl" />
            </FormControl>
            <Button mt="20px" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      ) : (
        <Loading />
      )}
      <Footer />
    </Container>
  );
}
