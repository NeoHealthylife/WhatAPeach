import React from "react";
import styled, { css } from "styled-components";

const StyledSpan = styled.span`
  margin: 0 10px;
  font-size: 12px;
  padding: 6px 10px 6px 0;
  background-color: transparent;
  box-sizing: border-box;
  border-radius: 25px;
  position: relative;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  border: 0;
  padding-left: 20px;

  @media (min-width: 600px) {
    padding: 6px 14px;
  }

  &::before {
    content: "#";
    background-color: transparent;
    position: absolute;
    left: 3px;
    top: 6px;
    bottom: 0;
    width: 100%;
    margin: auto;
    z-index: 1;
  }

  &.allMarked {
    background-color: #d5edf6;
    padding-left: 30px;
  }
  &.allMarked::before {
    left: 17px;
    top: 15px;
  }

  &.allMarked::after {
    content: "📍";
    background-color: transparent;
    border-radius: 25px;
    height: calc(100% + 3px);
    position: absolute;
    right: -7px;
    top: 0;
    bottom: 0;
    width: 100%;
    margin: auto;
    z-index: 1;
  }
`;

const UISpan = ({ className, children }) => {
  return <StyledSpan className={className}>{children}</StyledSpan>;
};
export default UISpan;
