import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Icon,
  Tooltip,
  Button,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Core/Header";
import Footer from "../Core/Footer";
import Loading from "../Core/Loading";
import { BsFillQuestionCircleFill } from "react-icons/bs";

export default function GenreForm() {
  const [genreData, setGenreData] = React.useState([]);
  const [newGenre, setNewGenre] = React.useState({
    name: "",
  });

  useEffect(() => {
    fetch("/api/genre/create")
      .then((res) => res.json())
      .then((data) => setGenreData(data));
  }, []);

  let newGenreUrl = "";
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("/api/genre/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGenre),
    })
      .then((res) => res.json())
      .then((url) => (newGenreUrl = url));
    navigate(newGenreUrl);
  }

  const handleChange = (e) => {
    setNewGenre((prevNewGenre) => ({
      ...prevNewGenre,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Container maxW="1600px" p="0">
      <Header />
      {genreData.length !== 0 ? (
        <Box mx={{ base: "10px", md: "60px" }}>
          <Heading as="h1" size="4xl" textAlign="center" mb="20px">
            {genreData.title}
          </Heading>
          <form method="POST" action="" onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel htmlFor="name" mt="20px">
                Genre Name
              </FormLabel>
              <Input
                id="name"
                name="name"
                value={newGenre.name}
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
