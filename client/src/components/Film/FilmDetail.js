import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Core/Header";
import Footer from "../Core/Footer";
import Loading from "../Core/Loading";
import {
  Heading,
  Box,
  Flex,
  Image,
  Container,
  Button,
  VStack,
  AspectRatio,
  useBreakpointValue,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Center,
} from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { BsPencilSquare } from "react-icons/bs";

export default function FilmDetail(props) {
  const [filmDetailData, setFilmDetailData] = React.useState([]);

  const { id } = useParams();
  const [isDelete, setIsDelete] = React.useState(false);
  let apiUrl = isDelete ? `/api/film/${id}/delete` : `/api/film/${id}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setFilmDetailData(data));
  }, []);

  useEffect(() => {
    setIsDelete(isOpen);
  });

  let navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    await fetch(apiUrl, {
      method: "POST",
    }).then(() => navigate("/films"));
  }

  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <Container maxW="1600px" p="0">
      <Header />
      {filmDetailData.length !== 0 ? (
        <Box>
          <Center mb="40px">
            <Heading as="h2" size="3xl">
              {filmDetailData.film.title}
            </Heading>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Menu"
                fontSize="16px"
                size="sm"
                variant="ghost"
                alignSelf="start"
                icon={<BsPencilSquare />}
              ></MenuButton>
              <MenuList>
                <MenuItem as="a" href={`/film/${id}/update`}>
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onOpen();
                    setIsDelete(true);
                  }}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </Center>
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            blockScrollOnMount={false}
          >
            <AlertDialogOverlay>
              <form method="POST" action="" onSubmit={handleSubmit}>
                <AlertDialogContent>
                  <AlertDialogHeader>Delete Film</AlertDialogHeader>
                  <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      colorScheme="red"
                      onClick={onClose}
                      ml="3"
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </form>
            </AlertDialogOverlay>
          </AlertDialog>
          <Flex
            mx={{ base: "0", md: "60px" }}
            flexDir={{ base: "column", md: "row" }}
            align="center"
            justify="center"
            gap="20px"
          >
            <AspectRatio
              ratio={2 / 3}
              w="100%"
              maxW={{ base: "none", md: "480px" }}
              flex="1 1 auto"
            >
              <Image src={filmDetailData.film.image} alt="Movie Poster" />
            </AspectRatio>
            <VStack spacing="20px" align="start">
              <VStack spacing="20px" align="start">
                <Heading as="h4" fontSize={{ base: "lg", md: "3xl" }}>
                  Directed by:
                </Heading>
                <Button
                  as="a"
                  href={"/director/" + filmDetailData.film.director._id}
                  size={buttonSize}
                >
                  {filmDetailData.film.director.first_name +
                    " " +
                    filmDetailData.film.director.last_name}{" "}
                </Button>
              </VStack>
              <VStack spacing="20px" align="start">
                <Heading as="h4" fontSize={{ base: "lg", md: "3xl" }}>
                  Release Date:{" "}
                </Heading>
                <Button as="a" href="a" size={buttonSize}>
                  {format(parseISO(filmDetailData.film.release), "MMMM do y")}
                </Button>
              </VStack>
              <VStack spacing="20px" align="start">
                <Heading as="h4" fontSize={{ base: "lg", md: "3xl" }}>
                  Genre:{" "}
                </Heading>
                <Flex wrap="wrap" gap="20px">
                  {filmDetailData.film.genre.map((genre, i) => (
                    <Button
                      as="a"
                      href={"/genre/" + genre._id}
                      size={buttonSize}
                      key={i}
                    >
                      {genre.name}
                    </Button>
                  ))}
                </Flex>
              </VStack>
              <VStack spacing="20px" align="start">
                <Heading as="h4" fontSize={{ base: "lg", md: "3xl" }}>
                  Starring:{" "}
                </Heading>
                <Flex wrap="wrap" gap="20px">
                  {["Placeholder 1", "Placeholder 2", "Placeholder 3"].map(
                    (item, i) => (
                      <Button as="a" href="#" size={buttonSize} key={i}>
                        {item}
                      </Button>
                    )
                  )}
                </Flex>
              </VStack>
            </VStack>
          </Flex>
        </Box>
      ) : (
        <Loading />
      )}
      <Footer />
    </Container>
  );
}
