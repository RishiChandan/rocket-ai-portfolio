"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Rocket from "./components/Rocket"
import Rishi from "./components/Rishi"
import ContactModal from "./components/ContactModal"
import "./index.css"

const App = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <Router>
      <div className="min-h-screen text-slate-200 relative">
        {/* Fixed Professional Navbar */}
        <nav className="w-full px-8 py-4 flex justify-between items-center bg-slate-900 backdrop-blur-xl fixed top-0 left-0 right-0 z-50 shadow-xl border-b border-slate-700">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-blue-400">🚀</div>
            <span className="text-xl font-semibold text-blue-400">Portfolio</span>
          </div>
          <div className="flex items-center space-x-8 text-sm font-medium">
            {/* Special RoCket Button */}
            <Link
              to="/"
              className="relative px-4 py-2 rounded-lg transition-all duration-300 text-slate-200 group rocket-highlight"
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-teal-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>

              {/* Subtle border animation */}
              <div className="absolute inset-0 rounded-lg border border-transparent bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-teal-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              </div>

              {/* Button content */}
              <span className="relative z-10 flex items-center space-x-1">
                <span className="text-blue-400 group-hover:animate-bounce">🚀</span>
                <span className="group-hover:text-blue-300 transition-colors duration-300">RoCket</span>
              </span>
            </Link>

            {/* Regular buttons */}
            <Link
              to="/rishi"
              className="px-4 py-2 rounded-lg hover:bg-slate-800 transition-all duration-300 hover:text-blue-300 text-slate-200"
            >
              Rishi
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 rounded-lg hover:bg-slate-800 transition-all duration-300 hover:text-blue-300 text-slate-200"
            >
              Contact
            </button>
          </div>
        </nav>

        {/* Routes with proper top padding */}
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
  )
}

export default App
