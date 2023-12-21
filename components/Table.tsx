"use client";

import { Measurement } from "@/types";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useMemo } from "react";

import Filters from "./Filters";
import Pagination from "./Pagination";
import TableRow from "./TableRow";
import Sort from "./Sort";

interface TableProps {
  data: Measurement[];
}

export default function Table({ data }: TableProps) {
  const memoizedData = useMemo(() => data, [data]);
  const columnHelper = createColumnHelper<Measurement>();
  const columns = useMemo<ColumnDef<Measurement, any>[]>(
    () => [
      columnHelper.accessor("kwh", {
        header: "KW/h",
      }),
      columnHelper.accessor("pressure", {
        header: "Pressure",
      }),
      columnHelper.accessor("temp", {
        header: "Temperature",
      }),
      columnHelper.accessor("timestamp", {
        header: "Timestamp",
      }),
    ],
    []
  );

  const table = useReactTable({
    columns,
    data: memoizedData,
    initialState: { pagination: { pageSize: 20 } },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="flex flex-col p-10">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <>
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-3 py-4 text-sm  text-white tracking-wider text-left bg-green-700"
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? "cursor-pointer select-none"
                                  : "",
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              <Sort
                                isSorted={header.column.getIsSorted() as string}
                              />
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                    <tr>
                      {headerGroup.headers.map((header) => (
                        <th key={header.id}>
                          {header.column.getCanFilter() && (
                            <Filters column={header.column} table={table} />
                          )}
                        </th>
                      ))}
                    </tr>
                  </>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row, i) => (
                  <TableRow row={row} index={i} key={i} />
                ))}
              </tbody>
            </table>
          </div>
          <Pagination table={table} />
        </div>
      </div>
    </div>
  );
}
