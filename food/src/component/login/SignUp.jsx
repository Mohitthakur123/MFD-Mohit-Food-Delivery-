import React, { useState } from "react";
import PageHeader from "../common/header/title/PageHeader";
import "./login.css";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== conPassword) {
      Swal.fire({
        icon: "error",
        text: "Confirm password doesn't match.",
      });
      return;
    }

    try {
      const data = {
        name,
        email,
        password,
        phone,
        address,
      };

      console.log("Sending register request...");

      const response = await axios.post(
        "https://mfd-mohit-food-delivery.onrender.com/api/admin/customers",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);

      if (response.data.message === "Registration successfull.") {
        // ✅ Set Cookies
        Cookies.set("customer", response.data.data._id, {
          expires: 30,
        });
        Cookies.set("customerName", response.data.data.name, {
          expires: 30,
        });

        Swal.fire({
          icon: "success",
          text: response.data.message,
          showConfirmButton: false,
          timer: 800,
        });

        // ✅ Redirect
        window.location.href = "/customer/dashboard";
      } else if (response.data.message === "Already registered.") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.message,
        });
      }
    } catch (error) {
      console.log("Register Error:", error.response?.data || error.message);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <>
      <PageHeader title="Registration" />

      <section className="login">
        <div className="container">
          <div className="login-form text-center">
            <form onSubmit={submitHandler}>
              <img
                src={
                  "https://mfd-mohit-food-delivery.onrender.com/default/avatar.png"
                }
                alt="avatar"
              />

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name..."
                required
              />

              <input
                type="email"
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
                type="password"
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
                placeholder="Confirm password..."
                required
              />

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone..."
                required
              />

              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address..."
                required
              />

              <input
                type="submit"
                value="Registration"
                className="btn-primary"
              />
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;