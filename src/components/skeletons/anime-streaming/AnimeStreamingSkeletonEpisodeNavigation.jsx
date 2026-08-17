import { Grid, HStack, Skeleton, Stack } from "@chakra-ui/react";

function AnimeStreamingSkeletonEpisodeNavigation() {
  return (
    <Grid
      templateColumns={{ base: "1fr auto 1fr", md: "1fr 1fr 1fr" }}
      alignItems="center"
      gap={{ base: "4", md: "6" }}
      py={{ base: "4", md: "5" }}
    >
      <HStack justify="start">
        <Skeleton h={{ base: "24px", md: "28px" }} w="100px" />
      </HStack>

      <Stack align="center" gap="1">
        <Skeleton h="36px" w="120px" />
        <Skeleton h="20px" w="150px" />
      </Stack>

      <HStack justify="end">
        <Skeleton h={{ base: "24px", md: "28px" }} w="100px" />
      </HStack>
    </Grid>
  );
}

export default AnimeStreamingSkeletonEpisodeNavigation;
