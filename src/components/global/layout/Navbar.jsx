import { Box, Container, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { NAV_ITEMS } from "../../../constants/navbar.constants";
import { isNavItemActive } from "../../../helpers/navbar.utils";
import { Link as RouterLink } from "react-router";
import { useLocation } from "react-router";

function Navbar() {
  const { pathname } = useLocation();

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="sticky"
      borderBottom="1px solid"
      borderColor={{ base: "transparent", md: "border.default" }}
      bg="bg.subtle"
    >
      <Container
        maxW="1696px"
        px={{ base: "5", md: "12", xl: "clamp(3rem, 4vw, 7rem)" }}
      >
        <Flex
          align="center"
          justify="space-between"
          minH={{ base: "86px", md: "72px" }}
          gap="8"
        >
          <Text
            as={RouterLink}
            to="/"
            textStyle="display"
            fontSize={{ base: "4xl", md: "4xl" }}
            color="fg.heading"
            lineHeight="1"
            textDecoration="none"
            _hover={{ color: "fg.heading", textDecoration: "none" }}
          >
            Resaeni
          </Text>

          <HStack as="nav" display={{ base: "none", md: "flex" }} gap="9">
            {NAV_ITEMS.map((item) => {
              const isActive = isNavItemActive(pathname, item.href);

              return (
                <Link
                  as={RouterLink}
                  to={item.href}
                  key={item.label}
                  position="relative"
                  color={isActive ? "accent.primary" : "fg.heading"}
                  fontFamily="heading"
                  fontSize={{ base: "md", md: "xl" }}
                  lineHeight="1"
                  textDecoration="none"
                  _hover={{ color: "accent.hover", textDecoration: "none" }}
                  _after={{
                    content: '""',
                    position: "absolute",
                    left: "0",
                    right: "0",
                    bottom: "-18px",
                    h: "1px",
                    bg: isActive ? "accent.primary" : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

export default Navbar;
