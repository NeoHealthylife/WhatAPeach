import React, { useContext } from "react";
import { useEffect, useState } from "react";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";
import {
  Box,
  Button,
  Heading,
  Checkbox,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { API } from "../../services/API";
import GridUI from "../../components/UIComponents/GridUI";
import GlobalContext from "../../context/GlobalContext";
import { outlinedClasses } from "./CheckboxStyles";
import "./styles.css";
import { FaCheckDouble } from "react-icons/fa";
import UISpan from "../../components/UIComponents/UISpan";

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

const tags = ["lose weight", "vegetarian", "vegan", "eat all", "verduras", "pescado"];

const Recipes = () => {
  const { user } = useContext(GlobalContext);
  const [recipes, setRecipes] = useState([]);
  const [activatedTags, setActivatedTags] = useState([user.diet, user.target]);
  const [showContent, setShowContent] = useState([]);
  const [filters, setFilters] = useState([user.diet, user.target]);
  const [ingredients, setIngredients] = useState({
    ingredient1: false,
    ingredient2: false,
    ingredient3: false,
    ingredient4: false,
    ingredient5: false,
    ingredient6: false,
    ingredient7: false,
  });
  /* const [ingrediente1, setIngredinet1] = useState(false);
  const [ingrediente2, setIngredinet2] = useState(false);
  const [ingrediente3, setIngredinet3] = useState(false);
  const [ingrediente4, setIngredinet4] = useState(false);
  const [ingrediente5, setIngredinet5] = useState(false);
  const [ingrediente6, setIngredinet6] = useState(false);
  const [ingrediente7, setIngredinet7] = useState(false); */
  const nutrients = [
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671295117/HealthyLife/iconhuevo_1_shhwvf.png",
      name: "Huevos",
      isChecked: ingredients.ingredient1,
    },
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671294409/HealthyLife/iconfruta_r3bj8b.png",
      name: "Fruta",
      isChecked: ingredients.ingredient2,
    },
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1669489891/paintings/idq57yew22xitacjftua.jpg",
      name: "Verduras",
      isChecked: ingredients.ingredient3,
    },
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671294347/HealthyLife/iconlacteos_qm4wmy.png",
      name: "Lácteos",
      isChecked: ingredients.ingredient4,
    },
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671294273/HealthyLife/iconpescado_cja0wg.png",
      name: "Pescado",
      isChecked: ingredients.ingredient5,
    },
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671294435/HealthyLife/iconcarne_vtvdea.png",
      name: "Carne",
      isChecked: ingredients.ingredient6,
    },
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671294108/HealthyLife/iconlegumbres_pbscnn.png",
      name: "Legumbres",
      isChecked: ingredients.ingredient7,
    },
  ];
  const handleCheckboxChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name; // debemos buscar el recipe.ingredient; para llegar a recipe se debe haber mapeado previamente las recipes

    // Actualizamos el estado del checkbox según su nombre
    if (name === "Huevos") {
      setIngredients(value);
    } else if (name === "Fruta") {
      setIngredients(value);
    } else if (name === "Verduras") {
      setIngredients(value);
    } else if (name === "Lácteos") {
      setIngredients(value);
    } else if (name === "Pescado") {
      setIngredients(value);
    } else if (name === "Carne") {
      setIngredients(value);
    } else if (name === "Legumbres") {
      setIngredients(value);
    }
  };

  useEffect(() => {
    API.get("/recipes").then((res) => setRecipes(res.data.data.recipes));
  }, []);
  useEffect(() => {
    let ingredientsFiltered = nutrients;
    if (ingredients.ingredient1) {
      ingredientsFiltered = recipes.filter((recipe) => {
        return recipe.ingredients.includes(ingredients.ingredient1);
      });
      setIngredients(ingredientsFiltered);
    }
  }, [ingredients]);
  useEffect(() => {
    if (filters.length) {
      const filteredRecipes = recipes.filter((recipe) => {
        return recipe.tags.includes(filters[0]) && recipe.tags.includes(filters[1]);
      });
      setShowContent(filteredRecipes);
    } else {
      setShowContent(recipes);
    }
  }, [filters, recipes, activatedTags]);

  return (
    <LayoutWrapper>
      <Heading variant="H1">Recetas</Heading>
      <Box display="flex" alignItems="center" justifyContent="center" p={4}>
        <Stack
          display="flex"
          flexDirection="row"
          wrap="wrap"
          justifyContent="center"
          alignItems="center"
          gap="6px"
        >
          <Heading variant="H2" mr="50px">
            Recetas con...
          </Heading>
          {nutrients.map(({ img, name, isChecked }) => (
            <Checkbox
              icon={<FaCheckDouble />}
              sx={outlinedClasses}
              spacing="18px"
              key={name}
              onChange={handleCheckboxChange}
              value={name}
              maxWidth="200px" //quitarMaxW
              borderRadius="24px"
              border="1px"
              borderColor="primary"
              isChecked={isChecked}
            >
              <Flex alignItems="center">
                <Image borderRadius="full" boxSize="35px" src={img} alt={name} mr={2} />
                <Stack>
                  <Text letterSpacing="0.0275em" fontSize="sm">
                    {name}
                  </Text>
                </Stack>
              </Flex>
            </Checkbox>
          ))}
        </Stack>
      </Box>
      <Box>
        <Button
          variant="secondary"
          onClick={() =>
            setFilters([user.diet, user.target]) &
            setActivatedTags([[user.diet, user.target]])
          }
        >
          Show my diet
        </Button>
        <Button variant="secondary" onClick={() => setFilters([]) & setActivatedTags([])}>
          Show all
        </Button>

        {tags.map((tag) => (
          /* <span
            key={tag}
            className={activatedTags.includes(tag) ? "allMarked" : "tagsActive"}
          >
            {tag}
          </span> */

          <UISpan key={tag} variant="tag">
            {tag}
          </UISpan>
        ))}
      </Box>
      <GridUI items={showContent} type="recipe" section="favorite" />
    </LayoutWrapper>
  );
};

export default Recipes;
