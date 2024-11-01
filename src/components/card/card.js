import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "../../Contexts/CartContext"; // Import the Cart Context

const CardComponent = ({ cardData, index }) => {
  const { addToCart } = useCart(); // Use the Cart Context
  const [isAdded, setIsAdded] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleCardClick = () => {
    setIsSelected(!isSelected);
  };

  const handleOutsideClick = (e) => {
    if (isSelected && !e.target.closest(".card")) {
      setIsSelected(false);
    }
  };

  useEffect(() => {
    if (isSelected) {
      window.addEventListener("click", handleOutsideClick);
    }
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isSelected]);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent the card from scaling up
    addToCart(cardData);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 3000);
  };

  return (
    <>
      {isSelected && <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>}

      <motion.div
        className={`p-5 shadow-md card bg-white rounded-lg cursor-pointer transition-all ${isSelected ? "opacity-50" : ""}`}
        onClick={handleCardClick}
        style={{ width: "90%", maxWidth: "600px", height: "auto", zIndex: 1 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.25 }}
      >
        <img src={cardData.imgSrc} alt={cardData.title} className="w-full h-[200px] object-contain" />
        <h5 className="text-xl font-semibold tracking-tight text-custom-dark-gray mt-3">{cardData.title}</h5>
        <div className="flex items-center justify-between mt-2">
          <span className="text-3xl font-bold text-custom-dark-gray">{cardData.price || "N/A"}</span>
          <button
            onClick={handleAddToCart} // Add click handler for Add to Cart
            className={`rounded-lg px-5 py-2.5 text-center text-sm font-medium transition-all duration-200 ease-in-out ${
              isAdded 
                ? "bg-custom-orange text-white" // Styles for when added
                : "bg-white border-2 border-b-custom-orange text-custom-orange hover:border-custom-orange" // Styles for when not added
            }`}
            style={{ height: "40px" }}
          >
            {isAdded ? "Added!" : "Add to cart"} {/* Conditional button text */}
          </button>
        </div>
      </motion.div>

      {/* Scaled-up Card Clone */}
      {isSelected && (
        <motion.div
          className={`absolute z-50 p-5 shadow-md card bg-white rounded-lg cursor-pointer transition-all`}
          onClick={handleCardClick}
          animate={{ scale: isSelected ? (window.innerWidth < 640 ? 0.7 : 2) : 1 }}
          style={{
            width: "75%",
            maxWidth: "450px",
            height: "auto",
            zIndex: 50,
            left: window.innerWidth < 640 ? "15%" : "50%",
            top: window.innerWidth < 640 ? "100%" : "70%",
            position: "absolute",
          }}
        >
          <img src={cardData.imgSrc} alt={cardData.title} className="w-full h-[200px] object-contain" />
          <h5 className="text-xl font-semibold tracking-tight text-custom-dark-gray mt-3">{cardData.title}</h5>
          <div className="flex items-center justify-between mt-2">
            <span className="text-3xl font-bold text-custom-dark-gray">{cardData.price || "N/A"}</span>
            <button
              onClick={handleAddToCart} // Add click handler for Add to Cart
              className={`rounded-lg px-5 py-2.5 text-center text-sm font-medium transition-all duration-200 ease-in-out ${
                isAdded 
                  ? "bg-custom-orange text-white" // Styles for when added
                  : "bg-white border-2 border-b-custom-orange text-custom-orange hover:border-custom-orange" // Styles for when not added
              }`}
              style={{ height: "40px" }}
            >
              {isAdded ? "Added!" : "Add to cart"} {/* Conditional button text */}
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default CardComponent;
