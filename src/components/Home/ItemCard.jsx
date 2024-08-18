import { IoCartOutline } from "react-icons/io5";
// import { IoCart } from "react-icons/io5";

const ItemCard = ({ item, handleAddCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src={item.image}
        alt="Product Image"
        className="w-full h-48 object-contain"
      />
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-ml font-semibold mb-2">
            {item.title.length > 20
              ? `${item.title.slice(0, 20)}...`
              : item.title}
          </h3>
          <button
            onClick={() => handleAddCart(item)}
            className="hover:bg-gray-200 rounded-full p-[5px]"
          >
            <IoCartOutline size={20} />
          </button>
        </div>
        <p className="text-gray-700 mb-2">₹{item.price}</p>
      </div>
    </div>
  );
};

export default ItemCard;
