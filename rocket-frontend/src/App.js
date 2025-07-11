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
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-blue-900 text-white">
        {/* Navbar */}
        <nav className="w-full px-6 py-4 flex justify-between items-center bg-black bg-opacity-80 fixed top-0 z-50 shadow-md">
          <div className="text-xl font-bold text-red-500">🚀</div>
          <ul className="flex space-x-6 text-sm font-medium">
            <li>
              <Link to="/" className="hover:text-red-400 transition">RoCket</Link>
            </li>
            <li>
              <Link to="/rishi" className="hover:text-red-400 transition">Rishi</Link>
            </li>
            <li>
              <button onClick={() => setShowModal(true)} className="hover:text-red-400 transition">Contact</button>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <div className="pt-24">
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
