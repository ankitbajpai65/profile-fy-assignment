"use client";
import React, { useEffect, useRef, useState } from "react";
import Loader from "../Loader";
import { FaSearch } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "@/context/CartContext";
import ItemCard from "./ItemCard";

const HomePage = () => {
  const navRef = useRef();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState();
  const [activecategory, setActiveCategory] = useState("All");
  const [searchedKeyword, setSearchedKeyword] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    fetchData();
  }, []);

  function capitalizeWords(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://fakestoreapi.com/products");

      const res = await response.json();
      // console.log(res);

      setItems(res);
      setFilteredItems(res);

      const categories = new Set();
      for (let i of res) {
        categories.add(i.category);
      }
      setCategories([...categories]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCart = (item) => {
    addToCart(item);

    toast.success("Added to cart 🛒", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  function handleFilter(category) {
    setActiveCategory(category);
    const filteredItems = items.filter((item) => item.category === category);
    setFilteredItems(filteredItems);
  }

  const handleSearch = (e) => {
    if (e.type === "click" || (e.type === "keyup" && e.key === "Enter")) {
      const searchedItems = filteredItems.filter((val) =>
        val.title.toLowerCase().includes(searchedKeyword.toLowerCase())
      );
      setFilteredItems(searchedItems);
    }
  };

  return (
    <section className="p-10 min-h-[95vh] relative pb-20">
      <ToastContainer />
      <nav
        className="mt-20 mb-16 flex justify-between gap-5 flex-col md:flex-row"
        ref={navRef}
      >
        <ul className="scrollbar-hide list-none flex gap-10 overflow-x-auto">
          <li className="flex items-center">
            <button
              onClick={() => {
                setActiveCategory("All");
                setFilteredItems(items);
              }}
              className={`text-gray-500 text-sm hover:text-gray-600 ${
                activecategory === "All" &&
                "text-gray-500 font-semibold border-b-2 border-gray-500"
              }`}
            >
              All
            </button>
          </li>
          {categories?.map((category) => (
            <li className="flex items-center">
              <button
                onClick={() => handleFilter(category)}
                className={`w-max text-gray-500 text-sm hover:text-gray-800  ${
                  activecategory === category &&
                  "text-gray-500 font-semibold border-b-2 border-gray-500"
                }`}
              >
                {capitalizeWords(category)}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center w-60">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaSearch onClick={handleSearch} />
            </span>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg"
              placeholder="Search"
              value={searchedKeyword}
              onChange={(e) => setSearchedKeyword(e.target.value)}
              onKeyUp={handleSearch}
            />
          </div>
        </div>
      </nav>

      {loading ? (
        <div className="h-[30vh] w-full flex items-center justify-center">
          <Loader />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="h-[30vh] w-full flex items-center justify-center">
          <h2 className="text-center font-semibold">No items found!</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">
          {filteredItems?.map((item) => (
            <ItemCard item={item} handleAddCart={handleAddCart} />
          ))}
        </div>
      )}

      <button
        onClick={() =>
          navRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
        className="w-12 h-12 bg-gray-600 flex justify-center items-center rounded-full p-2 absolute bottom-2 right-5"
      >
        <FaArrowUp size={20} className="text-white" />
      </button>
    </section>
  );
};

export default HomePage;
