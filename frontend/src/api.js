import axios from "axios";

const api = axios.create({
  baseURL: "https://blood-bank-q42a.onrender.com/api",
});

export default api;
