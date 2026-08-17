import {
  Box,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { ANIME_STREAMING_EPISODES_LIMIT } from "../../../constants/anime-streaming.constants";
import { getAnimeDetailsEpisodes } from "../../../services/anime-details";
import AnimeStreamingEpisodesItem from "./AnimeStreamingEpisodesItem";

function AnimeStreamingEpisodes({ currentEpisodeNumber }) {
  const { mal_id: malId } = useParams();

  const isValidMalId = /^\d+$/.test(malId ?? "") && Number(malId) > 0;

  const episodesQuery = useQuery({
    queryKey: [
      "anime-streaming",
      malId,
      "episodes",
      1,
      ANIME_STREAMING_EPISODES_LIMIT,
    ],
    queryFn: () =>
      getAnimeDetailsEpisodes(malId, {
        page: 1,
        limit: ANIME_STREAMING_EPISODES_LIMIT,
      }),
    enabled: isValidMalId,
  });

  const isError = episodesQuery.isError;
  const episodes = episodesQuery.data?.items ?? [];

  return (
    <Stack gap="4">
      <Text as="h2" textStyle="sectionTitle" color="fg.heading">
        Episode List
      </Text>

      {isError ? (
        <Box layerStyle="panel" p="5">
          <Text color="fg.muted">Failed to load episodes.</Text>
        </Box>
      ) : episodes.length === 0 ? (
        <Box layerStyle="panel" p="5">
          <Text color="fg.muted">No episodes available.</Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 6 }} gap="4">
          {episodes.map((episode) => (
            <AnimeStreamingEpisodesItem
              key={episode.episode_number}
              episode={episode}
              isActive={Number(episode.episode_number) === currentEpisodeNumber}
            />
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
}

export default AnimeStreamingEpisodes;
