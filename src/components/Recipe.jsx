import React, { useState } from "react";
import axios from "axios";

function Recipe() {
  const [food, setFood] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  const fetchRecipes = async () => {
    if (!food.trim()) return;

    setError("");
    setRecipes([]);

    try {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/search.php",
        {
          params: { s: food },
        }
      );

      if (!res.data.meals) {
        setError("No recipes found");
        return;
      }

      setRecipes(res.data.meals);
    } catch (err) {
      setError("Failed to fetch recipes");
    }
  };

  return (
    <div className="card">
      <h2>Food Recipes</h2>
      <p>Search delicious recipes using food ingredients.</p>

      <input
        type="text"
        placeholder="Enter food item (e.g. Chicken)"
        value={food}
        onChange={(e) => setFood(e.target.value)}
      />

      <button onClick={fetchRecipes}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {recipes.slice(0, 3).map((r) => (
          <li key={r.idMeal}>{r.strMeal}</li>
        ))}
      </ul>
    </div>
  );
}

export default Recipe;
