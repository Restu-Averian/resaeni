import { Box, SimpleGrid } from "@chakra-ui/react";
import AnimeDetailsCharacterItem from "./AnimeDetailsCharacterItem";

function AnimeDetailsCharactersList({
  characters,
  selectedCharacter,
  onSelectCharacter,
}) {
  const isCompact = Boolean(selectedCharacter);

  return (
    <Box
      layerStyle="panel"
      p={{ base: "5", md: "6", xl: isCompact ? "6" : "8" }}
    >
      <SimpleGrid
        columns={{
          base: 2,
          md: isCompact ? 3 : 4,
          xl: isCompact ? 2 : 5,
        }}
        gap={{
          base: "4",
          md: isCompact ? "7" : "10",
          xl: isCompact ? "7" : "14",
        }}
      >
        {characters.map((character) => (
          <AnimeDetailsCharacterItem
            key={character.character_id}
            character={character}
            isCompact={isCompact}
            isSelected={
              character.character_id === selectedCharacter?.character_id
            }
            onSelect={() =>
              onSelectCharacter(
                character.character_id === selectedCharacter?.character_id
                  ? null
                  : character.character_id,
              )
            }
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default AnimeDetailsCharactersList;
