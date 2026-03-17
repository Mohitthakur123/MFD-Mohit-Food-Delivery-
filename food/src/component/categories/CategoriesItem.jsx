import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import ReactPaginate from "react-paginate";

const CategoriesItem = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/api/admin/categories");
        setCategories(data);
      } catch (error) {
        console.log("Category Error:", error.response?.data || error.message);
      }
    };
    fetchCategories();
  }, []);

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = categories.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(categories.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % categories.length;
    setItemOffset(newOffset);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="grid-4">
        {currentItems.length === 0 ? (
          <h3 className="text-center">No items found!</h3>
        ) : (
          currentItems.map((item) => (
            <div className="items shadow" key={item._id}>
              <Link to={"/category-food/" + item.title}>
                <div className="box-3 float-container">
                  <div className="category-thumb text-center">
                    <img
                      src={`https://mfd-mohit-food-delivery.onrender.com/categories/${item.thumb?.replace(
                        "uploads/categories/",
                        ""
                      )}`}
                      alt={item.title}
                      className="img-responsive img-curve"
                    />
                  </div>

                  <div className="category-title text-center">
                    <h4 className="float-text text-white">{item.title}</h4>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>

      {categories.length >= 13 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<<"
          containerClassName="pagination"
        />
      )}
    </>
  );
};

export default CategoriesItem;