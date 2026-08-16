import { Badge, Stack, Text } from "@chakra-ui/react";
import { ANIME_DETAILS_ROLE_LABELS } from "../../../constants/anime-details";

function AnimeDetailsCharacterInfo({ character, isCompact, isSelected }) {
  const roleLabel =
    ANIME_DETAILS_ROLE_LABELS[character.role] ?? character.role ?? "Cast";

  return (
    <Stack gap="1.5" minW="0" w="full" align="center">
      <Stack gap="1">
        <Text
          textStyle="cardTitle"
          color="fg.heading"
          lineClamp="1"
          fontSize={{ base: "md", md: isCompact ? "lg" : "2xl" }}
        >
          {character.name}
        </Text>
        <Badge
          variant={character.role === "Main" || isSelected ? "warm" : "neutral"}
          size="sm"
        >
          {roleLabel}
        </Badge>
      </Stack>
    </Stack>
  );
}

export default AnimeDetailsCharacterInfo;
