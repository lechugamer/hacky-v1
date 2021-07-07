import axios from "axios";

export const myAxios = ({ method, url, data }) => {
  const token = localStorage.getItem("devschooltoken");
  return axios({
    baseURL: "https://dev-school-back.herokuapp.com/api",
    url,
    method,
    data,
    headers: {
      "x-token": token,
    },
  });
};
