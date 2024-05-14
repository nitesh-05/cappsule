// api.js
async function fetchData(query) {
  try {
    // const response = await fetch(`https://fakestoreapi.com/products/${query}`);
    const response = await fetch(
      `https://backend.cappsule.co.in/api/v1/new_search?q=${query}&pharmacyIds=1,2,3`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Handle errors gracefully
  }
}

export { fetchData };
