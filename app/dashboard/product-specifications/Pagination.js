import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/ui/pagination";
import { PRODUCT_PAGE_SIZE } from "@/app/lib/utils";

function PaginationForProduct({ data, page }) {
  console.log(data);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      {data?.total > PRODUCT_PAGE_SIZE && (
        <p className="w-full">
          Showing
          <span className="font-semibold">
            {" "}
            {(page - 1) * PRODUCT_PAGE_SIZE + 1}
          </span>{" "}
          to
          <span className="font-semibold">
            {" "}
            {page === data?.last_page ? data.total : page * PRODUCT_PAGE_SIZE}
          </span>{" "}
          of
          <span className="font-semibold"> {data?.total}</span> results
        </p>
      )}
      {data?.total > PRODUCT_PAGE_SIZE && (
        <Pagination className="mt-6 flex justify-end w-full">
          <PaginationContent>
            <PaginationItem>
              {1 < page && (
                <PaginationPrevious
                  className="bg-gray-100 hover:bg-gray-200"
                  href={`/dashboard/product-specifications?page=${page - 1}`}
                />
              )}
            </PaginationItem>

            <PaginationItem>
              {!(page === data?.last_page) && (
                <PaginationNext
                  className="bg-gray-100 hover:bg-gray-200"
                  href={`/dashboard/product-specifications?page=${page + 1}`}
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

export default PaginationForProduct;
