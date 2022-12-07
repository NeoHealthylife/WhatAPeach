import axios from "axios";
import { useContext } from "react";

import GlobalContext from "../../context/GlobalContext";

export const loginUser = async (user) => {
  const { setJwt, setUser } = useContext(GlobalContext);
  const navigate = useNavigate();
  try {
    return axios({
      method: "post",
      url: `http://localhost:3000/api/users/login`,
      data: user, //esto me hace post del nickname y de la password ?
    }).then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      setJwt(res.data.token);
      setUser(res.data.user);
      (res.data.token) {
        navigate("/dashboard");
    });
  } catch (error) {
    console.log(error);
  }
};
