import express from "express";
import Users from "../models/user.model.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// ADMIN LOGIN
router.post("/", async (req, res) => {
  try {

    const { email, password } = req.body;

    console.log("LOGIN REQUEST:", email);

    const admin = await Users.findOne({ email });

    if (!admin) {
      return res.json({
        message: "Email doesn't exist."
      });
    }

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return res.json({
        message: "Password doesn't match."
      });
    }

    res.json({
      admin,
      message: "Login success."
    });

  } catch (error) {

    console.log("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Server error."
    });

  }
});

export default router;