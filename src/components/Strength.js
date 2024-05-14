import React, { useState } from "react";
import { checkPrice } from "../utils/checkPrice";

const Strengths = ({
  form,
  salt,
  suggestion,
  selectedStrength,
  handleSelectionChange,
}) => {
  const strengths = Object.keys(suggestion.salt_forms_json[form] || {});

  const [showMore, setShowMore] = useState(false);

  const displayedStrengths = showMore ? strengths : strengths.slice(0, 2);
  // Function to render buttons in rows of two
  const renderButtons = () => {
    const rows = [];
    for (let i = 0; i < displayedStrengths.length; i += 2) {
      rows.push(
        <div key={i} className="flex">
          {displayedStrengths.slice(i, i + 2).map((strength, index) => {
            // const hasPriceForForm = hasPrice(form, strength, suggestion);
            const hasPriceForForm = checkPrice(
              form,
              strength,
              undefined,
              suggestion
            );

            return (
              <button
                key={index}
                className={`rounded-lg ${
                  hasPriceForForm
                    ? selectedStrength === strength
                      ? "border border-black shadow-blue-500 text-black"
                      : "border border-gray-300 text-gray-500"
                    : selectedStrength === strength
                    ? "border-2 border-dashed border-black"
                    : "border-2 border-dashed border-gray-300 text-gray-500"
                } shadow-md px-4 py-2 m-1`}
                onClick={() =>
                  handleSelectionChange(salt, "strength", strength)
                }
              >
                {strength}
              </button>
            );
          })}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="mb-2 flex items-center">
      <p className="w-28">Strength:</p>
      <div className={`flex flex-col ${showMore ? "" : "flex-wrap"}`}>
        {renderButtons()}
      </div>
      {strengths.length > 2 && (
        <button
          className="text-blue-600 ml-2 font-bold"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "hide ..." : "more ..."}
        </button>
      )}
    </div>
  );
};

export default Strengths;
