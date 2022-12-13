import React from "react";
import { useEffect, useState } from "react";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";
import { Heading, Flex } from "@chakra-ui/react";
import CardComp from "../../components/Card";
import { API } from "../../services/API";


const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(
    () => async () => {
      API.get("/recipes").then((res) => setRecipes(res.data.data.recipes));
    },
    []);

  

  return (
    <LayoutWrapper>
      <Heading variant="H1">recetas</Heading>

      <Flex>
        {recipes.map((recipe) => (
          <CardComp key={recipe._id} altImg={recipe.title} imgSrc={recipe.image} tags={recipe.tags} recipe={recipe}/>
        ))}
      </Flex>
    </LayoutWrapper>
  );
};

export default Recipes;
