import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFalure } from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFalure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
      toast.success("Sign in successfuly");
    } catch (error) {
      dispatch(signInFalure(error.message));
    }
  };
  return (
    <div className="max-w-lg mx-auto my-6">
      <h1 className="font-semibold text-3xl text-center">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
        <input
          type="email"
          name="email"
          id="email"
          className="p-3
        rounded-lg
        "
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          id="password"
          className="p-3
        rounded-lg
        "
          placeholder="Password"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-blue-700 p-3 rounded-lg uppercase text-white hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-6">
        <p>Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className="hover:underline">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-700">{error}</p>}
    </div>
  );
}
