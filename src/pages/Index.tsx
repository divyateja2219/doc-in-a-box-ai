import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/components/Dashboard";
import ConversationMonitor from "@/components/ConversationMonitor";
import MedicineTracker from "@/components/MedicineTracker";
import KnowledgeBase from "@/components/KnowledgeBase";
import SymptomChecker from "@/components/SymptomChecker";
import HealthAdvice from "@/components/HealthAdvice";
const Index = () => {
  const [tips, setTips] = useState<string[]>([]);

  const getTips = async () => {
    try {
      const res = await fetch("/api/healthTips");
      if (!res.ok) throw new Error("Failed to fetch tips");
      const data = await res.json();
      setTips(data.tips || []);
    } catch {
      setTips(["Error fetching health tips."]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-background to-card">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Doc-in-a-Box AI</h1>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-card shadow-soft rounded-lg overflow-hidden">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-medical data-[state=active]:text-white">Dashboard</TabsTrigger>
            <TabsTrigger value="conversations" className="data-[state=active]:bg-gradient-medical data-[state=active]:text-white">Conversations</TabsTrigger>
            <TabsTrigger value="symptom" className="data-[state=active]:bg-gradient-medical data-[state=active]:text-white">Symptom Checker</TabsTrigger>
            <TabsTrigger value="medicine" className="data-[state=active]:bg-gradient-medical data-[state=active]:text-white">Medicine Tracker</TabsTrigger>
            <TabsTrigger value="advice" className="data-[state=active]:bg-gradient-medical data-[state=active]:text-white">Health Advice</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard"><Dashboard /></TabsContent>
          <TabsContent value="conversations"><ConversationMonitor /></TabsContent>
          <TabsContent value="symptom"><SymptomChecker /></TabsContent>
          <TabsContent value="medicine"><MedicineTracker /></TabsContent>

          {/* Health Advice tab with Health Tips integrated */}
          <TabsContent value="advice">
            <HealthAdvice />
            <div className="mt-6 p-4 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Extra Health Tips</h2>
              <button
                onClick={getTips}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Get Tips
              </button>
              <ul className="mt-4 list-disc list-inside">
                {tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </TabsContent>

          {/* Keep KnowledgeBase separate */}
          <TabsContent value="knowledge"><KnowledgeBase /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
