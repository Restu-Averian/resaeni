import { Skeleton } from "@chakra-ui/react";

function AnimeStreamingSkeletonPlayer() {
  return (
    <Skeleton
      aspectRatio="16 / 9"
      w="full"
      border="1px solid"
      borderColor="border.emphasized"
      borderRadius="media"
      boxShadow="media"
    />
  );
}

export default AnimeStreamingSkeletonPlayer;
