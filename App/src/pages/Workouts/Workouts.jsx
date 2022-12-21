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
import { bodyPartsToDisplay } from "../../utils/tagsFilters";

const tags = ["perder peso", "musculación", "definición"];

const Workouts = () => {
  const { user } = useContext(GlobalContext);
  const [workouts, setWorkouts] = useState([]);
  const [activatedTags, setActivatedTags] = useState([user.target]);
  const [showContent, setShowContent] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([user.target, user.equipment]);
  const [parts, setParts] = useState({
    Core: false,
    Glúteos: false,
    Hombros: false,
    Espalda: false,
    Piernas: false,
    Cuádriceps: false,
    Pecho: false,
    Brazos: false,
    Cardio: false,
    Definición: false,
    Volumen: false,
  });

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setParts({ ...parts, [value]: checked });
  };

  useEffect(() => {
    API.get("/workouts").then((res) => setWorkouts(res.data.data.workouts));
  }, []);

  useEffect(() => {
    const activeParts = Object.keys(parts)
      .filter((key) => parts[key] === true)
      .map((ing) => ing.toLowerCase());

    if (filters.length || activeParts.length || search !== "") {
      const filteredBySearch = workouts.filter((workout) => {
        const materials = workout.material.toString();

        return (
          workout.title.toLowerCase().includes(search.toLowerCase()) ||
          materials.toLowerCase().includes(search.toLowerCase())
        );
      });

      const filteredByTarget = workouts.filter((workout) => {
        return workout.tags.includes(filters[0]) || workout.equipment == filters[1];
      });

      const filteredByParts = workouts.filter((workout) => {
        return workout.tags.some((r) => activeParts.indexOf(r) >= 0);
      });

      const rawWorkouts = [...new Set([...filteredByTarget, ...filteredByParts])];
      const finalWorkouts = rawWorkouts.length ? rawWorkouts : workouts;

      const resultWorkouts = filteredBySearch.filter((el) => finalWorkouts.includes(el));

      setShowContent(resultWorkouts);
    } else {
      setShowContent(workouts);
    }
  }, [filters, workouts, activatedTags, parts, search]);

  return (
    <LayoutWrapper>
      <Box alignItems="center" justifyContent="center" p={4}>
        <Heading textAlign="center" display={{ base: "block", md: "none" }}>
          Workouts
        </Heading>
        <Stack>
          <UIInput
            placeholder="Buscar workouts"
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
          my={{ base: "10px", md: "20px" }}
        >
          <Heading variant="H2" mr="50px" mt={{ base: "20px", md: "0px" }}>
            Workouts para...
          </Heading>
          <Box textAlign="center">
            {bodyPartsToDisplay.map(({ img, name, isChecked }) => (
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
                m="5px"
                minWidth={{ base: "150px", md: "unset" }}
              >
                <Flex alignItems="center">
                  <Image
                    borderRadius="full"
                    bg="whiteAlpha.600"
                    boxSize={{ base: "20px", md: "35px" }}
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
          </Box>
        </Stack>
      </Box>
      <Box display={{ base: "block", md: "flex" }}>
        <Box>
          <Button
            ml="35px"
            variant="secondary"
            onClick={() => setFilters([user.target]) & setActivatedTags([user.target])}
          >
            Show my target
          </Button>
          <Button
            ml="10px"
            variant="secondary"
            onClick={() => setFilters([]) & setActivatedTags([])}
          >
            Show all
          </Button>
        </Box>

        <Box pt="10px">
          {tags.map((tag) => (
            <UISpan
              key={tag}
              variant="tag"
              className={activatedTags.includes(tag) ? "allMarked" : ""}
            >
              {tag}
            </UISpan>
          ))}
        </Box>
      </Box>
      {showContent.length ? (
        <GridUI items={showContent} type="workout" showFavorite />
      ) : (
        <Box mt="50px" ml="20px">
          <Heading variant="H3">
            {" "}
            Aun no tienes workouts sugeridos por el sistema 😕. Prueba a buscar uno!
          </Heading>
        </Box>
      )}
    </LayoutWrapper>
  );
};

export default Workouts;
