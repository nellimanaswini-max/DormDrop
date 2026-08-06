import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [campus, setCampus] = useState("");
  const [residenceHall, setResidenceHall] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
      campus,
      residenceHall,
    });

    console.log("Register response:", response.data);

    toast.success("Account created successfully!");

    navigate("/login");
  } catch (error) {
    console.error("Registration failed:", error);

    toast.error(
      error.response?.data?.message ||
      "Failed to create account."
    );
  }
};

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">

        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-widest text-stone-400">
            Join DormDrop
          </p>

          <h1 className="mt-2 text-5xl font-black text-stone-900">
            Create account
          </h1>

          <p className="mt-3 text-stone-500">
            Join your campus marketplace and start buying and selling.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <div>
            <label className="block mb-2 font-bold text-stone-800">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="w-full rounded-2xl border border-stone-300 px-5 py-4 outline-none focus:border-stone-900"
            />
          </div>

          {/* EMAIL */}
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
              className="w-full rounded-2xl border border-stone-300 px-5 py-4 outline-none focus:border-stone-900"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block mb-2 font-bold text-stone-800">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              className="w-full rounded-2xl border border-stone-300 px-5 py-4 outline-none focus:border-stone-900"
            />
          </div>

          {/* CAMPUS */}
          <div>
            <label className="block mb-2 font-bold text-stone-800">
              Campus
            </label>

            <select
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
              required
              className="w-full rounded-2xl border border-stone-300 px-5 py-4 outline-none focus:border-stone-900"
            >
              <option value="">Select your campus</option>
              <option value="NIAT">NIAT</option>
              <option value="MLRIT">MLRIT</option>
              <option value="JNTUH">JNTUH</option>
              <option value="CBIT">CBIT</option>
              <option value="VNRVJIET">VNR VJIET</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* RESIDENCE HALL */}
          <div>
            <label className="block mb-2 font-bold text-stone-800">
              Residence Hall
            </label>

            <input
              type="text"
              value={residenceHall}
              onChange={(e) => setResidenceHall(e.target.value)}
              placeholder="Example: Hostel A"
              className="w-full rounded-2xl border border-stone-300 px-5 py-4 outline-none focus:border-stone-900"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-stone-900 px-6 py-4 font-bold text-white transition hover:bg-stone-800"
          >
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-stone-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-stone-900 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </section>
  );
}