import React from "react";
import styled, { css } from "styled-components";

const Button = styled.button`
  border-radius: 20px;
  padding: 10px;

  ${(props) =>
    props.variant === "primary" &&
    css`
      color: #ffffff;
      background-color: #ef623f;
      box-shadow: #161616 4px 4px 0 0;
      :hover {
        background-color: #f2866a;
      }
      :active {
        box-shadow: #161616 2px 2px 0 0;
        transform: translate(2px, 2px);
      }
    `}

  ${(props) =>
    props.variant === "secondary" &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      color: #ef623f;
      border: 1px solid #ef623f;
      background-color: #ffffff;
      box-shadow: #161616 4px 4px 0 0;

      :hover {
        background-color: #e0e0e0;
      }
      :active {
        box-shadow: #161616 2px 2px 0 0;
        transform: translate(2px, 2px);
      }
    `}
    ${(props) =>
    props.variant === "back" &&
    css`
      padding: 0px;
      height: 35px;
      width: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      color: #ef623f;
      border: 1px solid #ef623f;
      background-color: #ffffff;
      margin-bottom: 15px;
      box-shadow: #161616 4px 4px 0 0;
      border-radius: 10px;
      :hover {
        background-color: #e0e0e0;
      }

      :active {
        box-shadow: #161616 2px 2px 0 0;
        transform: translate(2px, 2px);
      }
    `}
`;

const StyledButton = (props) => {
  return (
    <Button {...props} boderRadius="md">
      {props.children}
    </Button>
  );
};
export default StyledButton;
