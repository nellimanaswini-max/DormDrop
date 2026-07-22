import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function ListingCard({
  listing = {},
  isFavorited = false,
  onFavoriteToggle = () => {},
  onCardClick = () => {},
}) {
  const {
    listingId = "",
    id = listingId,
    title = "Untitled Item",
    price = 0,
    category = "Books",
    condition = "Good",
    campus = "NIAT",
    seller = {
      name: "Student Seller",
      avatar: "",
      verified: true,
      rating: 4.9,
    },
    image = "https://placehold.co/600x600/F5F5F4/444?text=DormDrop",
    isDonation = false,
    createdAt = "2h ago",
  } = listing;

  const getConditionStyle = (condition) => {
    switch (condition) {
      case "Brand New":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";

      case "Like New":
        return "bg-blue-100 text-blue-700 border border-blue-200";

      case "Excellent":
        return "bg-violet-100 text-violet-700 border border-violet-200";

      case "Good":
        return "bg-amber-100 text-amber-700 border border-amber-200";

      default:
        return "bg-stone-100 text-stone-700 border border-stone-200";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.45,
      }}
      onClick={() => onCardClick(listing)}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-stone-200 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
    >

      {/* IMAGE */}

      <div className="relative aspect-square overflow-hidden bg-stone-100">

        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Condition */}

        <div className="absolute top-4 left-4 flex gap-2">

          <span
            className={`rounded-full px-3 py-1 text-[11px] font-bold backdrop-blur-sm ${getConditionStyle(
              condition
            )}`}
          >
            {condition}
          </span>

          {isDonation && (
            <span className="rounded-full bg-stone-900 px-3 py-1 text-[11px] font-bold text-white">
              FREE
            </span>
          )}
        </div>

        {/* Favourite Button */}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle(id);
          }}
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-125"
        >
          <Heart
            className={`h-5 w-5 transition ${
              isFavorited
                ? "fill-red-500 text-red-500"
                : "text-stone-500"
            }`}
          />
        </button>

        {/* Bottom Overlay */}

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">

          <div className="flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 backdrop-blur-sm">
            <MapPin size={12} />
            <span className="text-[11px]">{campus}</span>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 backdrop-blur-sm">
            <Clock size={12} />
            <span className="text-[11px]">{createdAt}</span>
          </div>

        </div>

      </div>

      {/* CONTENT */}
            <div className="flex flex-1 flex-col justify-between p-5">

        {/* Category */}

        <div>

          <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">
            {category}
          </span>

          {/* Product Title */}

          <h3 className="mt-2 line-clamp-2 text-lg font-bold leading-snug text-stone-900 transition group-hover:text-blue-700">
            {title}
          </h3>

        </div>

        {/* Price */}

        <div className="mt-5">

          <span className="text-[10px] uppercase tracking-widest text-stone-400">
            {isDonation ? "Donation" : "Price"}
          </span>

          <div className="mt-1 flex items-center gap-2">

            <span className="text-3xl font-black text-stone-900">
              {isDonation ? "Free" : `₹${price}`}
            </span>

            {!isDonation && (
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700">
                Negotiable
              </span>
            )}

          </div>

        </div>

        {/* Seller */}

        <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4">

          <div className="flex items-center gap-3">

            <img
              src={
                seller.avatar ||
                "https://placehold.co/100x100/E7E5E4/444?text=👤"
              }
              alt={seller.name}
              className="h-11 w-11 rounded-full border border-stone-200 object-cover"
            />

            <div>

              <div className="flex items-center gap-1">

                <span className="font-semibold text-stone-800">
                  {seller.name}
                </span>

                {seller.verified && (
                  <CheckCircle2
                    size={15}
                    className="text-emerald-500"
                  />
                )}

              </div>

              <p className="text-xs font-medium text-stone-500">
                ⭐ {seller.rating} Seller Rating
              </p>

            </div>

          </div>
                    {/* Card Action */}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onCardClick(listing);
            }}
            className="rounded-2xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 hover:scale-105 active:scale-95"
          >
            View Details
          </button>

        </div>

      </div>

    </motion.div>
  );
}