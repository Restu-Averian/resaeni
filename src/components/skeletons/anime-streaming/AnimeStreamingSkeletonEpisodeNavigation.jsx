import { Grid, HStack, Skeleton, Stack } from "@chakra-ui/react";

function AnimeStreamingSkeletonEpisodeNavigation() {
  return (
    <Grid
      templateColumns={{ base: "1fr auto 1fr", md: "1fr 1fr 1fr" }}
      alignItems="center"
      gap={{ base: "4", md: "6" }}
      py={{ base: "4", md: "5" }}
    >
      <HStack justify="center">
        <Skeleton h={{ base: "24px", md: "28px" }} w="100px" />
      </HStack>

      <Stack
        align="center"
        gap="0.5"
        borderX={{ base: "0", md: "1px solid" }}
        borderColor="border.default"
      >
        <Skeleton h="36px" w="120px" />
        <Skeleton h="20px" w="150px" />
      </Stack>

      <HStack justify="center">
        <Skeleton h={{ base: "24px", md: "28px" }} w="100px" />
      </HStack>
    </Grid>
  );
}

export default AnimeStreamingSkeletonEpisodeNavigation;
