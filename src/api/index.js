import axios from "axios";

const mainURL = axios.create({
  // baseURL: "https://liderlux-two.vercel.app/api",
  baseURL: "https://liderlux.teknik.uz/api",
  // baseURL: "http://localhost:5050/api",
});

export default mainURL;
