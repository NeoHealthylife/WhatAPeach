import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  border-radius: 10px;
  padding: 5px;
  color: #232323;
`;

const UiInput = (props) => {
  return <StyledInput {...props} />;
};

export default UiInput;
