// frontend/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, LogIn, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    // You might want to redirect to home or login page here
    // using useNavigate from react-router-dom
  };

  return (
    <header className="bg-green-600 text-white p-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img
            src="https://m.economictimes.com/thumb/msid-78747196,width-1200,height-900,resizemode-4,imgsize-38576/11.jpg"
            alt="Dmart Logo"
            className="h-12 w-auto rounded-lg shadow-md"
          />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex-grow mx-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full p-2 pl-4 pr-10 rounded-lg border bg-white border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
          />
          <span className="absolute right-3 top-2.5 text-gray-400"><Search /></span>
        </div>
      </div>

      {/* Cart */}
      <div className="flex items-center space-x-4">
        <Link
          to="/cart"
          className="flex items-center space-x-2 bg-white text-green-600 px-4 py-2 rounded-lg shadow-md hover:bg-green-700 hover:text-white transition"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="font-semibold">Cart</span>
        </Link>
      </div>

      {/* Auth Section */}
      <div className="flex items-center space-x-4 px-4">
        {isAuthenticated ? (
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-white text-green-600 px-4 py-2 rounded-lg shadow-md">
              <User className="w-5 h-5" />
              <span className="font-semibold">Hi, {user?.username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-semibold">Logout</span>
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center space-x-2 bg-white text-green-600 px-4 py-2 rounded-lg shadow-md hover:bg-green-700 hover:text-white transition"
          >
            <LogIn className="w-5 h-5" />
            <span className="font-semibold">Login</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;