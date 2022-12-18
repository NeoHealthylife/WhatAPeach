import React from "react";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";
import { Heading, Center } from "@chakra-ui/react";
import getProfile from "./getProfile";
import { useEffect, useState, useContext, createContext } from "react";
import { GiDividedSquare } from "react-icons/gi";

const Profile = () => {
  const [profile, setProfile] = useState([])

  useEffect(() => {
    getProfile("profile").then((res) => setProfile(res));
  }, []);
  return (
    <LayoutWrapper>
      <Center>
        <Heading variant="H1">PERFIL</Heading>
        <h2>{profile.nickname}</h2>
        <h2>{profile.diet}</h2>
      </Center>
    </LayoutWrapper>
  );
};

export default Profile;
