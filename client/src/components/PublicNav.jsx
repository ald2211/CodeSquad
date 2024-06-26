import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PublicNav = () => {
  const navigate = useNavigate();
  const [signState, setSignState] = useState(false);
  return (
    <nav className=" flex justify-between px-2 md:px-11 pt-2">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono">
        CodeSquad
      </h1>
      <div className=" flex items-center justify-center">
        <button
          onClick={() => navigate("/login")}
          type="button"
          class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-2.5 text-sm   py-1 md:py-2 lg:px-5 lg:py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        >
          Log In
        </button>
        <button
          onClick={() => navigate("/signup")}
          type="button"
          class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  text-sm px-2.5 py-1 md:py-2 lg:px-5 lg:py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default PublicNav;
