import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router";

function AnimeListDatasItem({ anime }) {
  const formatLabel = anime.type === "Movie" ? "Film" : "Series";
  const metaItems = [
    anime.year,
    formatLabel,
    anime.episodes_count
      ? `${anime.episodes_count} ${anime.episodes_count === 1 ? "Episode" : "Episodes"}`
      : null,
  ].filter(Boolean);

  return (
    <Box
      as={RouterLink}
      to={`/anime/${anime.id}`}
      display="block"
      w="full"
      textAlign="left"
      layerStyle="interactiveSurface"
      overflow="hidden"
      boxShadow="media"
      cursor="pointer"
      position="relative"
      aspectRatio={{ base: "1.43", lg: "1.04" }}
      role="group"
      borderColor="border.subtle"
      transition="transform 0.2s ease, border-color 0.2s ease"
      _hover={{
        transform: "translateY(-2px)",
        borderColor: "brand.emphasized",
      }}
    >
      <Image
        src={anime.photo}
        alt={anime.title_en || anime.title_romaji || "Anime poster"}
        w="full"
        h="full"
        objectFit="cover"
        objectPosition="center"
        filter="saturate(0.94) contrast(1.04)"
        transition="transform 0.3s ease"
        _groupHover={{ transform: "scale(1.05)" }}
      />

      <Flex
        position="absolute"
        inset="0"
        bgImage="linear-gradient(180deg, rgba(3, 17, 31, 0.02) 0%, rgba(3, 17, 31, 0.12) 36%, rgba(3, 17, 31, 0.68) 74%, rgba(3, 17, 31, 0.92) 100%)"
        direction="column"
        justify="flex-end"
        px={{ base: "4", md: "4" }}
        py={{ base: "3", md: "4" }}
        gap="1"
        textShadow="0 1px 10px rgba(3, 17, 31, 0.85)"
      >
        <Text
          textStyle="cardTitle"
          color="fg.heading"
          fontSize={{ base: "md", lg: "lg" }}
          lineHeight="1.2"
          textTransform="uppercase"
          lineClamp="2"
        >
          {anime.title_en || anime.title_romaji}
        </Text>

        <Text
          color="fg.default"
          fontSize={{ base: "sm", lg: "md" }}
          lineClamp="1"
        >
          {anime.title_native}
        </Text>

        {metaItems.length > 0 && (
          <HStack
            gap="1.5"
            color="fg.muted"
            fontSize={{ base: "sm", lg: "xs" }}
            mt="1"
            flexWrap="wrap"
          >
            {metaItems.map((item, index) => (
              <HStack key={`${item}-${index}`} gap="1.5">
                {index > 0 && <Text color="brand.muted">•</Text>}
                <Text>{item}</Text>
              </HStack>
            ))}
          </HStack>
        )}
      </Flex>
    </Box>
  );
}

export default AnimeListDatasItem;
