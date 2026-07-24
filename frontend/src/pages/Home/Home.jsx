import { useState } from "react";
import Hero from "./Hero";
import MarketplaceGrid from "./MarketplaceGrid";
import { useNavigate } from "react-router-dom";

export default function Home({
  favorites,
  onFavoriteToggle,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const handleCardClick = (listing) => {
    navigate(`/listing/${listing.id}`);
};
  return (
    <>
      <Hero
        onSearch={setSearchQuery}
        onCategorySelect={setSelectedCategory}
      />

      <MarketplaceGrid
        onCardClick={handleCardClick}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        favorites={favorites}
        onFavoriteToggle={onFavoriteToggle}
      />
    </>
  );
}