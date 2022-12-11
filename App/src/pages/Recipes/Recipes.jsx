import React from "react";
import { useEffect, useContext, createContext } from "react";
import getData from "../../../api/getData";
import GlobalContext from "../../context/GlobalContext";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";
import { Heading, Center, Flex } from "@chakra-ui/react";
import CardComp from "../../components/Card";

export const RecipesContext = createContext();

const Recipes = () => {
  const { recipes, setRecipes } = useContext(GlobalContext);

  useEffect(() => {
    getData("recipes").then((res) => setRecipes(res.data.recipes));
  }, []);
  console.log("recipes", recipes);

  return (
    <LayoutWrapper>
      <Center>
        <Flex>
          <Heading variant="H1">RECETAS</Heading>
          {recipes
          .map((recipe) => (
            <CardComp imgSrc={recipe.image} tags={recipe.tags}/>
          ))}
        </Flex>
      </Center>
    </LayoutWrapper>
  );
};

export default Recipes;
