import axios from "axios";

const mainURL = axios.create({
  baseURL: "https://liderlux-two.vercel.app/api",
  // baseURL: "http://localhost:8080/api",
});

export default mainURL;
