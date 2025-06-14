import { useSearchParams } from "react-router-dom";

export function useUrlSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  function getParam(key) {
    return searchParams.get(key);
  }

  function setParam(key, value) {
    if (value === null || value === undefined) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
    setSearchParams(searchParams);
  }

  function deleteParam(key) {
    searchParams.delete(key);
    setSearchParams(searchParams);
  }

  function clearParams() {
    setSearchParams({});
  }

  return { getParam, setParam, deleteParam, clearParams };
}
