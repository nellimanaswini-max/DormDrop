import { useParams } from "react-router-dom";
import listingsData from "../../data/listings";

export default function ItemDetails() {
  const { id } = useParams();

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

    <button
      onClick={() => window.history.back()}
      className="mb-8 text-sm font-semibold text-stone-600 hover:text-stone-900"
    >
      ← Back
    </button>

    <div className="grid lg:grid-cols-2 gap-12">

      {/* Image */}

      <div>
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full rounded-3xl object-cover shadow-xl"
        />
      </div>

      {/* Details */}

      <div>

        <span className="text-sm font-semibold text-blue-600">
          {listing.category}
        </span>

        <h1 className="mt-2 text-5xl font-black">
          {listing.title}
        </h1>

        <p className="mt-6 text-4xl font-black">
          {listing.price}
        </p>

        <div className="mt-8 space-y-3 text-stone-600">

          <p>✨ {listing.condition}</p>

          <p>📍 {listing.campus}</p>

          <p>🏠 {listing.residenceHall}</p>

        </div>

        <div className="mt-10 flex gap-4">

          <button className="px-6 py-4 rounded-2xl bg-stone-900 text-white font-bold hover:bg-stone-800 transition">
            💬 Contact Seller
          </button>

          <button className="px-6 py-4 rounded-2xl border border-stone-300 font-semibold hover:bg-stone-100 transition">
            ❤️ Favorite
          </button>

        </div>

      </div>

    </div>

  </section>
);
}