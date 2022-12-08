import React from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  border-radius: 10px;
  padding: 5px;
  color: #232323;
`;

const UISelect = (props) => {
  return <StyledSelect {...props} />;
};

export default UISelect;
