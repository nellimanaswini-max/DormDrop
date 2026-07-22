import React, { useState } from "react";
import Hero from "./Hero";
import MarketplaceGrid from "./MarketplaceGrid";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <>
      <Hero
        onSearch={setSearchQuery}
        onCategorySelect={setSelectedCategory}
      />

      <MarketplaceGrid
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        favorites={favorites}
        onFavoriteToggle={toggleFavorite}
      />
    </>
  );
}