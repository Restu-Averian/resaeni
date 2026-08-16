import { Box, Heading, HStack, Stack, Text } from "@chakra-ui/react";

function AnimeFinderSectionLabel({ children }) {
  return (
    <HStack gap="3" color="accent.primary">
      <Box w="3" h="3" borderRadius="full" bg="accent.primary" />
      <Text fontSize={{ base: "sm", md: "md" }}>{children}</Text>
      <Box flex="1" h="1px" bg="border.subtle" />
    </HStack>
  );
}

function AnimeFinderHeader() {
  return (
    <>
      <Stack gap="4">
        <Heading
          as="h1"
          textStyle="display"
          color="fg.heading"
          fontSize={{ base: "5xl", md: "7xl" }}
        >
          Anime Finder
        </Heading>
        <Text color="fg.default" fontSize={{ base: "md", md: "xl" }}>
          Upload a screenshot from an anime episode and let Resaeni identify the
          scene.
        </Text>
      </Stack>

      <AnimeFinderSectionLabel>Scene recognition</AnimeFinderSectionLabel>
    </>
  );
}

export default AnimeFinderHeader;
