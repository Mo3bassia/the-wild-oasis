import Select from "./Select";
import { useUrlSearch } from "../hooks/useUrlSearch";
import { useState } from "react";

export default function SortBy({ options }) {
  const { getParam, setParam, deleteParam } = useUrlSearch();
  const [currentValue, setCurrentValue] = useState(getParam("sortBy") || "");

  function handleChange(e) {
    setCurrentValue(e.target.value);
    const currentSort = getParam("sortBy");
    const newSort = e.target.value;
    if (currentSort === newSort) {
      deleteParam("sortBy");
    } else {
      setParam("sortBy", newSort);
    }
  }

  return (
    <Select
      onChange={handleChange}
      options={options}
      value={currentValue}
      type="white"
    ></Select>
  );
}
