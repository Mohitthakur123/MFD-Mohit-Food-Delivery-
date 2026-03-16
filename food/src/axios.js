import axios from "axios";

const instance = axios.create({
  baseURL: "https://mfd-mohit-food-delivery-1.onrender.com",
});

export default instance;