import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

interface SortProps {
  isSorted: string;
}

const Sort = ({ isSorted }: SortProps) => {
  if (isSorted === "asc") {
    return <ArrowDropUpIcon fontSize="medium" />;
  } else if (isSorted === "desc") {
    return <ArrowDropDownIcon fontSize="medium" />;
  } else {
    return null;
  }
};

export default Sort;
