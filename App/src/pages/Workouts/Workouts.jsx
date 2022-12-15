import React, { useContext } from "react";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";
import { useEffect, useState, createContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { API } from "../../services/API";
import { Heading } from "@chakra-ui/react";
import GridUI from "../../components/UIComponents/GridUI";

const Workouts = () => {
  const [workouts, setWorkout] = useState([]);
  const { user } = useContext(GlobalContext);

  useEffect(() => {
    API.get("/workouts").then((res) => setWorkout(res.data.data.workouts));
  }, []);

  return (
    <LayoutWrapper>
      <Heading variant="H1">Workouts</Heading>
      <GridUI items={workouts} type="workout" />
    </LayoutWrapper>
  );
};

export default Workouts;
