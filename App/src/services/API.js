import axios from "axios";

export const loginUser = async (user) => {
  try {
    return axios({
      method: "post",
      url: `http://localhost:3000/api/users/login`,
      data: user, //esto me hace post del nickname y de la password ?
    }).then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", JSON.stringify(res.data.token));
    });
  } catch (error) {
    console.log(error);
  }
};
