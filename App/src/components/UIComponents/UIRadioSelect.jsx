import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext, useFormState } from "react-hook-form";
import { ErrorStyled } from "./UIFormInput";
import { FormControl, FormLabel, Radio, RadioGroup, HStack } from "@chakra-ui/react";

const UIRadioSelect = ({ options, formLabel, radioColor, name, validations }) => {
  const { register } = useFormContext();
  const { errors } = useFormState();
  return (
    <FormControl as="fieldset">
      {formLabel && <FormLabel as="legend">{formLabel}</FormLabel>}
      <RadioGroup {...register(name, validations)}>
        <HStack spacing="24px" {...register(name, validations)}>
          {options &&
            options.map((option, index) => (
              <Radio key={index} value={option.value} colorScheme={radioColor}>
                {option.label || option.value}
              </Radio>
            ))}
        </HStack>
      </RadioGroup>
      <ErrorStyled>
        <ErrorMessage errors={errors} name={name} />
      </ErrorStyled>
    </FormControl>
  );
};

export default UIRadioSelect;
