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
    <Flex
      as={RouterLink}
      to={`/anime/${anime.id}`}
      direction="column"
      w="full"
      textAlign="left"
      cursor="pointer"
      role="group"
      textDecoration="none"
      transition="transform 0.2s ease"
      _hover={{
        transform: "translateY(-2px)",
        textDecoration: "none",
      }}
    >
      <Box
        aspectRatio="0.73"
        overflow="hidden"
        border="1px solid"
        borderColor="border.default"
        borderRadius="8px"
        boxShadow="media"
      >
        <Image
          src={anime.photo}
          alt={anime.title_en || anime.title_romaji || "Anime poster"}
          w="full"
          h="full"
          objectFit="cover"
          objectPosition="center top"
          filter="saturate(0.94) contrast(1.04)"
          transition="transform 0.3s ease"
          _groupHover={{ transform: "scale(1.04)" }}
        />
      </Box>

      <Flex
        direction="column"
        gap={{ base: "1.5", md: "2" }}
        pt={{ base: "3", md: "4" }}
        minW="0"
      >
        <Text
          textStyle="cardTitle"
          color="fg.heading"
          fontSize={{ base: "xl", md: "2xl", xl: "3xl" }}
          lineHeight="1.05"
          lineClamp="2"
        >
          {anime.title_en || anime.title_romaji}
        </Text>

        <Text
          color="fg.default"
          fontSize={{ base: "md", md: "lg" }}
          lineClamp="1"
        >
          {anime.title_native}
        </Text>

        {metaItems.length > 0 && (
          <HStack
            gap="1.5"
            color="fg.muted"
            fontSize={{ base: "sm", md: "md" }}
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
    </Flex>
  );
}

export default AnimeListDatasItem;
