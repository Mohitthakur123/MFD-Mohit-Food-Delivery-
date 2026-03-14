import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";
import Rating from "../common/rating/Rating";
import ReactPaginate from "react-paginate";

const FoodItem = ({ foods }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = foods.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(foods.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % foods.length;
    setItemOffset(newOffset);

    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const { addItem } = useCart();

  const addItemHandler = (item, id) => {
    item.id = id;
    addItem(item);

    Swal.fire({
      icon: "success",
      text: item.title + " Added.",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return (
    <>
      <div className="grid-4">
        {currentItems.length === 0 ? (
          <h3 className="text-center">No items found!</h3>
        ) : (
          currentItems.map((item) => (
            <div key={item._id} className="items shadow">
              <div className="img">
                <Link to={"/foods/" + item._id}>
                  <img
                    src={"/img/food/" + item.thumb}
                    alt={item.title}
                    className="img-responsive img-curve"
                  />
                </Link>
              </div>

              <div className="text text-center">
                <h4>
                  <Link to={"/foods/" + item._id}>{item.title}</Link>
                </h4>

                <h5>
                  <Rating rating={item.rating} />
                  <span>({item.totalReviews})</span>
                </h5>

                <p>
                  {item.description
                    ? item.description.slice(0, 50)
                    : "No description"}
                  ...
                </p>

                <h5>₹ {item.price}</h5>

                <div className="flexSB">
                  <Link to={"/foods/" + item._id} className="btn-primary">
                    <i className="fas fa-eye"></i> View Detail
                  </Link>

                  {item.active === "on" ? (
                    <button
                      className="btn-primary"
                      onClick={() => addItemHandler(item, item._id)}
                    >
                      <i className="fas fa-shopping-cart"></i> Add To Cart
                    </button>
                  ) : (
                    <button className="btn-primary disableLink">
                      <i className="fas fa-shopping-cart"></i> Stock Out
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {foods.length >= 13 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          previousLabel="<<"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          containerClassName="pagination"
        />
      )}
    </>
  );
};

export default FoodItem;