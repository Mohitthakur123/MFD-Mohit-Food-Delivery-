import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = "https://mfd-mohit-food-delivery-1.onrender.com";

const Profile = () => {

  // GET CUSTOMER ID FROM COOKIE
  const id = Cookies.get("customer");

  const [customer, setCustomer] = useState({});

  // FETCH CUSTOMER DATA
  useEffect(() => {

    if (!id) return;

    const fetchCustomer = async () => {
      try {
        const { data } = await axios.get(`/api/admin/customers/${id}`);
        setCustomer(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCustomer();

  }, [id]);

  // CUSTOMER LOGOUT
  const customerLogout = () => {
    Cookies.remove("customer");
    Cookies.remove("customerName");
    window.location.href = "/";
  };

  return (
    <>
      <div className="dashboard-content-inner grid-2">

        <div className="grid-2">

          {/* PROFILE IMAGE */}
          <div className="img">
            <img
              src={
                customer?.thumb
                  ? `${BASE_URL}/customers/${customer.thumb}`
                  : `${BASE_URL}/default/avatar.png`
              }
              alt={customer.name || "avatar"}
            />
          </div>

          {/* PROFILE TEXT */}
          <div className="profile-text">

            <h4>
              <i className="fa fa-user"></i> {customer.name}
            </h4>

            <p>
              <i className="fa fa-user-plus"></i>{" "}
              {customer.date && moment(customer.date).format("ll")}
            </p>

            <p>
              <i className="fa fa-envelope"></i> {customer.email}
            </p>

            <p>
              <i className="fa fa-phone"></i> {customer.phone}
            </p>

            <p>
              <i className="fa fa-location-dot"></i> {customer.address}
            </p>

          </div>
        </div>

        {/* PROFILE MENU */}
        <div>
          <ul>

            <li>
              <Link to="/customer/dashboard" className="btn-primary">
                Dashboard
              </Link>
            </li>

            <li>
              <Link to="/customer/change-details" className="btn-primary">
                Change Details
              </Link>
            </li>

            <li>
              <Link
                to="/customer/change-profile-picture"
                className="btn-primary"
              >
                Change Profile Picture
              </Link>
            </li>

            <li>
              <Link to="/customer/change-password" className="btn-primary">
                Change Password
              </Link>
            </li>

            <li>
              <Link
                onClick={customerLogout}
                className="btn-primary"
              >
                Logout
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </>
  );
};

export default Profile;