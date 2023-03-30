import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
const TOKEN = localStorage.getItem("login-token");

export const BASE_API = axios.create({
  baseURL: BASE_URL,
});

export const TOKEN_API = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: TOKEN,
  },
});

export const YOUTUBE_API = axios.create({
  baseURL: `https://www.googleapis.com/youtube/v3/videos`,
});
