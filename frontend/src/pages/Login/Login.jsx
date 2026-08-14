import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function Login({ setCurrentUser }) {
      const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    console.log("Login response:", response.data);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );
    setCurrentUser(response.data.user);
    toast.success("Welcome back!");

  navigate("/home");
  } catch (error) {
    console.error("Login failed:", error);

    toast.error(
      error.response?.data?.message || "Login failed."
    );
  }
};

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">

        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-widest text-stone-400">
            Welcome back
          </p>

          <h1 className="mt-2 text-5xl font-black text-stone-900">
            Login
          </h1>

          <p className="mt-3 text-stone-500">
            Sign in to continue buying, selling, and sharing on campus.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="block mb-2 font-bold text-stone-800">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@college.edu"
              required
              className="w-full rounded-2xl border border-stone-300 px-5 py-4 outline-none transition focus:border-stone-900"
            />
          </div>

          <div>
            <label className="block mb-2 font-bold text-stone-800">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full rounded-2xl border border-stone-300 px-5 py-4 outline-none transition focus:border-stone-900"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-stone-900 px-6 py-4 font-bold text-white transition hover:bg-stone-800"
          >
            Login
          </button>
        </form>

        <p className="mt-8 text-center text-stone-500">
          New to DormDrop?{" "}
          <Link
            to="/register"
            className="font-bold text-stone-900 hover:underline"
          >
            Create an account
          </Link>
        </p>

      </div>
    </section>
  );
}