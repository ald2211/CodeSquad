import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ setSearch }) => {
  return (
    <div className="flex items-center mb-4 border border-black rounded-full  shadow-sm hover:shadow-md transition-shadow duration-300">
      <CiSearch className="text-gray-500 ml-2 w-6 h-6 " />
      <input
        type="text"
        className="w-full p-1 pl-4 rounded-full outline-none bg-transparent"
        placeholder="Search projects..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
