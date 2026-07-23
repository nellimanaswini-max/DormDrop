import { motion } from "framer-motion";
import ListingCard from "../../components/cards/ListingCard";
import listingsData from "../../data/listings";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
export default function MarketplaceGrid({
  listings = listingsData,  searchQuery = "",
  selectedCategory = "",
  favorites = [],
  onFavoriteToggle = () => {},
  onCardClick = () => {},
}) {
  const displayListings =
  listings && listings.length > 0 ? listings : listingsData;
    const filteredListings = displayListings.filter((listing) => {
  const matchesSearch =
    listing.title.toLowerCase().includes(searchQuery.toLowerCase());

  const matchesCategory =
    selectedCategory === "" ||
    listing.category === selectedCategory;

  return matchesSearch && matchesCategory;
});

  if (!displayListings.length) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-black text-stone-900">
          No Listings Yet
        </h2>

        <p className="mt-3 text-stone-500">
          Be the first student to post an item.
        </p>
      </section>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">

      {/* Section Heading */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-stone-900">
          Trending Around Campus
        </h2>

        <p className="mt-3 text-base text-stone-500 max-w-2xl">
          Discover what students near you are buying and selling.
        </p>
      </motion.div>

      {/* Marketplace Grid */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {filteredListings.map((listing) => {
          const itemKey = listing.listingId || listing.id;

          return (
            <motion.div
              key={itemKey}
              variants={itemVariants}
            >
              <ListingCard
                listing={listing}
                isFavorited={favorites.includes(itemKey)}
                onFavoriteToggle={onFavoriteToggle}
                onCardClick={onCardClick}
              />
            </motion.div>
          );
        })}
      </motion.div>

    </section>
  );
}