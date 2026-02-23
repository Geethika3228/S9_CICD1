import React, { useState } from "react";
import axios from "axios";

function WaterResources() {
  const [city, setCity] = useState("");
  const [water, setWater] = useState([]);
  const [error, setError] = useState("");

  const fetchWater = async () => {
    if (!city.trim()) return;

    setWater([]);
    setError("");

    try {
      // 1️⃣ Get city coordinates
      const geoRes = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: city,
            format: "json",
            limit: 1,
          },
        }
      );

      if (!geoRes.data.length) {
        setError("City not found");
        return;
      }

      const { lat, lon } = geoRes.data[0];

      // 2️⃣ Find water bodies nearby
      const query = `
        [out:json];
        (
          way["natural"="water"](around:20000,${lat},${lon});
          relation["natural"="water"](around:20000,${lat},${lon});
        );
        out tags;
      `;

      const res = await axios.post(
        "https://overpass-api.de/api/interpreter",
        query,
        { headers: { "Content-Type": "text/plain" } }
      );

      if (res.data.elements.length === 0) {
        setError("No water resources found nearby");
      } else {
        setWater(res.data.elements);
      }
    } catch (err) {
      setError("Failed to fetch water resources");
    }
  };

  return (
    <div className="card">
      <h2>Water Resources</h2>
      <p>Locate natural water bodies near a city.</p>

      <input
        type="text"
        placeholder="Enter city name (e.g. Guntur)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={fetchWater}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>Total Water Bodies Found: {water.length}</p>

      <ul>
        {water.slice(0, 5).map((w) => (
          <li key={w.id}>{w.tags?.name || "Unnamed Water Body"}</li>
        ))}
      </ul>
    </div>
  );
}

export default WaterResources;
