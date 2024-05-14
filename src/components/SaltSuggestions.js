import React, { useState, useEffect } from "react";
import Strengths from "./Strength";
import Packings from "./Packings";
import Form from "./Form";

// component for rendering Lowest price

const LowestPrice = ({ form, strength, suggestion, selectedPacking }) => {
  // Function to find the lowest price for the selected packing
  const findLowestPrice = () => {
    let lowestPrice = null;

    // Check if the form, strength, and packing are selected
    if (form && strength && selectedPacking) {
      // Get the pharmacies for the selected packing
      const pharmacies =
        suggestion.salt_forms_json[form][strength][selectedPacking] || {};
      // Iterate over the pharmacies for the selected packing
      Object.values(pharmacies).forEach((pharmacy) => {
        // Check if the pharmacy has a selling price
        if (pharmacy && pharmacy.selling_price !== null) {
          // Update lowestPrice if the current selling price is lower
          pharmacy.forEach((sellingPrice) => {
            if (
              lowestPrice === null ||
              sellingPrice.selling_price < lowestPrice
            ) {
              lowestPrice = sellingPrice.selling_price;
            }
          });
        }
      });
    }

    return lowestPrice;
  };

  // Calculate lowest price
  const lowestPrice = findLowestPrice();

  return (
    <div className="mb-2 flex">
      <div className="w-56">
        {lowestPrice !== null ? (
          <span className="w-56 text-xl font-bold p-2 inline-block text-center">
            From: &#8377; {lowestPrice}
          </span>
        ) : (
          <span className="w-56 border border-blue-300 rounded p-2 bg-gray-100 inline-block text-center">
            No stores selling this product near you
          </span>
        )}
      </div>
    </div>
  );
};

// Main component
const SaltSuggestions = ({ saltSuggestions }) => {
  // State to store selected strength and packing for each form
  const [selectedOptions, setSelectedOptions] = useState({});

  // Function to handle selection change for each form
  const handleSelectionChange = (form, type, option) => {
    if (type === "form") {
      const suggestion = saltSuggestions.find(
        (suggestion) => suggestion.salt === form
      );
      const strengths = Object.keys(suggestion.salt_forms_json[option] || {});
      const firstStrength = strengths[0];
      const firstPacking = Object.keys(
        suggestion.salt_forms_json[option][firstStrength] || {}
      )[0];

      setSelectedOptions({
        ...selectedOptions,
        [form]: {
          form: option,
          strength: firstStrength,
          packing: firstPacking,
        },
      });
    } else if (type === "strength") {
      const suggestion = saltSuggestions.find(
        (suggestion) => suggestion.salt === form
      );
      const firstPacking = Object.keys(
        suggestion.salt_forms_json[selectedOptions[form]?.form][option] || {}
      )[0];

      setSelectedOptions({
        ...selectedOptions,
        [form]: {
          ...selectedOptions[form],
          strength: option,
          packing: firstPacking,
        },
      });
    } else {
      setSelectedOptions({
        ...selectedOptions,
        [form]: {
          ...selectedOptions[form],
          [type]: option,
        },
      });
    }
  };

  // Set initial selected options
  useEffect(() => {
    const initialSelectedOptions = {};
    saltSuggestions.forEach((suggestion) => {
      const form = suggestion.available_forms[0];
      const strengths = Object.keys(suggestion.salt_forms_json[form] || {});
      const firstStrength = strengths[0];
      const firstPacking = Object.keys(
        suggestion.salt_forms_json[form][firstStrength] || {}
      )[0];

      initialSelectedOptions[suggestion.salt] = {
        form,
        strength: firstStrength,
        packing: firstPacking,
      };
    });
    setSelectedOptions(initialSelectedOptions);
  }, [saltSuggestions]);

  // Function to render selection buttons
  const renderForms = () => {
    return saltSuggestions.map((suggestion) => (
      <div
        key={suggestion.id}
        className="mb-4 p-4 rounded-xl flex items-center justify-between min-h-64 bg-gradient-to-r from-gray-50 to-blue-200 shadow-md"
      >
        <div className="ml-4">
          <Form
            suggestion={suggestion}
            selectedOptions={selectedOptions}
            handleSelectionChange={handleSelectionChange}
          />

          {selectedOptions[suggestion.salt]?.form && (
            <>
              <Strengths
                form={selectedOptions[suggestion.salt]?.form}
                salt={suggestion.salt}
                suggestion={suggestion}
                selectedStrength={selectedOptions[suggestion.salt]?.strength}
                handleSelectionChange={handleSelectionChange}
              />
              <Packings
                saltSuggestions={saltSuggestions}
                form={selectedOptions[suggestion.salt]?.form}
                salt={suggestion.salt}
                strength={selectedOptions[suggestion.salt]?.strength}
                suggestion={suggestion}
                selectedPacking={selectedOptions[suggestion.salt]?.packing}
                handleSelectionChange={handleSelectionChange}
              />
            </>
          )}
        </div>
        <div className="ml-4 text-center">
          <h2 className="text-lg font-semibold">{suggestion.salt}</h2>
          {selectedOptions[suggestion.salt]?.form && (
            <>
              <p className="text-blue-500">
                {selectedOptions[suggestion.salt]?.form} |{" "}
                {selectedOptions[suggestion.salt]?.strength} |{" "}
                {selectedOptions[suggestion.salt]?.packing}
              </p>
            </>
          )}
        </div>
        <div className="ml-4">
          <div>
            <LowestPrice
              form={selectedOptions[suggestion.salt]?.form}
              strength={selectedOptions[suggestion.salt]?.strength}
              suggestion={suggestion}
              selectedPacking={selectedOptions[suggestion.salt]?.packing}
            />
          </div>
        </div>
      </div>
    ));
  };

  return <div className="w-full">{renderForms()}</div>;
};

export default SaltSuggestions;
