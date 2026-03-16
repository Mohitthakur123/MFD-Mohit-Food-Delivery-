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
  const [currentThumb, setThumb] = useState("");

  // GET ADMIN DETAILS
  const id = Cookies.get("admin");

  useEffect(() => {
    const fetchAdmin = async () => {
      const { data } = await axios.get(
        `https://mfd-mohit-food-delivery-1.onrender.com/api/admin/users/${id}`
      );

      setName(data.name);
      setUsername(data.username);
      setEmail(data.email);
      setPhone(data.phone);
      setAddress(data.address);
      setThumb(data.thumb);
    };

    fetchAdmin();
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();

    let updateData = {
      name,
      username,
      phone,
      address,
      thumb: currentThumb,
    };

    axios
      .put(
        `https://mfd-mohit-food-delivery-1.onrender.com/api/admin/users/${id}?cthumb=${currentThumb}`,
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: response.data.message,
          showConfirmButton: false,
          timer: 500,
        });

        window.location.href = "/profile";
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Update failed!",
        });
      });
  };

  return (
    <>
      <section className="profile content">
        <Title title="Change Details" />

        <div className="profile-content">
          <form encType="multipart/form-data" onSubmit={submitHandler}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control text-bold"
              value={email}
              readOnly
            />

            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <input type="submit" className="btn-primary" value="Update" />
          </form>
        </div>
      </section>
    </>
  );
};

export default ChangeDetails;