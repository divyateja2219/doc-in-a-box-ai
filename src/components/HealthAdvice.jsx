// HealthAdvice.js
import React from "react";

function HealthAdvice() {
  return (
    <section className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 py-10 px-6 rounded-2xl shadow-lg text-center max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-6">
        🩺 Daily Health Advice
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        Stay hydrated, take regular breaks from screens, and ensure you get
        enough quality sleep.  
        Eat a balanced diet and keep moving — your body will thank you!  
        Remember, small habits build long-term health. 💚
      </p>
      <div className="mt-6">
        <a
          href="https://www.who.int/news-room/fact-sheets/detail/healthy-diet"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-full shadow-md transition duration-300"
        >
          Learn More
        </a>
      </div>
    </section>
  );
}

export default HealthAdvice;
