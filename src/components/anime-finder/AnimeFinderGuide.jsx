import { Box, Center, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import {
  Clock,
  Crop,
  Film,
  Image as ImageIcon,
  ListChecks,
  Maximize,
  Percent,
  ScanLine,
  X,
} from "lucide-react";

const uploadTips = [
  {
    icon: ScanLine,
    title: "Use a clear screenshot",
    description: "High quality, in-focus frames work best.",
  },
  {
    icon: Crop,
    title: "Avoid heavy crops",
    description: "Include more of the scene, borders and context help.",
  },
  {
    icon: Film,
    title: "Use direct episode frames",
    description:
      "Screenshots taken straight from the episode are most accurate.",
  },
];

const resultTips = [
  {
    icon: Percent,
    title: "Match percentage",
    description: "Shows how confident we are in the match.",
  },
  {
    icon: Clock,
    title: "Matched at",
    description: "The timestamp in the episode where this scene appears.",
  },
  {
    icon: ListChecks,
    title: "Multiple matches",
    description: "Similar scenes may appear in different anime.",
  },
];

const retryTips = [
  {
    icon: ImageIcon,
    title: "Try another frame",
    description: "Different moments can produce better matches.",
  },
  {
    icon: X,
    title: "Avoid heavy overlays",
    description: "Subtitles, logos, or watermarks can affect results.",
  },
  {
    icon: Maximize,
    title: "Use a clearer image",
    description: "High quality, in-focus frames work best.",
  },
];

function AnimeFinderGuideItem({ icon: Icon, title, description }) {
  return (
    <HStack align="center" gap={{ base: "4", md: "6" }}>
      <Center
        flex="0 0 auto"
        boxSize={{ base: "14", md: "18" }}
        border="1px solid"
        borderColor="accent.muted"
        borderRadius="full"
        color="accent.primary"
        bg="accent.subtle"
      >
        <Icon size={30} strokeWidth={1.35} />
      </Center>
      <Stack gap="1">
        <Text color="fg.heading" fontWeight="medium">
          {title}
        </Text>
        <Text color="fg.default" lineHeight="1.6">
          {description}
        </Text>
      </Stack>
    </HStack>
  );
}

function AnimeFinderGuide({ hasResult }) {
  const tips = hasResult ? resultTips : uploadTips;

  return (
    <Stack
      layerStyle="panel"
      p={{ base: "6", md: "8" }}
      gap="7"
      position={{ base: "static", lg: "sticky" }}
      top={{ lg: "24" }}
    >
      <Heading
        as="h2"
        textStyle="sectionTitle"
        color="fg.heading"
        fontSize={{ base: "2xl", md: "3xl" }}
      >
        {hasResult ? "How to read your results" : "Tips for best results"}
      </Heading>

      <Stack gap="7" divider={<Box h="1px" bg="border.subtle" />}>
        {tips.map((tip) => (
          <AnimeFinderGuideItem key={tip.title} {...tip} />
        ))}
      </Stack>

      {hasResult ? (
        <>
          <Box h="1px" bg="border.subtle" />
          <Heading
            as="h3"
            textStyle="sectionTitle"
            color="fg.heading"
            fontSize={{ base: "xl", md: "2xl" }}
          >
            If this doesn’t look right
          </Heading>
          <Stack gap="6">
            {retryTips.map((tip) => (
              <AnimeFinderGuideItem key={tip.title} {...tip} />
            ))}
          </Stack>
        </>
      ) : (
        <>
          <Box h="1px" bg="border.subtle" />
          <Text color="fg.default" lineHeight="1.65">
            Resaeni analyzes visual content to find matching anime scenes.
          </Text>
        </>
      )}
    </Stack>
  );
}

export default AnimeFinderGuide;
