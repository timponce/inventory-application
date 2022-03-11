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
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Core/Header";
import Footer from "../Core/Footer";
import Loading from "../Core/Loading";
import { BsFillQuestionCircleFill } from "react-icons/bs";

export default function FilmForm() {
  const [filmData, setFilmData] = React.useState([]);
  const [newFilm, setNewFilm] = React.useState({
    title: "",
    director: "",
    release: "",
    summary: "",
    genre: "",
    image: "",
  });

  const { id } = useParams();
  const isAddMode = !id;
  let apiUrl = isAddMode ? "/api/film/create" : `/api/film/${id}/update`;

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setFilmData(data));
  }, []);

  useEffect(() => {
    if (filmData.length !== 0 && !isAddMode) {
      setNewFilm({
        title: filmData.film.title,
        director: filmData.film.director,
        release: filmData.film.release.split("T")[0],
        summary: filmData.film.summary,
        genre: filmData.film.genre,
        image: filmData.film.image,
      });
    }
  }, [filmData]);

  let newFilmUrl = "";
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFilm),
    })
      .then((res) => res.json())
      .then((url) => (newFilmUrl = url));
    navigate(newFilmUrl);
  }

  const handleChange = (e) => {
    setNewFilm((prevNewFilm) => ({
      ...prevNewFilm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      setNewFilm((prevNewFilm) => ({
        ...prevNewFilm,
        genre: [...prevNewFilm.genre, e.target.value],
      }));
    } else {
      setNewFilm((prevNewFilm) => ({
        ...prevNewFilm,
        genre: prevNewFilm.genre.filter((item) => item !== e.target.value),
      }));
    }
  };

  console.log(newFilm);

  return (
    <Container maxW="1600px" p="0">
      <Header />
      {filmData.length !== 0 ? (
        <Box mx={{ base: "10px", md: "60px" }}>
          <Heading as="h1" size="4xl" textAlign="center" mb="20px">
            {filmData.title}
          </Heading>
          <form method="POST" action="" onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel htmlFor="title" mt="20px">
                Title
              </FormLabel>
              <Input
                id="title"
                name="title"
                value={newFilm.title}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="director" mt="20px">
                Director
              </FormLabel>
              <Select
                id="director"
                name="director"
                value={newFilm.director._id}
                onChange={(e) => handleChange(e)}
                placeholder="Select director"
              >
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
              <Input
                id="release"
                name="release"
                value={newFilm.release}
                onChange={(e) => handleChange(e)}
                type="date"
              />
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
              <Textarea
                id="summary"
                name="summary"
                value={newFilm.summary}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="genre" mt="20px">
                Genre
              </FormLabel>
              <CheckboxGroup>
                <Stack
                  spacing="10px"
                  direction={{ base: "column", md: "row" }}
                  wrap="wrap"
                >
                  {filmData.genres.map((genre) =>
                    newFilm.genre.length !== 0 &&
                    newFilm.genre.some(
                      (curGenre) => curGenre._id === genre._id
                    ) ? (
                      <Checkbox
                        key={genre._id}
                        id={genre._id}
                        name="genre"
                        value={genre._id}
                        onChange={(e) => handleCheckbox(e)}
                      >
                        {genre._id}
                      </Checkbox>
                    ) : (
                      <Checkbox
                        key={genre._id}
                        id={genre._id}
                        name="genre"
                        value={genre._id}
                        onChange={(e) => handleCheckbox(e)}
                      >
                        {genre.name}
                      </Checkbox>
                    )
                  )}
                </Stack>
              </CheckboxGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="image" mt="20px">
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
              <Input
                id="image"
                name="image"
                value={newFilm.image}
                onChange={(e) => handleChange(e)}
              />
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
