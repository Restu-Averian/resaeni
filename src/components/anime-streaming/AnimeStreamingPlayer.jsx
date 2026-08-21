import { Center } from "@chakra-ui/react";
import { BASE_VIDEO_URL } from "../../constants/anime-streaming.constants";
import { getAssetUrl } from "../../helpers/asset.utils";

function AnimeStreamingPlayer({ selectedEmbedUrl, poster }) {
  const posterUrl = getAssetUrl(poster);

  return (
    <Center
      aspectRatio="16 / 9"
      w="full"
      overflow="hidden"
      bg="bg.subtle"
      border="1px solid"
      borderColor="border.emphasized"
      borderRadius="media"
      boxShadow="media"
    >
      <video
        key={selectedEmbedUrl}
        src={`${BASE_VIDEO_URL}${selectedEmbedUrl}`}
        poster={posterUrl || undefined}
        controls
        playsInline
        preload="metadata"
        referrerPolicy="no-referrer"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          background: "transparent",
        }}
      />
    </Center>
  );
}

export default AnimeStreamingPlayer;
