import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  border-radius: 20px;
  padding: 10px;

  ${(props) =>
    props.variant === "primary" &&
    css`
      color:#FFFFFF ;
      background-color: #EF623F;
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
    gap:1rem;
      color: #EF623F;
      border:1px solid #EF623F;
      background-color: #FFFFFF;
      :hover {
        background-color: #e0e0e0;
      }
      box-shadow: #161616 4px 4px 0 0;
      
      :active {
      box-shadow: #161616 2px 2px 0 0;
      transform: translate(2px, 2px);
      
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
