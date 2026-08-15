import { Heading, Stack, Text } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Stack align="flex-start" gap={3}>
      <Heading as="h1" size="4xl">
        Resaeni
      </Heading>
      <Text color="fg.muted" fontSize="xl">
        Korean Animation / Aeni
      </Text>
    </Stack>
  );
}
