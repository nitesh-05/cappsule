import React, { useState } from "react";
import { checkPrice } from "../utils/checkPrice";

function Form({ suggestion, selectedOptions, handleSelectionChange }) {
  const forms = suggestion.available_forms;
  const salt = suggestion.salt;
  const [showMore, setShowMore] = useState(false);

  const displayedForms = showMore ? forms : forms.slice(0, 2);

  // Function to render buttons in rows of two
  const renderButtons = () => {
    const rows = [];
    for (let i = 0; i < displayedForms.length; i += 2) {
      rows.push(
        <div key={i} className="flex">
          {displayedForms.slice(i, i + 2).map((form, index) => {
            const strengths = Object.keys(
              suggestion.salt_forms_json[form] || {}
            );
            const hasPriceForForm = strengths.some((strength) =>
              checkPrice(form, strength, undefined, suggestion)
            );

            return (
              <button
                key={index}
                className={`rounded-lg ${
                  hasPriceForForm
                    ? selectedOptions[salt]?.form === form
                      ? "border border-black shadow-blue-500 text-black"
                      : "border border-gray-300 text-gray-500"
                    : selectedOptions[salt]?.form === form
                    ? "border-2 border-dashed border-black"
                    : "border-2 border-dashed border-gray-300 text-gray-500"
                } shadow-md px-4 py-2 m-1`}
                onClick={() => handleSelectionChange(salt, "form", form)}
              >
                {form}
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
      <p className="w-28">Form:</p>
      <div className={`flex flex-col ${showMore ? "" : "flex-wrap"}`}>
        {renderButtons()}
      </div>

      {forms.length > 2 && (
        <button
          className="text-blue-600 ml-2 font-bold"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "hide ..." : "more ..."}
        </button>
      )}
    </div>
  );
}

export default Form;
