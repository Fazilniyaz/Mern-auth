import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/">
          <h1 className="font-bold text-xl">Auth App</h1>
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-lg">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/sign-up">Sign-in</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
