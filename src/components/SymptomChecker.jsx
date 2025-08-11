import React, { useState } from "react";
export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    setResult("");

    try {
      // Example API call to your backend (update with your endpoint)
      const res = await fetch("/api/checkSymptoms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
      });

      const data = await res.json();
      setResult(data.response || "No suggestions found.");
    } catch (error) {
      setResult("Error checking symptoms.");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-3 text-blue-600">🩺 Symptom Checker</h2>
      <p className="mb-4 text-gray-600">
        Enter your symptoms below to get AI-powered health suggestions.
      </p>

      <textarea
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="Type your symptoms here..."
        className="border border-gray-300 p-3 rounded w-full mb-4 h-28 resize-none"
      />

      <button
        onClick={handleCheck}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Checking..." : "Check Symptoms"}
      </button>

      {result && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
          <strong>AI Suggestion:</strong>
          <p className="mt-1">{result}</p>
        </div>
      )}
    </div>
  );
}
