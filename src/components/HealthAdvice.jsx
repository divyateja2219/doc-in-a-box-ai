import React from "react";

export default function HealthAdvice() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Health Advice</h2>
      <p>
        Here you can display AI-generated or static health tips, diet plans,
        exercise suggestions, and wellness reminders.
      </p>
      <ul className="list-disc list-inside mt-2">
        <li>Drink at least 2 liters of water daily.</li>
        <li>Exercise for at least 30 minutes a day.</li>
        <li>Eat a balanced diet with plenty of fruits and vegetables.</li>
      </ul>
    </div>
  );
}
