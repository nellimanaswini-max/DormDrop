import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

export default function Layout({
  children,
  currentUser,
  setCurrentUser,
}) {
  const location = useLocation();

  const isLandingPage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">

      {!isLandingPage && (
        <Navbar
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>

      {!isLandingPage && <Footer />}

    </div>
  );
}