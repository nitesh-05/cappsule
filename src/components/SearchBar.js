// components/SearchBar.js
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-2 p-4 flex items-center justify-between w-full"
    >
      <div className="flex items-center rounded-lg overflow-hidden border border-gray-300 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 ml-2 text-gray-400 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <input
          type="text"
          maxLength={20}
          value={query}
          onChange={handleChange}
          placeholder="Search medicine name"
          className="flex-1 px-4 py-2 focus:outline-none focus:border-blue-500 rounded-lg"
        />
        <button type="submit" className="hover:text-blue-600 px-4 py-2">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
