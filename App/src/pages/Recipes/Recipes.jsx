import React, { useContext } from "react";
import { useEffect, useState, createContext } from "react";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";
import { Heading, Center, Flex } from "@chakra-ui/react";
import CardComp from "../../components/Card";
import CardList from "../../components/CardList";
import { API } from "../../services/API";
import GlobalContext from "../../context/GlobalContext";

// export const RecipesContext = createContext();

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const { user } = useContext(GlobalContext);

  console.log({ user });
  useEffect(() => {
    API.get("/recipes").then((res) => setRecipes(res.data.data.recipes));
  }, []);

  return (
    <LayoutWrapper>
      <Heading variant="H1">recetas</Heading>
      <CardList items={recipes} />
    </LayoutWrapper>
  );
};

export default Recipes;
