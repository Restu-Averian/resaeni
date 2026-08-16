import { Stack } from "@chakra-ui/react";
import AnimeDetailsCharacterPhoto from "./AnimeDetailsCharacterPhoto";
import AnimeDetailsCharacterInfo from "./AnimeDetailsCharacterInfo";

function AnimeDetailsCharacterItem({
  character,
  isCompact,
  isSelected,
  onSelect,
}) {
  return (
    <Stack
      as="button"
      type="button"
      w="full"
      minW="0"
      gap="3"
      align="center"
      textAlign="center"
      p={{ base: "4", md: isCompact ? "4" : "5" }}
      border="1px solid"
      borderColor={isSelected ? "accent.warm" : "transparent"}
      borderRadius="control"
      bg={isSelected ? "rgba(217, 154, 132, 0.08)" : "transparent"}
      cursor="pointer"
      transition="all 0.2s"
      onClick={onSelect}
      _hover={{
        bg: isSelected ? "rgba(217, 154, 132, 0.08)" : "bg.surface",
      }}
    >
      <AnimeDetailsCharacterPhoto character={character} isCompact={isCompact} />

      <AnimeDetailsCharacterInfo
        character={character}
        isCompact={isCompact}
        isSelected={isSelected}
      />
    </Stack>
  );
}

export default AnimeDetailsCharacterItem;
