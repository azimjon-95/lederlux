import axios from "axios";

const mainURL = axios.create({
  // baseURL: "https://liderlux-two.vercel.app/api",
  baseURL: "https://liderlux.teknik.uz/api",
});

export default mainURL;
