import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Center,
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
  Button,
} from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { BsPencilSquare } from "react-icons/bs";

export default function GenreDetail() {
  const [genreDetailData, setGenreDetailData] = React.useState([]);

  const { id } = useParams();
  const [isDelete, setIsDelete] = React.useState(false);
  let apiUrl = isDelete ? `/api/genre/${id}/delete` : `/api/genre/${id}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setGenreDetailData(data));
  }, []);

  useEffect(() => {
    setIsDelete(isOpen);
  });

  let navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    await fetch(apiUrl, {
      method: "POST",
    }).then(() => navigate("/genres"));
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <Container maxW="1600px" p="0">
      <Header />
      {genreDetailData.length !== 0 ? (
        <Box mx={{ base: "10px", md: "60px" }}>
          <Center>
            <Heading as="h1" size="4xl" textAlign="center" mb="20px">
              {genreDetailData.genre.name}
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
                <MenuItem as="a" href={`/genre/${id}/update`}>
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
                      <Tag as="a" href={"/genre/" + genre._id} key={i}>
                        {genre.name}
                      </Tag>
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
