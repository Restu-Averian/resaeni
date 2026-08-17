import { SimpleGrid } from "@chakra-ui/react";
import AnimeListDatasItemSkeleton from "./AnimeListDatasItemSkeleton";

function AnimeListDatasSkeleton() {
  const skeletons = Array.from({ length: 3 }, (_, i) => i);

  return (
    <SimpleGrid
      minChildWidth={{ base: "140px", md: "180px", lg: "220px", xl: "260px" }}
      gap={{ base: "3", md: "4", xl: "5" }}
    >
      {skeletons.map((i) => (
        <AnimeListDatasItemSkeleton key={i} />
      ))}
    </SimpleGrid>
  );
}

export default AnimeListDatasSkeleton;
