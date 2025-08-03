import React from "react";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
      {/* ✅ This is the new line to test */}
      <h1 className="text-4xl font-bold text-red-500 mb-4">I AM UPDATED!</h1>

      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-800">
        Your AI Doctor on WhatsApp
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-xl mb-6">
        Get instant health advice, symptom checks, and medicine reminders — 24/7 via WhatsApp.
      </p>
      <a
        href="https://wa.me/14155238886?text=Hi%2C%20I%20need%20medical%20advice"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-lg transition"
      >
        🚑 Chat Now on WhatsApp
      </a>
    </section>
  );
}
