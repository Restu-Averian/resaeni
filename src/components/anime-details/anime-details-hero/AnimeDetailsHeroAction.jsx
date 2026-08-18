import { Button, HStack } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import { Link as RouterLink } from "react-router";

function AnimeDetailsHeroAction({ anime, onJumpToEpisodes }) {
  const canWatchEpisode = Number(anime.episodes_count) > 0;

  return (
    <HStack
      gap={3}
      wrap="wrap"
      pt={{ base: 8, md: 3 }}
      w="full"
      justify={{ base: "space-between", md: "flex-start" }}
    >
      <Button
        as={canWatchEpisode ? RouterLink : undefined}
        to={canWatchEpisode ? `/anime/${anime.id}/episode/1` : undefined}
        size="lg"
        px={8}
        flex={{ base: 1, md: "initial" }}
        disabled={!canWatchEpisode}
      >
        Watch Episode 1
      </Button>

      <Button
        size={{ base: "md", md: "lg" }}
        px={8}
        flex={{ base: 1, md: "initial" }}
        variant="plain"
        onClick={onJumpToEpisodes}
      >
        Jump to episodes <ArrowRight size={18} />
      </Button>
    </HStack>
  );
}

export default AnimeDetailsHeroAction;
