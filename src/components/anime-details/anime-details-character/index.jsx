import { Box, Grid, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ANIME_DETAILS_ITEMS_LIMIT } from "../../../constants/anime-details";
import { getAnimeDetailsCharacters } from "../../../services/anime-details";
import AnimeDetailsCharactersList from "./AnimeDetailsCharactersList";
import AnimeDetailsVoiceActorsPanel from "./AnimeDetailsVoiceActorsPanel";
import AnimeDetailsHeaderSection from "../AnimeDetailsHeaderSection";

function AnimeDetailsCharacters({ malId, enabled }) {
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const isMobileDrawer = useBreakpointValue({ base: true, xl: false });

  const charactersQuery = useQuery({
    queryKey: ["anime-details", malId, "characters"],
    queryFn: () =>
      getAnimeDetailsCharacters(malId, {
        page: 1,
        limit: ANIME_DETAILS_ITEMS_LIMIT,
      }),
    enabled,
  });

  const characters = charactersQuery.data?.items ?? [];
  const selectedCharacter = characters.find(
    (character) => character.character_id === selectedCharacterId,
  );
  const hasSelectedCharacter = Boolean(selectedCharacter);

  return (
    <Box as="section">
      <Stack gap="4">
        <AnimeDetailsHeaderSection
          title="Characters & Voice Cast"
          suffixTitle={
            characters.length > 0 ? (
              <Text color="accent.primary" fontSize="lg">
                {characters.length}
              </Text>
            ) : null
          }
        />

        {charactersQuery.isError ? (
          <Box layerStyle="panel" p="5">
            <Text color="fg.muted">Failed to load characters.</Text>
          </Box>
        ) : characters.length === 0 ? (
          <Box layerStyle="panel" p="5">
            <Text color="fg.muted">No character data available.</Text>
          </Box>
        ) : (
          <Grid
            templateColumns={{
              base: "1fr",
              xl: hasSelectedCharacter ? "minmax(0, 1fr) 440px" : "1fr 0px",
            }}
            gap={{ base: "5", xl: hasSelectedCharacter ? "6" : "0" }}
            alignItems="start"
            transition="grid-template-columns 0.28s ease, gap 0.28s ease"
          >
            <AnimeDetailsCharactersList
              characters={characters}
              selectedCharacter={selectedCharacter}
              onSelectCharacter={setSelectedCharacterId}
            />

            <Box
              display={{ base: "none", xl: "block" }}
              minW="0"
              position="sticky"
              top="36"
              alignSelf="start"
              opacity={hasSelectedCharacter ? 1 : 0}
              transition="opacity 0.2s ease"
            >
              <AnimeDetailsVoiceActorsPanel
                character={selectedCharacter}
                onClose={() => setSelectedCharacterId(null)}
              />
            </Box>
          </Grid>
        )}
      </Stack>

      {isMobileDrawer && (
        <AnimeDetailsVoiceActorsPanel
          character={selectedCharacter}
          isDrawer
          isOpen={Boolean(selectedCharacter)}
          onClose={() => setSelectedCharacterId(null)}
        />
      )}
    </Box>
  );
}

export default AnimeDetailsCharacters;
