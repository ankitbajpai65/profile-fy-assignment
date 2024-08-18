"use client";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import Link from "next/link";
import Loader from "../Loader";
import { useCart } from "@/hooks/useCart";

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { cartItems, setCartItems, removeFromCart } = useCart();

  useEffect(() => {
    const total = cartItems?.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  return (
    <div className="cart min-h-[85vh] h-fit mt-28 mb-24 bg-white">
      <div className="flex flex-col md:flex-row justify-evenly lg:justify-center items-start gap-4 lg:gap-8 p-5">
        <div className="w-full md:w-8/12 lg:w-7/12 bg-white">
          {!cartItems ? (
            <div className="h-[60vh] w-full flex items-center justify-center">
              <Loader />
            </div>
          ) : cartItems?.length < 1 ? (
            <div className="flex flex-col items-center justify-center p-6 sm:p-16 bg-gray-300">
              <img
                src="/cart.jpeg"
                alt="Empty Cart"
                className="w-2/5 rounded-full mb-8"
              />
              <h1 className="text-2xl sm:text-4xl mb-4 sm:mb-8">
                Your cart is empty
              </h1>
              <Link href="/" className="btn btn-primary text-xl sm:text-2xl">
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border flex flex-col gap-3">
                {cartItems &&
                  cartItems?.map((item, index) => (
                    <CartItem
                      key={index}
                      item={item}
                      removeFromCart={removeFromCart}
                      setCartItems={setCartItems}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
        <div className="border w-full md:w-4/12 lg:w-3/12 p-4 mt-3 md:mt-0 bg-white shadow-md">
          <div className="mb-4">
            <span className="text-md font-semibold">PRICE DETAILS</span>
          </div>
          <div className="mb-4 flex justify-between">
            <span>Price({cartItems?.length} items)</span>
            <span className="text-sm">₹{totalPrice?.toFixed(2)}/-</span>
          </div>
          <div className="mb-4 flex justify-between">
            <span>Taxes</span>
            <span className="mr-3">-- --</span>
          </div>
          <div className="mb-4 flex justify-between">
            <span>Delivery Charges</span>
            <span className="text-blue-600 font-semibold mr-3">FREE</span>
          </div>
          <div className="flex justify-between font-bold">
            <span className="text-md">Total Amount</span>
            <span className="text-sm">₹{totalPrice?.toFixed(2)}/-</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
