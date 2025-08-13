import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <div className="font-bold">Doc-in-a-Box AI</div>
      <div className="space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "underline font-bold" : "hover:underline"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "underline font-bold" : "hover:underline"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "underline font-bold" : "hover:underline"
          }
        >
          Contact
        </NavLink>
        <NavLink
          to="/health-advice"
          className={({ isActive }) =>
            isActive ? "underline font-bold" : "hover:underline"
          }
        >
          Health Advice
        </NavLink>
      </div>
    </nav>
  );
}
