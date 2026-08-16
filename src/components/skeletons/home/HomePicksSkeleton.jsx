import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Skeleton,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import HomeSectionHeader from "../../home/HomeSectionHeader";

function HomePicksSkeleton() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Stack
      as="section"
      gap={{ base: "4", md: "4" }}
      maxW="1696px"
      w="full"
      mx="auto"
      position="relative"
      zIndex="1"
      mt={{ base: "0", md: "-8" }}
      px={{ base: "5", md: "12", xl: "0" }}
    >
      <HomeSectionHeader title="Resaeni Picks" />

      {isMobile ? (
        <HStack gap="4" overflowX="hidden" pb="2">
          {[1, 2].map((i) => (
            <Flex key={i} direction="column" w="260px" align="stretch">
              <Box
                aspectRatio="1.55"
                w="100%"
                overflow="hidden"
                borderRadius="8px"
              >
                <Skeleton w="100%" h="100%" />
              </Box>
              <Flex direction="column" gap="2" pt="2" flex="1">
                <Skeleton h="22px" w="100%" borderRadius="sm" />
                <Skeleton h="16px" w="70%" borderRadius="sm" />
                <Skeleton h="14px" w="42%" borderRadius="sm" />
              </Flex>
            </Flex>
          ))}
        </HStack>
      ) : (
        <SimpleGrid columns={{ md: 3 }} gap={{ md: "7", xl: "8" }}>
          {[1, 2, 3].map((i) => (
            <Flex key={i} direction="column" align="stretch">
              <Box aspectRatio="2.62" overflow="hidden" borderRadius="8px">
                <Skeleton w="100%" h="100%" />
              </Box>
              <Flex direction="column" gap="2" pt="2" flex="1">
                <Skeleton h="22px" w="86%" borderRadius="sm" />
                <Skeleton h="16px" w="64%" borderRadius="sm" />
                <Skeleton h="14px" w="34%" borderRadius="sm" />
              </Flex>
            </Flex>
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
}

export default HomePicksSkeleton;
