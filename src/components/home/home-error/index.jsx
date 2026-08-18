import { Flex, Link, Icon } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router";
import { ArrowRight } from "lucide-react";
import HomeErrorHeroBanner from "./HomeErrorHeroBanner";
import HomeErrorPicksSection from "./HomeErrorPicksSection";

function HomeError({ error }) {
  return (
    <>
      <HomeErrorHeroBanner error={error} />

      <HomeErrorPicksSection />

      <Flex
        justify="center"
        mt={{ base: "8", md: "16" }}
        mb={{ base: "4", md: "8" }}
      >
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
      </Flex>
    </>
  );
}

export default HomeError;
