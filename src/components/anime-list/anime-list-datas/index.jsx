import { SimpleGrid } from "@chakra-ui/react";
import AnimeListDatasItem from "./AnimeListDatasItem";

function AnimeListDatas({ anime }) {
  return (
    <SimpleGrid
      minChildWidth={{ base: "140px", md: "180px", lg: "220px", xl: "260px" }}
      gap={{ base: "3", md: "4", xl: "5" }}
    >
      {anime.map((item) => (
        <AnimeListDatasItem key={item.id} anime={item} />
      ))}
    </SimpleGrid>
  );
}

export default AnimeListDatas;
