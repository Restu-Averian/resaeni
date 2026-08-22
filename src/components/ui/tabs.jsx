import { Tabs } from "@chakra-ui/react";

const triggerProps = {
  minH: { base: "12", md: "13" },
  px: { base: "3", md: "6" },
  py: { base: "3", md: "3.5" },
  color: "fg.muted",
  bg: "transparent",
  fontSize: { base: "sm", md: "md" },
  fontWeight: "500",
  lineHeight: "1.25",
  whiteSpace: "normal",
  borderBottom: "2px solid",
  borderBottomColor: "transparent",
};

/**
 * Reusable styled tabs built on Chakra UI's Tabs.
 *
 * @param {Object} props - Component props.
 * @param {string} props.value - Currently active tab value.
 * @param {function(string): void} props.onValueChange - Callback fired with the new tab value.
 * @param {Array<{value: string, label: string, content: import('react').ReactNode}>} props.tabs - Tab definitions.
 * @returns {import('react').ReactElement}
 */
export function TabsBar({ value, onValueChange, tabs }) {
  return (
    <Tabs.Root value={value} onValueChange={(e) => onValueChange(e.value)}>
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
        gridTemplateColumns={`repeat(${tabs.length}, minmax(0, 1fr))`}
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
        {tabs.map((tab) => (
          <Tabs.Trigger key={tab.value} value={tab.value} {...triggerProps}>
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {tabs.map((tab) => (
        <Tabs.Content key={tab.value} value={tab.value}>
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
