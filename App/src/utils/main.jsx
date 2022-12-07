import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GlobalContextProvider } from "./context/GlobalContext";
import NotFound from "./pages/404";
import Login from "./pages/Login/login";
import Register from "./pages/Register/Register";
import Recipes from "./pages/Recipes/Recipes";
import Workouts from "./pages/Workouts/Workouts";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="profile"element={<Profile />} />
            <Route path="workouts"element={<Workouts />} />
            <Route path="workouts/:id" element={<WorkoutCard />} />
            <Route path="recipes"element={<Recipes />} />
            <Route path="recipes/:id"element={<RecipeCard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  </React.StrictMode>
);
