export default function ProductInfo({ listing }) {
  return (
    <div>

      <span className="text-blue-600 font-semibold">
        {listing.category}
      </span>

      <h1 className="mt-2 text-5xl font-black text-stone-900">
        {listing.title}
      </h1>

      <p className="mt-5 text-4xl font-black text-stone-900">
        {listing.price}
      </p>

      <div className="mt-8 space-y-3 text-stone-600">

        <p>✨ {listing.condition}</p>

        <p>📍 {listing.campus}</p>

        <p>🏠 {listing.residenceHall}</p>

      </div>

      <div className="mt-10 flex gap-4">

        <button
          className="px-6 py-4 rounded-2xl bg-stone-900 text-white font-bold hover:bg-stone-800 transition"
        >
          💬 Contact Seller
        </button>

        <button
          className="px-6 py-4 rounded-2xl border border-stone-300 hover:bg-stone-100 transition"
        >
          ❤️ Favorite
        </button>

      </div>

    </div>
  );
}