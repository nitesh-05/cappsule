import React, { useState } from "react";
import SearchIcon from "../icons/Search";

const SearchBar = ({ onSearch, className }) => {
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
      className={`mb-2 p-4 sticky top-0 bg-white ${className}`}
    >
      <div className="flex items-center rounded-full overflow-hidden border border-gray-200 shadow-xl w-full px-8 py-2">
        <SearchIcon />
        <input
          type="text"
          maxLength={20}
          value={query}
          onChange={handleChange}
          placeholder="Search Medicine Name"
          className="flex-1 px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        <button type="submit" className="hover:text-blue-900 text-blue-600">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
