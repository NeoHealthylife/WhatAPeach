import axios from "axios";
//HEADER
const apiHeaders= {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: {
    toString() {
      return `Bearer ${localStorage.getItem("token")}`;
    },
  },
}

export const API = axios.create ({
  headers: apiHeaders, 
  timeout: 6000,
  baseURL: 'http://localhost:3000/api'
})



/* export const loginUser = async (user) => {
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
}; */






