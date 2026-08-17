import { Box, HStack, Stack } from "@chakra-ui/react";
import HomeSectionHeader from "../../home/HomeSectionHeader";
import AnimeListDatasItemSkeleton from "../anime-list/AnimeListDatasItemSkeleton";

function HomePicksSkeleton() {
  const skeletons = Array.from({ length: 4 }, (_, i) => i);

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

      <Box overflowX="hidden" pb={{ base: "2", md: "4" }}>
        <HStack align="stretch" gap={{ base: "3", md: "4", xl: "5" }}>
          {skeletons.map((i) => (
            <Box
              key={i}
              w={{ base: "140px", md: "180px", lg: "220px", xl: "260px" }}
              flexShrink={0}
            >
              <AnimeListDatasItemSkeleton />
            </Box>
          ))}
        </HStack>
      </Box>
    </Stack>
  );
}

export default HomePicksSkeleton;
