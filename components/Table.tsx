import { Measurement } from "@/types";
import { useReactTable } from "@tanstack/react-table";

interface TableProps {
  data: Measurement[];
}

function Table({ data }: TableProps) {
  return <h3>{JSON.stringify(data)}</h3>;
}

export default Table;
