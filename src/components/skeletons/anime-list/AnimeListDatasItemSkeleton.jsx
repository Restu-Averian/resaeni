import { Box, Flex, HStack, Skeleton, SkeletonText } from "@chakra-ui/react";

function AnimeListDatasItemSkeleton() {
  return (
    <Box
      as="article"
      layerStyle="interactiveSurface"
      overflow="hidden"
      boxShadow="media"
      borderColor="border.subtle"
      position="relative"
      aspectRatio={{ base: "1.43", lg: "1.35" }}
    >
      <Skeleton w="full" h="full" />

      <Flex
        position="absolute"
        inset="0"
        bgImage="linear-gradient(180deg, rgba(3, 17, 31, 0.02) 0%, rgba(3, 17, 31, 0.12) 36%, rgba(3, 17, 31, 0.68) 74%, rgba(3, 17, 31, 0.92) 100%)"
        direction="column"
        justify="flex-end"
        gap="2"
        px={{ base: "3", md: "4" }}
        py={{ base: "3", md: "4" }}
      >
        <SkeletonText noOfLines={2} skeletonHeight="4" width="80%" />

        <HStack gap="2">
          <Skeleton height="3" width="6" />
          <Skeleton height="3" width="2" />
          <Skeleton height="3" width="10" />
        </HStack>
      </Flex>
    </Box>
  );
}

export default AnimeListDatasItemSkeleton;
