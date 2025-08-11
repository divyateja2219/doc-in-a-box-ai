import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles } from "lucide-react";

const tipsByCategory: Record<string, string[]> = {
  Nutrition: [
    "Add more leafy greens to your diet — they boost your immune system and improve digestion.",
    "Stay hydrated: Aim for at least 2-3 liters of water per day.",
    "Limit processed sugar intake to maintain stable energy levels.",
  ],
  Exercise: [
    "A brisk 20-minute walk can improve your mood and heart health.",
    "Include strength training twice a week to maintain muscle mass.",
    "Stretch for 5-10 minutes every morning to improve flexibility.",
  ],
  Sleep: [
    "Avoid screens at least 30 minutes before bed to improve sleep quality.",
    "Maintain a consistent bedtime to regulate your circadian rhythm.",
    "Keep your bedroom cool and dark for better rest.",
  ],
  "Mental Wellness": [
    "Take 5 minutes daily for deep breathing or meditation.",
    "Journaling your thoughts can help reduce anxiety.",
    "Schedule regular breaks during work to prevent burnout.",
  ],
  "General Health": [
    "Get regular check-ups even if you feel healthy.",
    "Wash your hands often to reduce the spread of illness.",
    "Practice good posture to prevent back and neck pain.",
  ],
};

const getRandomTip = (category: string) => {
  const list = tipsByCategory[category] || [];
  if (list.length === 0) return "No tips available for this category.";
  return list[Math.floor(Math.random() * list.length)];
};

const HealthAdvice: React.FC = () => {
  const [category, setCategory] = useState<string>("General Health");
  const [tip, setTip] = useState<string>(getRandomTip("General Health"));

  const handleGenerateTip = () => {
    const newTip = getRandomTip(category);
    setTip(newTip);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-lg shadow-lg rounded-2xl border border-green-200 dark:border-gray-700">
        <CardHeader className="flex flex-col items-center text-center">
          <Sparkles className="w-8 h-8 text-green-500 mb-2" />
          <CardTitle className="text-2xl font-bold">AI Health Advice</CardTitle>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Get quick, personalized tips to improve your well-being.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(tipsByCategory).map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <AnimatePresence mode="wait">
            <motion.div
              key={tip}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="p-4 bg-green-50 dark:bg-gray-700 rounded-lg border border-green-200 dark:border-gray-600 shadow-sm"
            >
              <p className="text-lg text-gray-800 dark:text-gray-200">{tip}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center">
            <Button onClick={handleGenerateTip} className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6">
              Get New Tip
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthAdvice;
