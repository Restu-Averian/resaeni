import { Grid } from "@chakra-ui/react";
import AnimeListDatasItem from "./AnimeListDatasItem";

function AnimeListDatas({ anime }) {
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
      {anime.map((item) => (
        <AnimeListDatasItem key={item.id} anime={item} />
      ))}
    </Grid>
  );
}

export default AnimeListDatas;
