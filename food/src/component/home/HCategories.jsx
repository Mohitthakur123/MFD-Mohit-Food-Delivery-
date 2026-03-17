import axios from "axios";
import React, { useEffect, useState } from "react";
import Title from "../common/header/title/Title";
import { Link } from "react-router-dom";

const HCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fatchCategories = async () => {
      try {
        const { data } = await axios.get(
          "https://mfd-mohit-food-delivery.onrender.com/api/admin/categories"
        );

        const featuredCategories = data.filter((curData) => {
          return curData.featured.toLowerCase() === "on";
        });

        setCategories(featuredCategories);
      } catch (error) {
        console.log("Category Error:", error.response?.data || error.message);
      }
    };

    fatchCategories();
  }, []); // ✅ FIXED (no infinite loop)

  return (
    <>
      <section className="categories padding">
        <div className="container">
          <Title subtitle="Our Categories" title="Explore Foods Categories" />
        </div>

        <div className="container grid-4">
          {categories.length === 0 ? (
            <h3 className="text-center">No items found!</h3>
          ) : (
            categories.slice(0, 4).map((item, index) => (
              <div key={index} className="items shadow">
                <Link to={"/category-food/" + item.title}>
                  <div className="box-3 float-container">
                    <div className="category-thumb text-center">
                      <img
                        src={
                          "https://mfd-mohit-food-delivery.onrender.com/categories/" +
                          item.thumb
                        }
                        alt={item.title}
                        className="img-responsive img-curve"
                      />
                    </div>

                    <div className="category-title text-center">
                      <h4 className="float-text text-white">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default HCategories;