import "./header.css";
import { Link } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";
import { useCart } from "react-use-cart";
import Cookies from "js-cookie";
import { useRef, useState, useEffect } from "react";
import api from "../../../api"; 

const BASE_URL = "https://mfd-mohit-food-delivery.onrender.com";

const Header = () => {

  const [siteTopNav, setSiteTopNav] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const cartRef = useRef();
  const menuRef = useRef();

  const { totalUniqueItems } = useCart();

  // NAVBAR SCROLL
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setSiteTopNav(false);
      } else {
        setSiteTopNav(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // CLOSE CART
  useEffect(() => {
    const handler = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setOpenCart(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  // CLOSE PROFILE
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  // CUSTOMER
  const customer_id = Cookies.get("customer");
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    if (!customer_id) return;

    const fetchCustomer = async () => {
      try {
        const { data } = await api.get(`/api/admin/customers/${customer_id}`);
        setCustomer(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCustomer();
  }, [customer_id]);

  // DELIVERY MAN
  const deliveryMan_id = Cookies.get("delivery-man");
  const [deliveryMan, setDeliveryMan] = useState({});

  useEffect(() => {
    if (!deliveryMan_id) return;

    const fetchDeliveryMan = async () => {
      try {
        const { data } = await api.get(`/api/admin/delivery-men/${deliveryMan_id}`);
        setDeliveryMan(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDeliveryMan();
  }, [deliveryMan_id]);

  // LOGOUT
  const customerLogout = () => {
    Cookies.remove("customer");
    Cookies.remove("customerName");
    window.location.href = "/";
  };

  const deliveryManLogout = () => {
    Cookies.remove("delivery-man");
    window.location.href = "/";
  };

  return (
    <header className="navbar">
      <nav
        id="site-top-nav"
        className={`navbar-menu navbar-fixed-top ${siteTopNav && "site-top-nav"}`}
      >
        <div className="container">

          {/* LOGO */}
          <div className="logo">
            <Link to="/">
              <img
                src={`${BASE_URL}/default/logo.png`}
                alt="Restaurant Logo"
                className="img-responsive"
              />
            </Link>
          </div>

          <div id="menu" className="menu text-right">
            <ul>

              <li><Link to="/">Home</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/foods">Food</Link></li>
              <li><Link to="/orders">Order</Link></li>
              <li><Link to="/blogs">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>

              {!Cookies.get("customer") && (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}

              {/* CART */}
              <li ref={cartRef}>
                <Link
                  onClick={() => setOpenCart(!openCart)}
                  className="shopping-cart"
                >
                  <i className="fa fa-cart-arrow-down"></i>
                  <span className="notify">{totalUniqueItems}</span>
                </Link>

                <div className={`cart-content ${openCart ? "active" : "inactive"}`}>
                  <h3 className="text-center">Shopping Cart</h3>
                  <ShoppingCart />
                </div>
              </li>

              {/* CUSTOMER PROFILE */}
              {Cookies.get("customer") && (
                <li ref={menuRef}>
                  <Link
                    className="customer-profile-pic"
                    onClick={() => setOpenProfile(!openProfile)}
                  >
                    <div className="img">
                      <img
                        src={
                          customer?.thumb
                            ? `${BASE_URL}/customers/${customer.thumb}`
                            : `${BASE_URL}/default/avatar.png`
                        }
                        alt="avatar"
                      />
                    </div>
                  </Link>

                  <div className={`customer-profile-content ${openProfile ? "active" : "inactive"}`}>
                    <ul>
                      <li>
                        <Link to="/customer/dashboard">
                          <i className="fa-solid fa-gauge"></i> Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link onClick={customerLogout}>
                          <i className="fa-solid fa-right-from-bracket"></i> Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              )}

              {/* DELIVERY MAN PROFILE */}
              {Cookies.get("delivery-man") && (
                <li ref={menuRef}>
                  <Link
                    className="customer-profile-pic"
                    onClick={() => setOpenProfile(!openProfile)}
                  >
                    <div className="img">
                      <img
                        src={
                          deliveryMan?.thumb
                            ? `${BASE_URL}/delivery-men/${deliveryMan.thumb}`
                            : `${BASE_URL}/default/avatar.png`
                        }
                        alt="avatar"
                      />
                    </div>
                  </Link>

                  <div className={`customer-profile-content ${openProfile ? "active" : "inactive"}`}>
                    <ul>
                      <li>
                        <Link to="/delivery-man/dashboard">
                          <i className="fa-solid fa-gauge"></i> Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link onClick={deliveryManLogout}>
                          <i className="fa-solid fa-right-from-bracket"></i> Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              )}

            </ul>
          </div>

          <div className="clearfix"></div>
        </div>
      </nav>
    </header>
  );
};

export default Header;