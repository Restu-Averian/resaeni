import { Center, HStack, Stack, Text } from "@chakra-ui/react";
import { LoaderCircle } from "lucide-react";
import AnimeFinderBestMatch from "./AnimeFinderBestMatch";
import AnimeFinderOtherMatch from "./AnimeFinderOtherMatch";
import AnimeFinderSourceImage from "./AnimeFinderSourceImage";

function AnimeFinderResults({
  imagePreview,
  imageName,
  result,
  error,
  isSearching,
  onReplace,
}) {
  const hasResult = Boolean(result?.best_match);
  const otherMatches = result?.other_matches ?? [];

  return (
    <Stack gap="5">
      <AnimeFinderSourceImage
        imagePreview={imagePreview}
        imageName={imageName}
        onReplace={onReplace}
        isSearching={isSearching}
      />

      {isSearching && (
        <Center layerStyle="panel" py="14" color="accent.primary">
          <HStack gap="3">
            <LoaderCircle size={24} className="spin" />
            <Text>Searching for matching anime scenes...</Text>
          </HStack>
        </Center>
      )}

      {error && (
        <Center layerStyle="panel" p="5" color="fg.error">
          {error}
        </Center>
      )}

      {hasResult && <AnimeFinderBestMatch match={result.best_match} />}

      {otherMatches.length > 0 && (
        <Stack gap="3">
          <Text color="fg.heading" fontSize="lg" fontWeight="medium">
            Other matches
          </Text>
          <Stack gap="2">
            {otherMatches.map((match, index) => (
              <AnimeFinderOtherMatch
                key={`${match.anilist_id}-${match.at}-${index}`}
                match={match}
                index={index}
              />
            ))}
          </Stack>
        </Stack>
      )}

      {!isSearching && result && !hasResult && (
        <Center layerStyle="panel" py="14" px="6" textAlign="center">
          <Stack gap="2">
            <Text color="fg.heading" fontSize="xl">
              No confident match found
            </Text>
            <Text color="fg.default">
              Try a clearer frame without subtitles or overlays.
            </Text>
          </Stack>
        </Center>
      )}
    </Stack>
  );
}

export default AnimeFinderResults;
