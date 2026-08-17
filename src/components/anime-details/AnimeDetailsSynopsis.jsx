import { Box, Stack, Text } from "@chakra-ui/react";
import AnimeDetailsHeaderSection from "./AnimeDetailsHeaderSection";

function AnimeDetailsSynopsis({ synopsis }) {
  return (
    <Box as="section" layerStyle="panel" p={{ base: "5", md: "7" }}>
      <Stack gap="4">
        <AnimeDetailsHeaderSection title="Synopsis" />

        <Text
          color="fg.default"
          textStyle="body"
          lineHeight="1.8"
          whiteSpace="pre-line"
        >
          {synopsis || "No synopsis available."}
        </Text>
      </Stack>
    </Box>
  );
}

export default AnimeDetailsSynopsis;
