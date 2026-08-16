import { Heading, Stack, Text } from "@chakra-ui/react";

function AnimeListHeader() {
  return (
    <Stack gap="3">
      <Heading
        as="h1"
        textStyle="display"
        color="fg.heading"
        fontSize={{ base: "6xl", md: "7xl" }}
        lineHeight="0.95"
      >
        Aeni Library
      </Heading>
      <Stack
        gap="1"
        color="fg.muted"
        fontSize={{ base: "xl", md: "md" }}
        lineHeight="1.45"
      >
        <Text>Explore the best of Korean animation,</Text>
        <Text>from series to films.</Text>
      </Stack>
    </Stack>
  );
}

export default AnimeListHeader;
