import { useParams } from "react-router-dom";
import listingsData from "../../data/listings";
import { useState } from "react";
import ContactModal from "../../components/ui/ContactModal";

export default function ItemDetails({
  favorites,
  onFavoriteToggle,
}) {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const listing = listingsData.find(
    (item) => item.id === id
  );

  if (!listing) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center">
        <h1 className="text-4xl font-black">
          Listing Not Found
        </h1>
      </div>
    );
  }

  return (
  <section className="max-w-7xl mx-auto px-6 py-12">

    {/* Back Button */}

    <button
      onClick={() => window.history.back()}
      className="mb-8 text-sm font-semibold text-stone-600 hover:text-stone-900"
    >
      ← Back
    </button>

    <div className="grid lg:grid-cols-2 gap-14">

      {/* Product Image */}

      <div>
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full rounded-3xl shadow-xl object-cover"
        />
      </div>

      {/* Product Details */}

      <div>

        <span className="text-blue-600 font-semibold">
          {listing.category}
        </span>

        <h1 className="mt-2 text-5xl font-black">
          {listing.title}
        </h1>

        <p className="mt-5 text-4xl font-black">
          {listing.price}
        </p>

        <div className="mt-8 space-y-3 text-stone-600">

          <p>✨ {listing.condition}</p>

          <p>📍 {listing.campus}</p>

          <p>🏠 {listing.residenceHall}</p>

        </div>

        <div className="mt-10 flex gap-4">

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-4 rounded-2xl bg-stone-900 text-white font-bold hover:bg-stone-800 transition"
          >
            💬 Contact Seller
          </button>

          <button
            onClick={() => onFavoriteToggle(listing.id)}
            className={`px-6 py-4 rounded-2xl font-semibold transition ${
              favorites.includes(listing.id)
                ? "bg-red-500 text-white border-red-500"
                : "border border-stone-300 hover:bg-stone-100"
            }`}
            >
              {favorites.includes(listing.id) ? "❤️ Favorited" : "🤍 Favorite"}
          </button>

        </div>

      </div>

    </div>

    {/* Description */}

    <div className="mt-16 rounded-3xl border border-stone-200 p-8">

      <h2 className="text-2xl font-black">
        Description
      </h2>

      <p className="mt-4 text-stone-600 leading-8">
        {listing.description}
      </p>

    </div>

    {/* Seller */}

    <div className="mt-10 rounded-3xl border border-stone-200 p-8 flex items-center gap-6">

      <img
        src={listing.seller.avatar}
        alt={listing.seller.name}
        className="w-20 h-20 rounded-full object-cover"
      />

      <div>

        <h3 className="text-xl font-bold">
          {listing.seller.name}
        </h3>

        <p className="text-stone-500">
          ⭐ {listing.seller.rating}
        </p>

        {listing.seller.verified && (
          <p className="text-green-600 font-semibold">
            ✔ Verified Seller
          </p>
        )}

      </div>

    </div>
    <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        seller={listing.seller}
    />
  </section>
);
}