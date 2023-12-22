import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { SortDirection } from "@tanstack/react-table";

interface SortProps {
  isSorted: SortDirection | false;
}

const Sort = ({ isSorted }: SortProps) => {
  return isSorted === "asc" ? (
    <ArrowDropUpIcon fontSize="medium" />
  ) : isSorted === "desc" ? (
    <ArrowDropDownIcon fontSize="medium" />
  ) : null;
};

export default Sort;
