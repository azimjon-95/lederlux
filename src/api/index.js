import axios from "axios";

const mainURL = axios.create({
  baseURL: "https://liderlux-two.vercel.app/api",
});

export default mainURL;
