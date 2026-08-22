import { useState, useCallback } from "react";
import { Box, Container, Flex, Stack, Text, Center } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import AnimeListHeader from "../components/anime-list/AnimeListHeader";
import AnimeListSearchInput from "../components/anime-list/AnimeListSearchInput";
import AnimeListFilters from "../components/anime-list/anime-list-filters/AnimeListFilters";
import AnimeListDatas from "../components/anime-list/anime-list-datas";
import AnimeListDatasSkeleton from "../components/skeletons/anime-list/AnimeListDatasSkeleton";
import AnimeListPagination from "../components/anime-list/AnimeListPagination";
import AnimeListPaginationSkeleton from "../components/skeletons/anime-list/AnimeListPaginationSkeleton";
import {
  DEFAULT_FILTERS,
  ORDER_VALUE_MAP,
  LIMIT,
} from "../constants/anime-list.constants";
import { getAnimeList } from "../services/anime-list.service";
import Seo from "../components/global/Seo";
import AnimeListFiltersCtxProvider from "../context/AnimeListFiltersCtxProvider";

function AnimeListPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const handleSearchChange = useCallback((value) => {
    setSearch(value);
    setPage(1);
  }, []);

  const updateFilter = useCallback((name, value) => {
    setFilters((current) => ({ ...current, [name]: value }));
    setPage(1);
  }, []);

  const removeFilter = useCallback((name) => {
    setFilters((current) => ({ ...current, [name]: "Any" }));
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  const params = {
    search: search || undefined,
    genre: filters.genre === "Any" ? undefined : filters.genre,
    type: filters.type === "Any" ? undefined : filters.type,
    order: ORDER_VALUE_MAP[filters.order] ?? "highest_rated",
    page,
    limit: LIMIT,
  };

  const {
    data: animeData,
    isPending: isLoadingAnimeList,
    isError,
    error,
  } = useQuery({
    queryKey: ["anime-list", params],
    queryFn: () => getAnimeList(params),
  });

  return (
    <>
      <Seo
        title="Aeni Library | Resaeni"
        description="Browse Korean animated series and films in the Resaeni Aeni library."
        canonicalPath="/anime"
      />

      <Box minH="100vh" bg="bg.canvas" pb={{ base: "28", md: "12" }}>
        <Container maxW="1920px" px="0" py="0">
          <Stack
            gap={{ base: "7", md: "8" }}
            maxW="1696px"
            w="full"
            mx="auto"
            px={{ base: "5", md: "12", xl: "clamp(4rem, 6vw, 10rem)" }}
            py={{ base: "7", md: "10" }}
          >
            <Box display={{ base: "block", lg: "none" }}>
              <AnimeListHeader />
            </Box>

            <Stack
              position={{ base: "sticky", lg: "static" }}
              top={{ base: "86px", md: "72px", lg: "auto" }}
              zIndex="10"
              bg="bg.canvas"
              gap={{ base: "4", md: "8" }}
              pt={{ base: "2", lg: "0" }}
              pb={{ base: "4", lg: "2" }}
              mx={{ base: "-5", md: "-12", lg: "0" }}
              px={{ base: "5", md: "12", lg: "0" }}
            >
              <Flex
                align={{ base: "stretch", lg: "end" }}
                justify="space-between"
                direction={{ base: "column", lg: "row" }}
                gap="6"
                display={{ base: "none", lg: "flex" }}
              >
                <AnimeListHeader />

                <AnimeListSearchInput onSearchChange={handleSearchChange} />
              </Flex>

              <AnimeListFiltersCtxProvider
                filters={filters}
                onFilterChange={updateFilter}
                onRemoveFilter={removeFilter}
                onClearFilters={clearFilters}
                onSearchChange={handleSearchChange}
              >
                <AnimeListFilters />
              </AnimeListFiltersCtxProvider>
            </Stack>

            {isError ? (
              <Center py="20">
                <Text color="fg.error">
                  {error?.response?.data?.error?.message ||
                    "Failed to load anime."}
                </Text>
              </Center>
            ) : isLoadingAnimeList ? (
              <>
                <AnimeListDatasSkeleton />

                <AnimeListPaginationSkeleton />
              </>
            ) : animeData?.items?.length === 0 ? (
              <Center py="20">
                <Text color="fg.muted">No anime found.</Text>
              </Center>
            ) : (
              <>
                <AnimeListDatas anime={animeData?.items ?? []} />

                <AnimeListPagination
                  pagination={animeData?.pagination}
                  onPageChange={setPage}
                />
              </>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default AnimeListPage;
