import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Master from "./components/Master";
import Temperature from "./components/Temperature";
import Population from "./components/Population";
import Institutions from "./components/Institutions";
import Recipe from "./components/Recipe";
import WaterResources from "./components/WaterResources";

function App() {
  return (
    <BrowserRouter>
      <Header /> {/* ✅ Header + Header line appears everywhere */}
      <Routes>
        <Route path="/" element={<Master />} />
        <Route path="/temperature" element={<Temperature />} />
        <Route path="/population" element={<Population />} />
        <Route path="/institutions" element={<Institutions />} />
        <Route path="/recipes" element={<Recipe />} />
        <Route path="/water" element={<WaterResources />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
