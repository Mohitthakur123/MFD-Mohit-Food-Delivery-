import axios from "axios";

const api = axios.create({
  baseURL: "https://mfd-mohit-food-delivery.onrender.com",
});

export default api;