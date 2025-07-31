import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Database, Search, Plus, Edit, BookOpen, Stethoscope, Pill, Heart } from "lucide-react";

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const knowledgeEntries = [
    {
      id: "kb_001",
      title: "Common Cold Symptoms and Treatment",
      category: "Respiratory",
      content: "Common cold symptoms include runny nose, sore throat, cough, and mild fever. Treatment involves rest, fluids, and OTC medications for symptom relief.",
      tags: ["cold", "respiratory", "treatment"],
      lastUpdated: "2024-01-15",
      confidence: 95
    },
    {
      id: "kb_002",
      title: "Hypertension Management Guidelines",
      category: "Cardiovascular", 
      content: "Blood pressure management includes lifestyle modifications, regular monitoring, and medication adherence. Target BP <140/90 for most adults.",
      tags: ["hypertension", "blood pressure", "cardiovascular"],
      lastUpdated: "2024-01-14",
      confidence: 98
    },
    {
      id: "kb_003",
      title: "Diabetes Type 2 Dietary Recommendations",
      category: "Endocrine",
      content: "T2DM management includes carbohydrate counting, portion control, regular meals, and limiting processed foods. Focus on fiber-rich foods.",
      tags: ["diabetes", "diet", "nutrition", "endocrine"],
      lastUpdated: "2024-01-13", 
      confidence: 92
    },
    {
      id: "kb_004",
      title: "Emergency Red Flags - When to Seek Immediate Care",
      category: "Emergency",
      content: "Immediate medical attention needed for: chest pain, difficulty breathing, severe abdominal pain, high fever >103°F, severe headache with vision changes.",
      tags: ["emergency", "red flags", "urgent care"],
      lastUpdated: "2024-01-16",
      confidence: 99
    }
  ];

  const categories = ["All", "Respiratory", "Cardiovascular", "Endocrine", "Emergency", "Dermatology", "Gastroenterology"];

  const filteredEntries = knowledgeEntries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || selectedCategory === "All" || entry.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "text-medical-green";
    if (confidence >= 85) return "text-medical-orange";
    return "text-destructive";
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Respiratory": return <BookOpen className="h-4 w-4" />;
      case "Cardiovascular": return <Heart className="h-4 w-4" />;
      case "Endocrine": return <Stethoscope className="h-4 w-4" />;
      case "Emergency": return <Database className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card shadow-soft border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-medical-blue" />
            Medical Knowledge Base
          </CardTitle>
          <CardDescription>
            AI-powered medical information repository for diagnosis and treatment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search medical conditions, symptoms, treatments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-medical hover:opacity-90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Entry
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add Knowledge Base Entry</DialogTitle>
                  <DialogDescription>
                    Create a new medical knowledge entry for the AI assistant
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Entry title..." />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Textarea placeholder="Medical content and guidelines..." rows={6} />
                  <Input placeholder="Tags (comma separated)..." />
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-gradient-medical hover:opacity-90">Save Entry</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <ScrollArea className="h-[600px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredEntries.map((entry) => (
                <Card key={entry.id} className="border border-border/50 hover:shadow-soft transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-medical-light flex items-center justify-center">
                          {getCategoryIcon(entry.category)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm leading-tight">{entry.title}</h4>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {entry.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium ${getConfidenceColor(entry.confidence)}`}>
                          {entry.confidence}%
                        </span>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                      {entry.content}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {entry.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-medical-blue/10 text-medical-blue">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Updated: {entry.lastUpdated}</span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgeBase;