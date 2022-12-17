import React from "react";
import CardComp from "../Card";
import { Grid, GridItem } from "@chakra-ui/react";

const GridUI = (props) => {
  const { items, type, section } = props;
  return (
    <Grid
      m="20px"
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(4, 1fr)",
      }}
      gap={6}
    >
      {items.map((item) => (
        <GridItem key={item._id} justifyContent={"center"}>
          <CardComp
            width="250px"
            heigth="360px"
            key={item._id}
            className="card"
            item={item}
            type={type}
            section={section}
          />
        </GridItem>
      ))}
    </Grid>
  );
};

export default GridUI;
