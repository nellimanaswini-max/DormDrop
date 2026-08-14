import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";import {
  Sparkles,
  Heart,
  Plus,
  MessageSquare,
  User,
  MapPin,
  ChevronDown,
} from "lucide-react";

export default function Navbar({
  currentUser,
  setCurrentUser,
  unreadMessagesCount = 0,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setCurrentUser(null);
    setDropdownOpen(false);
    navigate("/login");
  };
  const navItems = [
    {
      label: "Explore",
      icon: Sparkles,
      path: "/",
    },
    {
      label: "Favorites",
      icon: Heart,
      path: "/favorites",
    },
    {
      label: "Drop Item",
      icon: Plus,
      path: "/create",
      highlight: true,
    },
    {
      label: "Messages",
      icon: MessageSquare,
      path: "/messages",
      badge: unreadMessagesCount,
    },
    {
      label: "Profile",
      icon: User,
      path: "/profile",
    },
  ];


  return (
    <motion.header
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="sticky top-0 z-40 w-full border-b border-stone-200/60 bg-white/80 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}

        <div className="flex items-center gap-5">

          <NavLink
            to="/"
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-xl bg-stone-900 flex items-center justify-center text-white font-black text-sm">
              DD
            </div>

            <span className="hidden sm:block text-lg font-bold tracking-tight text-stone-900">
              DormDrop
            </span>
          </NavLink>

          <div className="hidden sm:block h-5 w-px bg-stone-200" />

          {/* Campus */}

          <div className="relative">

            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 transition"
            >
              <MapPin size={15} />

              <span className="text-xs font-semibold">
                {currentUser?.campus || "Your Campus"}
              </span>

              <ChevronDown size={14} />
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0"
                  onClick={() => setDropdownOpen(false)}
                />

                <div className="absolute left-0 mt-2 w-52 bg-white rounded-xl border border-stone-200 shadow-lg py-2 z-50">

                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl border border-stone-200 shadow-lg py-3 z-50">
                    <div className="px-4 py-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                        Your Campus
                      </p>

                      <p className="mt-1 text-sm font-bold text-stone-900">
                        {currentUser?.campus || "Not selected"}
                      </p>

                      {currentUser?.residenceHall && (
                        <p className="mt-1 text-xs text-stone-500">
                          {currentUser.residenceHall}
                        </p>
                      )}
                    </div>
                  </div>

                </div>
              </>
            )}

          </div>

        </div>

        {/* Navigation */}

        <nav className="flex items-center gap-2">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `${
                    item.highlight
                      ? isActive
                        ? "bg-stone-900 text-white"
                        : "bg-stone-100 hover:bg-stone-200 text-stone-900"
                      : isActive
                      ? "bg-stone-100 text-stone-900"
                      : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
                  } relative flex items-center gap-2 px-4 py-2 rounded-xl transition`
                }
              >
                <Icon size={18} />

                <span className="hidden lg:block text-sm font-medium">
                  {item.label}
                </span>

                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

          {/* Logged-in user */}
          {currentUser && (
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-stone-200">

              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-stone-900">
                  {currentUser.name}
                </p>

                <p className="text-[11px] text-stone-500">
                  {currentUser.campus}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-xl text-sm font-semibold text-stone-500 hover:bg-stone-100 hover:text-stone-900 transition"
              >
                Logout
              </button>

            </div>
          )}

        </nav>

      </div>
    </motion.header>
  );
}