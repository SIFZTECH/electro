import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/ui/pagination";

function PaginationUI({ data, page }) {
  return (
    <Pagination className="mt-6 flex justify-end w-full">
      <PaginationContent>
        <PaginationItem>
          {1 < page && (
            <PaginationPrevious
              href={`/dashboard/users-and-permissions?page=${+page - 1}`}
            />
          )}
        </PaginationItem>

        <PaginationItem>
          {!(+page === data?.last_page) && (
            <PaginationNext
              href={`/dashboard/users-and-permissions?page=${+page + 1}`}
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationUI;
