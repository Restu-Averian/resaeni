import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import AnimeListFiltersItems from "./AnimeListFiltersItems";
import { Select } from "../../ui/select";
import {
  FILTER_OPTIONS,
  FILTERS_CONFIG,
} from "../../../constants/anime-list.constants";
import { getAnimeListOptions } from "../../../services/anime-list.service";

function AnimeListFilters({
  filters,
  onFilterChange,
  onRemoveFilter,
  onClearFilters,
}) {
  const visibleFilters = FILTERS_CONFIG.filter(
    (filter) => filter.name !== "order",
  );
  const orderFilter = FILTERS_CONFIG.find((filter) => filter.name === "order");

  const { data: optionsData } = useQuery({
    queryKey: ["anime-list-options"],
    queryFn: getAnimeListOptions,
  });

  const mergedOptions = {
    ...FILTER_OPTIONS,
    genre: optionsData?.genre?.length
      ? optionsData.genre
      : FILTER_OPTIONS.genre,
    type: optionsData?.type?.length ? optionsData.type : FILTER_OPTIONS.type,
  };

  return (
    <Stack gap="4">
      <Flex
        align="center"
        justify="space-between"
        gap={{ base: "3", lg: "5" }}
        borderBottom={{ base: "0", lg: "1px solid" }}
        borderColor="border.subtle"
        pb={{ base: "0", lg: "4" }}
      >
        <HStack
          gap={{ base: "2", lg: "4" }}
          flex="1"
          minW="0"
          overflowX={{ base: "auto", lg: "visible" }}
          css={{ scrollbarWidth: "none" }}
        >
          {visibleFilters.map((filter) => (
            <Box
              key={filter.name}
              flexShrink="0"
            >
              <Select
                prefixIcon={filter.icon}
                prefixLabel={filter.label}
                name={filter.name}
                options={mergedOptions[filter.name]}
                value={filters[filter.name]}
                onChange={onFilterChange}
                minH={{ base: "56px", lg: "48px" }}
              />
            </Box>
          ))}
        </HStack>

        {orderFilter && (
          <HStack gap={{ base: "2", lg: "3" }} flexShrink="0">
            <Text color="fg.muted" fontSize={{ base: "md", lg: "sm" }}>
              Sort:
            </Text>

            <Select
              name={orderFilter.name}
              options={mergedOptions[orderFilter.name]}
              value={filters[orderFilter.name]}
              onChange={onFilterChange}
              prefixLabel={orderFilter.label}
              showPrefixLabel={false}
              minH={{ base: "56px", lg: "48px" }}
            />
          </HStack>
        )}
      </Flex>

      <AnimeListFiltersItems
        filters={filters}
        onRemove={onRemoveFilter}
        onClear={onClearFilters}
      />
    </Stack>
  );
}

export default AnimeListFilters;
