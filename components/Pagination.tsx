import { Table } from "@tanstack/react-table";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { Measurement } from "@/types";

interface PaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  label: string | JSX.Element;
}

interface PaginationProps {
  table: Table<Measurement>;
}

const PaginationButton = ({
  onClick,
  disabled,
  label,
}: PaginationButtonProps) => (
  <button
    className="ml-2 px-3 py-2 rounded-md text-sm font-medium text-white bg-green-700 hover:bg-green-500 disabled:opacity-50"
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
      label: <KeyboardDoubleArrowLeftOutlinedIcon />,
    },
    {
      onClick: () => table.previousPage(),
      disabled: !table.getCanPreviousPage(),
      label: <KeyboardArrowLeftOutlinedIcon />,
    },
    {
      onClick: () => table.nextPage(),
      disabled: !table.getCanNextPage(),
      label: <KeyboardArrowRightOutlinedIcon />,
    },
    {
      onClick: () => table.setPageIndex(table.getPageCount() - 1),
      disabled: !table.getCanNextPage(),
      label: <KeyboardDoubleArrowRightOutlinedIcon />,
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
