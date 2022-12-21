import React from "react";
import { useEffect, useState } from "react";
import CardList from "../../components/CardList";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";
import { API } from "../../services/API";
import { Box, Heading, Text } from "@chakra-ui/react";
import { TiInputChecked, TiInputCheckedOutline } from "react-icons/ti";
import { GiChewedHeart } from "react-icons/gi";

export const MyRecipes = () => {
  const [profile, setProfile] = useState({});
  const [changeValue, setChangeValue] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const initialValue = JSON.parse(savedUser);
    const userId = initialValue._id;
    API.get(`/users/${userId}`).then((res) => setProfile(res.data));
  }, [changeValue]);

  return (
    <LayoutWrapper>
      <Heading
        variant="H3"
        display="flex"
        alignItems="center"
        borderRadius="5px"
        h="50px"
      >
        <GiChewedHeart size="25px" /> Favoritas
      </Heading>
      {profile.favRecipes?.length !== 0 ? (
        <CardList
          showFavorite
          width="250px"
          heigth="360px"
          items={profile.favRecipes}
          type="recipe"
          setChangeValue={setChangeValue}
        />
      ) : (
        <Text>Añade tus recetas</Text>
      )}
      <Heading
        variant="H3"
        display="flex"
        alignItems="center"
        pt="25px"
        mb="15px"
        borderRadius="5px"
        h="50px"
      >
        <TiInputCheckedOutline size="40px" /> Pendientes
      </Heading>
      {profile.toDoRecipes?.length !== 0 ? (
        <CardList
          width="250px"
          heigth="360px"
          items={profile.toDoRecipes}
          type="recipe"
        />
      ) : (
        <Text>Añade tus recetas</Text>
      )}
      <Heading
        variant="H3"
        display="flex"
        alignItems="center"
        pt="25px"
        mb="15px"
        borderRadius="5px"
        h="50px"
      >
        <TiInputChecked size="40px" /> Completadas
      </Heading>
      {profile.completedRecipes?.length !== 0 ? (
        <CardList
          width="250px"
          heigth="360px"
          items={profile.completedRecipes}
          type="recipe"
        />
      ) : (
        <Text>Añade tus recetas</Text>
      )}
    </LayoutWrapper>
  );
};
