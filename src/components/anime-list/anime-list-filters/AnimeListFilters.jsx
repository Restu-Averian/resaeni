import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import AnimeListFiltersItems from "./AnimeListFiltersItems";
import { Select } from "../../ui/select";
import { FILTER_OPTIONS, FILTERS_CONFIG } from "../../../constants/anime-list";

function AnimeListFilters({
  filters,
  onFilterChange,
  onRemoveFilter,
  onClearFilters,
}) {
  const visibleFilters = FILTERS_CONFIG.filter((filter) => filter.name !== "order");
  const orderFilter = FILTERS_CONFIG.find((filter) => filter.name === "order");

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
            <Box key={filter.name} w={{ base: "150px", md: "190px", lg: "180px" }} flexShrink="0">
              <Select
                prefixIcon={filter.icon}
                prefixLabel={filter.label}
                name={filter.name}
                options={FILTER_OPTIONS[filter.name]}
                value={filters[filter.name]}
                onChange={onFilterChange}
                triggerWidth="100%"
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
              options={FILTER_OPTIONS[orderFilter.name]}
              value={filters[orderFilter.name]}
              onChange={onFilterChange}
              prefixLabel={orderFilter.label}
              showPrefixLabel={false}
              triggerWidth={{ base: "126px", md: "156px", lg: "132px" }}
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
