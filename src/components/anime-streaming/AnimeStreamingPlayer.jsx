import { Button, Center, Flex, Stack } from "@chakra-ui/react";
import { Download } from "lucide-react";
import { BASE_VIDEO_URL } from "../../constants/anime-streaming.constants";
import { getAssetUrl } from "../../helpers/asset.utils";

function AnimeStreamingPlayer({ selectedEmbedUrl, poster, episodeNumber }) {
  const posterUrl = getAssetUrl(poster);
  const videoUrl = selectedEmbedUrl
    ? `${BASE_VIDEO_URL}${selectedEmbedUrl}`
    : "";

  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8787";
  const filename = episodeNumber
    ? `Episode-${episodeNumber}.mp4`
    : "episode.mp4";
  const downloadUrl = selectedEmbedUrl
    ? `${apiBaseUrl}/api/download?url=${encodeURIComponent(selectedEmbedUrl)}&filename=${encodeURIComponent(filename)}`
    : "";

  return (
    <Stack gap="3" w="full">
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
          src={videoUrl || undefined}
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

      {downloadUrl && (
        <Flex justify="flex-end" w="full">
          <Button as="a" href={downloadUrl} variant="outline" size="sm" gap="2">
            <Download size={16} />
            Download
          </Button>
        </Flex>
      )}
    </Stack>
  );
}

export default AnimeStreamingPlayer;
