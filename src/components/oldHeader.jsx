import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";

function Header2() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-pink-600">
            🛒 ShoppyGlobe
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-pink-600">Home</Link>
            <Link to="/cart" className="relative text-gray-700 hover:text-pink-600 flex items-center">
              <FaShoppingCart className="mr-1" /> Cart
              {/* Cart
              {cartItems.length > 0 && (
                <span className="ml-1 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )} */}
            </Link>
            <Link to="/checkout" className="text-gray-700 hover:text-pink-600">Checkout</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 py-4">
            <Link to="/" className="text-gray-700 hover:text-pink-600">Home</Link>
            <Link to="/cart" className="text-gray-700 hover:text-pink-600">Cart</Link>
            <Link to="/checkout" className="text-gray-700 hover:text-pink-600">Checkout</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header2;
