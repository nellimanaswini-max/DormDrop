import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemDetails from "./pages/ItemDetails/ItemDetails";
import Layout from "./components/layout/Layout";
import CreateListing from "./pages/CreateListing/CreateListing";
import listingsData from "./data/listings";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile/Profile"; 
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites"; // Keep your current folder spelling

import api from "./services/api";

export default function App() {
  const [favorites, setFavorites] = useState([]);
  const [listings, setListings] = useState(listingsData);
  useEffect(() => {
  const fetchListings = async () => {
    try {
      const response = await api.get("/listings");

      console.log("Backend listings:", response.data.listings);

      const normalizedListings = response.data.listings.map((listing) => ({
        ...listing,
        id: listing._id,
      }));
      setListings(normalizedListings);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    }
  };

  fetchListings();
}, []);
  const addListing = (newListing) => {
  setListings((prev) => [newListing, ...prev]);
  };
  const deleteListing = (id) => {
    setListings((prev) =>
      prev.filter((listing) => listing.id !== id)
    );
  };
  const editListing = (updatedListing) => {
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === updatedListing.id
          ? updatedListing
          : listing
      )
    );
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
                listings={listings}
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
                listings={listings}
                favorites={favorites}
                onFavoriteToggle={toggleFavorite}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                listings={listings}
                deleteListing={deleteListing}
                editListing={editListing}
              />
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}