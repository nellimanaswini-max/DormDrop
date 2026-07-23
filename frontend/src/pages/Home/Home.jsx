import { useState } from "react";
import Hero from "./Hero";
import MarketplaceGrid from "./MarketplaceGrid";

export default function Home({
  favorites,
  onFavoriteToggle,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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
        onFavoriteToggle={onFavoriteToggle}
      />
    </>
  );
}