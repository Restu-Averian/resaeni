import { SimpleGrid } from "@chakra-ui/react";
import HomePickCardItem from "./HomePickCardItem";

function HomePickCardsDesktop({ picks }) {
  return (
    <SimpleGrid columns={{ md: 3 }} gap={{ md: "7", xl: "8" }}>
      {picks.map((pick) => (
        <HomePickCardItem key={pick.id} pick={pick} />
      ))}
    </SimpleGrid>
  );
}

export default HomePickCardsDesktop;
