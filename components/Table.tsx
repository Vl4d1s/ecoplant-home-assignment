"use client";

import { Measurement } from "@/types";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

export default function Table({ data }: { data: Measurement[] }) {
  const memoizedData = useMemo(() => data, [data]);

  const columnHelper = createColumnHelper<Measurement>();
  const columns = useMemo<ColumnDef<Measurement, any>[]>(
    () => [
      columnHelper.accessor("kwh", {
        header: "kwh",
      }),
      columnHelper.accessor("pressure", {
        header: "Pressure",
      }),
      columnHelper.accessor("temp", {
        header: "Temperature",
      }),
      columnHelper.accessor("timestamp", {
        header: "timestamp",
      }),
    ],
    []
  );

  const table = useReactTable({
    columns,
    data: memoizedData,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col p-10">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2  inline-block min-w-full sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row, i) => (
                  <tr
                    key={row.id}
                    className={`${
                      i % 2 === 0 ? "bg-gray-50" : ""
                    } hover:bg-gray-100`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
