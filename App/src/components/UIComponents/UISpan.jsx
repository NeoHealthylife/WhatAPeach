import React from "react";
import styled, { css } from "styled-components";

const StyledSpan = styled.span`
  ${(props) =>
    props.variant === "tag" &&
    css`
      padding: 6px 14px;
      font-size: 12px;
      background-color: transparent;
      border: 1px solid #6877eb;
      box-sizing: border-box;
      color: #00132c;
      border-radius: 25px;
      /* padding: 16px 23px; */
      position: relative;
      text-decoration: none;
      user-select: none;
      -webkit-user-select: none;

      .allMarked::before {
        background-color: #d5edf6;
        content: "📍";
        border-radius: 25px;
        height: calc(100% + 3px);
        position: absolute;
        right: -7px;
        top: -9px;
        width: 100%;
        z-index: -1;
      }
    `}
`;

const UISpan = (props) => {
  return <StyledSpan {...props}>{props.children}</StyledSpan>;
};
export default UISpan;
