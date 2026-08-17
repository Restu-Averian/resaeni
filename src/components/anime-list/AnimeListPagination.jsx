import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo } from "react";

function AnimeListPagination({ pagination, onPageChange }) {
  const { start, end, pages, page, total, total_pages } = useMemo(() => {
    if (!pagination || pagination.total === 0) {
      return { start: 0, end: 0, pages: [], page: 0, total: 0, total_pages: 0 };
    }

    const { page, limit, total, total_pages } = pagination;

    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);

    let pages = [];

    if (total_pages <= 3) {
      for (let i = 1; i <= total_pages; i++) pages.push(i);
    } else if (page === 1) {
      pages = [1, 2, 3];
    } else if (page === total_pages) {
      pages = [total_pages - 2, total_pages - 1, total_pages];
    } else {
      pages = [page - 1, page, page + 1];
    }

    return { start, end, pages, page, total, total_pages };
  }, [pagination]);

  if (!pagination || pagination.total === 0) return null;

  return (
    <Flex
      align="center"
      justify="space-between"
      direction={{ base: "column", md: "row" }}
      gap={{ base: "3", md: "4" }}
      pt={{ base: "1", md: "2" }}
    >
      <Text
        color="fg.muted"
        fontSize={{ base: "lg", md: "sm" }}
        alignSelf={{ base: "flex-start", md: "center" }}
      >
        Showing {start}-{end} of {total} Aeni
      </Text>

      <HStack gap={{ base: "4", md: "2" }}>
        {page > 1 && (
          <Button
            variant="outline"
            size={{ base: "lg", md: "sm" }}
            onClick={() => onPageChange(page - 1)}
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            Previous
          </Button>
        )}

        {pages.map((pageNumber) => {
          return (
            <Button
              key={pageNumber}
              variant={page === pageNumber ? "solid" : "outline"}
              size={{ base: "lg", md: "sm" }}
              minW={{ base: "58px", md: "38px" }}
              px="0"
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          );
        })}

        {page < total_pages && (
          <Button
            variant="outline"
            size={{ base: "lg", md: "sm" }}
            onClick={() => onPageChange(page + 1)}
          >
            Next
            <ArrowRight size={16} strokeWidth={1.5} />
          </Button>
        )}
      </HStack>
    </Flex>
  );
}

export default AnimeListPagination;
