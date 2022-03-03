import React from "react";
import Header from "../Core/Header";
import Footer from "../Core/Footer";
import { Box, Container, Flex, Heading, Spacer } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <div>
      <Header />
      <Container>
        <Flex>
          <Box>
            <Heading as="h1" size="4xl">
              Dune
            </Heading>
          </Box>
          <Spacer />
        </Flex>
      </Container>
      <Footer />
    </div>
  );
}
