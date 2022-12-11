import { Heading, Text, useBreakpointValue } from "@chakra-ui/react";

const SubHeading = ({ fontsize, position, text, fontWeight}) => {
  return (
    <Heading fontSize={fontsize}>
      <Text
        fontWeight={fontWeight}
        as={"span"}
        position={position} //estaba relative
        zIndex={"1"} 
      >
        {text}
      </Text>
    </Heading>
  );
};

export default SubHeading;
