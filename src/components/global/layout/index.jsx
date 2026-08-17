import { Box, useBreakpointValue } from "@chakra-ui/react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import MenuItemMobile from "./MenuItemMobile";

export default function Layout() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box minH="100vh" bg="bg.canvas" pb={{ base: "92px", md: "0" }}>
      <Navbar />

      <Outlet />

      {isMobile && <MenuItemMobile />}
    </Box>
  );
}
