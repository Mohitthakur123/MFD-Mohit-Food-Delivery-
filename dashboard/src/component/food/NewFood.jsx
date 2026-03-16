import axios from "axios";
import React, { useEffect, useState } from "react";
import Title from "../common/title/Title";
import Swal from "sweetalert2";

const NewFood = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://mfd-mohit-food-delivery-1.onrender.com/api/admin/categories"
        );

        setCategories(res.data.data || res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [active, setActive] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("thumb", document.querySelector("#thumb").files[0]);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("featured", featured);
    formData.append("active", active);

    axios
      .post(
        "https://mfd-mohit-food-delivery-1.onrender.com/api/admin/foods",
        formData
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "Food added successfully",
          showConfirmButton: false,
          timer: 800,
        });

        window.location.href = "/foods";
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Food add failed!",
        });
      });
  };

  const [file, setFile] = useState();

  function handleThumbChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <section className="food content">
      <Title title="New Food" />

      <div className="food-content">
        <form encType="multipart/form-data" onSubmit={submitHandler}>
          <div className="form-floating mb-3">
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              placeholder="Food title"
              required
            />
            <label>Food title...</label>
          </div>

          <div className="mb-3">
            {file && <img src={file} alt="" width="120" />}
            <input
              type="file"
              name="thumb"
              id="thumb"
              className="form-control"
              onChange={handleThumbChange}
              required
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">₹</span>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-control"
              placeholder="Price"
              required
            />
          </div>

          <div className="form-floating">
            <select
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Select</option>

              {categories?.map((item) => (
                <option key={item._id} value={item.title}>
                  {item.name}
                </option>
              ))}
            </select>
            <label>Category</label>
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              name="description"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
          </div>

          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={(e) => setFeatured(e.target.checked)}
            />
            <label className="form-check-label">Featured</label>
          </div>

          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={(e) => setActive(e.target.checked)}
            />
            <label className="form-check-label">Active</label>
          </div>

          <button type="submit" className="btn-primary">
            Add Food
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewFood;