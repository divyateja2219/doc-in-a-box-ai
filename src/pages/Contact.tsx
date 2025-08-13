import React from 'react';

export default function Contact() {
  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <p>
        Have questions or feedback? Reach out to us at:
        <br />
        <a href="mailto:support@docinabox.com" className="text-blue-500 underline">
          support@docinabox.com
        </a>
      </p>
    </div>
  );
}
