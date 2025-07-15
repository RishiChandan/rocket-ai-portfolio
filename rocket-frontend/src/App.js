import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Rocket from "./Rocket";
import Rishi from "./Rishi";
import ContactModal from "./ContactModal";
import "./index.css";

const App = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Router>
      <div className="min-h-screen text-black">
        {/* Navbar */}
        <nav className="w-full px-6 py-3 flex justify-between items-center bg-[#333333] fixed top-0 z-50 shadow-md" style={{ color: "#BDC3C7" }}>
          <div className="text-xl font-bold text-red-500">🚀</div>
          <ul className="flex space-x-6 text-sm font-medium">
            <li>
              <Link to="/" className="hover:text-white transition">RoCket</Link>
            </li>
            <li>
              <Link to="/rishi" className="hover:text-white transition">Rishi</Link>
            </li>
            <li>
              <button onClick={() => setShowModal(true)} className="hover:text-white transition">Contact</button>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Rocket />} />
            <Route path="/rishi" element={<Rishi />} />
          </Routes>
        </div>

        {/* Contact Modal */}
        {showModal && <ContactModal onClose={() => setShowModal(false)} />}
      </div>
    </Router>
  );
};

export default App;
