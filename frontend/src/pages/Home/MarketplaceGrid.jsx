import ListingCard from "../../components/cards/ListingCard";

export default function MarketplaceGrid({
  listings = [],
  searchQuery = "",
  selectedCategory = "",
  favorites = [],
  onFavoriteToggle = () => {},
  onCardClick = () => {},
}) {
  // ==========================================
  // BACKEND LISTINGS ONLY
  // ==========================================

  const displayListings = Array.isArray(listings)
    ? listings
    : [];

  // ==========================================
  // SEARCH QUERY
  // ==========================================

  const query = String(searchQuery || "")
    .trim()
    .toLowerCase();

  // ==========================================
  // FILTER LISTINGS
  // ==========================================

  const filteredListings = displayListings.filter(
    (listing) => {
      const title = String(
        listing?.title || ""
      ).toLowerCase();

      const category = String(
        listing?.category || ""
      ).toLowerCase();

      const condition = String(
        listing?.condition || ""
      ).toLowerCase();

      const campus = String(
        listing?.campus ||
          listing?.seller?.campus ||
          ""
      ).toLowerCase();

      const residenceHall = String(
        listing?.residenceHall ||
          listing?.seller?.residenceHall ||
          ""
      ).toLowerCase();

      // Empty search = show EVERYTHING
      const matchesSearch =
        query === "" ||
        title.includes(query) ||
        category.includes(query) ||
        condition.includes(query) ||
        campus.includes(query) ||
        residenceHall.includes(query);

      // Empty category = show EVERYTHING
      const matchesCategory =
        selectedCategory === "" ||
        category ===
          String(selectedCategory).toLowerCase();

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  // ==========================================
  // NO LISTINGS IN DATABASE
  // ==========================================

  if (displayListings.length === 0) {
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

  // ==========================================
  // NO SEARCH RESULTS
  // ==========================================

  if (filteredListings.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-black text-stone-900">
          No Matching Listings
        </h2>

        <p className="mt-3 text-stone-500">
          Try a different search or category.
        </p>
      </section>
    );
  }

  // ==========================================
  // MARKETPLACE
  // ==========================================

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">

      {/* SECTION HEADING */}

      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-stone-900">
          Trending Around Campus
        </h2>

        <p className="mt-3 text-base text-stone-500 max-w-2xl">
          Discover what students near you are buying and selling.
        </p>
      </div>

      {/* LISTINGS GRID */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

        {filteredListings.map(
          (listing, index) => {
            const itemKey =
              listing?._id ||
              listing?.id ||
              listing?.listingId ||
              `listing-${index}`;

            return (
              <div
                key={itemKey}
                className="w-full"
              >
                <ListingCard
                  listing={listing}
                  isFavorited={favorites.includes(
                    itemKey
                  )}
                  onFavoriteToggle={
                    onFavoriteToggle
                  }
                  onCardClick={onCardClick}
                />
              </div>
            );
          }
        )}

      </div>
    </section>
  );
}