import {
  Box,
  Container,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link as RouterLink } from "react-router";
import { ArrowRight } from "lucide-react";
import HomeHeroBanner from "../components/home/home-hero-banner";
import HomePicksSection from "../components/home/home-picks";
import HomeSkeleton from "../components/skeletons/home";
import Seo from "../components/global/Seo";
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
        title="Resaeni — Korean Animation & Aeni"
        description="Discover and watch curated Korean animation and Aeni on Resaeni."
        canonicalPath="/"
        robots="index, follow"
        image={seoImage}
      />
      <Box bg="bg.canvas">
      <Container maxW="100%" px="0" py="0">
        <Stack gap={{ base: "8", md: "0" }}>
          {error && (
            <Box
              mx={{ base: "5", md: "24" }}
              p="4"
              bg="red.500"
              color="white"
              borderRadius="md"
            >
              <Text>Failed to load data: {error?.message}</Text>
            </Box>
          )}

          {isLoading ? (
            <HomeSkeleton />
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
                  _hover={{ textDecoration: "none", color: "accent.secondary" }}
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
