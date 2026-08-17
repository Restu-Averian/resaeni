import { Flex, HStack, Skeleton } from "@chakra-ui/react";

function AnimeListPaginationSkeleton() {
  return (
    <Flex
      align="center"
      justify="space-between"
      direction={{ base: "column", md: "row" }}
      gap={{ base: "3", md: "4" }}
      pt={{ base: "1", md: "2" }}
    >
      <Skeleton
        height="5"
        width="200px"
        alignSelf={{ base: "flex-start", md: "center" }}
      />

      <HStack gap={{ base: "4", md: "2" }}>
        <Skeleton height={{ base: "12", md: "8" }} width="110px" borderRadius="md" />
        <Skeleton height={{ base: "12", md: "8" }} width={{ base: "58px", md: "38px" }} borderRadius="md" />
        <Skeleton height={{ base: "12", md: "8" }} width={{ base: "58px", md: "38px" }} borderRadius="md" />
        <Skeleton height={{ base: "12", md: "8" }} width="94px" borderRadius="md" />
      </HStack>
    </Flex>
  );
}

export default AnimeListPaginationSkeleton;
