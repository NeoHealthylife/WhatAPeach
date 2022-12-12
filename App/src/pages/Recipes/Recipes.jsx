import React from "react";
import { useEffect, useState, createContext } from "react";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";
import { Heading, Center, Flex } from "@chakra-ui/react";
import CardComp from "../../components/Card";
import { getData } from "../../services/API";

// export const RecipesContext = createContext();

const Recipes = () => {
  const [ recipes, setRecipes ] = useState([]);

  useEffect(() => {
    getData("recipes").then((res) => setRecipes(res.data.recipes));
  }, []);
  console.log("recipes", recipes);

  return (
    <LayoutWrapper>
          <Heading variant="H1">recetas</Heading>
          <Flex>
          {recipes
          .map((recipe) => (
            <CardComp key={recipe.id} imgSrc={recipe.image} tags={recipe.tags}/>
          ))}
        </Flex>
      
    </LayoutWrapper>
  );
};

export default Recipes;
