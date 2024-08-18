"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  const [cartCount, setCartCount] = useState(0);

  const { cartItemsCount } = useCart();

  useEffect(() => {
    setCartCount(cartItemsCount);
  }, [cartItemsCount]);

  // console.log("cartItemsCount", cartItemsCount);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-white w-full flex justify-between py-3 sm:py-5 px-3 sm:px-12 fixed top-0 z-50 transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <span className="flex items-center">
        <img
          onClick={() => router.push("/")}
          src="/logo.svg"
          alt=""
          className="w-20 sm:w-28 cursor-pointer"
        />
      </span>
      <span className="flex gap-6 sm:gap-8">
        <button onClick={() => router.push("/cart")} className="relative">
          <IoCartOutline size={22} />
          <span className="absolute top-0 -right-4 flex items-center justify-center bg-red-600 text-white text-xs w-4 h-5 p-1 rounded-full">
            {cartCount || 0}
          </span>
        </button>
        <button className="bg-blue-500 text-white text-xs sm:text-sm rounded-md py-2 px-3 sm:px-4">
          Login
        </button>
      </span>
    </nav>
  );
};

export default Navbar;
