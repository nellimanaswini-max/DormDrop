import { MapPin, Home, Heart, Star, MessageCircle, Package, Pencil, ShieldCheck, LockKeyhole, Bell, Eye, CreditCard, LogOut, Plus, ChevronRight, Camera, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Profile({ listings = [], favorites = [], deleteListing }) {
  const navigate = useNavigate();

  const currentUser = (() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })();

  const userName = currentUser?.name || currentUser?.username || "Student";
  const userEmail = currentUser?.email || "No email available";
  const campus = currentUser?.campus || "Campus not available";
  const residenceHall = currentUser?.residenceHall || "Not specified";
  const avatar = currentUser?.avatar || "";
  const currentUserId = currentUser?._id || currentUser?.id;

  const myListings = Array.isArray(listings)
    ? listings.filter((listing) => {
        const seller = listing?.seller;
        const sellerId = seller?._id || seller?.id || seller;
        const sellerEmail = seller?.email?.toLowerCase();
        return (
          (currentUserId && sellerId && String(sellerId) === String(currentUserId)) ||
          (userEmail && sellerEmail && sellerEmail === userEmail.toLowerCase())
        );
      })
    : [];

  const favoriteListings = Array.isArray(listings)
    ? listings.filter((listing) => {
        const id = listing?._id || listing?.id || listing?.listingId;
        return favorites.some((f) => String(f) === String(id));
      })
    : [];

  const handleDelete = async (listing) => {
    const id = listing?._id || listing?.id || listing?.listingId;
    if (!id) return toast.error("Listing ID not found.");
    if (!window.confirm(`Delete "${listing?.title || "this listing"}"?`)) return;

    try {
      await deleteListing(id);
      toast.success("Listing deleted successfully.");
    } catch {
      toast.error("Failed to delete listing.");
    }
  };

  const handleEdit = (listing) => {
    const id = listing?._id || listing?.id || listing?.listingId;
    if (id) navigate(`/listing/${id}/edit`);
  };

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  const ListingPreview = ({ listing }) => {
    const image =
      listing?.image && !listing.image.startsWith("blob:")
        ? listing.image
        : "https://placehold.co/600x600/F5F5F4/444?text=DormDrop";

    return (
      <div className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
        <div className="relative aspect-square overflow-hidden bg-stone-100">
          <img src={image} alt={listing?.title || "Listing"} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />

          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-stone-800 shadow">
            {listing?.condition || "Good"}
          </span>

          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/55 px-3 py-1.5 text-[11px] text-white backdrop-blur">
            <MapPin size={11} />
            {listing?.campus || listing?.seller?.campus || campus}
          </div>
        </div>

        <div className="p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
            {listing?.category || "Other"}
          </p>

          <h3 className="mt-2 line-clamp-1 text-lg font-black text-stone-900">
            {listing?.title || "Untitled Item"}
          </h3>

          <p className="mt-2 text-2xl font-black text-stone-900">
            {listing?.isDonation ? "Free" : `₹${listing?.price ?? 0}`}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-stone-100 pt-4">
            <button
              onClick={() => handleEdit(listing)}
              className="flex items-center justify-center gap-2 rounded-xl border border-stone-300 px-3 py-2.5 text-sm font-bold text-stone-800 hover:bg-stone-100"
            >
              <Pencil size={15} />
              Edit
            </button>

            <button
              onClick={() => handleDelete(listing)}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-3 py-2.5 text-sm font-bold text-white hover:bg-red-700"
            >
              <Trash2 size={15} />
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Account</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-stone-900 sm:text-5xl">
            Your Profile
          </h1>
          <p className="mt-3 text-base text-stone-500">
            Manage your account, listings, favorites and marketplace activity.
          </p>
        </div>

        <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
          <div className="h-28 border-b border-stone-200 bg-gradient-to-r from-stone-100 via-stone-50 to-white" />

          <div className="px-6 pb-8 sm:px-10">
            <div className="-mt-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
                <div className="relative">
                  <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-stone-200 text-4xl font-black text-stone-700 shadow-xl">
                    {avatar ? (
                      <img src={avatar} alt={userName} className="h-full w-full object-cover" />
                    ) : (
                      userName.charAt(0).toUpperCase()
                    )}
                  </div>

                  <button
                    onClick={() => toast("Profile photo editing coming next.")}
                    className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-white shadow-lg"
                  >
                    <Camera size={15} />
                  </button>
                </div>

                <div className="pb-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-3xl font-black tracking-tight text-stone-900">
                      {userName}
                    </h2>

                    {currentUser?.verified && (
                      <ShieldCheck size={21} className="text-emerald-500" />
                    )}
                  </div>

                  <p className="mt-1 text-base font-medium text-stone-500">
                    {userEmail}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="flex items-center gap-2 rounded-full bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-700">
                      <MapPin size={14} />
                      {campus}
                    </span>

                    <span className="flex items-center gap-2 rounded-full bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-700">
                      <Home size={14} />
                      {residenceHall}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toast("Edit Profile coming next.")}
                className="flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-bold text-stone-800 shadow-sm hover:bg-stone-50"
              >
                <Pencil size={16} />
                Edit Profile
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={<Package size={21} />} label="My Listings" value={myListings.length} />
          <StatCard icon={<Heart size={21} />} label="Favorites" value={favoriteListings.length} />
          <StatCard icon={<Star size={21} />} label="Seller Rating" value={currentUser?.rating ?? 5} />
          <StatCard icon={<MessageCircle size={21} />} label="Reviews" value={currentUser?.reviewsCount ?? 0} />
        </section>

        <section className="mt-12">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Marketplace</p>
              <h2 className="mt-1 text-3xl font-black text-stone-900">My Listings</h2>
              <p className="mt-2 text-sm text-stone-500">Items you've posted on DormDrop.</p>
            </div>

            <button
              onClick={() => navigate("/create")}
              className="flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-5 py-3 text-sm font-bold text-white hover:bg-stone-800"
            >
              <Plus size={17} />
              Add Item
            </button>
          </div>

          {myListings.length === 0 ? (
            <EmptyState
              title="No listings yet"
              text="Your posted items will appear here."
              button="Create Your First Listing"
              onClick={() => navigate("/create")}
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {myListings.map((listing) => (
                <ListingPreview key={listing?._id || listing?.id} listing={listing} />
              ))}
            </div>
          )}
        </section>

        <section className="mt-14">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Saved</p>
              <h2 className="mt-1 text-3xl font-black">Favorites</h2>
            </div>

            <button onClick={() => navigate("/favorites")} className="text-sm font-bold text-stone-700 hover:text-black">
              View All →
            </button>
          </div>

          {favoriteListings.length === 0 ? (
            <EmptyState
              title="No favorites yet"
              text="Save items you want to come back to."
              button="Explore Listings"
              onClick={() => navigate("/home")}
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {favoriteListings.slice(0, 4).map((listing) => (
                <ListingPreview key={listing?._id || listing?.id} listing={listing} />
              ))}
            </div>
          )}
        </section>

        <section className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Account</p>
            <h2 className="mt-1 text-2xl font-black">Account Information</h2>

            <div className="mt-4">
              <InfoRow label="Full Name" value={userName} />
              <InfoRow label="Email" value={userEmail} />
              <InfoRow label="Campus" value={campus} />
              <InfoRow label="Residence Hall" value={residenceHall} />
              <InfoRow label="Status" value={currentUser?.verified ? "Verified Student" : "Not Verified"} />
            </div>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Preferences</p>
            <h2 className="mt-1 text-2xl font-black">Settings</h2>

            <div className="mt-4">
              <SettingRow icon={<Pencil size={18} />} title="Edit Profile" text="Update your personal information" />
              <SettingRow icon={<LockKeyhole size={18} />} title="Password & Security" text="Keep your account secure" />
              <SettingRow icon={<Bell size={18} />} title="Notifications" text="Manage alerts and updates" />
              <SettingRow icon={<Eye size={18} />} title="Privacy" text="Control your profile visibility" />
              <SettingRow icon={<CreditCard size={18} />} title="Payments" text="Manage marketplace transactions" />
            </div>
          </div>
        </section>

        <button
          onClick={handleLogout}
          className="mt-8 flex w-full items-center justify-between rounded-2xl border border-red-200 bg-red-50 p-5 text-left hover:bg-red-100"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-red-500">
              <LogOut size={18} />
            </div>
            <div>
              <p className="font-bold text-red-600">Log Out</p>
              <p className="text-xs text-red-400">Sign out from your DormDrop account</p>
            </div>
          </div>
          <ChevronRight size={19} className="text-red-400" />
        </button>

        <footer className="py-10 text-center text-xs text-stone-400">
          DormDrop · Your campus marketplace
        </footer>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm hover:shadow-md">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-700">{icon}</div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-stone-400">{label}</p>
      <p className="mt-1 text-3xl font-black">{value}</p>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-b border-stone-100 py-4">
      <span className="text-sm text-stone-500">{label}</span>
      <span className="text-right text-sm font-semibold text-stone-800">{value}</span>
    </div>
  );
}

function SettingRow({ icon, title, text }) {
  return (
    <button
      onClick={() => toast(`${title} settings coming next.`)}
      className="group flex w-full items-center gap-4 border-b border-stone-100 py-4 text-left hover:bg-stone-50"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-700 group-hover:bg-stone-900 group-hover:text-white">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold">{title}</p>
        <p className="text-xs text-stone-500">{text}</p>
      </div>
      <ChevronRight size={18} className="text-stone-300" />
    </button>
  );
}

function EmptyState({ title, text, button, onClick }) {
  return (
    <div className="rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
      <Package size={36} className="mx-auto text-stone-300" />
      <h3 className="mt-4 text-xl font-black">{title}</h3>
      <p className="mt-2 text-sm text-stone-500">{text}</p>
      <button onClick={onClick} className="mt-5 rounded-xl bg-stone-900 px-5 py-3 text-sm font-bold text-white hover:bg-stone-800">
        {button}
      </button>
    </div>
  );
}