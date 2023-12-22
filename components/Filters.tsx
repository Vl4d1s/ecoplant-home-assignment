import { Measurement } from "@/types";
import { Column, Table } from "@tanstack/react-table";

interface FilterProps {
  column: Column<Measurement, unknown>;
  table: Table<Measurement>;
}

export default function Filter({ column, table }: FilterProps) {
  const firstRowValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);
  const currentFilterValue = column.getFilterValue();

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    column.setFilterValue((prevValue: [number, number]) => [
      e.target.value ? Number(e.target.value) : undefined,
      prevValue?.[1],
    ]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    column.setFilterValue((prevValue: [number, number]) => [
      prevValue?.[0],
      e.target.value ? Number(e.target.value) : undefined,
    ]);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    column.setFilterValue(e.target.value);
  };

  return (
    <div className="flex space-x-2">
      {typeof firstRowValue === "number" ? (
        <>
          <input
            type="number"
            value={(currentFilterValue as [number, number])?.[0] ?? ""}
            onChange={handleMinChange}
            placeholder={`Min`}
            className="w-24 border pl-1"
          />
          <input
            type="number"
            value={(currentFilterValue as [number, number])?.[1] ?? ""}
            onChange={handleMaxChange}
            placeholder={`Max`}
            className="w-24 border pl-1"
          />
        </>
      ) : (
        <input
          type="text"
          value={(currentFilterValue ?? "") as string}
          onChange={handleTextChange}
          placeholder={`Search...`}
          className="w-36 border pl-1"
        />
      )}
    </div>
  );
}
