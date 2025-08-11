import { useState } from "react";

function App() {
  const [tips, setTips] = useState([]);

  const getTips = async () => {
    try {
      const res = await fetch("/api/healthTips");
      if (!res.ok) {
        throw new Error("Failed to fetch tips");
      }
      const data = await res.json();
      setTips(data.tips || []);
    } catch (error) {
      console.error(error);
      setTips(["Error fetching health tips."]);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Health Tips</h1>
      <button
        onClick={getTips}
        style={{
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Get Tips
      </button>
      <ul>
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
