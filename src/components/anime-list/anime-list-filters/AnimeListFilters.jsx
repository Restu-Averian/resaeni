import { Grid, Stack, Box } from "@chakra-ui/react";
import AnimeListFiltersItems from "./AnimeListFiltersItems";
import { Select } from "../../ui/select";
import { FILTER_OPTIONS, FILTERS_CONFIG } from "../../../constants/anime-list";

function AnimeListFilters({
  filters,
  onFilterChange,
  onRemoveFilter,
  onClearFilters,
}) {
  return (
    <Stack gap="4">
      <Grid
        templateColumns={{
          base: "max-content",
          sm: "repeat(2, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        autoFlow={{ base: "column", sm: "row" }}
        gap="3"
        overflowX={{ base: "auto", sm: "visible" }}
        css={{ scrollbarWidth: "none" }}
      >
        {FILTERS_CONFIG?.map((filter) => (
          <Box key={filter.name} w={{ base: "180px", sm: "auto" }}>
            <Select
              prefixIcon={filter.icon}
              prefixLabel={filter.label}
              name={filter.name}
              options={FILTER_OPTIONS[filter.name]}
              value={filters[filter.name]}
              onChange={onFilterChange}
            />
          </Box>
        ))}
      </Grid>

      <AnimeListFiltersItems
        filters={filters}
        onRemove={onRemoveFilter}
        onClear={onClearFilters}
      />
    </Stack>
  );
}

export default AnimeListFilters;
