import { Box, Flex, HStack, Skeleton } from "@chakra-ui/react";

function AnimeListDatasItemSkeleton() {
  return (
    <Flex direction="column" w="full" textAlign="left">
      <Box
        aspectRatio="0.73"
        overflow="hidden"
        border="1px solid"
        borderColor="border.default"
        borderRadius="8px"
        boxShadow="media"
        bg="bg.subtle"
      >
        <Skeleton w="full" h="full" />
      </Box>

      <Flex
        direction="column"
        gap={{ base: "1.5", md: "2" }}
        pt={{ base: "3", md: "4" }}
        minW="0"
      >
        <Flex direction="column" gap="1.5">
          <Skeleton height={{ base: "20px", md: "24px", xl: "28px" }} width="90%" />
          <Skeleton height={{ base: "20px", md: "24px", xl: "28px" }} width="60%" />
        </Flex>

        <Skeleton height={{ base: "16px", md: "18px" }} width="70%" />

        <HStack gap="1.5" mt="1">
          <Skeleton height="3" width="10" />
          <Skeleton height="3" width="2" />
          <Skeleton height="3" width="10" />
          <Skeleton height="3" width="2" />
          <Skeleton height="3" width="16" />
        </HStack>
      </Flex>
    </Flex>
  );
}

export default AnimeListDatasItemSkeleton;
