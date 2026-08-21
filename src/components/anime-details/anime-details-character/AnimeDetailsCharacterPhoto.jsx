import { Avatar, Box } from "@chakra-ui/react";
import ResaeniImage from "../../global/ResaeniImage";
import { getAssetUrl } from "../../../helpers/asset.utils";

function AnimeDetailsCharacterPhoto({ character, isCompact }) {
  const size = {
    base: "96px",
    md: isCompact ? "112px" : "144px",
    xl: isCompact ? "112px" : "160px",
  };

  return character.photo ? (
    <Box
      w={size}
      h={size}
      overflow="hidden"
      borderRadius="full"
      border="1px solid"
      borderColor="border.emphasized"
      bg="bg.surface"
      boxShadow="media"
    >
      <ResaeniImage
        src={getAssetUrl(character.photo)}
        alt={character.name}
        variant="square"
        loading="lazy"
        decoding="async"
        w="full"
        h="full"
        objectFit="cover"
        objectPosition="center top"
      />
    </Box>
  ) : (
    <Avatar.Root
      w={size}
      h={size}
      bg="bg.surface"
      color="fg.heading"
      border="1px solid"
      borderColor="border.emphasized"
    >
      <Avatar.Fallback name={character.name} />
    </Avatar.Root>
  );
}

export default AnimeDetailsCharacterPhoto;
