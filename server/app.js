import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import messages from "./routers/messages.route.js";
import foodRoute from "./routers/foods.route.js";
import categoryRoute from "./routers/categories.route.js";
import blogRoute from "./routers/blogs.route.js";
import userRoute from "./routers/users.route.js";
import customerRoute from "./routers/customers.route.js";
import orderRoute from "./routers/orders.route.js";
import revenueRoute from "./routers/revenue.route.js";
import customerLogin from "./routers/customerLogin.route.js";
import adminLogin from "./routers/adminLogin.route.js";
import manLogin from "./routers/manLogin.route.js";
import deliveryMenRoute from "./routers/deliveryMen.route.js";

import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

// CORS FIX
app.use(cors({
  origin: [
    "https://mfd-mohit-food-delivery-1.onrender.com"
  ],
  credentials: true
}));
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ---------------- ADMIN APIs ---------------- */

app.use("/api/admin/messages", messages);

app.use("/api/admin/foods", foodRoute);

app.use("/api/admin/categories", categoryRoute);

app.use("/api/admin/blogs", blogRoute);

app.use("/api/admin/users", userRoute);

app.use("/api/admin/customers", customerRoute);

app.use("/api/admin/delivery-men", deliveryMenRoute);

app.use("/api/admin/orders", orderRoute);

app.use("/api/admin/revenue", revenueRoute);

/* ---------------- LOGIN APIs ---------------- */

app.use("/api/admin/customerlogin", customerLogin);

app.use("/api/admin/manlogin", manLogin);

app.use("/api/admin/adminlogin", adminLogin);

/* ---------------- STATIC FILES ---------------- */

app.use("/default", express.static("uploads/default"));
app.use("/foods", express.static("uploads/foods"));
app.use("/categories", express.static("uploads/categories"));
app.use("/orders", express.static("uploads/orders"));
app.use("/blogs", express.static("uploads/blogs"));
app.use("/users", express.static("uploads/users"));
app.use("/customers", express.static("uploads/customers"));
app.use("/delivery-men", express.static("uploads/delivery-men"));

/* ---------------- ROOT ---------------- */

app.get("/", (req, res) => {
  res.send("<h1>App is running...</h1>");
});

/* ---------------- ERROR HANDLING ---------------- */

app.use((req, res, next) => {
  res.status(404).json({
    message: "Router Not Found!",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Something broken!",
  });
});

export default app;