import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import CardList from "../../components/CardList";
import { API } from "../../services/API";

const DashboardCards = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardStyled = styled(NavLink)`
  width: 600px;
  height: 380px;
  background-size: 100%;
  background-repeat: no-repeat;
  margin: 50px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fe9066;
  font-size: xx-large;

  &.recipes {
    background-image: url("https://res.cloudinary.com/drh0lkvxh/image/upload/v1671276369/HealthyLife/recipes_utbxbb.jpg");
  }
  &.workouts {
    background-image: url("https://res.cloudinary.com/drh0lkvxh/image/upload/v1671276169/HealthyLife/workout2_wgipac.webp");
  }
`;
const HeadingStyled = styled.div`
  width: 500px;
  color: #384d62;
  font-size: xx-large;
  padding: 20px;
  display: flex;
  justify-content: center;
`;
const TextStyled = styled.div`
  width: 500px;
  color: #384d62;
  padding: 20px;
  display: flex;
  justify-content: center;
  font-size: medium;
`;
const CardTextStyled = styled.div`
  color: #fe9066;
  font-size: xx-large;
  margin-top: 2rem;
`;

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [workouts, setworkouts] = useState([]);

  useEffect(() => {
    API.get("/recipes").then((res) => setRecipes(res.data.data.recipes));
  }, []);

  useEffect(() => {
    API.get("/workouts").then((res) => setworkouts(res.data.data.workouts));
  }, []);

  return (
    <>
      <HeadingStyled>
        <h1>Bienvenidos a What a Peach! </h1>
      </HeadingStyled>
      <TextStyled>
        <h2>
          Existe una forma divertida de comer sano y mantenerse en forma. Haz click en los
          retos semanales y supérate en cada reto!
        </h2>
      </TextStyled>
      <DashboardCards>
        <CardStyled className="recipes" to="/recipes">
          Recetas
        </CardStyled>
        <CardStyled className="workouts" to="/workouts">
          Workouts
        </CardStyled>
      </DashboardCards>

      <CardTextStyled>Últimas recetas</CardTextStyled>
      <CardList width="250px" heigth="360px" items={recipes} type="recipe" />
      <CardTextStyled>Últimos workouts</CardTextStyled>
      <CardList width="250px" heigth="360px" items={workouts} type="workout" />
    </>
  );
};

export default Dashboard;
