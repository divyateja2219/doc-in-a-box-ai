// src/components/Footer.tsx
export default function Footer() {
return (
<footer className="bg-white text-gray-600 border-t py-6 mt-10">
<div className="max-w-5xl mx-auto px-4 text-center text-sm">
<p>© {new Date().getFullYear()} AI Doctor Assistant. All rights reserved.</p>
<p className="mt-2">
Built with ❤️ using Vite, React, Tailwind CSS, and OpenAI.
</p>
</div>
</footer>
);
}
