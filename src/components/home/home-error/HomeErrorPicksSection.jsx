import { Box, Stack, Text } from "@chakra-ui/react";
import HomeSectionHeader from "../HomeSectionHeader";

function HomeErrorPicksSection() {
  return (
    <Stack
      as="section"
      gap={{ base: "4", md: "4" }}
      maxW="1696px"
      w="full"
      mx="auto"
      position="relative"
      zIndex="1"
      mt={12}
      px={{ base: "5", md: "12", xl: "clamp(4rem, 6vw, 10rem)" }}
    >
      <HomeSectionHeader title="Resaeni Picks" />

      <Box
        w="full"
        h={{ base: "140px", md: "180px", lg: "220px", xl: "260px" }}
        bg="bg.panel"
        borderRadius="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderWidth="1px"
        borderColor="border.subtle"
      >
        <Text color="fg.muted">Failed to load picks</Text>
      </Box>
    </Stack>
  );
}

export default HomeErrorPicksSection;
