import { Measurement } from "@/types";
import { Row, flexRender } from "@tanstack/react-table";

interface TableRowProps {
  row: Row<Measurement>;
  index: number;
}

export default function TableRow({ row, index }: TableRowProps) {
  return (
    <tr
      key={row.id}
      className={`${index % 2 === 0 ? "bg-gray-50" : ""} hover:bg-gray-100`}
    >
      {row.getVisibleCells().map((cell) => (
        <td
          key={cell.id}
          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
}
