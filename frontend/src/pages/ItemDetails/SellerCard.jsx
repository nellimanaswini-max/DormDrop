export default function SellerCard({ seller }) {
  return (
    <div className="mt-10 rounded-3xl border border-stone-200 p-8 flex items-center gap-6 bg-white shadow-sm">

      <img
        src={seller.avatar}
        alt={seller.name}
        className="w-20 h-20 rounded-full object-cover"
      />

      <div className="flex-1">

        <h3 className="text-xl font-bold text-stone-900">
          {seller.name}
        </h3>

        <p className="mt-1 text-stone-500">
          ⭐ {seller.rating}
        </p>

        {seller.verified && (
          <span className="inline-block mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
            ✔ Verified Seller
          </span>
        )}

      </div>

      <button className="px-5 py-3 rounded-xl bg-stone-900 text-white font-semibold hover:bg-stone-800 transition">
        View Profile
      </button>

    </div>
  );
}