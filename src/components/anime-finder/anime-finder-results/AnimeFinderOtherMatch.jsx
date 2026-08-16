import { Flex, Image, Link, Stack, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import { Link as RouterLink } from "react-router";
import {
  formatPercentage,
  formatTimestamp,
  getAnimeFinderMatchTitle,
} from "../../../helpers/anime-finder.utils";

function AnimeFinderOtherMatch({ match, index }) {
  const title = getAnimeFinderMatchTitle(match);
  const timestamp = formatTimestamp(match.at);
  const content = (
    <Flex
      layerStyle="panel"
      align="center"
      gap={{ base: "4", md: "6" }}
      p="3"
      _hover={{ borderColor: "border.interactive" }}
    >
      <Text color="accent.primary" fontSize="lg" w="10" textAlign="center">
        {String(index + 1).padStart(2, "0")}
      </Text>
      {match.image && (
        <Image
          src={match.image}
          alt=""
          w={{ base: "86px", md: "145px" }}
          h={{ base: "56px", md: "70px" }}
          objectFit="cover"
          borderRadius="control"
        />
      )}
      <Stack flex="1" gap="1" minW="0">
        <Text
          color="fg.heading"
          fontFamily="heading"
          fontSize="xl"
          lineClamp="1"
        >
          {title}
        </Text>
        <Text color="fg.default" lineClamp="1">
          {timestamp ? `Matched at ${timestamp}` : "Scene match"}
        </Text>
      </Stack>
      <Text color="fg.heading" flex="0 0 auto">
        {formatPercentage(match.similarity)}
      </Text>
      {match.catalog?.id && <ArrowRight size={18} />}
    </Flex>
  );

  return match.catalog?.id ? (
    <Link
      as={RouterLink}
      to={`/anime/${match.catalog.id}`}
      textDecoration="none"
      _hover={{ textDecoration: "none" }}
    >
      {content}
    </Link>
  ) : (
    content
  );
}

export default AnimeFinderOtherMatch;
