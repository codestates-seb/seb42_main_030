import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
const TOKEN = process.env.REACT_APP_USER_TOKEN;

export const BASE_API = axios.create({
  baseURL: BASE_URL,
});

export const TOKEN_API = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});
