import axios from "axios";

export const api = axios.create({
  baseURL: "https://gym-ai-backend-tg6k.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
