import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HealthAdvice from "./pages/HealthAdvice";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Navbar stays across all pages */}
        <Navbar />

        {/* Page Content */}
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/health-advice" element={<HealthAdvice />} />

            {/* 404 Fallback */}
            <Route
              path="*"
              element={
                <div className="text-center text-xl mt-20">
                  🚫 Page Not Found
                  <br />
                  <a href="#/" className="text-blue-400 underline">
                    Go back home
                  </a>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
