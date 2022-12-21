import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CardList from "../../components/CardList";
import GlobalContext from "../../context/GlobalContext";
import { API } from "../../services/API";

const DashboardCards = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 3rem;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const CardStyled = styled.button`
  width: 100%;
  min-height: 200px;
  background-size: 120% 120%;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffdfd2;
  letter-spacing: 0.04cm;
  text-shadow: 4px 6px 5px rgba(0, 0, 0, 0.8);
  font-size: xx-large;
  margin-top: 2rem;
  text-align: center;

  :hover {
    box-shadow: 4px 10px 0 #fe9166;
    margin-top: 1.8rem;
    transition: 0.4s ease-in-out;
  }

  @media (min-width: 600px) {
    flex-direction: row;
    margin: 50px;
  }

  @media (min-width: 1600px) {
    width: 600px;
    height: 380px;
  }

  &.recipes {
    background-image: url("https://res.cloudinary.com/drh0lkvxh/image/upload/v1671493538/shutterstock_736615915_1_1_jnko6s.jpg");
  }
  &.workouts {
    background-image: url("https://res.cloudinary.com/drh0lkvxh/image/upload/v1671276169/HealthyLife/workout2_wgipac.webp");
  }
`;
export const HeadingStyled = styled.div`
  color: #384d62;
  font-size: 3rem;
  padding: 20px;
  display: flex;
  justify-content: center;
`;
const TextStyled = styled.div`
  color: #384d62;
  padding: 20px;
  display: flex;
  justify-content: center;
  font-size: medium;
`;
const CardTextStyled = styled.div`
  color: #fe9066;
  font-size: xx-large;
  margin: 2rem 0 1rem;
  padding-left: 75px;
  padding-top: 30px;
`;

const challengeHasExpired = (item, savedDate) => {
  const difference = new Date(savedDate) - new Date(); //esto me da la fecha de ahora mismo
  const totalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return totalDays > 7;
};

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [workouts, setworkouts] = useState([]);
  const { setItem } = useContext(GlobalContext);
  let navigate = useNavigate();

  useEffect(() => {
    API.get("/recipes").then((res) => setRecipes(res.data.data.recipes));
  }, []);

  useEffect(() => {
    API.get("/workouts").then((res) => setworkouts(res.data.data.workouts));
  }, []);

  const handleRecipeClick = () => {
    const savedRecipeString = localStorage.getItem("weekRecipe");
    const savedRecipeDateString = localStorage.getItem("weekRecipeDate");
    const savedRecipe = JSON.parse(savedRecipeString);
    const hasExpired = challengeHasExpired(savedRecipe, savedRecipeDateString);

    if (savedRecipe && !hasExpired) {
      setItem(savedRecipe);
    } else {
      const randNum = Math.floor(Math.random() * recipes.length);
      localStorage.setItem("weekRecipe", JSON.stringify(recipes[randNum]));
      localStorage.setItem("weekRecipeDate", new Date());
      setItem(recipes[randNum]);
    }
    navigate("/recipes/detail");
  };

  const handleWorkoutClick = () => {
    const savedWorkoutString = localStorage.getItem("weekWorkout");
    const savedWorkoutDateString = localStorage.getItem("weekWorkoutDate");
    const savedWorkout = JSON.parse(savedWorkoutString);
    const hasExpired = challengeHasExpired(savedWorkout, savedWorkoutDateString);

    if (savedWorkout && !hasExpired) {
      setItem(savedWorkout);
    } else {
      const randNum = Math.floor(Math.random() * workouts.length);
      localStorage.setItem("weekWorkout", JSON.stringify(workouts[randNum]));
      localStorage.setItem("weekWorkoutDate", new Date());
      setItem(workouts[randNum]);
    }
    navigate("/workouts/detail");
  };

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
        <CardStyled className="recipes" onClick={() => handleRecipeClick()}>
          Reto semanal de recetas
        </CardStyled>
        <CardStyled className="workouts" onClick={() => handleWorkoutClick()}>
          Reto semanal de workouts
        </CardStyled>
      </DashboardCards>

      <CardTextStyled>Últimas recetas</CardTextStyled>
      <CardList
        width="250px"
        heigth="360px"
        items={recipes}
        type="recipe"
        pb="100px"
        showFavorite
      />
      <CardTextStyled>Últimos workouts</CardTextStyled>
      <CardList
        width="250px"
        heigth="360px"
        items={workouts}
        type="workout"
        showFavorite
      />
    </>
  );
};

export default Dashboard;
