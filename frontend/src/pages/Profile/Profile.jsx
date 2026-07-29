import { useState } from "react";
import toast from "react-hot-toast";
export default function Profile({
  listings,
  deleteListing,
  editListing,
}) {
    const [editingListing, setEditingListing] = useState(null);
    const myListings = listings.filter(
  (listing) => listing.userId === "current-user"
);
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-black text-stone-900">
        👤 My Profile
      </h1>

      <p className="mt-3 text-stone-500">
        Manage your account and listings.
      </p>

      <div className="mt-12">

        <h2 className="text-3xl font-bold">
            📦 My Listings
        </h2>

        <div className="mt-8 space-y-5">

            {myListings.length === 0 ? (

            <p className="text-stone-500">
                You haven't created any listings yet.
            </p>

            ) : (

            myListings.map((listing) => (

                <div
                key={listing.id}
                className="flex items-center justify-between border rounded-2xl p-5"
                >

                <div>

                    <h3 className="font-bold">
                    {listing.title}
                    </h3>

                    <p className="text-stone-500">
                    ₹{listing.price}
                    </p>

                </div>

                <div className="flex gap-3">

                    <button
                        onClick={() => setEditingListing(listing)}
                        className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                        Edit
                    </button>

                   <button
                        onClick={() => {
                            const confirmed = window.confirm(
                            "Are you sure you want to delete this listing?"
                            );

                            if (confirmed) {
                            deleteListing(listing.id);
                            toast.success("Listing deleted successfully!");
                            }
                        }}
                        className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
                        >
                        Delete
                    </button>

                </div>

            </div>

            ))

        )}

    </div>

 </div>
 {editingListing && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-8 w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-6">
        Edit Listing
      </h2>
      <div className="relative bg-white rounded-2xl p-8 w-full max-w-lg">
          <button
            onClick={() => setEditingListing(null)}
            className="absolute top-4 right-4 text-2xl text-stone-500 hover:text-black"
          >
            ✕
          </button>
        </div>
      <label className="block text-sm font-semibold text-stone-700 mb-2">
        Title
      </label>
      <input
        type="text"
        value={editingListing.title}
        onChange={(e) =>
          setEditingListing({
            ...editingListing,
            title: e.target.value,
          })
        }
        className="w-full border rounded-xl p-3"
      />
      <label className="block text-sm font-semibold text-stone-700 mt-4 mb-2">
        Price
      </label>
      {/* NEW: Price */}
      <input
        type="number"
        value={editingListing.price}
        onChange={(e) =>
          setEditingListing({
            ...editingListing,
            price: Number(e.target.value),
          })
        }
        placeholder="Price"
        className="w-full border rounded-xl p-3 mt-4"
      />
      <label className="block text-sm font-semibold text-stone-700 mt-4 mb-2">
        Category
      </label>
      <select
        value={editingListing.category}
        onChange={(e) =>
          setEditingListing({
            ...editingListing,
            category: e.target.value,
          })
        }
        className="w-full border rounded-xl p-3 mt-4"
      >
        <option value="Books">Books</option>
        <option value="Electronics">Electronics</option>
        <option value="Furniture">Furniture</option>
        <option value="Clothing">Clothing</option>
        <option value="Others">Others</option>
      </select>
      <label className="block text-sm font-semibold text-stone-700 mt-4 mb-2">
        Condition
      </label>
      <select
        value={editingListing.condition}
        onChange={(e) =>
          setEditingListing({
            ...editingListing,
            condition: e.target.value,
          })
        }
        className="w-full border rounded-xl p-3 mt-4"
      >
        <option value="New">New</option>
        <option value="Like New">Like New</option>
        <option value="Good">Good</option>
        <option value="Fair">Fair</option>
      </select>
      <label className="block text-sm font-semibold text-stone-700 mt-4 mb-2">
        Description
      </label>
      {/* NEW: Description */}
      <textarea
        value={editingListing.description}
        onChange={(e) =>
          setEditingListing({
            ...editingListing,
            description: e.target.value,
          })
        }
        rows={4}
        placeholder="Description"
        className="w-full border rounded-xl p-3 mt-4"
      />

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setEditingListing(null)}
          className="px-5 py-2 rounded-xl bg-stone-300"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            editListing(editingListing);
            toast.success("Listing updated successfully!");
            setEditingListing(null);
          }}
          className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
        
      </div>
    </div>
  </div>
)}
    </section>
  );
}