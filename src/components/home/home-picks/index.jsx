import { Stack, Box, HStack } from "@chakra-ui/react";
import HomeSectionHeader from "../HomeSectionHeader";
import AnimeListDatasItem from "../../anime-list/anime-list-datas/AnimeListDatasItem";

function HomePicksSection({ picks }) {
  return (
    <Stack
      as="section"
      gap={{ base: "4", md: "4" }}
      maxW="1696px"
      w="full"
      mx="auto"
      position="relative"
      zIndex="1"
      mt={{ base: "0", md: "-8" }}
      px={{ base: "5", md: "12", xl: "clamp(4rem, 6vw, 10rem)" }}
    >
      <HomeSectionHeader title="Resaeni Picks" />

      <Box
        overflowX="auto"
        pb={{ base: "2", md: "4" }}
        css={{
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <HStack align="stretch" gap={{ base: "3", md: "4", xl: "5" }}>
          {picks.map((pick) => (
            <Box
              key={pick.id}
              w={{ base: "140px", md: "180px", lg: "220px", xl: "260px" }}
              flexShrink={0}
            >
              <AnimeListDatasItem anime={pick} />
            </Box>
          ))}
        </HStack>
      </Box>
    </Stack>
  );
}

export default HomePicksSection;
