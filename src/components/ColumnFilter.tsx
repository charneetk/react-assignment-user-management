import React from "react";
import { ColumnInstance } from "react-table";

interface ColumnFilterProps<T extends object> {
  column: ColumnInstance<T> & {
    filterValue: any;
    setFilter: (value: any) => void;
  };
}

export const ColumnFilter = <T extends object>({
  column,
}: ColumnFilterProps<T>) => {
  const { filterValue, setFilter } = column;

  return (
    <span>
      Search:{" "}
      <input
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-1 rounded"
      />
    </span>
  );
};
