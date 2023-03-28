import axios from "axios";

const BASE_URL = "http://ec2-15-164-230-157.ap-northeast-2.compute.amazonaws.com:8080";
const TOKEN = `eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoiZGRhZHpAbmF2ZXIuY29tIiwic3ViIjoiZGRhZHpAbmF2ZXIuY29tIiwiaWF0IjoxNjc5OTE3ODI3LCJleHAiOjE2ODA1MTc4Mjd9.InKMqa_ozFhKP-TNbUceA2nk3f9uPY5umYFxadKn-4uGgf4tW3nfbBDrK3nVXYLhu00ie1BExiJpeDCrFgX2RQ`;

export const BASE_API = axios.create({
  baseURL: BASE_URL,
});

export const TOKEN_API = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});
