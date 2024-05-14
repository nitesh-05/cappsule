export const checkPrice = (form, strength, packing, suggestion) => {
  if (packing !== undefined) {
    return Object.keys(
      suggestion.salt_forms_json[form][strength][packing] || {}
    ).some(
      (id) =>
        suggestion.salt_forms_json[form][strength][packing][id] !== null &&
        suggestion.salt_forms_json[form][strength][packing][id].some(
          (price) => price !== null
        )
    );
  } else {
    return Object.keys(suggestion.salt_forms_json[form][strength] || {}).some(
      (packing) => checkPrice(form, strength, packing, suggestion)
    );
  }
};
