import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import AnimeListFiltersItems from "./AnimeListFiltersItems";
import { Select } from "../../ui/select";
import { useAnimeListFilters } from "../../../context/AnimeListFiltersContext";

function AnimeListFilterLayoutDesktop() {
  const {
    filters,
    visibleFilters,
    orderFilter,
    mergedOptions,
    onFilterChange,
  } = useAnimeListFilters();

  return (
    <Stack gap="4" w="full">
      <Flex
        align="center"
        justify="space-between"
        gap="5"
        borderBottom="1px solid"
        borderColor="border.subtle"
        pb="4"
      >
        <HStack gap="4" flex="1" minW="0" overflowX="visible">
          {visibleFilters.map((filter) => (
            <Box key={filter.name} flexShrink="0">
              <Select
                prefixIcon={filter.icon}
                prefixLabel={filter.label}
                name={filter.name}
                options={mergedOptions[filter.name]}
                value={filters[filter.name]}
                onChange={onFilterChange}
                minH="48px"
              />
            </Box>
          ))}
        </HStack>

        {orderFilter && (
          <HStack gap="3" flexShrink="0">
            <Text color="fg.muted" fontSize="sm">
              Sort:
            </Text>

            <Select
              name={orderFilter.name}
              options={mergedOptions[orderFilter.name]}
              value={filters[orderFilter.name]}
              onChange={onFilterChange}
              prefixLabel={orderFilter.label}
              showPrefixLabel={false}
              minH="48px"
            />
          </HStack>
        )}
      </Flex>

      <AnimeListFiltersItems />
    </Stack>
  );
}

export default AnimeListFilterLayoutDesktop;

