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

function searchStringInArray(str, strArray) {
  for (var j = 0; j < strArray.length; j++) {
    if (strArray[j].match(str)) return true;
  }
  return false;
}

const Recipes = () => {
  const { user } = useContext(GlobalContext);
  const [recipes, setRecipes] = useState([]);
  const [activatedTags, setActivatedTags] = useState([user.diet, user.target]);
  const [showContent, setShowContent] = useState([]);
  const [filters, setFilters] = useState([user.diet, user.target]);
  const [ingredients, setIngredients] = useState([
    { name: "Huevos", value: false },
    { name: "Fruta", value: false },
    { name: "Verduras", value: false },
    { name: "Lácteos", value: false },
    { name: "Pescado", value: false },
    { name: "Carne", value: false },
    { name: "Legumbres", value: false },
  ]);

  const nutrientsToDisplay = [
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671295117/HealthyLife/iconhuevo_1_shhwvf.png",
      name: "Huevos",
      isChecked: false,
    },
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671294409/HealthyLife/iconfruta_r3bj8b.png",
      name: "Fruta",
      isChecked: false,
    },
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1669489891/paintings/idq57yew22xitacjftua.jpg",
      name: "Verduras",
      isChecked: false,
    },
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671294347/HealthyLife/iconlacteos_qm4wmy.png",
      name: "Lácteos",
      isChecked: false,
    },
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671294273/HealthyLife/iconpescado_cja0wg.png",
      name: "Pescado",
      isChecked: false,
    },
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671294435/HealthyLife/iconcarne_vtvdea.png",
      name: "Carne",
      isChecked: false,
    },
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671294108/HealthyLife/iconlegumbres_pbscnn.png",
      name: "Legumbres",
      isChecked: false,
    },
  ];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setIngredients([...ingredients, { name: value, value: checked }]);
  };

  useEffect(() => {
    API.get("/recipes").then((res) => setRecipes(res.data.data.recipes));
  }, []);

  useEffect(() => {
    const activeIngredients = ingredients.filter((ing) => ing.value);

    if (filters.length) {
      const filteredByTagRecipes = recipes.filter((recipe) => {
        return recipe.tags.includes(filters[0]) && recipe.tags.includes(filters[1]);
      });

      const filteredRecipes = filteredByTagRecipes.filter((recipe) => {
        let included = false;
        activeIngredients.forEach((ing) => {
          included = searchStringInArray(ing, recipe.nutrients);
        });
        return included;
      });

      setShowContent(filteredRecipes);
    } else {
      setShowContent(recipes);
    }
  }, [filters, recipes, activatedTags, ingredients]);

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
          {nutrientsToDisplay.map(({ img, name, isChecked }) => (
            <Checkbox
              sx={outlinedClasses}
              spacing="18px"
              key={name}
              onChange={handleCheckboxChange}
              value={name}
              maxWidth="200px" //quitarMaxW
              borderRadius="24px"
              border="1px"
              borderColor="primary"
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
            setActivatedTags([user.diet, user.target])
          }
        >
          Show my diet
        </Button>
        <Button variant="secondary" onClick={() => setFilters([]) & setActivatedTags([])}>
          Show all
        </Button>

        {tags.map((tag) => (
          <UISpan
            key={tag}
            variant="tag"
            className={activatedTags.includes(tag) ? "allMarked" : "tagsActive"}
          >
            {tag}
          </UISpan>
        ))}
      </Box>
      {showContent.length ? (
        <GridUI items={showContent} type="recipe" section="favorite" />
      ) : (
        <>Aun no tienes recetas sugeridas por el sistema. Prueba a buscar una!</>
      )}
    </LayoutWrapper>
  );
};

export default Recipes;
