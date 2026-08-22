import { Box, Flex, Grid, HStack, Skeleton, Stack } from "@chakra-ui/react";

function AnimeListFiltersSkeleton() {
  return (
    <>
      {/* Mobile Skeleton */}
      <Stack gap="3" display={{ base: "flex", lg: "none" }} w="full">
        <Flex gap="3" align="center" w="full">
          <Skeleton h="48px" flex="1" borderRadius="8px" />
          <Skeleton h="48px" w="110px" flexShrink="0" borderRadius="8px" />
        </Flex>

        <Grid templateColumns="repeat(2, 1fr)" gap="3" w="full">
          <Skeleton h="48px" borderRadius="8px" />
          <Skeleton h="48px" borderRadius="8px" />
        </Grid>

        <Skeleton h="36px" w="120px" borderRadius="8px" />
      </Stack>

      {/* Desktop Skeleton */}
      <Stack gap="4" display={{ base: "none", lg: "flex" }} w="full">
        <Flex
          align="center"
          justify="space-between"
          gap="5"
          borderBottom="1px solid"
          borderColor="border.subtle"
          pb="4"
        >
          <HStack gap="4" flex="1" minW="0" overflowX="visible">
            {[1, 2].map((i) => (
              <Box key={i} w="180px" flexShrink="0">
                <Skeleton h="48px" w="100%" borderRadius="8px" />
              </Box>
            ))}
          </HStack>

          <HStack gap="3" flexShrink="0">
            <Skeleton h="5" w="32px" />
            <Skeleton h="48px" w="132px" borderRadius="8px" />
          </HStack>
        </Flex>

        <Skeleton h="36px" w="120px" borderRadius="8px" />
      </Stack>
    </>
  );
}

export default AnimeListFiltersSkeleton;

