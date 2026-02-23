import React, { useState } from "react";
import axios from "axios";

function Institutions() {
  const [city, setCity] = useState("");
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState("");

  const fetchInstitutions = async () => {
    if (!city.trim()) return;

    setError("");
    setSchools([]);

    try {
      // 1️⃣ Get city latitude & longitude
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

      // 2️⃣ Search schools near that city
      const query = `
        [out:json];
        node["amenity"="school"](around:15000,${lat},${lon});
        out 10;
      `;

      const res = await axios.post(
        "https://overpass-api.de/api/interpreter",
        query,
        { headers: { "Content-Type": "text/plain" } }
      );

      if (res.data.elements.length === 0) {
        setError("No schools found nearby");
      } else {
        setSchools(res.data.elements);
      }
    } catch (err) {
      setError("Failed to fetch institutions");
    }
  };

  return (
    <div className="card">
      <h2>Educational Institutions</h2>
      <p>Search for schools available in a city.</p>

      <input
        type="text"
        placeholder="Enter city name (e.g. Guntur)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={fetchInstitutions}>Find Schools</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {schools.map((s) => (
          <li key={s.id}>{s.tags?.name || "Unnamed School"}</li>
        ))}
      </ul>
    </div>
  );
}

export default Institutions;
