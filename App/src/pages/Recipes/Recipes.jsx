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
import "./styles.css";
import { FaCheckDouble } from "react-icons/fa";
import UISpan from "../../components/UIComponents/UISpan";
import UIInput from "../../components/UIComponents/UIInput";
import { outlinedClasses } from "../../components/UIComponents/CheckboxStyles";

const tags = ["perder peso", "vegetariana", "vegana", "omnívora"];

const Recipes = () => {
  const { user } = useContext(GlobalContext);
  const [recipes, setRecipes] = useState([]);
  const [activatedTags, setActivatedTags] = useState([user.diet, user.target]);
  const [showContent, setShowContent] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([user.diet, user.target]);
  const [ingredients, setIngredients] = useState({
    Huevo: false,
    Fruta: false,
    Verduras: false,
    Lácteos: false,
    Pescado: false,
    Carne: false,
    Legumbres: false,
  });

  const nutrientsToDisplay = [
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671295117/HealthyLife/iconhuevo_1_shhwvf.png",
      name: "Huevo",
      isChecked: false,
    },
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671294409/HealthyLife/iconfruta_r3bj8b.png",
      name: "Fruta",
      isChecked: false,
    },
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671483025/vegetable_1_kfdf5p.png",
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
    setIngredients({ ...ingredients, [value]: checked });
  };

  useEffect(() => {
    API.get("/recipes").then((res) => setRecipes(res.data.data.recipes));
  }, []);

  useEffect(() => {
    const activeIngredients = Object.keys(ingredients)
      .filter((key) => ingredients[key] === true)
      .map((ing) => ing.toLowerCase());

    if (filters.length || activeIngredients.length || search !== "") {
      const filteredBySearch = recipes.filter((recipe) => {
        return recipe.title.toLowerCase().includes(search.toLocaleLowerCase());
      });

      const filteredByDiet = recipes.filter((recipe) => {
        return recipe.tags.includes(filters[0]) || recipe.tags.includes(filters[1]);
      });

      const filteredByNutrients = recipes.filter((recipe) => {
        return recipe.nutrients.some((r) => activeIngredients.indexOf(r) >= 0);
      });

      const rawFinalRecipes = [...new Set([...filteredByDiet, ...filteredByNutrients])];
      const finalRecipes = rawFinalRecipes.length ? rawFinalRecipes : recipes;

      const resultRecipes = filteredBySearch.filter((el) => finalRecipes.includes(el));

      setShowContent(resultRecipes);
    } else {
      setShowContent(recipes);
    }
  }, [filters, recipes, activatedTags, ingredients, search]);

  return (
    <LayoutWrapper>
      <Heading variant="H1">Recetas</Heading>
      <Box alignItems="center" justifyContent="center" p={4}>
        <Stack>
          <UIInput
            placeholder="Buscar recetas"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Stack>
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
          ml="20px"
          variant="secondary"
          onClick={() =>
            setFilters([user.diet, user.target]) &
            setActivatedTags([user.diet, user.target])
          }
        >
          Show my diet
        </Button>
        <Button
          ml="10px"
          variant="secondary"
          onClick={() => setFilters([]) & setActivatedTags([])}
        >
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
