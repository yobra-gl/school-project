import React, { useEffect, useState } from "react";
import CardComponent from "../card/card"; // Ensure the correct path

const CardGrid = () => {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    const data = Array.from({ length: 12 }).map((_, index) => ({
      title: `Product ${index + 1}`,
      imgSrc: "https://i.imgur.com/ItiYQHM.png", 
      price: (index + 1) * 100000, 
      rating: 5,
    }));

    
    setCardsData(data);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
      {cardsData.map((card, index) => (
        <CardComponent
          key={index}
          cardData={{
            ...card,
            formattedPrice: card.price, 
          }}
        />
      ))}
    </div>
  );
};

export default CardGrid;
