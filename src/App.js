import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import { fetchData } from "./api/FetchByName";
import SaltSuggestions from "./components/SaltSuggestions";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";
import DUMMY_DATA from "../src/DATA/DUMMY_DATA.json";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query) => {
    setIsLoading(true);
    // fetch data from endpoints third party api
    // const data = await fetchData(query);
    const data = DUMMY_DATA;
    if (data) {
      setSearchResults(data.data.saltSuggestions);
    }
    setIsLoading(false);
  };
  return (
    <div className="container mx-auto px-8 p-4 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mt-8">Cappsule web development test</h1>
      <SearchBar
        onSearch={handleSearch}
        className="w-full sticky top-0 bg-white"
      />
      <div className="border-b-2 border-gray-200 w-full mb-6"></div>
      {isLoading && (
        <div className="flex items-center justify-center h-[30rem]">
          <RingLoader
            color={"#000"}
            loading={isLoading}
            css={override}
            size={50}
          />
        </div>
      )}
      <div
        className={`transition-all duration-500 w-full ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {!isLoading && searchResults && searchResults.length > 0 && (
          <SaltSuggestions saltSuggestions={searchResults} className="w-full" />
        )}
        {!isLoading && searchResults.length === 0 && (
          <div className="flex flex-col justify-center items-center h-[30rem]">
            <h1 className="text-gray-500">
              "Find medicines with amazing discount"
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

const override = css`
  display: block;
  margin: 0 auto;
`;

export default App;
