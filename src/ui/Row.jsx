import styled, { css } from "styled-components";

const Row = styled.div.attrs((props) => ({
  type: props.type || "vertical",
}))`
  display: flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

// Deprecated way
/*
Row.defaultProps = {
    type: "vertical"
}
*/
export default Row;
