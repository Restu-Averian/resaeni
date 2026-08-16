import { Button, Flex, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { RefreshCcw } from "lucide-react";

function AnimeFinderSourceImage({
  imagePreview,
  imageName,
  onReplace,
  isSearching,
}) {
  return (
    <Stack gap="3">
      <Text color="fg.heading" fontSize="lg" fontWeight="medium">
        Source image
      </Text>
      <Flex
        layerStyle="panel"
        align="center"
        justify="space-between"
        gap="5"
        p="4"
        direction={{ base: "column", sm: "row" }}
      >
        <HStack gap="5" minW="0">
          <Image
            src={imagePreview}
            alt=""
            w={{ base: "160px", md: "230px" }}
            h={{ base: "84px", md: "96px" }}
            objectFit="cover"
            borderRadius="control"
            border="1px solid"
            borderColor="border.subtle"
          />
          <Stack gap="1" minW="0">
            <Text color="fg.default" lineClamp="1">
              {imageName}
            </Text>
            <Text color="fg.muted">Screenshot from your episode</Text>
          </Stack>
        </HStack>

        <Button
          variant="ghost"
          color="accent.primary"
          onClick={onReplace}
          disabled={isSearching}
          flex="0 0 auto"
        >
          <RefreshCcw size={18} />
          Replace image
        </Button>
      </Flex>
    </Stack>
  );
}

export default AnimeFinderSourceImage;
