import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../common/header/title/PageHeader";
import "./login.css";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = {
        email,
        password,
      };

      console.log("Sending login request...");

      const response = await axios.post(
        "https://mfd-mohit-food-delivery.onrender.com/api/admin/customerlogin",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);

      if (response.data.message === "Email doesn't exist.") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email doesn't exist.",
        });
      } else if (response.data.message === "Password doesn't match.") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password doesn't match.",
        });
      } else {
        // ✅ Set Cookies
        Cookies.set("customer", response.data.customer._id, {
          expires: 30,
        });
        Cookies.set("customerName", response.data.customer.name, {
          expires: 30,
        });

        Swal.fire({
          icon: "success",
          text: response.data.message,
          showConfirmButton: false,
          timer: 800,
        });

        // ✅ Redirect
        window.location.href = "/customer/dashboard/";
      }
    } catch (error) {
      console.log("Login Error:", error.response?.data || error.message);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <>
      <PageHeader title="Login" />

      <section className="login">
        <div className="container">
          <div className="login-form text-center">
            {Cookies.get("customer") ? (
              <h3>You are already logged in.</h3>
            ) : (
              <div>
                <form onSubmit={submitHandler}>
                  <img
                    src={
                      "https://mfd-mohit-food-delivery.onrender.com/default/avatar.png"
                    }
                    alt="avatar"
                  />

                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email..."
                    required
                  />

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password..."
                    required
                  />

                  <input
                    type="submit"
                    name="submit"
                    value="Login"
                    className="btn-primary"
                  />
                </form>

                <Link to="/registration">Create Account</Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;