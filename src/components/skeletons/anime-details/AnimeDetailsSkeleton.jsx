import { Box, Container, Grid, Stack } from "@chakra-ui/react";
import { useState } from "react";
import AnimeDetailsSkeletonHero from "./AnimeDetailsSkeletonHero";
import AnimeDetailsSkeletonSynopsis from "./AnimeDetailsSkeletonSynopsis";
import AnimeDetailsSkeletonOverview from "./AnimeDetailsSkeletonOverview";
import AnimeDetailsSkeletonEpisodes from "./AnimeDetailsSkeletonEpisodes";
import AnimeDetailsSkeletonCharacters from "./AnimeDetailsSkeletonCharacters";
import AnimeDetailsTabs from "../../anime-details/AnimeDetailsTabs";

function AnimeDetailsSkeleton() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Box minH="100vh" bg="bg.canvas" pb={{ base: "28", md: "12" }}>
      <AnimeDetailsSkeletonHero />

      <Container
        maxW="1696px"
        px={{ base: "5", md: "12", xl: "clamp(4rem, 6vw, 10rem)" }}
        py={{ base: "8", md: "12" }}
      >
        <AnimeDetailsTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          overviewContent={
            <Stack gap={{ base: "9", md: "12" }}>
              <Grid
                templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) 360px" }}
                gap={{ base: "5", md: "6" }}
                alignItems="start"
              >
                <AnimeDetailsSkeletonSynopsis />

                <AnimeDetailsSkeletonOverview />
              </Grid>

              <Box>
                <AnimeDetailsSkeletonEpisodes />
              </Box>
            </Stack>
          }
          charactersContent={<AnimeDetailsSkeletonCharacters />}
        />
      </Container>
    </Box>
  );
}

export default AnimeDetailsSkeleton;
