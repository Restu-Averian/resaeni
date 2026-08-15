import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <Container maxW="5xl" minH="100dvh" py={{ base: 10, md: 16 }}>
      <Outlet />
    </Container>
  );
}
