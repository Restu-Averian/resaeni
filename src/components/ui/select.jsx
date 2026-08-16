import {
  Box,
  Grid,
  Select as ChakraSelect,
  Text,
  createListCollection,
  useBreakpointValue,
  Drawer,
  Input,
  VStack,
} from "@chakra-ui/react";
import { ChevronDown, Search as SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";

/**
 * Reusable select component utilizing Chakra UI's Select.
 * Supports a custom layout with an optional prefix icon and label.
 *
 * @param {Object} props - Component props.
 * @param {import('react').ElementType} [props.prefixIcon] - Icon component to display on the left.
 * @param {string} [props.prefixLabel] - Label text to display next to the icon.
 * @param {string} props.name - Name of the select field.
 * @param {Array<string|{label: string, value: string}>} props.options - Array of options for the dropdown.
 * @param {string} props.value - Currently selected value.
 * @param {function(string, string): void} props.onChange - Callback fired when value changes. Receives name and new value.
 * @returns {import('react').ReactElement}
 */
export function Select({
  prefixIcon: Icon,
  prefixLabel,
  name,
  options,
  value,
  onChange,
}) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const collection = useMemo(
    () =>
      createListCollection({
        items: options.map((option) =>
          typeof option === "string"
            ? { label: option, value: option }
            : option,
        ),
      }),
    [options],
  );

  const filteredItems = useMemo(
    () =>
      collection.items.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase()),
      ),
    [collection.items, search],
  );

  const selectedLabel = collection.items.find(
    (item) => item.value === value,
  )?.label;

  const triggerContent = (
    <Grid
      position="relative"
      templateColumns="auto auto auto auto"
      w="fit-content"
      alignItems="center"
      gap="3"
      minH="58px"
      px="4"
      border="1px solid"
      borderColor="border.default"
      borderRadius="control"
      bg="bg.surface"
      cursor="pointer"
      onClick={() => isMobile && setIsOpen(true)}
      _focusVisible={{
        outline: "2px solid",
        outlineColor: "accent.primary",
        outlineOffset: "-1px",
      }}
    >
      <Box color="accent.primary">
        {Icon && <Icon size={19} strokeWidth={1.55} />}
      </Box>

      <Text color="fg.muted" fontSize="sm">
        {prefixLabel}
      </Text>

      <Box
        color="fg.heading"
        fontSize="sm"
        fontWeight="500"
        pr="1"
        textAlign="left"
        whiteSpace="nowrap"
      >
        {isMobile ? (
          value ? (
            selectedLabel
          ) : (
            prefixLabel
          )
        ) : (
          <ChakraSelect.ValueText placeholder={prefixLabel} />
        )}
      </Box>

      <Box color="fg.subtle" pointerEvents="none">
        <ChevronDown size={17} strokeWidth={1.5} />
      </Box>
    </Grid>
  );

  if (isMobile) {
    return (
      <>
        {triggerContent}

        <Drawer.Root
          placement="bottom"
          open={isOpen}
          onOpenChange={(e) => setIsOpen(e.open)}
        >
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content borderTopRadius="xl" maxH="80vh">
              <Drawer.Body p="4" display="flex" flexDirection="column" gap="4">
                <Box position="relative" flexShrink={0}>
                  <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    pl="10"
                    bg="bg.surface"
                    border="1px solid"
                    borderColor="border.subtle"
                    borderRadius="md"
                    color="fg.heading"
                  />
                  <Box
                    position="absolute"
                    top="50%"
                    left="3"
                    transform="translateY(-50%)"
                    color="fg.muted"
                  >
                    <SearchIcon size={16} />
                  </Box>
                </Box>
                <VStack
                  align="stretch"
                  overflowY="auto"
                  gap="2"
                  pb="4"
                  flex="1"
                >
                  {filteredItems.map((item) => (
                    <Box
                      key={item.value}
                      p="3"
                      borderRadius="md"
                      bg={
                        item.value === value ? "accent.subtle" : "transparent"
                      }
                      color={
                        item.value === value ? "accent.primary" : "fg.heading"
                      }
                      fontSize="sm"
                      fontWeight="500"
                      onClick={() => {
                        onChange(name, item.value);
                        setIsOpen(false);
                        setSearch("");
                      }}
                    >
                      {item.label}
                    </Box>
                  ))}
                  {filteredItems.length === 0 && (
                    <Text
                      color="fg.muted"
                      fontSize="sm"
                      textAlign="center"
                      py="4"
                    >
                      No options found
                    </Text>
                  )}
                </VStack>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Root>
      </>
    );
  }

  return (
    <ChakraSelect.Root
      collection={collection}
      name={name}
      value={[value]}
      onValueChange={(e) => onChange(name, e.value[0])}
    >
      <ChakraSelect.Trigger asChild>{triggerContent}</ChakraSelect.Trigger>

      <ChakraSelect.Positioner>
        <ChakraSelect.Content>
          {collection.items.map((item) => (
            <ChakraSelect.Item item={item} key={item.value}>
              {item.label}
            </ChakraSelect.Item>
          ))}
        </ChakraSelect.Content>
      </ChakraSelect.Positioner>
    </ChakraSelect.Root>
  );
}
