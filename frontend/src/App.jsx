import Landing from "./pages/Landing/Landing";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import ItemDetails from "./pages/ItemDetails/ItemDetails";
import Layout from "./components/layout/Layout";
import CreateListing from "./pages/CreateListing/CreateListing";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites";
import { Toaster } from "react-hot-toast";
import api from "./services/api";

export default function App() {
  const [favorites, setFavorites] = useState([]);
  const [listings, setListings] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await api.get("/listings");
        const data = Array.isArray(response.data.listings) ? response.data.listings : [];
        setListings(data.map(item => ({ ...item, id: item._id || item.id || item.listingId })));
      } catch (error) {
        console.error("Failed to fetch listings:", error);
        setListings([]);
      }
    };
    fetchListings();
  }, []);

  const addListing = (listing) => {
    if (!listing) return;
    setListings(prev => [{ ...listing, id: listing._id || listing.id || listing.listingId }, ...prev]);
  };

  const deleteListing = async (id) => {
    try {
      await api.delete(`/listings/${id}`);
      setListings(prev => prev.filter(item => String(item._id || item.id || item.listingId) !== String(id)));
      return true;
    } catch (error) {
      console.error("Delete listing error:", error);
      throw error;
    }
  };

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.some(x => String(x) === String(id))
        ? prev.filter(x => String(x) !== String(id))
        : [...prev, id]
    );
  };

  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
      <Layout currentUser={currentUser} setCurrentUser={setCurrentUser}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route path="/register" element={<Register />} />

          <Route path="/home" element={
            <ProtectedRoute currentUser={currentUser}>
              <Home listings={listings} favorites={favorites} onFavoriteToggle={toggleFavorite} />
            </ProtectedRoute>
          } />

          <Route path="/listing/:id" element={
            <ProtectedRoute currentUser={currentUser}>
              <ItemDetails listings={listings} favorites={favorites} onFavoriteToggle={toggleFavorite} />
            </ProtectedRoute>
          } />

          <Route path="/create" element={
            <ProtectedRoute currentUser={currentUser}>
              <CreateListing addListing={addListing} />
            </ProtectedRoute>
          } />

          <Route path="/favorites" element={
            <ProtectedRoute currentUser={currentUser}>
              <Favorites listings={listings} favorites={favorites} onFavoriteToggle={toggleFavorite} />
            </ProtectedRoute>
          } />

          <Route
            path="/profile"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <Profile
                  listings={listings}
                  favorites={favorites}
                  deleteListing={deleteListing}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}