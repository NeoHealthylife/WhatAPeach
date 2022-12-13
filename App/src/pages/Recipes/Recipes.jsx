import React, { useContext } from "react";
import { useEffect, useState, createContext } from "react";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";
import { Heading, Center, Flex } from "@chakra-ui/react";
import CardList from "../../components/CardList";
import { API } from "../../services/API";
import GlobalContext from "../../context/GlobalContext";

const recipesCategoriesByDiet = {
  vegetarian: [
    "vegetariano",
    "vegano",
    "vegan",
    "vegetarian",
    "ensaladas",
    "postres",
    "hidratos de carbono",
  ],
  vegan: ["vegan", "vegano", "ensaladas", "proteinas", "hidratos de carbono", "postres"],
  normal: [
    "carne",
    "pescado",
    "vegetariano",
    "vegano",
    "proteinas",
    "hidratos de carbono",
    "postres",
  ],
};

const recipesCategoriesByTarget = {
  "lose weight": ["verduras", "vegano", "proteinas"],
  "build muscle": [
    "vegetariano",
    "vegano",
    "hidratos de carbono",
    "proteinas",
    "carne",
    "pescado",
  ],
  definition: ["verduras", "proteinas", "carne", "pescado", "ensaladas"],
};

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const { user } = useContext(GlobalContext);

  console.log({ user });
  useEffect(() => {
    API.get("/recipes").then((res) => setRecipes(res.data.data.recipes));
  }, []);

  return (
    <LayoutWrapper>
      <Heading variant="H1">Recetas</Heading>
      <CardList items={recipes} />
    </LayoutWrapper>
  );
};

export default Recipes;
