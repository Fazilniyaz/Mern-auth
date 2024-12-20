import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const { loading, error } = useSelector((state) => state.user);

  let navigate = useNavigate();
  let dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      // setError(false);
      dispatch(signInStart);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      // setLoading(false);
      if (data.success === false) {
        // setError(true);
        dispatch(signInFailure(data));
        return;
      }
      // setError(false);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      // setLoading(false);
      // setError(true);
      signInFailure(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">SignIn</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* <input
          className="bg-slate-100 p-3 rounded-lg"
          type="text"
          id="username"
          placeholder="Username"
          onChange={handleChange}
        /> */}
        <input
          className="bg-slate-100 p-3 rounded-lg"
          type="email"
          id="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="bg-slate-100 p-3 rounded-lg"
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "SignIn"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont Have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">SignUp</span>
        </Link>
      </div>
      <p className="text-red-700">
        {error ? error.message || "Something went wrong" : ""}
      </p>
    </div>
  );
}
