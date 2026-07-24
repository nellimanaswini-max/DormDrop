import listingsData from "../../data/listings";
import ListingCard from "../../components/cards/ListingCard";
import { useNavigate } from "react-router-dom";

export default function Favorites({
  favorites = [],
  onFavoriteToggle = () => {},
  
}) {
  const favoriteListings = listingsData.filter((listing) =>
    favorites.includes(listing.id)
  
  );
  const navigate = useNavigate();

  const handleCardClick = (listing) => {
  navigate(`/listing/${listing.id}`);
};
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tight text-stone-900">
          Your Favorites ❤️
        </h1>

        <p className="mt-2 text-stone-500">
          Items you've saved for later.
        </p>
      </div>

      {favoriteListings.length === 0 ? (
        <div className="py-24 text-center">
          <div className="text-6xl mb-4">💔</div>

          <h2 className="text-2xl font-bold">
            No Favorites Yet
          </h2>

          <p className="mt-3 text-stone-500">
            Tap the heart on any listing to save it.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favoriteListings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              isFavorited={true}
              onFavoriteToggle={onFavoriteToggle}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      )}
    </section>
  );
}