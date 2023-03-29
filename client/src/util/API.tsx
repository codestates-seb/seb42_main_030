import axios from "axios";

const BASE_URL = "http://ec2-15-164-230-157.ap-northeast-2.compute.amazonaws.com:8080";
const TOKEN = `eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoibGltMDFAbmF2ZXIuY29tIiwic3ViIjoibGltMDFAbmF2ZXIuY29tIiwiaWF0IjoxNjgwMDEzNzk1LCJleHAiOjE2ODA2MTM3OTV9.body8FyruMs9D2irxq4RAC1iuDaDxKAeY8ge5saoPKHizvPNijngWWLF_VQVVEUA-W72xJUIdYzqPe8NId52ug`;

export const BASE_API = axios.create({
  baseURL: BASE_URL,
});

export const TOKEN_API = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});
