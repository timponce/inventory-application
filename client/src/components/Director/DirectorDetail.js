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
  useToast,
  useDisclosure,
  AlertDialogOverlay,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { BsPencilSquare } from "react-icons/bs";

export default function DirectorDetail() {
  const [directorDetailData, setDirectorDetailData] = React.useState([]);

  const { id } = useParams();
  const [isDelete, setIsDelete] = React.useState(false);
  let apiUrl = isDelete ? `/api/director/${id}/delete` : `/api/director/${id}`;

  const toast = useToast();

  useEffect(() => {
    fetch(`/api/director/${id}`)
      .then((res) => res.json())
      .then((data) => setDirectorDetailData(data));
  }, []);

  useEffect(() => {
    setIsDelete(isOpen);
  });

  let navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    directorDetailData.director_films.length === 0
      ? await fetch(apiUrl, {
          method: "POST",
        }).then(() => navigate("/directors"))
      : toast({
          title: "Delete Failed.",
          description:
            "Please delete all films associated with this director to continue.",
          position: "top",
          status: "error",
          duration: "5000",
          isClosable: true,
        });
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  let directorFullName = "";
  let directorLifespan = "";

  if (directorDetailData.length !== 0) {
    if (
      directorDetailData.director.first_name &&
      directorDetailData.director.last_name
    ) {
      directorFullName =
        directorDetailData.director.first_name +
        " " +
        directorDetailData.director.last_name;
    }
    if (
      !directorDetailData.director.first_name ||
      !directorDetailData.director.last_name
    ) {
      directorFullName = "";
    }

    if (directorDetailData.director.date_of_birth) {
      directorLifespan = format(
        parseISO(directorDetailData.director.date_of_birth),
        "MMMM do y"
      );
    }
    directorLifespan += " - ";
    if (directorDetailData.director.date_of_death) {
      directorLifespan += format(
        parseISO(directorDetailData.director.date_of_death),
        "MMMM do y"
      );
    }
  }

  return (
    <Container maxW="1600px" p="0">
      <Header />
      {directorDetailData.length !== 0 ? (
        <Box mx={{ base: "10px", md: "60px" }}>
          <Center>
            <Heading as="h1" size="4xl" textAlign="center" mb="20px">
              {directorFullName}
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
                <MenuItem as="a" href={`/director/${id}/update`}>
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
                  <AlertDialogHeader>Delete Director</AlertDialogHeader>
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
          <Text textAlign="center" my="20px">
            {directorLifespan}
          </Text>
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
            {directorDetailData.director_films.map((film, i) => (
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
