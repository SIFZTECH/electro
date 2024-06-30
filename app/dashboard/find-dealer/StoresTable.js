"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

import Spinner from "@/app/components/ui/Spinner";
import { useSearchParams } from "next/navigation";
import Search from "@/app/components/ui/Search";
import NotFoundData from "@/app/components/ui/NotFoundData";
import PaginationUI from "@/app/components/ui/PaginationUI";
import { STORES_PAGE_SIZE } from "@/app/lib/utils";
import Link from "next/link";
import { useStores } from "@/app/_features/stores/useStores";
import EditStore from "./EditStore";
import DeleteStore from "./DeleteStore";

const StoresTable = () => {
  const params = useSearchParams();
  const page = params.get("page") ? +params.get("page") : 1;
  const query = params.get("query") && params.get("query");

  const { data, isLoading, isError, error } = useStores(page, query);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex justify-end items-center gap-4 my-4 mb-8">
        <Search navigateTo={"find-dealer"} />
        <div className="flex-1 flex items-center justify-end gap-4">
          <Link href="/find-a-dealer" className="btn-primary">
            View Store Finder
          </Link>
          <Link
            href="/dashboard/find-dealer/add-new-store"
            className="btn-primary"
          >
            Add New Store
          </Link>
        </div>
      </div>
      {isError && error && (
        <NotFoundData message={error.response.data.message} />
      )}
      {!isError && !error && (
        <>
          {data?.data?.length === 0 ? (
            <NotFoundData message="There is no stores! Please add new one" />
          ) : (
            <>
              <Table className="!mt-4 !mb-4 table_modify">
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-medium" scope="col">
                      Store Name
                    </TableHead>
                    <TableHead className="font-medium" scope="col">
                      User Name
                    </TableHead>
                    <TableHead className="font-medium" scope="col">
                      Email
                    </TableHead>

                    <TableHead className="font-medium" scope="col">
                      Status
                    </TableHead>

                    <TableHead className="font-medium" scope="col">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.data?.map((data, i) => {
                    return (
                      <TableRow key={i + 1} className="font-sans">
                        <TableCell data-label="Store Name">
                          {data.company_name}
                        </TableCell>
                        <TableCell data-label="User Name">
                          {data.firstname} {data.lastname}
                        </TableCell>
                        <TableCell data-label="Email">{data.email}</TableCell>

                        <TableCell data-label="Status">
                          <span className="font-semibold text-green-500">
                            Active
                          </span>
                        </TableCell>

                        <TableCell data-label="Actions">
                          <div className="flex gap-1 flex-wrap justify-end xl:justify-normal">
                            <EditStore store={data} />
                            <DeleteStore store={data} />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <PaginationUI
                data={data}
                page={page}
                page_size={STORES_PAGE_SIZE}
                navigation="find-dealer"
              />
            </>
          )}
        </>
      )}
    </>
  );
};
export default StoresTable;
