import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Title from "../common/title/Title";

const ChangeDetails = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [currentThumb, setCurrentThumb] = useState("");

  const id = Cookies.get("admin");

  // GET ADMIN DETAILS
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get(
          `https://mfd-mohit-food-delivery-1.onrender.com/api/admin/users/${id}`
        );

        const data = res.data;

        setName(data.name);
        setUsername(data.username);
        setEmail(data.email);
        setPhone(data.phone);
        setAddress(data.address);
        setCurrentThumb(data.thumb);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchAdmin();
    }
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const updateData = {
        name,
        username,
        phone,
        address,
        thumb: currentThumb,
      };

      const response = await axios.put(
        `https://mfd-mohit-food-delivery-1.onrender.com/api/admin/users/${id}`,
        updateData
      );

      Swal.fire({
        icon: "success",
        text: response.data.message,
        showConfirmButton: false,
        timer: 800,
      });

      window.location.href = "/profile";
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Update failed!",
      });
    }
  };

  return (
    <section className="profile content">
      <Title title="Change Details" />

      <div className="profile-content">
        <form onSubmit={submitHandler}>
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="text"
            className="form-control"
            value={email}
            readOnly
          />

          <label>Phone</label>
          <input
            type="tel"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label>Address</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <button type="submit" className="btn-primary">
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChangeDetails;