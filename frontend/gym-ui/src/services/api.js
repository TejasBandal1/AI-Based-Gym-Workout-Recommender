import axios from "axios";

export const api = axios.create({
  baseURL: "https://gym-ai-backend.onrender.com",
});
