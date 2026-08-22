import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimeListFiltersContext } from "./AnimeListFiltersContext";
import {
  FILTER_OPTIONS,
  FILTERS_CONFIG,
} from "../constants/anime-list.constants";
import { getAnimeListOptions } from "../services/anime-list.service";

export default function AnimeListFiltersCtxProvider({
  children,
  filters,
  onFilterChange,
  onRemoveFilter,
  onClearFilters,
  onSearchChange,
  searchSlot,
}) {
  const { data: optionsData, isLoading } = useQuery({
    queryKey: ["anime-list-options"],
    queryFn: getAnimeListOptions,
  });

  const visibleFilters = useMemo(
    () => FILTERS_CONFIG.filter((filter) => filter.name !== "order"),
    [],
  );

  const orderFilter = useMemo(
    () => FILTERS_CONFIG.find((filter) => filter.name === "order"),
    [],
  );

  const mergedOptions = useMemo(
    () => ({
      ...FILTER_OPTIONS,
      genre: optionsData?.genre?.length
        ? optionsData.genre
        : FILTER_OPTIONS.genre,
      type: optionsData?.type?.length ? optionsData.type : FILTER_OPTIONS.type,
    }),
    [optionsData],
  );

  const value = useMemo(
    () => ({
      filters,
      onFilterChange,
      onRemoveFilter,
      onClearFilters,
      onSearchChange,
      searchSlot,
      visibleFilters,
      orderFilter,
      mergedOptions,
      isLoading,
    }),
    [
      filters,
      onFilterChange,
      onRemoveFilter,
      onClearFilters,
      onSearchChange,
      searchSlot,
      visibleFilters,
      orderFilter,
      mergedOptions,
      isLoading,
    ],
  );

  return (
    <AnimeListFiltersContext.Provider value={value}>
      {children}
    </AnimeListFiltersContext.Provider>
  );
}

export { AnimeListFiltersCtxProvider };
