"use client";

import React, { useEffect, useState } from "react";
import { db } from "../firebase/config"; 
import { collection, addDoc, getDocs, onSnapshot, deleteDoc, doc } from "firebase/firestore"; 
import { auth } from "../firebase/config"; 
import { signOut } from "firebase/auth"; 
import { useNavigate } from "react-router-dom"; 

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    imgSrc: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  // Function to fetch cards from Firestore
  const fetchCards = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, "cards"));
      const cardData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCards(cardData);
    } catch (error) {
      console.error("Error fetching cards: ", error);
      setError("Failed to fetch cards. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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

    return () => {
      unsubscribe();
    };
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.price <= 0) {
      setError("Price must be a positive number.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const docRef = await addDoc(collection(db, "cards"), formData);
      setCards((prevCards) => [...prevCards, { id: docRef.id, ...formData }]);
      setFormData({ title: "", price: "", imgSrc: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
      setError("Failed to add card. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle card deletion
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "cards", id));
      setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    } catch (error) {
      console.error("Error deleting card: ", error);
      setError("Failed to delete card. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      console.log("User signed out successfully");
      navigate("/login"); // Redirect to the login page after logging out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-6">Dashboard</h2>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md mb-4"
      >
        Logout
      </button>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-6"
      >
        <div className="flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            name="title"
            placeholder="Card Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border border-blue-300 rounded-md p-3 flex-1 focus:outline-none focus:ring focus:ring-blue-200"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="border border-blue-300 rounded-md p-3 flex-1 focus:outline-none focus:ring focus:ring-blue-200"
          />
          <input
            type="text"
            name="imgSrc"
            placeholder="Image URL"
            value={formData.imgSrc}
            onChange={handleChange}
            required
            className="border border-blue-300 rounded-md p-3 flex-1 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 mt-4 rounded-md w-full md:w-auto"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Card"}
        </button>
      </form>

      {error && (
        <div className="text-red-600 font-semibold mb-4">{error}</div>
      )}

      <ul className="bg-white shadow-md rounded-lg p-6">
        {cards.map((card) => (
          <li key={card.id} className="flex justify-between items-center border-b border-gray-300 py-2">
            <div>
              <h3 className="font-semibold">{card.title}</h3>
              <p className="text-gray-600">${card.price}</p>
            </div>
            <button
              onClick={() => handleDelete(card.id)}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-3 rounded-md"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
