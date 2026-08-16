import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

function HomePickCardItem({ pick, variant = "desktop" }) {
  const isMobile = variant === "mobile";
  const navigate = useNavigate();

  return (
    <Flex
      direction="column"
      w={isMobile ? "260px" : "auto"}
      minW="0"
      cursor="pointer"
      onClick={() => navigate(`/anime/${pick?.id}`)}
      transition="transform 0.2s ease"
      _hover={{
        transform: "translateY(-2px)",
      }}
    >
      <Box
        aspectRatio={isMobile ? "1.55" : "2.62"}
        overflow="hidden"
        border="1px solid"
        borderColor="border.default"
        borderRadius="8px"
        boxShadow="media"
      >
        <Image
          src={pick?.photo}
          alt={pick?.title_en || pick?.title_romaji || "Anime poster"}
          w="100%"
          h="100%"
          objectFit="cover"
          objectPosition="center center"
          filter="saturate(0.92) contrast(1.05)"
        />
      </Box>

      <Flex direction="column" gap="1" pt="2" minW="0">
        <Text
          textStyle="cardTitle"
          color="fg.heading"
          fontSize={isMobile ? "2xl" : { md: "2xl", xl: "2xl" }}
          lineClamp="2"
          lineHeight="1.1"
        >
          {pick?.title_en}
        </Text>

        <Text
          color="fg.default"
          fontSize={isMobile ? "lg" : "md"}
          lineClamp="1"
        >
          {pick?.title_romaji}
        </Text>

        <HStack gap="2" color="fg.muted" fontSize={isMobile ? "md" : "md"}>
          <Text>{pick?.type}</Text>
          <Text color="accent.warmMuted">•</Text>
          <Text>{pick.rating}</Text>
        </HStack>
      </Flex>
    </Flex>
  );
}

export default HomePickCardItem;
