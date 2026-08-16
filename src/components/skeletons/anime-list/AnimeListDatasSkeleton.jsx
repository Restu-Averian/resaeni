import { SimpleGrid } from "@chakra-ui/react";
import AnimeListDatasItemSkeleton from "./AnimeListDatasItemSkeleton";

function AnimeListDatasSkeleton() {
  const skeletons = Array.from({ length: 8 }, (_, i) => i);

  return (
    <SimpleGrid
      columns={{ base: 2, lg: 4 }}
      gap={{ base: "3", md: "4", xl: "5" }}
    >
      {skeletons.map((i) => (
        <AnimeListDatasItemSkeleton key={i} />
      ))}
    </SimpleGrid>
  );
}

export default AnimeListDatasSkeleton;
