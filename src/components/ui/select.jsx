import {
  Box,
  Flex,
  HStack,
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
  showPrefixLabel = true,
  triggerWidth = "fit-content",
  minH = "48px",
  mobileDisplayLabel,
}) {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const hasPrefixIcon = Boolean(Icon);

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
    <Flex
      position="relative"
      w={triggerWidth}
      alignItems="center"
      justifyContent="space-between"
      gap="2.5"
      minH={minH}
      px="3.5"
      border="1px solid"
      borderColor="border.default"
      borderRadius="8px"
      bg="rgba(4, 24, 41, 0.42)"
      cursor="pointer"
      onClick={() => isMobile && setIsOpen(true)}
      _hover={{ borderColor: "border.emphasized" }}
      _focusVisible={{
        outline: "2px solid",
        outlineColor: "accent.primary",
        outlineOffset: "-1px",
      }}
    >
      <HStack gap="2.5" minW="0" flex="1">
        {hasPrefixIcon && (
          <Box
            color="accent.primary"
            flexShrink="0"
            display="inline-flex"
            alignItems="center"
          >
            <Icon size={18} strokeWidth={1.55} />
          </Box>
        )}

        {showPrefixLabel && (
          <Text color="fg.muted" fontSize="sm" flexShrink="0">
            {prefixLabel}
          </Text>
        )}

        <Box
          color="fg.heading"
          fontSize="sm"
          fontWeight="500"
          textAlign="left"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {mobileDisplayLabel
            ? mobileDisplayLabel
            : value === "Any" && showPrefixLabel
              ? ""
              : selectedLabel || prefixLabel}
        </Box>
      </HStack>

      <Box
        color="fg.subtle"
        pointerEvents="none"
        flexShrink="0"
        display="inline-flex"
        alignItems="center"
      >
        <ChevronDown size={16} strokeWidth={1.5} />
      </Box>
    </Flex>
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
            <Drawer.Content borderTopRadius="xl">
              <Drawer.Body
                p="4"
                pb="100px"
                display="flex"
                flexDirection="column"
                gap="4"
              >
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
                  maxH="35vh"
                  gap="2"
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
