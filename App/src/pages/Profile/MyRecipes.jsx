import React, { useContext } from "react";
import { useEffect, useState, createContext } from "react";
import { useParams } from "react-router-dom";
import CardList from "../../components/CardList";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";
import GlobalContext from "../../context/GlobalContext";
import { API } from "../../services/API";

export const MyRecipes = () => {
  const [profile, setProfile] = useState({});

  const savedUser = localStorage.getItem("user");
  const initialValue = JSON.parse(savedUser);
  const userId = initialValue._id;

  useEffect(() => {
    API.get(`/users/${userId}`).then((res) => setProfile(res.data));
  }, []);
  console.log(profile);
  return (
    <LayoutWrapper>
      {profile.favRecipes.length && profile.favRecipes.map((item) => (
 
            <p >{item.title}</p>
       
      ))
    }
     
    </LayoutWrapper>
  );
};
