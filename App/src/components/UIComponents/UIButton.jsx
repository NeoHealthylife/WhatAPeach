import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  border-radius: 10px;
  padding: 10px;

  ${(props) =>
    props.variant === "primary" &&
    css`
      color: #232323;
      background-color: #ff9179;

      :hover {
        background-color: #ff572e;
      }
    `}

  ${(props) =>
    props.variant === "secondary" &&
    css`
      color: #232323;
      background-color: #14bfe6;
      :hover {
        background-color: #ff572e;
      }
    `}
`;

const UiButton = (props) => {
  return (
    <StyledButton {...props} boderRadius="md">
      {props.children}
    </StyledButton>
  );
};

export default UiButton;
