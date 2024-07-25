import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/ui/pagination";

function PaginationRoot({ data, page, page_size }) {
  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      {data?.total > page_size && (
        <Pagination className="mt-6 flex">
          <PaginationContent>
            <PaginationItem>
              {1 < page && (
                <PaginationPrevious
                  className="bg-gray-100 hover:bg-gray-200"
                  href={`/?page=${page - 1}`}
                />
              )}
            </PaginationItem>

            <PaginationItem>
              {!(page === data?.last_page) && (
                <PaginationNext
                  className="bg-gray-100 hover:bg-gray-200"
                  href={`/?page=${page + 1}`}
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      {data?.total > page_size && (
        <p className="">
          Showing
          <span className="font-semibold">
            {" "}
            {(page - 1) * page_size + 1}
          </span>{" "}
          to
          <span className="font-semibold">
            {" "}
            {page === data?.last_page ? data.total : page * page_size}
          </span>{" "}
          of
          <span className="font-semibold"> {data?.total}</span> results
        </p>
      )}
    </div>
  );
}

export default PaginationRoot;