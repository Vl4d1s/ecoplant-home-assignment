import { Table as ReactTable } from "@tanstack/react-table";

interface PaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  label: string;
}

interface PaginationProps {
  table: ReactTable<any>;
}

const PaginationButton = ({
  onClick,
  disabled,
  label,
}: PaginationButtonProps) => (
  <button
    className="ml-2 px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-900 hover:bg-blue-700 disabled:opacity-50"
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

const Pagination = ({ table }: PaginationProps) => {
  const buttons = [
    {
      onClick: () => table.setPageIndex(0),
      disabled: !table.getCanPreviousPage(),
      label: "<<",
    },
    {
      onClick: () => table.previousPage(),
      disabled: !table.getCanPreviousPage(),
      label: "<",
    },
    {
      onClick: () => table.nextPage(),
      disabled: !table.getCanNextPage(),
      label: ">",
    },
    {
      onClick: () => table.setPageIndex(table.getPageCount() - 1),
      disabled: !table.getCanNextPage(),
      label: ">>",
    },
  ];

  return (
    <div className="flex items-center justify-between mt-4">
      <div>
        {buttons.map((button, index) => (
          <PaginationButton key={index} {...button} />
        ))}
      </div>
      <div>
        <span className="text-sm">
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="ml-2 text-sm">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="ml-2 border p-1 rounded w-16"
          />
        </span>
      </div>
    </div>
  );
};

export default Pagination;
