import toast from "react-hot-toast";
export default function Profile({
  listings,
  deleteListing,
}) {
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
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white"
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
    </section>
  );
}