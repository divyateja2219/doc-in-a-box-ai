import React from 'react';
const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Doc-in-a-Box AI</h1>
        <ul className="flex gap-4">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/about" className="hover:underline">About</a></li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
