import { Box, HStack, Stack, Heading, Text, Icon } from "@chakra-ui/react";
import { AlertCircle } from "lucide-react";
import errorLandscape from "../../../assets/images/states/image-error-landscape.webp";

function HomeErrorHeroBanner({ error }) {
  return (
    <Box
      as="section"
      minH={{ base: "620px", md: "560px" }}
      overflow="hidden"
      position="relative"
      bg="bg.panel"
      bgImage={`url(${errorLandscape})`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        bg: "blackAlpha.700",
        zIndex: 0,
      }}
    >
      <Stack
        align="center"
        textAlign="center"
        gap={{ base: "4", md: "4" }}
        justify="center"
        minH={{ base: "620px", md: "560px" }}
        maxW="1696px"
        mx="auto"
        px={{ base: "5", md: "12", xl: "clamp(4rem, 6vw, 10rem)" }}
        position="relative"
        zIndex="1"
      >
        <HStack color="red.400" gap="3">
          <Icon as={AlertCircle} boxSize="8" />
          <Heading as="h1" fontSize={{ base: "2xl", md: "4xl" }}>
            Something went wrong
          </Heading>
        </HStack>
        <Text
          color="whiteAlpha.800"
          fontSize="lg"
          maxW={{ base: "100%", md: "600px" }}
        >
          Failed to load data: {error?.message}
        </Text>
      </Stack>
    </Box>
  );
}

export default HomeErrorHeroBanner;
