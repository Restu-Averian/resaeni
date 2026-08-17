import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router";
import Seo from "../components/global/Seo";

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page Not Found | Resaeni"
        robots="noindex, nofollow"
      />
      <Stack align="flex-start" gap={4}>
        <Heading as="h1" size="2xl">
          Page not found
        </Heading>
        <Text color="fg.muted">The page you requested does not exist.</Text>
        <Button asChild>
          <Link to="/">Back to Resaeni</Link>
        </Button>
      </Stack>
    </>
  );
}
