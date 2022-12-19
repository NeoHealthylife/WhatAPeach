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

const Workouts = () => {
  const { user } = useContext(GlobalContext);
  const [workouts, setWorkouts] = useState([]);
  const [activatedTags, setActivatedTags] = useState([user.diet, user.target]);
  const [showContent, setShowContent] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([user.target]);
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

  const partsToDisplay = [
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671411712/culo_r7ppfo.png",
      name: "Glúteos",
      isChecked: false,
    },
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671412286/hombro_2_abudra.png",
      name: "Hombros",
      isChecked: false,
    },
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671411854/espalda_fq5fc3.png",
      name: "Espalda",
      isChecked: false,
    },
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671411854/pierna_rug3wu.png",
      name: "Piernas",
      isChecked: false,
    },
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671411854/cuadriceps_xhjdq9.png",
      name: "Cuádriceps",
      isChecked: false,
    },
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671412092/pecho_mx1nys.png",
      name: "Pecho",
      isChecked: false,
    },
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671411853/brazo_ac0xid.png",
      name: "Brazos",
      isChecked: false,
    },
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671411854/cardio_1_duunsv.png",
      name: "Cardio",
      isChecked: false,
    },
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671411855/definicion_ulnqqx.png",
      name: "Definición",
      isChecked: false,
    },
    {
      img: "https://res.cloudinary.com/drh0lkvxh/image/upload/v1671411854/volumen_qrthwb.png",
      name: "Volumen",
      isChecked: false,
    },
  ];

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
          workout.title.toLowerCase().includes(search.toLocaleLowerCase()) ||
          materials.toLowerCase().includes(search.toLocaleLowerCase())
        );
      });

      const filteredByTarget = workouts.filter((workout) => {
        return workout.tags.includes(filters[0]);
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
      <Heading variant="H1">Workouts</Heading>
      <Box alignItems="center" justifyContent="center" p={4}>
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
        >
          <Heading variant="H2" mr="50px">
            Workouts para...
          </Heading>
          {partsToDisplay.map(({ img, name, isChecked }) => (
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
        <Button variant="secondary" onClick={() => setFilters([user.target])}>
          Show my target
        </Button>
        <Button variant="secondary" onClick={() => setFilters([])}>
          Show all
        </Button>
      </Box>
      {showContent.length ? (
        <GridUI items={showContent} type="workout" section="favorite" />
      ) : (
        <>Aun no tienes workouts sugeridas por el sistema. Prueba a buscar una!</>
      )}
    </LayoutWrapper>
  );
};

export default Workouts;
