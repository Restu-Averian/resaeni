import { Box, Flex, Stack } from "@chakra-ui/react";
import placeholderLandscape from "../../../assets/images/states/placeholder-landscape.webp";
import AnimeDetailsHeroPhoto from "./AnimeDetailsHeroPhoto";
import AnimeDetailsHeroInfo from "./AnimeDetailsHeroInfo";
import AnimeDetailsHeroGenre from "./AnimeDetailsHeroGenre";
import AnimeDetailsHeroAction from "./AnimeDetailsHeroAction";

function AnimeDetailsHero({ anime, onJumpToEpisodes }) {
  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      bgImage={`linear-gradient(90deg, rgba(3, 17, 31, 0.98) 0%, rgba(3, 17, 31, 0.88) 35%, rgba(3, 17, 31, 0.52) 70%, rgba(3, 17, 31, 0.82) 100%), linear-gradient(0deg, var(--resaeni-colors-bg-canvas) 0%, rgba(3, 17, 31, 0.08) 42%), url(${anime.banner_bg_img || anime.photo || placeholderLandscape})`}
      bgSize="cover"
      backgroundPosition="center"
      borderBottom="1px solid"
      borderColor="border.subtle"
    >
      <Flex
        maxW="1696px"
        mx="auto"
        px={{ base: "5", md: "12", xl: "clamp(4rem, 6vw, 10rem)" }}
        pt={{ base: "8", md: "12", lg: "16" }}
        pb={{ base: "10", md: "14", lg: "16" }}
        gap={{ base: "7", md: "10", xl: "14" }}
        direction={{ base: "column", md: "row" }}
        align={{ base: "stretch", md: "center" }}
      >
        <AnimeDetailsHeroPhoto anime={anime} />

        <Stack
          maxW="840px"
          gap={{ base: "4", md: "5" }}
          justify="center"
          py={{ base: "0", md: "4" }}
        >
          <AnimeDetailsHeroInfo anime={anime} />

          <AnimeDetailsHeroGenre anime={anime} />

          <AnimeDetailsHeroAction
            anime={anime}
            onJumpToEpisodes={onJumpToEpisodes}
          />
        </Stack>
      </Flex>
    </Box>
  );
}

export default AnimeDetailsHero;
