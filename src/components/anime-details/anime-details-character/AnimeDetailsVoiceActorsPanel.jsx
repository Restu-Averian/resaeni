import {
  Avatar,
  Badge,
  Box,
  Drawer,
  Flex,
  HStack,
  IconButton,
  Image,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Globe2, X } from "lucide-react";

function VoiceActorsContent({ character, onClose }) {
  const voiceActors = character.voice_actors ?? [];

  return (
    <Stack gap="6">
      <Flex align="center" justify="space-between" gap="4">
        <Text as="h3" textStyle="sectionTitle" color="accent.warmMuted">
          Voice Actors
        </Text>

        <IconButton
          aria-label="Close voice actors"
          variant="plain"
          size="sm"
          color="fg.muted"
          onClick={onClose}
        >
          <X size={20} />
        </IconButton>
      </Flex>

      <HStack gap="4" align="center">
        {character.photo ? (
          <Image
            src={character.photo}
            alt={character.name}
            boxSize={{ base: "72px", md: "84px" }}
            borderRadius="full"
            objectFit="cover"
            objectPosition="center top"
            border="1px solid"
            borderColor="border.emphasized"
          />
        ) : (
          <Avatar.Root boxSize={{ base: "72px", md: "84px" }}>
            <Avatar.Fallback name={character.name} />
          </Avatar.Root>
        )}

        <Stack gap="1.5" minW="0">
          <HStack gap="3" wrap="wrap">
            <Text
              color="fg.heading"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="700"
              lineClamp="1"
            >
              {character.name}
            </Text>

            <Badge variant={character.role === "Main" ? "warm" : "neutral"}>
              {character.role}
            </Badge>
          </HStack>

          <Text color="fg.muted">
            {character.role === "Main"
              ? "Main Character"
              : "Supporting Character"}
          </Text>
        </Stack>
      </HStack>

      <Box borderTop="1px solid" borderColor="border.default" />

      <Flex justify="space-between" gap="4" wrap="wrap">
        <Text color="fg.heading" fontWeight="700">
          Available Voice Actors
        </Text>

        <HStack color="fg.muted" gap="2">
          <Globe2 size={18} />
          <Text>Multiple Languages</Text>
        </HStack>
      </Flex>

      {voiceActors.length === 0 ? (
        <Box layerStyle="panel" p="4">
          <Text color="fg.muted">No voice actors available.</Text>
        </Box>
      ) : (
        <Stack gap="3">
          {voiceActors.map((voiceActor) => (
            <Flex
              key={voiceActor.id}
              layerStyle="panel"
              p="4"
              align="center"
              justify="space-between"
              gap="4"
            >
              <HStack gap="4" minW="0">
                {voiceActor.photo ? (
                  <Image
                    src={voiceActor.photo}
                    alt={voiceActor.name}
                    boxSize="56px"
                    borderRadius="full"
                    objectFit="cover"
                    objectPosition="center top"
                  />
                ) : (
                  <Avatar.Root boxSize="56px">
                    <Avatar.Fallback name={voiceActor.name} />
                  </Avatar.Root>
                )}

                <Stack gap="1" minW="0">
                  <Text
                    color="fg.heading"
                    fontWeight="700"
                    fontSize="lg"
                    lineClamp="1"
                  >
                    {voiceActor.name}
                  </Text>

                  {voiceActor.country && (
                    <Badge variant="warm">{voiceActor.country}</Badge>
                  )}
                </Stack>
              </HStack>

              <Text color="fg.muted" flexShrink="0">
                Voice Actor
              </Text>
            </Flex>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

function AnimeDetailsVoiceActorsPanel({
  character,
  onClose,
  isDrawer = false,
  isOpen = false,
}) {
  if (!character) return null;

  if (isDrawer) {
    return (
      <Drawer.Root
        open={isOpen}
        onOpenChange={({ open }) => {
          if (!open) onClose();
        }}
        placement="bottom"
        size="full"
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content
              bg="bg.elevated"
              borderTop="1px solid"
              borderColor="accent.warm"
              borderTopRadius="2xl"
              maxH="82vh"
            >
              <Drawer.Body p={{ base: "5", md: "6" }} overflowY="auto">
                <VoiceActorsContent character={character} onClose={onClose} />
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    );
  }

  return (
    <Box
      layerStyle="panelElevated"
      p={{ base: "5", md: "6" }}
      borderColor="accent.warm"
      position="sticky"
      top="6"
    >
      <VoiceActorsContent character={character} onClose={onClose} />
    </Box>
  );
}

export default AnimeDetailsVoiceActorsPanel;
