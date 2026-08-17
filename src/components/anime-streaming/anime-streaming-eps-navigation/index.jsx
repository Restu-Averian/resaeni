import { Grid } from "@chakra-ui/react";
import AnimeStreamingEpsNavigationEpsNum from "./AnimeStreamingEpsNavigationEpsNum";
import AnimeStreamingEpsNavigationMain from "./AnimeStreamingEpsNavigationMain";

function AnimeStreamingEpisodeNavigation({ episode }) {
  return (
    <Grid
      templateColumns={{ base: "1fr auto 1fr", md: "1fr 1fr 1fr" }}
      alignItems="center"
      gap={{ base: "4", md: "6" }}
      py={{ base: "4", md: "5" }}
    >
      <AnimeStreamingEpsNavigationEpsNum
        episode={episode}
        direction="previous"
      />

      <AnimeStreamingEpsNavigationMain episode={episode} />

      <AnimeStreamingEpsNavigationEpsNum episode={episode} direction="next" />
    </Grid>
  );
}

export default AnimeStreamingEpisodeNavigation;
