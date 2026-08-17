import { Box, Container, Separator, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router";
import AnimeStreamingEpisodeNavigation from "../components/anime-streaming/anime-streaming-eps-navigation";
import AnimeStreamingEpisodes from "../components/anime-streaming/anime-streaming-episodes";
import imageErrorLandscape from "../assets/images/states/image-error-landscape.webp";
import AnimeStreamingHeader from "../components/anime-streaming/AnimeStreamingHeader";
import AnimeStreamingPlayer from "../components/anime-streaming/AnimeStreamingPlayer";
import AnimeStreamingSkeletonHeader from "../components/skeletons/anime-streaming/AnimeStreamingSkeletonHeader";
import AnimeStreamingSkeletonPlayer from "../components/skeletons/anime-streaming/AnimeStreamingSkeletonPlayer";
import AnimeStreamingSkeletonEpisodeNavigation from "../components/skeletons/anime-streaming/AnimeStreamingSkeletonEpisodeNavigation";
import { getAnimeStreamingEpisode } from "../services/anime-streaming";
import Seo from "../components/global/Seo";

function AnimeStreamingPage() {
  const { mal_id: malId, episode_number: episodeNumberParam } = useParams();

  const currentEpisodeNumber = Number(episodeNumberParam);
  
  const playerSectionRef = useRef(null);
  const isFirstRender = useRef(true);
  
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    requestAnimationFrame(() => {
      playerSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [currentEpisodeNumber]);

  const episodeQuery = useQuery({
    queryKey: ["anime-streaming", malId, episodeNumberParam],
    queryFn: () => getAnimeStreamingEpisode(malId, episodeNumberParam),
  });

  const { episode, currentEpisode, selectedEmbedUrl } = useMemo(() => {
    const episode = episodeQuery.data || episodeQuery.error?.response?.data?.data;

    const links = episode?.links ?? [];

    const selectedEmbedUrl = links[0]?.embed_url;

    return {
      episode,
      currentEpisode: episode,
      selectedEmbedUrl,
    };
  }, [episodeQuery.data, episodeQuery.error]);

  const title = currentEpisode?.title || `Episode ${currentEpisodeNumber}`;

  return (
    <>
      <Seo
        title={`${title} | Resaeni`}
        description={`Watch ${title} on Resaeni.`}
        canonicalPath={`/anime/${malId}/episode/${currentEpisodeNumber}`}
        robots="noindex, follow"
      />

      <Box minH="100vh" bg="bg.canvas" pb={{ base: "28", md: "12" }}>
        <Container
          maxW="1696px"
          px={{ base: "5", md: "12", xl: "clamp(4rem, 6vw, 10rem)" }}
          py={{ base: "7", md: "10" }}
        >
          <Stack gap={{ base: "5", md: "6" }}>
            <Stack ref={playerSectionRef} gap={{ base: "5", md: "6" }} scrollMarginTop="24">
              {episodeQuery.isPending ? (
                <>
                  <AnimeStreamingSkeletonHeader />
                  <AnimeStreamingSkeletonPlayer />
                  <AnimeStreamingSkeletonEpisodeNavigation />
                </>
              ) : episodeQuery.isError ? (
                <>
                  <AnimeStreamingHeader episode={episode} isError />
                  <AnimeStreamingPlayer poster={imageErrorLandscape} />
                </>
              ) : (
                <>
                  <AnimeStreamingHeader episode={episode} />
                  <AnimeStreamingPlayer
                    selectedEmbedUrl={selectedEmbedUrl}
                    poster={currentEpisode?.thumbnail_url}
                    episodeNumber={currentEpisodeNumber}
                  />
                  <AnimeStreamingEpisodeNavigation episode={episode} />
                </>
              )}
            </Stack>

            <Separator borderColor="border.subtle" />

            <AnimeStreamingEpisodes
              currentEpisodeNumber={currentEpisodeNumber}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default AnimeStreamingPage;
