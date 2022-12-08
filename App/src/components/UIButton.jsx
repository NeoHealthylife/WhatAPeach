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
    props.variant === "socialLogin" &&
    css`
      color:#ff9179;
      background-color: #FFFFFF;
      border-radius:20px;
      border-color: #ff9179;
    `}

  ${(props) =>
    props.variant === "secondary" &&
    css`
      color: #232323;
      background-color: #82bfcc;
    `}
`;

const UiButton = (props) => {
  return (
    <StyledButton {...props} variant={props.variant ?? "primary"}>
      {props.children}
    </StyledButton>
  );
};

export default UiButton;
