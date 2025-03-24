import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../redux/cartSlice";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4 last:border-b-0">
              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg shadow-md" />
              
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-gray-600">₹{item.dmartPrice}</p>
              </div>

              <div className="flex items-center">
              <div className="flex items-center justify-center space-x-2 mt-2 border-green-500 border-2 ">
                <button 
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="bg-green-500 text-white px-3 py-1 w-10 hover:bg-gray-300"
                >
                  -
                </button>
                <span className="px-4 py-1 bg-white text-gray-800">{item.quantity}</span>
                <button 
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="bg-green-500 text-white px-3 py-1 w-10 hover:bg-gray-300"
                >
                  +
                </button>
                </div>
              </div>

              <button 
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-600 hover:text-red-800 transition font-medium ml-4"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="text-center mt-6">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow hover:bg-green-700 transition">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
