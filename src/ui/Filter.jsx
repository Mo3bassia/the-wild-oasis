import styled, { css } from "styled-components";
import { useUrlSearch } from "../hooks/useUrlSearch";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export default function Filter({ filterField, options }) {
  const { getParam, setParam, deleteParam } = useUrlSearch();

  function handleFilterClick(value) {
    const currentFilter = getParam(filterField);

    if (currentFilter === value) {
      deleteParam(filterField);
    } else {
      setParam(filterField, value);
    }
  }
  return (
    <StyledFilter>
      {options.map((option, index) => (
        <FilterButton
          key={option.value}
          active={
            getParam(filterField) === option.value ||
            (getParam(filterField) !== option.value &&
              index === 0 &&
              !getParam(filterField))
          }
          onClick={() => handleFilterClick(option.value)}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}
