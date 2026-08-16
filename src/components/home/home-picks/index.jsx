import { Stack, useBreakpointValue } from "@chakra-ui/react";
import HomeSectionHeader from "../HomeSectionHeader";
import HomePickCardsDesktop from "./HomePickCardsDesktop";
import HomePickCardsMobile from "./HomePickCardsMobile";

function HomePicksSection({ picks }) {
  const isMobile = useBreakpointValue({ base: true, md: false });

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
      px={{ base: "5", md: "12", xl: "0" }}
    >
      <HomeSectionHeader title="Resaeni Picks" />

      {isMobile ? (
        <HomePickCardsMobile picks={picks} />
      ) : (
        <HomePickCardsDesktop picks={picks} />
      )}
    </Stack>
  );
}

export default HomePicksSection;
