import { Box, HStack, Text } from "@chakra-ui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link as RouterLink, useParams } from "react-router";

function AnimeStreamingEpsNavigationEpsNum({ episode, direction }) {
  const { mal_id: malId } = useParams();
  const isPrevious = direction === "previous";
  const episodeNumber = isPrevious
    ? episode?.previous_episode_number
    : episode?.next_episode_number;

  if (!episodeNumber) {
    return (
      <HStack justify="center">
        <Box />
      </HStack>
    );
  }

  return (
    <HStack justify="center">
      <HStack
        as={RouterLink}
        to={`/anime/${malId}/episode/${episodeNumber}`}
        color="fg.heading"
        gap="2"
        _hover={{ color: "accent.primary" }}
      >
        {isPrevious && <ArrowLeft size={18} />}

        <Text
          fontFamily="heading"
          fontSize="xl"
          display={{ base: "none", md: "block" }}
        >
          Episode {episodeNumber}
        </Text>

        {!isPrevious && <ArrowRight size={18} />}
      </HStack>
    </HStack>
  );
}

export default AnimeStreamingEpsNavigationEpsNum;
