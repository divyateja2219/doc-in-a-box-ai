import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/components/Dashboard";
import ConversationMonitor from "@/components/ConversationMonitor";
import MedicineTracker from "@/components/MedicineTracker"; 
import KnowledgeBase from "@/components/KnowledgeBase";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-background to-card">
      <div className="container mx-auto p-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card shadow-soft">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-medical data-[state=active]:text-white">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="conversations" className="data-[state=active]:bg-gradient-medical data-[state=active]:text-white">
              Conversations
            </TabsTrigger>
            <TabsTrigger value="medicine" className="data-[state=active]:bg-gradient-medical data-[state=active]:text-white">
              Medicine Tracker
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="data-[state=active]:bg-gradient-medical data-[state=active]:text-white">
              Knowledge Base
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="conversations">
            <ConversationMonitor />
          </TabsContent>

          <TabsContent value="medicine">
            <MedicineTracker />
          </TabsContent>

          <TabsContent value="knowledge">
            <KnowledgeBase />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
