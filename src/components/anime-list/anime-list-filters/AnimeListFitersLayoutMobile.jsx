import { Box, Flex, Grid, Stack } from "@chakra-ui/react";
import AnimeListFiltersItems from "./AnimeListFiltersItems";
import AnimeListSearchInput from "../AnimeListSearchInput";
import { Select } from "../../ui/select";
import { useAnimeListFilters } from "../../../context/AnimeListFiltersContext";

function AnimeListFitersLayoutMobile() {
  const {
    filters,
    visibleFilters,
    orderFilter,
    mergedOptions,
    onFilterChange,
    onSearchChange,
    searchSlot,
  } = useAnimeListFilters();

  return (
    <Stack gap="3" w="full">
      <Flex gap="3" align="center" w="full">
        <Box flex="1" minW="0">
          {searchSlot || (
            <AnimeListSearchInput onSearchChange={onSearchChange} />
          )}
        </Box>

        {orderFilter && (
          <Box flexShrink="0">
            <Select
              prefixIcon={orderFilter.icon}
              prefixLabel={orderFilter.label}
              name={orderFilter.name}
              options={mergedOptions[orderFilter.name]}
              value={filters[orderFilter.name]}
              onChange={onFilterChange}
              showPrefixLabel={false}
              minH="48px"
            />
          </Box>
        )}
      </Flex>

      <Grid templateColumns="repeat(2, 1fr)" gap="3" w="full">
        {visibleFilters.map((filter) => (
          <Select
            key={filter.name}
            prefixIcon={filter.icon}
            prefixLabel={filter.label}
            name={filter.name}
            options={mergedOptions[filter.name]}
            value={filters[filter.name]}
            onChange={onFilterChange}
            showPrefixLabel={false}
            triggerWidth="100%"
            minH="48px"
            mobileDisplayLabel={filter.label}
          />
        ))}
      </Grid>

      <AnimeListFiltersItems />
    </Stack>
  );
}

export default AnimeListFitersLayoutMobile;
