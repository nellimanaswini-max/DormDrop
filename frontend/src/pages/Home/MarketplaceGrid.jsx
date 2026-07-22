import React from 'react';
import { motion } from 'framer-motion';
import ListingCard from '../../components/cards/ListingCard';

const dummyListings = [
  {
    listingId: 'list-1',
    id: 'list-1',
    title: 'Engineering Mathematics Book',
    price: '₹350',
    category: 'Books',
    condition: 'Good',
    campus: 'IIT Bombay',
    residenceHall: 'Hostel 12',
    image:
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80',
    createdAt: '2 hrs ago',
    isDonation: false,
    seller: {
      name: 'Rohan Sharma',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      verified: true,
      rating: 4.8,
    },
  },

  {
    listingId: 'list-2',
    id: 'list-2',
    title: 'Dell Inspiron Laptop',
    price: '₹18,000',
    category: 'Electronics',
    condition: 'Like New',
    campus: 'IIT Bombay',
    residenceHall: 'Hostel 14',
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    createdAt: '5 hrs ago',
    isDonation: false,
    seller: {
      name: 'Aarav Patel',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      verified: true,
      rating: 4.9,
    },
  },

  {
    listingId: 'list-3',
    id: 'list-3',
    title: 'Office Chair',
    price: '₹1,200',
    category: 'Furniture',
    condition: 'Good',
    campus: 'IIT Bombay',
    residenceHall: 'Hostel 8',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    createdAt: '1 day ago',
    isDonation: false,
    seller: {
      name: 'Priya Nair',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      verified: true,
      rating: 4.7,
    },
  },

  {
    listingId: 'list-4',
    id: 'list-4',
    title: 'Scientific Calculator',
    price: '₹450',
    category: 'Electronics',
    condition: 'Brand New',
    campus: 'IIT Bombay',
    residenceHall: 'Hostel 15',
    image:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
    createdAt: '1 day ago',
    isDonation: false,
    seller: {
      name: 'Vikram Singh',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      verified: true,
      rating: 5.0,
    },
  },
    {
    listingId: 'list-5',
    id: 'list-5',
    title: 'Study Table',
    price: '₹2,500',
    category: 'Furniture',
    condition: 'Excellent',
    campus: 'IIT Bombay',
    residenceHall: 'Hostel 5',
    image:
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    createdAt: '2 days ago',
    isDonation: false,
    seller: {
      name: 'Ananya Verma',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
      verified: true,
      rating: 4.8,
    },
  },

  {
    listingId: 'list-6',
    id: 'list-6',
    title: 'Sony Headphones',
    price: '₹1,500',
    category: 'Electronics',
    condition: 'Like New',
    campus: 'IIT Bombay',
    residenceHall: 'Hostel 3',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    createdAt: '2 days ago',
    isDonation: false,
    seller: {
      name: 'Karan Mehta',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
      verified: true,
      rating: 4.6,
    },
  },

  {
    listingId: 'list-7',
    id: 'list-7',
    title: 'Mountain Cycle',
    price: '₹3,500',
    category: 'Vehicles',
    condition: 'Good',
    campus: 'IIT Bombay',
    residenceHall: 'Hostel 11',
    image:
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    createdAt: '3 days ago',
    isDonation: false,
    seller: {
      name: 'Siddharth Rao',
      avatar:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150',
      verified: true,
      rating: 4.9,
    },
  },

  {
    listingId: 'list-8',
    id: 'list-8',
    title: 'Hostel Mattress',
    price: '₹800',
    category: 'Furniture',
    condition: 'Good',
    campus: 'IIT Bombay',
    residenceHall: 'Hostel 1',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    createdAt: '3 days ago',
    isDonation: false,
    seller: {
      name: 'Neha Gupta',
      avatar:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
      verified: true,
      rating: 4.7,
    },
  },
];

const containerVariants = {
  hidden: {
    opacity: 0,
  },
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
  listings = dummyListings,
  searchQuery = "",
  selectedCategory = "",
  favorites = [],
  onFavoriteToggle = () => {},
  onCardClick = () => {},
}) {
  const displayListings =
    listings && listings.length > 0 ? listings : dummyListings;
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