import { Skeleton, Stack } from "@chakra-ui/react";

function AnimeStreamingSkeletonHeader() {
  return (
    <Stack gap="2">
      <Skeleton h="22px" w="190px" />
      <Skeleton h="54px" maxW="620px" />
      <Skeleton h="22px" w="140px" />
    </Stack>
  );
}

export default AnimeStreamingSkeletonHeader;
