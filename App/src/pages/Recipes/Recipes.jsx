import React from "react";
import { useEffect, useState } from "react";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";
import { Heading } from "@chakra-ui/react";
import { API } from "../../services/API";
import GridUI from "../../components/UIComponents/GridUI";

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

  useEffect(() => {
    API.get("/recipes").then((res) => setRecipes(res.data.data.recipes));
  }, []);

  return (
    <LayoutWrapper>
      <Heading variant="H1">Recetas</Heading>
      <GridUI items={recipes} />
    </LayoutWrapper>
  );
};

export default Recipes;
