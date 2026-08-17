import { SimpleGrid, Skeleton, Stack } from "@chakra-ui/react";

function AnimeStreamingSkeletonEpisodes() {
  return (
    <Stack gap="4">
      <Skeleton h="28px" w="140px" />
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 6 }} gap="4">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} h="158px" borderRadius="control" />
        ))}
      </SimpleGrid>
    </Stack>
  );
}

export default AnimeStreamingSkeletonEpisodes;
