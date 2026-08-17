import { Box, Flex, HStack, Skeleton, Stack } from "@chakra-ui/react";

function AnimeListFiltersSkeleton() {
  return (
    <Stack gap="4">
      <Flex
        align="center"
        justify="space-between"
        gap={{ base: "3", lg: "5" }}
        borderBottom={{ base: "0", lg: "1px solid" }}
        borderColor="border.subtle"
        pb={{ base: "0", lg: "4" }}
      >
        <HStack
          gap={{ base: "2", lg: "4" }}
          flex="1"
          minW="0"
          overflowX={{ base: "hidden", lg: "visible" }}
        >
          {[1, 2, 3, 4].map((i) => (
            <Box
              key={i}
              w={{ base: "150px", md: "190px", lg: "180px" }}
              flexShrink="0"
            >
              <Skeleton h={{ base: "56px", lg: "48px" }} w="100%" borderRadius="8px" />
            </Box>
          ))}
        </HStack>

        <HStack gap={{ base: "2", lg: "3" }} flexShrink="0">
          <Skeleton h="5" w="32px" display={{ base: "none", md: "block" }} />
          <Skeleton
            h={{ base: "56px", lg: "48px" }}
            w={{ base: "126px", md: "156px", lg: "132px" }}
            borderRadius="8px"
          />
        </HStack>
      </Flex>
      
      <Skeleton h="24px" w="120px" borderRadius="md" />
    </Stack>
  );
}

export default AnimeListFiltersSkeleton;
