// src/components/Home.js

import React, { useEffect, useState } from "react";
import { db } from "../firebase/config"; // Adjust the path as needed
import { collection, onSnapshot } from "firebase/firestore"; // Import onSnapshot
import CardComponent from '../card/card'; // Ensure you have your CardComponent

const Home = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  // Set up Firestore listener
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "cards"), (snapshot) => {
      const cardData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCards(cardData);
    }, (error) => {
      console.error("Error fetching cards: ", error);
      setError("Failed to fetch cards. Please try again later.");
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="p-6 bg-custom-gray- pt-20">
      <h2 className="text-2xl font-bold text-custom-dark-gray mb-6 text-center">Our Collection</h2>
      {error && <div className="text-red-600 font-semibold mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <CardComponent key={card.id} cardData={card} />
        ))}
      </div>
    </div>
  );
};

export default Home;
