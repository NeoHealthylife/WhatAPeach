import React, { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputRightElement,
  Button,
  InputGroup,
} from "@chakra-ui/react";

import { useFormContext, useFormState } from "react-hook-form";

const UIPassword = ({ name, label, placeholder, helpText, text, validations }) => {
  const { register } = useFormContext();
  const { errors } = useFormState();

  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl>
      <InputGroup size="md">
        <FormLabel>{label}</FormLabel>
        <Input
          {...register(name, validations)}
          placeholder={placeholder}
          value={text}
          type={showPassword ? "text" : "password"}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <ErrorMessage errors={errors} name={name} />
      {helpText && <FormHelperText>{helpText}</FormHelperText>}
    </FormControl>
  );
};

export default UIPassword;
