import styled, { css } from "styled-components";

const mo = true;

const test = `
  text-align: center;
  ${mo && "display:flex"};
`;

const Heading = styled.h1`
  ${(props) =>
    props.type === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 900;
    `}

  ${(props) =>
    props.type === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 900;
    `}

    ${(props) =>
    props.type === "h3" &&
    css`
      font-size: 1rem;
      font-weight: 900;
    `}
    ${(props) =>
    props.type === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
      justify-content: center;
    `}
  ${test};
`;

export default Heading;
