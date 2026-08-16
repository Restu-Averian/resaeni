import { Box, Container, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { Home, List } from "lucide-react";
import { Link as RouterLink, Outlet, useLocation } from "react-router";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Anime List", href: "/anime", icon: List },
];

const isNavItemActive = (pathname, href) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);

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
      <Container maxW="1600px" px={{ base: "5", xl: "10" }}>
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
            {navItems.map((item) => {
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

function MenuItemMobile() {
  const { pathname } = useLocation();

  return (
    <Flex
      as="nav"
      display={{ base: "grid", md: "none" }}
      gridTemplateColumns="repeat(2, 1fr)"
      position="fixed"
      zIndex="sticky"
      left="4"
      right="4"
      bottom="3"
      h="78px"
      overflow="hidden"
      border="1px solid"
      borderColor="border.default"
      borderRadius="panel"
      bg="rgba(4, 24, 41, 0.94)"
      boxShadow="panel"
      backdropFilter="blur(12px)"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = isNavItemActive(pathname, item.href);

        return (
          <Link
            key={item.label}
            as={RouterLink}
            to={item.href}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="1"
            color={isActive ? "accent.primary" : "fg.heading"}
            bg={isActive ? "accent.subtle" : "transparent"}
            fontFamily="heading"
            fontSize="md"
            lineHeight="1"
            textDecoration="none"
            _hover={{ color: "accent.hover", textDecoration: "none" }}
          >
            <Icon size={25} strokeWidth={1.6} />
            <Text as="span">{item.label}</Text>
          </Link>
        );
      })}
    </Flex>
  );
}

export default function Layout() {
  return (
    <Box minH="100vh" bg="bg.canvas" pb={{ base: "92px", md: "0" }}>
      <Navbar />
      <Outlet />
      <MenuItemMobile />
    </Box>
  );
}
