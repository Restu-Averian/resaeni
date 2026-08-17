import { Grid } from "@chakra-ui/react";
import AnimeListDatasItemSkeleton from "./AnimeListDatasItemSkeleton";

function AnimeListDatasSkeleton() {
  const skeletons = Array.from({ length: 3 }, (_, i) => i);

  return (
    <Grid
      gridTemplateColumns={{
        base: "repeat(auto-fill, minmax(140px, 1fr))",
        md: "repeat(auto-fill, minmax(180px, 1fr))",
        lg: "repeat(auto-fill, minmax(220px, 1fr))",
        xl: "repeat(auto-fill, minmax(260px, 1fr))",
      }}
      gap={{ base: "3", md: "4", xl: "5" }}
    >
      {skeletons.map((i) => (
        <AnimeListDatasItemSkeleton key={i} />
      ))}
    </Grid>
  );
}

export default AnimeListDatasSkeleton;
