import { Box, Container, Skeleton, Stack } from "@chakra-ui/react";
import AnimeStreamingSkeletonHeader from "./AnimeStreamingSkeletonHeader";
import AnimeStreamingSkeletonPlayer from "./AnimeStreamingSkeletonPlayer";
import AnimeStreamingSkeletonEpisodeNavigation from "./AnimeStreamingSkeletonEpisodeNavigation";
import AnimeStreamingSkeletonEpisodes from "./AnimeStreamingSkeletonEpisodes";

function AnimeStreamingSkeleton() {
  return (
    <Box minH="100vh" bg="bg.canvas" pb={{ base: "28", md: "12" }}>
      <Container
        maxW="1696px"
        px={{ base: "5", md: "12", xl: "clamp(4rem, 6vw, 10rem)" }}
        py={{ base: "7", md: "10" }}
      >
        <Stack gap={{ base: "5", md: "6" }}>
          <AnimeStreamingSkeletonHeader />

          <AnimeStreamingSkeletonPlayer />

          <AnimeStreamingSkeletonEpisodeNavigation />

          <Skeleton h="1px" w="full" />

          <AnimeStreamingSkeletonEpisodes />
        </Stack>
      </Container>
    </Box>
  );
}

export default AnimeStreamingSkeleton;
