import React from "react";
import { useCart } from "../../Contexts/CartContext"; // Import the Cart Context
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, toggleDrawer }) => {
  const { cartItems, removeFromCart, addToCart } = useCart(); // Use the Cart Context
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCheckout = () => {
    // Optionally perform any cart validation or updates here
    navigate('/checkout'); // Navigate to the PaymentPage
    toggleDrawer(); // Close the drawer
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleDrawer}></div>
      )}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"} z-50`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={toggleDrawer} className="text-gray-500 hover:text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between mb-4">
                  <img src={item.imgSrc} alt={item.title} className="w-16 h-16 object-cover mr-4" />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                  <div className="flex items-center">
                    <button className="bg-gray-200 px-2" onClick={() => removeFromCart(item.id)}>-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button className="bg-gray-200 px-2" onClick={() => addToCart(item)}>+</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"  onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
