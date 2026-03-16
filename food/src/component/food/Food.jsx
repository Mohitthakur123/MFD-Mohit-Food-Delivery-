import React, { useEffect, useState } from "react";
import PageHeader from "../common/header/title/PageHeader";
import FoodItem from "./FoodItem";
import "./food.css";
import axios from "axios";

const Food = () => {
  const [query, setQuery] = useState("");
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const { data } = await axios.get(`https://mfd-mohit-food-delivery-admin.onrender.com/api/admin/foods?q=${query}`);

        console.log(data);

        // your backend returns array
        setFoods(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFoods();
  }, [query]);

  return (
    <>
      <PageHeader title="Our Food Menu" />

      <section className="food">
        <div className="container text-center">
          <div className="search-food-form">
            <input
              type="search"
              name="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for Food.."
            />
          </div>
        </div>

        <div className="container">
          <FoodItem foods={foods} />
        </div>
      </section>
    </>
  );
};

export default Food;