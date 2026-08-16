import {
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ArrowRight, Sparkle } from "lucide-react";
import { Link as RouterLink } from "react-router";
import {
  formatPercentage,
  formatTimestamp,
  getAnimeFinderMatchTitle,
} from "../../../helpers/anime-finder.utils";

function AnimeFinderBestMatch({ match }) {
  const timestamp = formatTimestamp(match.at);
  const title = getAnimeFinderMatchTitle(match);

  return (
    <Stack gap="3">
      <Text color="fg.heading" fontSize="lg" fontWeight="medium">
        Best match
      </Text>
      <Flex
        layerStyle="panel"
        minH={{ base: "auto", md: "205px" }}
        overflow="hidden"
        position="relative"
        p="4"
        gap={{ base: "5", md: "8" }}
        direction={{ base: "column", md: "row" }}
        bgImage={
          match.image
            ? `linear-gradient(90deg, rgba(5, 24, 41, 0.95), rgba(5, 24, 41, 0.72)), url(${match.image})`
            : undefined
        }
        bgSize="cover"
        bgPosition="center"
      >
        {match.image && (
          <Image
            src={match.image}
            alt=""
            w={{ base: "full", md: "170px" }}
            h={{ base: "190px", md: "180px" }}
            objectFit="cover"
            borderRadius="media"
            border="1px solid"
            borderColor="accent.muted"
          />
        )}

        <Stack gap="5" justify="center" flex="1" minW="0">
          <Stack gap="2">
            <Heading
              as="h2"
              textStyle="sectionTitle"
              color="fg.heading"
              fontSize={{ base: "3xl", md: "4xl" }}
              lineClamp="2"
            >
              {title}
            </Heading>
            <Text color="fg.default">
              {[
                match.catalog?.type,
                match.episode ? `Episode ${match.episode}` : null,
              ]
                .filter(Boolean)
                .join(" · ") || "Scene match"}
            </Text>
          </Stack>

          {timestamp && (
            <Stack gap="1">
              <Text color="fg.default">Matched at</Text>
              <Text color="accent.primary" fontSize="3xl" lineHeight="1">
                {timestamp}
              </Text>
            </Stack>
          )}

          {match.catalog?.id && (
            <Link
              as={RouterLink}
              to={`/anime/${match.catalog.id}`}
              color="accent.primary"
              textDecoration="none"
              _hover={{ color: "accent.hover", textDecoration: "none" }}
            >
              <HStack gap="2">
                <Text>See anime details</Text>
                <ArrowRight size={18} />
              </HStack>
            </Link>
          )}
        </Stack>

        <HStack
          position={{ base: "static", md: "absolute" }}
          top="4"
          right="4"
          alignSelf="flex-start"
          px="3"
          py="2"
          border="1px solid"
          borderColor="accent.muted"
          borderRadius="full"
          bg="accent.subtle"
          color="fg.heading"
        >
          <Sparkle size={18} />
          <Text>{formatPercentage(match.similarity)} match</Text>
        </HStack>
      </Flex>
    </Stack>
  );
}

export default AnimeFinderBestMatch;
