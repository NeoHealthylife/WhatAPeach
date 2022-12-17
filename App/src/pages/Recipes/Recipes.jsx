import React, { useContext } from "react";
import { useEffect, useState } from "react";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";
import { Button, filter, Heading } from "@chakra-ui/react";
import { API } from "../../services/API";
import GridUI from "../../components/UIComponents/GridUI";
import GlobalContext from "../../context/GlobalContext";

// const recipesCategoriesByDiet = {
//   vegetarian: [
//     "vegetariano",
//     "vegano",
//     "vegan",
//     "vegetarian",
//     "ensaladas",
//     "postres",
//     "hidratos de carbono",
//   ],
//   vegan: ["vegan", "vegano", "ensaladas", "proteinas", "hidratos de carbono", "postres"],
//   normal: [
//     "carne",
//     "pescado",
//     "vegetariano",
//     "vegano",
//     "proteinas",
//     "hidratos de carbono",
//     "postres",
//   ],
// };

// const recipesCategoriesByTarget = {
//   "lose weight": ["verduras", "vegano", "proteinas"],
//   "build muscle": [
//     "vegetariano",
//     "vegano",
//     "hidratos de carbono",
//     "proteinas",
//     "carne",
//     "pescado",
//   ],
//   definition: ["verduras", "proteinas", "carne", "pescado", "ensaladas"],
// };

const tags = [
  "lose weight", "vegetariano", "vegan", "eat all", "verduras", "pescado"
]

const Recipes = () => {
  const { user } = useContext(GlobalContext);
  const [recipes, setRecipes] = useState([]);
  const [activatedTags, setActivatedTags] = useState([]);
  const [showContent, setShowContent] = useState([]);
  const [filters, setFilters] = useState([user.diet, user.target]);
 

  useEffect(() => {
    API.get("/recipes").then((res) => setRecipes(res.data.data.recipes));
  }, []);

  useEffect(() => {
    setActivatedTags([user.diet, user.target]);
  }, []);

  useEffect(() => {
    if (filters.length) {
      const filteredRecipes = recipes.filter((recipe) => {
        return recipe.tags.includes(filters[0]) && recipe.tags.includes(filters[1]);
      });
      setShowContent(filteredRecipes);
    } else {
      setShowContent(recipes);
    }
  }, [filters, recipes]);
  
  return (
    <LayoutWrapper>
      <Heading variant="H1">Recetas</Heading>
      <Button variant="secondary" onClick={() => setFilters([user.diet, user.target])}>
        Show my diet
      </Button>
      <Button variant="secondary" onClick={() => setFilters([])}>
        Show all
      </Button>
      {tags.map((tag) => (
        <Heading
          key={tag}
          variant={activatedTags.includes(tag) ? "H2" : ""}
        >
          {tag}
        </Heading>
      ))}
      <GridUI items={showContent} type="recipe" section="favorite" />
    </LayoutWrapper>
  );
};

export default Recipes;
