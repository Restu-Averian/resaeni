import { Box, HStack, Skeleton, Stack } from "@chakra-ui/react";

function HomeHeroBannerSkeleton() {
  return (
    <Box
      as="section"
      minH={{ base: "620px", md: "560px" }}
      overflow="hidden"
      position="relative"
    >
      <Stack
        align="flex-start"
        gap={{ base: "4", md: "4" }}
        justify={{ base: "flex-end", md: "flex-start" }}
        minH={{ base: "620px", md: "560px" }}
        maxW="1696px"
        mx="auto"
        px={{ base: "5", md: "12", xl: "clamp(4rem, 6vw, 10rem)" }}
        pt={{ base: "80px", md: "24" }}
        pb={{ base: "12", md: "16" }}
      >
        <Stack gap="1" w="full">
          <Skeleton
            h={{ base: "56px", md: "92px" }}
            maxW={{ base: "80%", md: "360px" }}
            borderRadius="md"
          />
          <HStack gap="3" mt="2">
            <Skeleton h="16px" w="100px" borderRadius="sm" />
            <Skeleton h="16px" w="60px" borderRadius="sm" />
            <Skeleton h="16px" w="80px" borderRadius="sm" />
          </HStack>
        </Stack>

        <Stack gap="2" w="full" maxW={{ base: "80%", md: "560px" }}>
          <Skeleton h="16px" w="100%" borderRadius="sm" />
          <Skeleton h="16px" w="80%" borderRadius="sm" />
        </Stack>

        <HStack gap="5" pt="3">
          <Skeleton
            h={{ base: "56px", md: "58px" }}
            w="194px"
            borderRadius="md"
          />
          <Skeleton
            h={{ base: "56px", md: "58px" }}
            w="200px"
            borderRadius="md"
          />
        </HStack>
      </Stack>
    </Box>
  );
}

export default HomeHeroBannerSkeleton;
