import { MdAdd, MdRemove, MdClear } from "react-icons/md";

const CartItem = (props) => {
  const { item, setCartItems, removeFromCart } = props;

  const updateQuantity = (id, quantity) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );

    localStorage.setItem("cart", JSON.stringify(updatedItems));
    setCartItems(updatedItems);
  };

  return (
    <>
      <div className="h-32 flex gap-2 sm:gap-6 items-start px-2 sm:px-5 py-2 sm:py-3">
        <div className="w-3/12 h-full flex items-center">
          <img src={item.image} alt="Item" className="h-full m-auto" />
        </div>
        <div className="w-4/12 p-4">
          <span className="block text-sm sm:text-base mb-3 cursor-pointer">
            {item.title}
          </span>
          <span className="text-sm sm:text-base font-bold">{item.price}</span>
        </div>
        <div className="w-3/12 p-4 flex flex-col gap-5 items-center justify-center">
          <span className="flex items-center">
            <MdRemove
              size={25}
              className="cursor-pointer border rounded-full p-1"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            />
            <span className="mx-4 font-bold text-sm sm:text-base">
              {item.quantity}
            </span>
            <MdAdd
              size={25}
              className="cursor-pointer border rounded-full p-1"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            />
          </span>
          <span className="text-sm sm:text-base font-semibold">
            ₹{item.price * item.quantity}
          </span>
        </div>
        <div className="w-2/12 flex items-center justify-end">
          <MdClear
            size={35}
            className="cursor-pointer rounded-full p-2 hover:bg-gray-300"
            onClick={() => removeFromCart(item.id)}
          />
        </div>
      </div>
      <hr />
    </>
  );
};

export default CartItem;
