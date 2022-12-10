import React from "react";
import {
  Flex,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

export const InputNumber = ({ flex, min, maxW, mr, fontSize, boxSize }) => {
  const [value, setValue] = React.useState(18);
  const handleChange = (value) => setValue(value);

  return (
    <Flex>
      <NumberInput
        min={min}
        keepWithinRange={true}
        maxW={maxW}
        mr={mr}
        value={value}
        onChange={handleChange}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Slider
        flex={flex}
        focusThumbOnChange={false}
        value={value}
        onChange={handleChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize={fontSize} boxSize={boxSize} children={"🍑"} />
      </Slider>
    </Flex>
  );
};
