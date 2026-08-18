import { Play } from "lucide-react";
import { Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

function HomeHeroBannerCopy({ hero, titleSize }) {
  const navigate = useNavigate();
  const episodeLabel = hero?.episodes_count
    ? `${hero.episodes_count} ${hero.episodes_count === 1 ? "Episode" : "Episodes"}`
    : null;
  const metaItems = [hero?.year, hero?.type, episodeLabel].filter(Boolean);

  return (
    <Stack gap={{ base: "4", md: "4" }} align="flex-start" maxW="610px">
      <Stack gap="2">
        <Heading
          as="h1"
          textStyle="display"
          color="fg.heading"
          fontSize={titleSize}
          lineHeight="0.92"
        >
          {hero?.title_en}
        </Heading>

        <Text
          color="fg.heading"
          fontSize={{ base: "2xl", md: "3xl" }}
          lineHeight="1.1"
        >
          {hero?.title_native || hero?.title_romaji}
        </Text>
      </Stack>

      {metaItems.length > 0 && (
        <HStack color="fg.muted" fontSize={{ base: "md", md: "lg" }} gap="3">
          {metaItems.map((item, index) => (
            <HStack key={`${item}-${index}`} gap="3">
              {index > 0 && <Text color="accent.primary">•</Text>}
              <Text>{item}</Text>
            </HStack>
          ))}
        </HStack>
      )}

      <Text
        color="fg.muted"
        fontSize={{ base: "md", md: "lg" }}
        lineHeight="1.5"
        lineClamp={3}
        maxW="560px"
      >
        {hero?.description}
      </Text>

      <HStack
        gap={{ base: "3", md: "5" }}
        flexWrap="wrap"
        pt={{ base: "4", md: "3" }}
        w="full"
        justify={{ base: "space-between", md: "flex-start" }}
      >
        <Button
          h={{ base: "56px", md: "58px" }}
          minW={{ base: "0", md: "194px" }}
          flex={{ base: 1, md: "initial" }}
          bg="accent.primary"
          color="fg.heading"
          _hover={{ bg: "accent.hover" }}
          borderRadius="8px"
          fontFamily="heading"
          fontSize={{ base: "xl", md: "lg" }}
          fontWeight="700"
          border="1px solid"
          borderColor="whiteAlpha.300"
          onClick={() => navigate(`/anime/${hero?.id}/episode/1`)}
        >
          <Play size={18} fill="currentColor" />
          Watch Now
        </Button>

        <Button
          h={{ base: "56px", md: "58px" }}
          minW={{ base: "0", md: "200px" }}
          flex={{ base: 1, md: "initial" }}
          bg="transparent"
          color="fg.heading"
          _hover={{ bg: "whiteAlpha.100" }}
          borderRadius="8px"
          fontFamily="heading"
          fontSize={{ base: "xl", md: "lg" }}
          fontWeight="700"
          border="1px solid"
          borderColor="border.default"
          onClick={() => navigate(`/anime/${hero?.id}`)}
        >
          View Details
        </Button>
      </HStack>
    </Stack>
  );
}

export default HomeHeroBannerCopy;
