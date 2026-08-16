import { useRef } from "react";
import { Box, Center, Heading, Stack, Text } from "@chakra-ui/react";
import { Film, Upload } from "lucide-react";
import { ANIME_FINDER_ACCEPTED_TYPES } from "../../constants/anime-finder";

function AnimeFinderUpload({ onFileSelect, isSearching }) {
  const inputRef = useRef(null);

  return (
    <Box
      as="label"
      layerStyle="panel"
      display="block"
      p="3"
      cursor={isSearching ? "default" : "pointer"}
      opacity={isSearching ? 0.72 : 1}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        const [file] = event.dataTransfer.files;
        if (file) onFileSelect(file);
      }}
    >
      <Center
        minH={{ base: "390px", md: "540px" }}
        border="1px dashed"
        borderColor="accent.muted"
        borderRadius="panel"
        px={{ base: "5", md: "10" }}
      >
        <Stack align="center" gap="5" textAlign="center" maxW="520px">
          <Box position="relative" color="fg.muted">
            <Film size={118} strokeWidth={1.05} />
            <Center
              position="absolute"
              right="-4"
              bottom="0"
              boxSize="14"
              borderRadius="full"
              bg="accent.primary"
              color="bg.subtle"
              boxShadow="panel"
            >
              <Upload size={34} strokeWidth={1.55} />
            </Center>
          </Box>

          <Stack gap="2">
            <Heading
              as="h2"
              textStyle="sectionTitle"
              color="fg.heading"
              fontSize={{ base: "3xl", md: "4xl" }}
            >
              Drop a screenshot here
            </Heading>
            <Text color="fg.heading" fontSize={{ base: "md", md: "lg" }}>
              or{" "}
              <Text as="span" color="accent.primary" textDecoration="underline">
                choose image
              </Text>
            </Text>
          </Stack>

          <Box w="72" h="1px" bg="border.subtle" />

          <Text color="fg.default">
            Best for screenshots taken directly from an anime episode.
          </Text>
          <Text color="fg.muted" fontSize="sm" textTransform="uppercase">
            JPG, PNG, WebP up to 10MB
          </Text>
        </Stack>
      </Center>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept={ANIME_FINDER_ACCEPTED_TYPES.join(",")}
        disabled={isSearching}
        onChange={(event) => {
          const [file] = event.target.files;
          if (file) onFileSelect(file);
          event.target.value = "";
        }}
      />
    </Box>
  );
}

export default AnimeFinderUpload;
