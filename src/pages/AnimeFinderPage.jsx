import { useRef, useState } from "react";
import { Box, Center, Container, SimpleGrid, Stack } from "@chakra-ui/react";
import AnimeFinderGuide from "../components/anime-finder/AnimeFinderGuide";
import AnimeFinderHeader from "../components/anime-finder/AnimeFinderHeader";
import AnimeFinderUpload from "../components/anime-finder/AnimeFinderUpload";
import AnimeFinderResults from "../components/anime-finder/anime-finder-results";
import {
  ANIME_FINDER_ACCEPTED_TYPES,
  ANIME_FINDER_MAX_FILE_SIZE,
} from "../constants/anime-finder";
import { findAnimeByScreenshot } from "../services/anime-finder";

function AnimeFinderPage() {
  const replaceInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageName, setImageName] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleFileSelect = async (file) => {
    setError("");

    if (!ANIME_FINDER_ACCEPTED_TYPES.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size === 0) {
      setError("Please upload a non-empty image.");
      return;
    }

    if (file.size > ANIME_FINDER_MAX_FILE_SIZE) {
      setError("Please upload an image under 10MB.");
      return;
    }

    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(URL.createObjectURL(file));
    setImageName(file.name);
    setIsSearching(true);

    try {
      const data = await findAnimeByScreenshot(file);
      setResult(data);
    } catch (requestError) {
      setResult(null);
      setError(
        requestError?.response?.data?.error?.message ||
          "Resaeni could not identify this screenshot. Please try another frame.",
      );
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Box minH="100vh" bg="bg.canvas" pb={{ base: "28", md: "12" }}>
      <input
        ref={replaceInputRef}
        hidden
        type="file"
        accept={ANIME_FINDER_ACCEPTED_TYPES.join(",")}
        disabled={isSearching}
        onChange={(event) => {
          const [file] = event.target.files;
          if (file) handleFileSelect(file);
          event.target.value = "";
        }}
      />

      <Container
        maxW="1440px"
        px={{ base: "4", md: "8", xl: "12" }}
        py={{ base: "7", md: "10" }}
      >
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: "8", xl: "12" }}>
          <Stack gap={{ base: "6", md: "8" }}>
            <AnimeFinderHeader />

            {imagePreview ? (
              <AnimeFinderResults
                imagePreview={imagePreview}
                imageName={imageName}
                result={result}
                error={error}
                isSearching={isSearching}
                onReplace={() => replaceInputRef.current?.click()}
              />
            ) : (
              <>
                <AnimeFinderUpload
                  onFileSelect={handleFileSelect}
                  isSearching={isSearching}
                />
                {error && (
                  <Center layerStyle="panel" p="5" color="fg.error">
                    {error}
                  </Center>
                )}
              </>
            )}
          </Stack>

          <Box pt={{ base: "0", lg: "32" }}>
            <AnimeFinderGuide hasResult={imagePreview} />
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default AnimeFinderPage;
