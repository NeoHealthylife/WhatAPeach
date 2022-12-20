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
import { nutrientsToDisplay } from "../../utils/tagsFilters";

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
        return recipe.title.toLowerCase().includes(search.toLowerCase());
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
              bg="whiteAlpha.600"
            >
              <Flex alignItems="center">
                <Image
                  borderRadius="full"
                  bg="whiteAlpha.600"
                  boxSize="35px"
                  src={img}
                  alt={name}
                  mr={2}
                />
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
