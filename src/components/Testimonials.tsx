// src/components/Testimonials.tsx
import React from "react";
export default function Testimonials() {
  return (
    <section className="py-16 px-6 bg-white text-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">What People Are Saying</h2>
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <p className="text-gray-700 italic">"It’s so helpful for my parents who are not tech-savvy but know WhatsApp!"</p>
          <p className="mt-2 text-sm font-semibold text-blue-800">– User Feedback</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <p className="text-gray-700 italic">"I love how it gives instant suggestions based on symptoms. Very useful."</p>
          <p className="mt-2 text-sm font-semibold text-blue-800">– Beta Tester</p>
        </div>
      </div>
    </section>
  );
}
