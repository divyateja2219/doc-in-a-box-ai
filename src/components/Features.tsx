// src/components/Features.tsx
import { HeartPulse, Stethoscope, Pill } from "lucide-react";

const features = [
{
icon: <Stethoscope className="h-8 w-8 text-blue-600" />,
title: "Symptom Checker",
description: "Describe your symptoms and get instant AI feedback.",
},
{
icon: <Pill className="h-8 w-8 text-green-600" />,
title: "Medicine Tracker",
description: "Stay on schedule with reminders and dosage tracking.",
},
{
icon: <HeartPulse className="h-8 w-8 text-red-500" />,
title: "Health Advice",
description: "Get useful, friendly suggestions to stay healthy.",
},
];

export default function Features() {
return (
<section className="py-16 bg-gray-50">
<div className="max-w-5xl mx-auto px-4 text-center">
<h2 className="text-3xl font-bold mb-8">What Can I Do?</h2>
<div className="grid md:grid-cols-3 gap-8">
{features.map((f, i) => (
<div key={i} className="bg-white rounded-2xl shadow p-6 flex flex-col items-center" >
{f.icon}
<h3 className="text-xl font-semibold mt-4">{f.title}</h3>
<p className="text-sm text-gray-600 mt-2">{f.description}</p>
</div>
))}
</div>
</div>
</section>
);
}
