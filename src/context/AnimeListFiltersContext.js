import { createContext, useContext } from "react";

/**
 * @typedef {Object} FilterItemConfig
 * @property {string} name - The identifier of the filter.
 * @property {string} label - The display label of the filter.
 * @property {import("lucide-react").LucideIcon} icon - The icon component for the filter.
 */

/**
 * @typedef {Object} AnimeListFiltersState
 * @property {string} genre - Selected genre filter.
 * @property {string} type - Selected type/format filter.
 * @property {string} order - Selected sort/order filter.
 */

/**
 * @typedef {Object} AnimeListFilterOptions
 * @property {string[]} genre - Available genre options.
 * @property {string[]} type - Available format/type options.
 * @property {string[]} order - Available order/sort options.
 */

/**
 * @typedef {Object} AnimeListFiltersContextValue
 * @property {AnimeListFiltersState} filters - Current active filter values.
 * @property {(name: string, value: string) => void} onFilterChange - Callback when a filter value changes.
 * @property {(name: string) => void} onRemoveFilter - Callback to reset/remove a single filter.
 * @property {() => void} onClearFilters - Callback to clear all active filters.
 * @property {(value: string) => void} [onSearchChange] - Callback when search term changes.
 * @property {import("react").ReactNode} [searchSlot] - Custom slot component for search input.
 * @property {FilterItemConfig[]} visibleFilters - List of filter configurations excluding order.
 * @property {FilterItemConfig | undefined} orderFilter - Configuration for the order/sort filter.
 * @property {AnimeListFilterOptions} mergedOptions - Merged static and API-fetched filter options.
 * @property {boolean} isLoading - Loading status of filter options from API.
 */

/**
 * Context for managing anime list filters, search, and options state.
 * @type {import("react").Context<AnimeListFiltersContextValue | null>}
 */
export const AnimeListFiltersContext = createContext(null);

/**
 * Custom hook to access the AnimeListFiltersContext.
 *
 * @returns {AnimeListFiltersContextValue} The anime list filters context value.
 * @throws {Error} If called outside of an AnimeListFiltersCtxProvider.
 */
export function useAnimeListFilters() {
  const context = useContext(AnimeListFiltersContext);
  if (!context) {
    throw new Error(
      "useAnimeListFilters must be used within AnimeListFiltersCtxProvider",
    );
  }
  return context;
}

