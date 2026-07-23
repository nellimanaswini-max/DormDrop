import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Layout from "./components/layout/Layout";

import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites"; // Keep your current folder spelling

export default function App() {
  const [favorites, setFavorites] = useState([]);

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
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                favorites={favorites}
                onFavoriteToggle={toggleFavorite}
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