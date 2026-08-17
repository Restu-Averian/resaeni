import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useRef, useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import AnimeDetailsEpisodesItem from "./AnimeDetailsEpisodesItem";
import AnimeDetailsHeaderSection from "../AnimeDetailsHeaderSection";
import AnimeDetailsSkeletonEpisodes from "../../skeletons/anime-details/AnimeDetailsSkeletonEpisodes";
import { ANIME_DETAILS_ITEMS_LIMIT } from "../../../constants/anime-details.constants";
import { getAnimeDetailsEpisodes } from "../../../services/anime-details";

function AnimeDetailsEpisodes({ enabled }) {
  const { mal_id: malId } = useParams();

  const scrollerRef = useRef(null);

  const [hasOverflow, setHasOverflow] = useState(false);

  const { data, isError, isPending } = useQuery({
    queryKey: ["anime-details", malId, "episodes"],
    queryFn: () =>
      getAnimeDetailsEpisodes(malId, {
        page: 1,
        limit: ANIME_DETAILS_ITEMS_LIMIT,
      }),
    enabled: malId && enabled,
  });

  const { episodes, total } = useMemo(() => {
    const eps = data?.items ?? [];
    return {
      episodes: eps,
      total: data?.pagination?.total ?? eps.length,
    };
  }, [data]);

  useEffect(() => {
    const checkOverflow = () => {
      if (scrollerRef.current) {
        const { scrollWidth, clientWidth } = scrollerRef.current;
        setHasOverflow(scrollWidth > clientWidth);
      }
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);
    if (scrollerRef.current) {
      resizeObserver.observe(scrollerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [episodes]);

  const scrollBy = (direction) => {
    scrollerRef.current?.scrollBy({
      left: direction * 520,
      behavior: "smooth",
    });
  };

  if (isPending) {
    return (
      <Box as="section" id="anime-details-episodes" scrollMarginTop="96px">
        <AnimeDetailsSkeletonEpisodes />
      </Box>
    );
  }

  return (
    <Box as="section" id="anime-details-episodes" scrollMarginTop="96px">
      <Stack gap="4">
        <AnimeDetailsHeaderSection
          title="Episodes"
          suffixTitle={
            <Text color="fg.muted" fontSize="sm">
              {total} episodes
            </Text>
          }
          showArrows={hasOverflow}
          onScroll={scrollBy}
        />

        {isError ? (
          <Box layerStyle="panel" p="5">
            <Text color="fg.muted">Failed to load episodes.</Text>
          </Box>
        ) : episodes.length === 0 ? (
          <Box layerStyle="panel" p="5">
            <Text color="fg.muted">No episodes available.</Text>
          </Box>
        ) : (
          <Flex
            ref={scrollerRef}
            gap="4"
            overflowX="auto"
            pt="4"
            pb="4"
            px="4"
            mx="-4"
            scrollbarWidth="thin"
            mt="-4"
            scrollSnapType="x proximity"
          >
            {episodes.map((episode) => (
              <AnimeDetailsEpisodesItem
                key={episode.episode_number}
                malId={malId}
                episode={episode}
              />
            ))}
          </Flex>
        )}
      </Stack>
    </Box>
  );
}

export default AnimeDetailsEpisodes;
