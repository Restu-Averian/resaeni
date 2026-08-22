import { Button, HStack, Text } from "@chakra-ui/react";
import { X } from "lucide-react";
import { CHIP_FILTERS } from "../../../constants/anime-list.constants";
import { useAnimeListFilters } from "../../../context/AnimeListFiltersContext";

function AnimeListFiltersItems() {
  const { filters, onRemoveFilter, onClearFilters } = useAnimeListFilters();
  const activeFilters = CHIP_FILTERS.filter((key) => filters[key] !== "Any");

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <HStack gap="3" flexWrap="wrap" align="center">
      {activeFilters.map((key) => (
        <Button
          key={key}
          variant="subtle"
          size="sm"
          gap="2"
          h="36px"
          px="3.5"
          borderRadius="8px"
          border="1px solid"
          borderColor="rgba(103, 198, 186, 0.25)"
          bg="rgba(18, 58, 61, 0.7)"
          color="accent.primary"
          fontSize="sm"
          fontWeight="500"
          _hover={{
            bg: "accent.subtle",
            borderColor: "accent.primary",
          }}
          onClick={() => onRemoveFilter(key)}
        >
          {filters[key]}

          <X size={14} strokeWidth={1.8} />
        </Button>
      ))}

      <Button
        variant="plain"
        size="sm"
        h="36px"
        px="2"
        color="fg.muted"
        fontSize="sm"
        _hover={{ color: "fg.heading" }}
        onClick={onClearFilters}
      >
        <Text as="span">Clear filters</Text>
      </Button>
    </HStack>
  );
}

export default AnimeListFiltersItems;


