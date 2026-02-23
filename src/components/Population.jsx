import axios from "axios";
import { useState } from "react";
import "./styles.css";

function Population() {
  const [place, setPlace] = useState("");
  const [population, setPopulation] = useState(null);
  const [error, setError] = useState("");

  const cityToCountry = {
    guntur: "India",
    delhi: "India",
    chennai: "India",
    bangalore: "India",
    hyderabad: "India",
    london: "United Kingdom",
    paris: "France",
    tokyo: "Japan",
  };

  const fetchPopulation = async () => {
    try {
      setError("");
      setPopulation(null);

      const input = place.trim().toLowerCase();
      const countryName = cityToCountry[input] || place;

      const res = await axios.get(
        `https://restcountries.com/v3.1/name/${countryName}`
      );

      // ✅ FIND EXACT COUNTRY MATCH
      const exactCountry = res.data.find(
        (c) =>
          c.name.common.toLowerCase() === countryName.toLowerCase()
      );

      if (!exactCountry || !exactCountry.population) {
        setError("Population data not available for this input");
        return;
      }

      setPopulation(exactCountry.population);
    } catch {
      setError("Population data not available for this input");
    }
  };

  return (
    <div className="card">
      <h2>City / Country Population Data</h2>
      <p>
        Enter a city or country name to view its approximate population.
      </p>

      <input
        placeholder="Enter city or country"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
      />

      <button onClick={fetchPopulation}>Find Population</button>

      {population !== null && (
        <div className="result">
          The estimated population for <b>{place}</b> is{" "}
          <b>{population.toLocaleString()}</b>.
        </div>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Population;
