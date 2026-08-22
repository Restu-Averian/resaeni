import { Box } from "@chakra-ui/react";
import ResaeniImage from "../../global/ResaeniImage";
import { getAssetUrl } from "../../../helpers/asset.utils";

function AnimeDetailsHeroPhoto({ anime }) {
  return (
    <Box
      flex="0 0 auto"
      w={{ base: "190px", md: "250px", xl: "292px" }}
      alignSelf={{ base: "center", md: "flex-start" }}
      aspectRatio="2 / 3"
      overflow="hidden"
      borderRadius="media"
      border="1px solid"
      borderColor="border.emphasized"
      boxShadow="elevated"
      bg="bg.panel"
    >
      <ResaeniImage
        src={getAssetUrl(anime.photo)}
        alt={anime.title_en || anime.title_romaji || "Aeni poster"}
        variant="portrait"
        loading="eager"
        fetchPriority="high"
        w="full"
        h="full"
        objectFit="cover"
        objectPosition="center top"
      />
    </Box>
  );
}

export default AnimeDetailsHeroPhoto;
