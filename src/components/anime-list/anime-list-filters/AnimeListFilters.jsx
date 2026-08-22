import { useBreakpointValue } from "@chakra-ui/react";
import AnimeListFiltersSkeleton from "../../skeletons/anime-list/AnimeListFiltersSkeleton";
import AnimeListFitersLayoutMobile from "./AnimeListFitersLayoutMobile";
import AnimeListFilterLayoutDesktop from "./AnimeListFilterLayoutDesktop";
import { useAnimeListFilters } from "../../../context/AnimeListFiltersContext";

function AnimeListFilters() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isLoading } = useAnimeListFilters();

  if (isLoading) {
    return <AnimeListFiltersSkeleton />;
  }

  return isMobile ? (
    <AnimeListFitersLayoutMobile />
  ) : (
    <AnimeListFilterLayoutDesktop />
  );
}

export default AnimeListFilters;

