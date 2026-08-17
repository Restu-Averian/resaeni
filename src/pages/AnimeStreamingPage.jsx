import { Box, Container, Separator, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router";
import AnimeStreamingEpisodeNavigation from "../components/anime-streaming/anime-streaming-eps-navigation";
import AnimeStreamingEpisodes from "../components/anime-streaming/anime-streaming-episodes";
import AnimeStreamingError from "../components/anime-streaming/AnimeStreamingError";
import AnimeStreamingHeader from "../components/anime-streaming/AnimeStreamingHeader";
import AnimeStreamingNotFound from "../components/anime-streaming/AnimeStreamingNotFound";
import AnimeStreamingPlayer from "../components/anime-streaming/AnimeStreamingPlayer";
import AnimeStreamingSkeletonHeader from "../components/skeletons/anime-streaming/AnimeStreamingSkeletonHeader";
import AnimeStreamingSkeletonPlayer from "../components/skeletons/anime-streaming/AnimeStreamingSkeletonPlayer";
import AnimeStreamingSkeletonEpisodeNavigation from "../components/skeletons/anime-streaming/AnimeStreamingSkeletonEpisodeNavigation";
import { getAnimeStreamingEpisode } from "../services/anime-streaming";
import Seo from "../components/global/Seo";

function AnimeStreamingPage() {
  const { mal_id: malId, episode_number: episodeNumberParam } = useParams();

  const { currentEpisodeNumber, isValidMalId, isValidEpisodeNumber } =
    useMemo(() => {
      const currentEpisodeNumber = Number(episodeNumberParam);

      const isValidMalId = /^\d+$/.test(malId ?? "") && Number(malId) > 0;

      const isValidEpisodeNumber =
        /^\d+$/.test(episodeNumberParam ?? "") &&
        Number.isSafeInteger(currentEpisodeNumber) &&
        currentEpisodeNumber > 0;

      return {
        currentEpisodeNumber,
        isValidMalId,
        isValidEpisodeNumber,
      };
    }, [malId, episodeNumberParam]);

  const episodeQuery = useQuery({
    queryKey: ["anime-streaming", malId, episodeNumberParam],
    queryFn: () => getAnimeStreamingEpisode(malId, episodeNumberParam),
    enabled: isValidMalId && isValidEpisodeNumber,
  });

  const { episode, currentEpisode, selectedEmbedUrl } = useMemo(() => {
    const episode = episodeQuery.data;

    const links = episode?.links ?? [];

    const selectedEmbedUrl = links[0]?.embed_url;

    return {
      episode,
      currentEpisode: episode,
      selectedEmbedUrl,
    };
  }, [episodeQuery.data]);

  if (!isValidMalId || !isValidEpisodeNumber) {
    return (
      <>
        <Seo title="Invalid Episode | Resaeni" robots="noindex, nofollow" />

        <AnimeStreamingNotFound />
      </>
    );
  }

  if (episodeQuery.isError) {
    return (
      <>
        <Seo title="Error | Resaeni" robots="noindex, nofollow" />

        <AnimeStreamingError error={episodeQuery.error} />
      </>
    );
  }

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
            {episodeQuery.isPending ? (
              <>
                <AnimeStreamingSkeletonHeader />
                <AnimeStreamingSkeletonPlayer />
                <AnimeStreamingSkeletonEpisodeNavigation />
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
