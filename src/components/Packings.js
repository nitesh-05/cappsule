import { useState } from "react";
import { checkPrice } from "../utils/checkPrice";

const Packings = ({
  form,
  salt,
  strength,
  suggestion,
  selectedPacking,
  handleSelectionChange,
}) => {
  const packings = Object.keys(
    suggestion.salt_forms_json[form]?.[strength] || {}
  );
  const [showMore, setShowMore] = useState(false);

  const displayedPackings = showMore ? packings : packings.slice(0, 2);

  // Function to render buttons in rows of two
  const renderButtons = () => {
    const rows = [];
    for (let i = 0; i < displayedPackings.length; i += 2) {
      rows.push(
        <div key={i} className="flex">
          {displayedPackings.slice(i, i + 2).map((packing, index) => {
            // console.log("PACKAGE/FORM-", form);
            // console.log("PACKAGE/strength-", strength);

            const hasPriceForPacking = checkPrice(
              form,
              strength,
              packing,
              suggestion
            );

            return (
              <button
                key={index}
                className={`rounded-lg ${
                  hasPriceForPacking
                    ? selectedPacking === packing
                      ? "border border-black shadow-blue-500 text-black"
                      : "border border-gray-300 text-gray-500"
                    : selectedPacking === packing
                    ? "border-2 border-dashed border-black"
                    : "border-2 border-dashed border-gray-300 text-gray-500"
                } shadow-md px-4 py-2 m-1`}
                onClick={() => handleSelectionChange(salt, "packing", packing)}
              >
                {packing}
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
      <p className="w-28">Packaging:</p>
      <div className={`flex flex-col ${showMore ? "" : "flex-wrap"}`}>
        {renderButtons()}
      </div>
      {packings.length > 2 && (
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

export default Packings;
