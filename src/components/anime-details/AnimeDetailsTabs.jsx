import { Tabs } from "@chakra-ui/react";

function AnimeDetailsTabs({
  activeTab,
  onTabChange,
  overviewContent,
  charactersContent,
}) {
  return (
    <Tabs.Root value={activeTab} onValueChange={(e) => onTabChange(e.value)}>
      <Tabs.List
        position="sticky"
        top={{ base: "90px", md: "76px" }}
        zIndex="10"
        bg="rgba(7, 29, 47, 0.72)"
        border="1px solid"
        borderColor="border.default"
        borderRadius="control"
        backdropFilter="blur(14px)"
        overflow="hidden"
        display="grid"
        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
        w="full"
        css={{
          '& [role="tab"][aria-selected="true"]': {
            color: "var(--resaeni-colors-accent-primary)",
            background: "rgba(18, 58, 61, 0.28)",
            borderBottomColor: "var(--resaeni-colors-accent-primary)",
          },
          '& [role="tab"][aria-selected="true"]:hover': {
            color: "var(--resaeni-colors-accent-primary)",
            background: "rgba(18, 58, 61, 0.28)",
          },
          '& [role="tab"][aria-selected="true"]::before': {
            background: "var(--resaeni-colors-accent-primary)",
          },
          '& [role="tab"]:hover:not([aria-selected="true"])': {
            color: "var(--resaeni-colors-fg-default)",
            background: "var(--resaeni-colors-bg-surface)",
          },
        }}
      >
        <Tabs.Trigger
          value="overview"
          minH={{ base: "12", md: "13" }}
          px={{ base: "3", md: "6" }}
          py={{ base: "3", md: "3.5" }}
          color="fg.muted"
          bg="transparent"
          fontSize={{ base: "sm", md: "md" }}
          fontWeight="500"
          lineHeight="1.25"
          whiteSpace="normal"
          borderBottom="2px solid"
          borderBottomColor="transparent"
        >
          Overview & Episodes
        </Tabs.Trigger>

        <Tabs.Trigger
          value="characters"
          minH={{ base: "12", md: "13" }}
          px={{ base: "3", md: "6" }}
          py={{ base: "3", md: "3.5" }}
          color="fg.muted"
          bg="transparent"
          fontSize={{ base: "sm", md: "md" }}
          fontWeight="500"
          lineHeight="1.25"
          whiteSpace="normal"
          borderBottom="2px solid"
          borderBottomColor="transparent"
        >
          Characters & Voice Cast
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="overview">{overviewContent}</Tabs.Content>

      <Tabs.Content value="characters">{charactersContent}</Tabs.Content>
    </Tabs.Root>
  );
}

export default AnimeDetailsTabs;
