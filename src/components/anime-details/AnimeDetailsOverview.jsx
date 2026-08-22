import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import {
  Activity,
  Building2,
  Calendar,
  CalendarDays,
  Clapperboard,
  Layers,
  Star,
} from "lucide-react";
import AnimeDetailsHeaderSection from "./AnimeDetailsHeaderSection";
import {
  ANIME_DETAILS_STATUS_LABELS,
  ANIME_DETAILS_TYPE_LABELS,
} from "../../constants/anime-details.constants";
import { formatDate } from "../../lib/formatDate";

function AnimeDetailsOverview({ anime }) {
  const formatAired = (from, to) => {
    const fromLabel = formatDate(from);
    const toLabel = formatDate(to);

    if (fromLabel === "—" && toLabel === "—") return "—";
    if (toLabel === "—") return fromLabel;

    return `${fromLabel} - ${toLabel}`;
  };

  const rows = [
    {
      icon: Clapperboard,
      label: "Type",
      value: ANIME_DETAILS_TYPE_LABELS[anime.type] ?? anime.type ?? "—",
    },
    {
      icon: Activity,
      label: "Status",
      value: ANIME_DETAILS_STATUS_LABELS[anime.status] ?? anime.status ?? "—",
    },
    {
      icon: Layers,
      label: "Episodes",
      value: anime.episodes_count ?? "—",
    },
    {
      icon: CalendarDays,
      label: "Season",
      value: [anime.season, anime.year].filter(Boolean).join(" ") || "—",
    },
    {
      icon: Calendar,
      label: "Aired",
      value: formatAired(anime.aired_from, anime.aired_to),
    },
    {
      icon: Building2,
      label: "Studio",
      value: anime.studio || "—",
    },
    {
      icon: Star,
      label: "Score",
      value:
        anime.score !== null && anime.score !== undefined
          ? Number(anime.score).toFixed(1)
          : "—",
    },
  ];

  return (
    <Box as="aside" layerStyle="panelElevated" p={{ base: "5", md: "6" }}>
      <Stack gap="5">
        <AnimeDetailsHeaderSection title="Overview" />

        <Stack gap="3.5">
          {rows.map(({ icon: Icon, label, value }) => (
            <Flex key={label} justify="space-between" align="center" gap="5">
              <HStack gap="2.5" align="center" color="fg.subtle">
                <Icon size={16} strokeWidth={1.6} />

                <Text color="fg.subtle" fontSize="sm">
                  {label}
                </Text>
              </HStack>

              <Text color="fg.heading" textAlign="right" fontWeight="500">
                {value}
              </Text>
            </Flex>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

export default AnimeDetailsOverview;
