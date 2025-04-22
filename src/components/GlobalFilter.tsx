import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

interface GlobalFilterProps {
  filter: string;
  setFilter: (filterValue: string | undefined) => void;
}

export const GlobalFilter: React.FC<GlobalFilterProps> = ({
  filter,
  setFilter,
}) => {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((val: string) => {
    setFilter(val || undefined);
  }, 1000);

  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        className="border p-1 rounded"
      />
    </span>
  );
};
