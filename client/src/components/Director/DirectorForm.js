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
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Core/Header";
import Footer from "../Core/Footer";
import Loading from "../Core/Loading";
import { BsFillQuestionCircleFill } from "react-icons/bs";

export default function FilmForm() {
  const [directorData, setDirectorData] = React.useState([]);
  const [newDirector, setNewDirector] = React.useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    date_of_death: "",
  });

  const { id } = useParams();
  const isAddMode = !id;
  let apiUrl = isAddMode
    ? "/api/director/create"
    : `/api/director/${id}/update`;

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setDirectorData(data));
  }, []);

  useEffect(() => {
    if (directorData.length !== 0 && !isAddMode) {
      setNewDirector({
        first_name: directorData.director.first_name,
        last_name: directorData.director.last_name,
        date_of_birth: directorData.director.date_of_birth.split("T")[0],
        date_of_death:
          (directorData.director.date_of_death &&
            directorData.director.date_of_death.split("T")[0]) ||
          "",
      });
    }
  }, [directorData]);

  let newDirectorUrl = "";
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDirector),
    })
      .then((res) => res.json())
      .then((url) => (newDirectorUrl = url));
    navigate(newDirectorUrl);
  }

  const handleChange = (e) => {
    setNewDirector((prevNewDirector) => ({
      ...prevNewDirector,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Container maxW="1600px" p="0">
      <Header />
      {directorData.length !== 0 ? (
        <Box mx={{ base: "10px", md: "60px" }}>
          <Heading as="h1" size="4xl" textAlign="center" mb="20px">
            {directorData.title}
          </Heading>
          <form method="POST" action="" onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel htmlFor="first_name" mt="20px">
                First Name
              </FormLabel>
              <Input
                id="first_name"
                name="first_name"
                value={newDirector.first_name}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="last_name" mt="20px">
                Last Name
              </FormLabel>
              <Input
                id="last_name"
                name="last_name"
                value={newDirector.last_name}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="date_of_birth" mt="20px">
                Date of Birth
              </FormLabel>
              <Input
                id="date_of_birth"
                name="date_of_birth"
                value={newDirector.date_of_birth}
                onChange={(e) => handleChange(e)}
                type="date"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="date_of_death" mt="20px">
                Date of Death
              </FormLabel>
              <Input
                id="date_of_death"
                name="date_of_death"
                value={newDirector.date_of_death}
                onChange={(e) => handleChange(e)}
                type="date"
              />
            </FormControl>
            <FormControl isDisabled>
              <FormLabel htmlFor="image" mt="20px">
                Image URL
                <Tooltip
                  label="Not implemented yet"
                  aria-label="A tooltip"
                  hasArrow
                  placement="right"
                >
                  <span>
                    <Icon as={BsFillQuestionCircleFill} ml="10px" />
                  </span>
                </Tooltip>
              </FormLabel>
              <Input />
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
