import React, { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero({
  onSearch = () => {},
  onCategorySelect = () => {},
}) {
  const [query, setQuery] = useState("");

  const categories = [
    { label: "Books", emoji: "📚" },
    { label: "Electronics", emoji: "💻" },
    { label: "Furniture", emoji: "🪑" },
    { label: "Fashion", emoji: "👕" },
    { label: "Gaming", emoji: "🎮" },
    { label: "Phones", emoji: "📱" },
    { label: "Hostel", emoji: "🏠" },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-50 via-white to-stone-100 py-20 sm:py-28 px-4">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-100 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-black tracking-tight text-stone-900 leading-tight"
        >
          Findit.
          <br />
          Love it.
          <br />
          DormDrop.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-6 text-lg md:text-xl text-stone-600 max-w-2xl mx-auto"
        >
          Everything your campus needs in one trusted marketplace.
        </motion.p>

        {/* Search */}
        <motion.form
          onSubmit={handleSearchSubmit}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 max-w-3xl mx-auto"
        >
          <div className="flex items-center rounded-full bg-white border border-stone-200 shadow-lg p-2">

            <Search className="ml-4 text-stone-400" size={20} />

            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                onSearch(e.target.value);
              }}
              placeholder="Search books, laptops, furniture..."
              className="flex-1 px-4 py-3 outline-none bg-transparent text-stone-800 placeholder-stone-400"
            />

            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold transition"
            >
              Explore
            </button>

          </div>
        </motion.form>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => onCategorySelect(cat.label)}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-stone-200 hover:bg-stone-100 transition shadow-sm"
            >
              <span>{cat.emoji}</span>
              <span className="text-sm font-semibold text-stone-700">
                {cat.label}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto"
        >
          <div>
            <h2 className="text-3xl font-black text-stone-900">12K+</h2>
            <p className="text-stone-500 text-sm mt-1">Listings</p>
          </div>

          <div>
            <h2 className="text-3xl font-black text-stone-900">6</h2>
            <p className="text-stone-500 text-sm mt-1">Campuses</p>
          </div>

          <div>
            <h2 className="text-3xl font-black text-stone-900">2K+</h2>
            <p className="text-stone-500 text-sm mt-1">Students</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}