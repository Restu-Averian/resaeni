import { TabsBar } from "../ui/tabs";

/**
 * Anime details tabs wrapping the global TabsBar with fixed tab set.
 *
 * @param {Object} props - Component props.
 * @param {string} props.activeTab - Currently active tab value.
 * @param {function(string): void} props.onTabChange - Callback fired with the new tab value.
 * @param {import('react').ReactNode} props.overviewContent - Content for the overview tab.
 * @param {import('react').ReactNode} props.charactersContent - Content for the characters tab.
 * @returns {import('react').ReactElement}
 */
function AnimeDetailsTabs({
  activeTab,
  onTabChange,
  overviewContent,
  charactersContent,
}) {
  return (
    <TabsBar
      value={activeTab}
      onValueChange={onTabChange}
      tabs={[
        {
          value: "overview",
          label: "Overview & Episodes",
          content: overviewContent,
        },
        {
          value: "characters",
          label: "Characters & Voice Cast",
          content: charactersContent,
        },
      ]}
    />
  );
}

export default AnimeDetailsTabs;
