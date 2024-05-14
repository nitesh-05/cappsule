import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import { fetchData } from "./api/FetchByName";
import SaltSuggestions from "./components/SaltSuggestions";

import Dummy_data from "./data/Dummy_data.json";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    const data = await fetchData(query);
    if (data) {
      setSearchResults(data.data.saltSuggestions);
    }
  };
  return (
    <div className="container mx-auto px-8 p-4 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mt-8">Cappsule web development test</h1>
      <SearchBar onSearch={handleSearch} className="w-full" />
      <div className="border-b-2 border-gray-200 w-full mb-6"></div>

      {searchResults && searchResults.length > 0 ? (
        <SaltSuggestions saltSuggestions={searchResults} className="w-full" />
      ) : (
        <h1>No data found</h1>
      )}
    </div>
  );
};

export default App;
