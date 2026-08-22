import { Box, Input } from "@chakra-ui/react";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

function AnimeListSearchInput({ onSearchChange }) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearchChange) {
        onSearchChange(search.trim());
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, onSearchChange]);

  return (
    <Box position="relative" w={{ base: "full", lg: "540px" }}>
      <Box
        position="absolute"
        left={{ base: "3.5", lg: "4" }}
        top="50%"
        transform="translateY(-50%)"
        color="fg.subtle"
        pointerEvents="none"
        zIndex="1"
        display="inline-flex"
        alignItems="center"
      >
        <Search size={18} strokeWidth={1.5} />
      </Box>

      <Input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search Aeni..."
        aria-label="Search Aeni"
        h={{ base: "48px", lg: "64px" }}
        ps={{ base: "10", lg: "12" }}
        bg="rgba(4, 24, 41, 0.42)"
        borderColor="border.default"
        borderRadius="8px"
        fontSize={{ base: "sm", lg: "md" }}
        _placeholder={{ color: "fg.muted" }}
      />
    </Box>
  );
}

export default AnimeListSearchInput;
