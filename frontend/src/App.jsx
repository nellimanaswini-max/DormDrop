import Landing from "./pages/Landing/Landing";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

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

  // ==========================================
  // FAVORITES
  // ==========================================

  const [favorites, setFavorites] = useState([]);


  // ==========================================
  // LISTINGS
  // ==========================================

  const [listings, setListings] = useState([]);


  // ==========================================
  // CURRENT USER
  // ==========================================

  const [currentUser, setCurrentUser] = useState(() => {

    const storedUser =
      localStorage.getItem("user");

    return storedUser
      ? JSON.parse(storedUser)
      : null;

  });


// ==========================================
// FETCH LISTINGS FROM BACKEND
// ==========================================

const fetchListings = useCallback(async () => {
  try {
    const response = await api.get("/listings");

    console.log(
      "Backend listings:",
      response.data.listings
    );

    const normalizedListings =
      response.data.listings.map((listing) => ({
        ...listing,
        id: listing._id,
      }));

    setListings(normalizedListings);

  } catch (error) {
    console.error(
      "Failed to fetch listings:",
      error
    );
  }
}, []);


// ==========================================
// LOAD LISTINGS WHEN APP STARTS
// ==========================================

useEffect(() => {
  let cancelled = false;

  const loadListings = async () => {
    try {
      const response = await api.get("/listings");

      console.log(
        "Backend listings:",
        response.data.listings
      );

      const normalizedListings =
        response.data.listings.map((listing) => ({
          ...listing,
          id: listing._id,
        }));

      if (!cancelled) {
        setListings(normalizedListings);
      }

    } catch (error) {
      console.error(
        "Failed to fetch listings:",
        error
      );
    }
  };

  loadListings();

  return () => {
    cancelled = true;
  };
}, []);
  // ==========================================
  // ADD LISTING
  // ==========================================

  const addListing = (newListing) => {

    setListings((prev) => [
      newListing,
      ...prev,
    ]);

  };


  // ==========================================
  // DELETE LISTING
  // ==========================================

  const deleteListing = (id) => {

    setListings((prev) =>
      prev.filter(
        (listing) =>
          listing.id !== id
      )
    );

  };


  // ==========================================
  // EDIT LISTING
  // ==========================================

  const editListing = (updatedListing) => {

    setListings((prev) =>
      prev.map((listing) =>
        listing.id === updatedListing.id
          ? updatedListing
          : listing
      )
    );

  };


  // ==========================================
  // FAVORITE TOGGLE
  // ==========================================

  const toggleFavorite = (id) => {

    setFavorites((prev) =>

      prev.includes(id)

        ? prev.filter(
            (item) => item !== id
          )

        : [
            ...prev,
            id,
          ]

    );

  };


  // ==========================================
  // APP
  // ==========================================

  return (

    <BrowserRouter>

      {/* TOAST */}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
        }}
      />


      <Layout
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      >

        <Routes>


          {/* =================================
              LANDING
          ================================= */}

          <Route
            path="/"
            element={
              <Landing />
            }
          />


          {/* =================================
              LOGIN
          ================================= */}

          <Route
            path="/login"
            element={
              <Login
                setCurrentUser={
                  setCurrentUser
                }
              />
            }
          />


          {/* =================================
              REGISTER
          ================================= */}

          <Route
            path="/register"
            element={
              <Register />
            }
          />


          {/* =================================
              HOME
          ================================= */}

          <Route
            path="/home"
            element={

              <ProtectedRoute
                currentUser={
                  currentUser
                }
              >

                <Home
                  listings={
                    listings
                  }

                  favorites={
                    favorites
                  }

                  onFavoriteToggle={
                    toggleFavorite
                  }
                />

              </ProtectedRoute>

            }
          />


          {/* =================================
              ITEM DETAILS
          ================================= */}

          <Route
            path="/listing/:id"
            element={

              <ProtectedRoute
                currentUser={
                  currentUser
                }
              >

                <ItemDetails
                  listings={
                    listings
                  }

                  favorites={
                    favorites
                  }

                  onFavoriteToggle={
                    toggleFavorite
                  }
                />

              </ProtectedRoute>

            }
          />


          {/* =================================
              CREATE LISTING
          ================================= */}

          <Route
            path="/create"
            element={

              <ProtectedRoute
                currentUser={
                  currentUser
                }
              >

                <CreateListing
                  addListing={
                    addListing
                  }

                  refreshListings={
                    fetchListings
                  }
                />

              </ProtectedRoute>

            }
          />


          {/* =================================
              FAVORITES
          ================================= */}

          <Route
            path="/favorites"
            element={

              <ProtectedRoute
                currentUser={
                  currentUser
                }
              >

                <Favorites
                  listings={
                    listings
                  }

                  favorites={
                    favorites
                  }

                  onFavoriteToggle={
                    toggleFavorite
                  }
                />

              </ProtectedRoute>

            }
          />


          {/* =================================
              PROFILE
          ================================= */}

          <Route
            path="/profile"
            element={

              <ProtectedRoute
                currentUser={
                  currentUser
                }
              >

                <Profile
                  listings={
                    listings
                  }

                  deleteListing={
                    deleteListing
                  }

                  editListing={
                    editListing
                  }
                />

              </ProtectedRoute>

            }
          />


        </Routes>

      </Layout>

    </BrowserRouter>

  );
}