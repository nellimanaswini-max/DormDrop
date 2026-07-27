import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ItemDetails from "./pages/ItemDetails/ItemDetails";
import Layout from "./components/layout/Layout";
import CreateListing from "./pages/CreateListing/CreateListing";
import listingsData from "./data/listings";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites"; // Keep your current folder spelling

export default function App() {
  const [favorites, setFavorites] = useState([]);
  const [listings, setListings] = useState(listingsData);
  const addListing = (newListing) => {
  setListings((prev) => [newListing, ...prev]);
  };
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };
  console.log("Favorites:", favorites);
  return (
    <BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
        }}
      />

      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                listings={listings}
                favorites={favorites}
                onFavoriteToggle={toggleFavorite}
              />
            }
          />
          <Route
            path="/listing/:id"
            element={
             <ItemDetails
              favorites={favorites}
              onFavoriteToggle={toggleFavorite}
              />
            }
          />
          <Route
            path="/create"
            element={
              <CreateListing
              addListing={addListing}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                onFavoriteToggle={toggleFavorite}
              />
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}