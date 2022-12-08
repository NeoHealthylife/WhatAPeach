import { Heading, Text, useBreakpointValue } from "@chakra-ui/react";

const SubHeading = ({ fontsize, position, text }) => {
  return (
    <Heading fontSize={fontsize}>
      {" "}
      {/* lg, md... */}
      <Text
        as={"span"}
        position={position} //estaba relative
        zIndex={"1"}
        _after={{
          content: "''",
          width: "full",
          height: useBreakpointValue({ base: "20%", md: "30%" }),
          position: "absolute",
          bottom: 1,
          left: 0,
          bg: "blue.200",
          zIndex: -1,
        }}
      >
        {text}
      </Text>
    </Heading>
  );
};

export default SubHeading;
