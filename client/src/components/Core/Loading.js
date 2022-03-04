import React from "react";
import { Center, VStack, Heading, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Center>
      <VStack>
        <Heading as="h1" size="4xl">
          Fetching Data
        </Heading>
        <Spinner
          size="xl"
          thickness="8px"
          color="blue.500"
          emptyColor="gray.200"
        />
      </VStack>
    </Center>
  );
}
