import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function Profile() {
  const [myListings, setMyListings] = useState([]);
  const [editingListing, setEditingListing] = useState(null);
  const [loading, setLoading] = useState(true);

  // --------------------------------
  // LOAD MY LISTINGS
  // --------------------------------

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const response = await api.get("/listings/mine");

        const listings = response.data.listings || [];

        const normalizedListings = listings.map(
          (listing) => ({
            ...listing,
            id: listing._id,
          })
        );

        setMyListings(normalizedListings);

      } catch (error) {
        console.error(
          "Failed to fetch my listings:",
          error
        );

        toast.error(
          "Failed to load your listings."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyListings();
  }, []);

  // --------------------------------
  // DELETE LISTING
  // --------------------------------

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this listing?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/listings/${id}`);

      setMyListings((prev) =>
        prev.filter(
          (listing) => listing.id !== id
        )
      );

      toast.success(
        "Listing deleted successfully!"
      );

    } catch (error) {
      console.error(
        "Delete listing error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to delete listing."
      );
    }
  };

  // --------------------------------
  // UPDATE LISTING
  // --------------------------------

  const handleSaveEdit = async () => {
    try {
      const response = await api.put(
        `/listings/${editingListing.id}`,
        {
          title: editingListing.title,
          price: Number(editingListing.price),
          category: editingListing.category,
          condition: editingListing.condition,
          description: editingListing.description,
        }
      );

      const updatedListing =
        response.data.listing;

      const normalizedListing = {
        ...updatedListing,
        id: updatedListing._id,
      };

      setMyListings((prev) =>
        prev.map((listing) =>
          listing.id === normalizedListing.id
            ? normalizedListing
            : listing
        )
      );

      setEditingListing(null);

      toast.success(
        "Listing updated successfully!"
      );

    } catch (error) {
      console.error(
        "Update listing error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to update listing."
      );
    }
  };

  // --------------------------------
  // LOADING
  // --------------------------------

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-stone-500">
          Loading your listings...
        </p>
      </section>
    );
  }

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

                <div className="flex items-center gap-4">

                  {listing.image && (
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                  )}

                  <div>
                    <h3 className="font-bold">
                      {listing.title}
                    </h3>

                    <p className="text-stone-500">
                      ₹{listing.price}
                    </p>

                    <p className="text-xs text-stone-400 mt-1">
                      📍 {listing.campus}
                    </p>
                  </div>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      setEditingListing(listing)
                    }
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(listing.id)
                    }
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

      {/* EDIT MODAL */}

      {editingListing && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

          <div className="bg-white rounded-2xl p-8 w-full max-w-lg">

            <h2 className="text-2xl font-bold mb-6">
              Edit Listing
            </h2>

            <label className="block text-sm font-semibold mb-2">
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

            <label className="block text-sm font-semibold mt-4 mb-2">
              Price
            </label>

            <input
              type="number"
              value={editingListing.price}
              onChange={(e) =>
                setEditingListing({
                  ...editingListing,
                  price: Number(e.target.value),
                })
              }
              className="w-full border rounded-xl p-3"
            />

            <label className="block text-sm font-semibold mt-4 mb-2">
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
              className="w-full border rounded-xl p-3"
            >
              <option>Books</option>
              <option>Electronics</option>
              <option>Furniture</option>
              <option>Clothing</option>
              <option>Cycles</option>
              <option>Others</option>
            </select>

            <label className="block text-sm font-semibold mt-4 mb-2">
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
              className="w-full border rounded-xl p-3"
            >
              <option>New</option>
              <option>Like New</option>
              <option>Good</option>
              <option>Fair</option>
            </select>

            <label className="block text-sm font-semibold mt-4 mb-2">
              Description
            </label>

            <textarea
              value={editingListing.description}
              onChange={(e) =>
                setEditingListing({
                  ...editingListing,
                  description: e.target.value,
                })
              }
              rows={4}
              className="w-full border rounded-xl p-3"
            />

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() =>
                  setEditingListing(null)
                }
                className="px-5 py-2 rounded-xl bg-stone-300"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveEdit}
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