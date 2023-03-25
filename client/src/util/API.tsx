import axios from "axios";

const BASE_URL = "http://ec2-15-164-230-157.ap-northeast-2.compute.amazonaws.com:8080";

export const BASE_API = axios.create({
  baseURL: BASE_URL,
});
