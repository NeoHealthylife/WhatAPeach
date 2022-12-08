import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { GlobalContextProvider } from "./context/GlobalContext";
import NotFound from "./pages/404";
import Form from "./pages/Form/Form";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/login";
import Profile from "./pages/Profile/Profile";
import Recipes from "./pages/Recipes/Recipes";
import Register from "./pages/Register/Register";
import Workouts from "./pages/Workouts/Workouts";
import Favorites from "./pages/Favorites/Favorites";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="register/form" element={<Form />} />
            <Route path="profile" element={<Profile />} />
            <Route path="workouts" element={<Workouts />} />
            <Route path="recipes" element={<Recipes />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </GlobalContextProvider>
  </React.StrictMode>,
);
