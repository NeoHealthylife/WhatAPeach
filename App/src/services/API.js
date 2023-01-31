import axios from "axios";

const apiHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: {
    toString() {
      return `Bearer ${localStorage.getItem("token")}`;
    },
  },
};

export const API = axios.create({
  headers: apiHeaders,
  timeout: 6000,
  baseURL: "http://localhost:3000/api",
});
