import { Box, Stack } from "@chakra-ui/react";
import HomeHeroBannerCopy from "./HomeHeroBannerCopy";

function HomeHeroBanner({ hero }) {
  const contentMaxW = "1696px";

  return (
    <Box
      as="section"
      minH={{ base: "620px", md: "560px" }}
      overflow="hidden"
      position="relative"
      bgImage={{
        base: `linear-gradient(180deg, rgba(3, 17, 31, 0.08) 0%, rgba(3, 17, 31, 0.24) 32%, rgba(3, 17, 31, 0.92) 72%, var(--resaeni-colors-bg-canvas) 100%), linear-gradient(90deg, rgba(3, 17, 31, 0.7) 0%, rgba(3, 17, 31, 0.18) 58%, rgba(3, 17, 31, 0.54) 100%), url(${hero?.banner_bg_img})`,
        md: `linear-gradient(180deg, rgba(3, 17, 31, 0.04) 0%, rgba(3, 17, 31, 0.16) 36%, rgba(3, 17, 31, 0.9) 76%, var(--resaeni-colors-bg-canvas) 100%), linear-gradient(90deg, rgba(3, 17, 31, 0.76) 0%, rgba(3, 17, 31, 0.16) 58%, rgba(3, 17, 31, 0.42) 100%), url(${hero?.banner_bg_img})`,
      }}
      backgroundPosition={{
        base: "center, center, center",
        md: "center top, center top, center top",
      }}
      bgRepeat="no-repeat, no-repeat, no-repeat"
      bgSize="cover, cover, cover"
      className="xx"
    >
      <Stack
        align="flex-start"
        justify={{ base: "flex-end", md: "flex-start" }}
        minH={{ base: "620px", md: "560px" }}
        maxW={contentMaxW}
        mx="auto"
        px={{ base: "5", md: "12", xl: "clamp(4rem, 6vw, 10rem)" }}
        pt={{ base: "80px", md: "24" }}
        pb={{ base: "12", md: "16" }}
      >
        <HomeHeroBannerCopy
          hero={hero}
          titleSize={{ base: "6xl", md: "7xl", xl: "8xl" }}
        />
      </Stack>
    </Box>
  );
}

export default HomeHeroBanner;
