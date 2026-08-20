import { Box, Container, Flex, Icon, Link, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link as RouterLink } from "react-router";
import { ArrowRight } from "lucide-react";
import HomeHeroBanner from "../components/home/home-hero-banner";
import HomePicksSection from "../components/home/home-picks";
import HomeError from "../components/home/home-error";
import HomeSkeleton from "../components/skeletons/home";
import JsonLd from "../components/global/JsonLd";
import Seo from "../components/global/Seo";
import { buildWebsiteSchema } from "../lib/seo";
import { getHomeData } from "../services/home.service";

function HomePage() {
  const {
    data: homeData,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["home"],
    queryFn: getHomeData,
  });

  const seoImage = homeData?.featured?.banner_bg_img;

  return (
    <>
      <Seo
        title="Resaeni — Discover Korean Animation & Aeni"
        description="Resaeni is a curated place to discover and watch Korean animation and Aeni."
        canonicalPath="/"
        image={seoImage}
        imageAlt="Featured Aeni artwork on Resaeni"
      />
      <JsonLd data={buildWebsiteSchema()} />

      <Box bg="bg.canvas">
        <Container maxW="100%" px="0" py="0">
          <Stack gap={{ base: "8", md: "0" }}>
            {isLoading ? (
              <HomeSkeleton />
            ) : error ? (
              <HomeError error={error} />
            ) : (
              <>
                {homeData?.featured &&
                  Object.keys(homeData.featured).length > 0 && (
                    <HomeHeroBanner hero={homeData.featured} />
                  )}

                {homeData?.tonights_picks &&
                  homeData.tonights_picks.length > 0 && (
                    <HomePicksSection picks={homeData.tonights_picks} />
                  )}

                <Flex
                  align="center"
                  gap="4"
                  mt={{ base: "8", md: "16" }}
                  mb={{ base: "4", md: "8" }}
                  maxW="4xl"
                  mx="auto"
                  w="full"
                  px="6"
                >
                  <Box
                    flex="1"
                    h="1px"
                    bgGradient="linear(to-r, transparent, whiteAlpha.200)"
                  />

                  <Link
                    as={RouterLink}
                    to="/anime"
                    color="accent.primary"
                    display="flex"
                    alignItems="center"
                    gap="2"
                    fontSize="lg"
                    _hover={{
                      textDecoration: "none",
                      color: "accent.secondary",
                    }}
                  >
                    Browse all Aeni <Icon as={ArrowRight} boxSize="5" />
                  </Link>

                  <Box
                    flex="1"
                    h="1px"
                    bgGradient="linear(to-l, transparent, whiteAlpha.200)"
                  />
                </Flex>
              </>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default HomePage;
