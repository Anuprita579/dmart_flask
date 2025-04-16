import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantity, decreaseQuantity } from "../redux/cartSlice";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

interface ProductProps {
  id: string;
  name: string;
  imageUrl: string;
  dmartPrice: string;
}

const ProductCard: React.FC<ProductProps> = ({ id, name, imageUrl, dmartPrice }) => {
  const dispatch = useDispatch();
  
  // Get cart items from Redux store
  const cartItem = useSelector((state: RootState) => state.cart.items.find(item => item.id === id));

  return (
    <div className="border p-4 text-center">
      <Link to={`/product/${id}`}>
      <img src={imageUrl} alt={name} className="w-40 h-40 mx-auto" />
      </Link>
      <h3>{name}</h3>
      <p>₹{dmartPrice}</p>

      {/* Show quantity buttons if the item is in the cart */}
      {cartItem ? (
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center space-x-2 mt-2 border-green-500 border-2 ">
            <button 
              onClick={() => dispatch(decreaseQuantity(id))} 
              className="bg-green-500 text-white px-3 py-1 w-10"
            >
              -
            </button>
            <span>{cartItem.quantity}</span>
            <button 
              onClick={() => dispatch(increaseQuantity(id))} 
              className="bg-green-500 text-white px-3 py-1 min-w-10"
            >
              +
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => dispatch(addToCart({ id, name, imageUrl, dmartPrice, quantity: 1 }))} 
          className="bg-green-600 text-white px-4 py-2 mt-2 rounded"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
