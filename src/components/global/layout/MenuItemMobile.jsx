import { Flex, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router";
import { NAV_ITEMS } from "../../../constants/navbar.constants";
import { isNavItemActive } from "../../../helpers/navbar.utils";

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
      {NAV_ITEMS.map((item) => {
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

export default MenuItemMobile;
