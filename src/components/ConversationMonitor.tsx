import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Search, Phone, Clock, User, Bot } from "lucide-react";

const ConversationMonitor = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const conversations = [
    {
      id: "conv_001",
      patientId: "Patient #4782",
      phone: "+1234567890",
      status: "active",
      lastMessage: "I have a severe headache and feel feverish",
      diagnosis: "Assessing symptoms...",
      startTime: "10:30 AM",
      duration: "5 min",
      messageCount: 8
    },
    {
      id: "conv_002", 
      patientId: "Patient #4781",
      phone: "+1234567891",
      status: "completed",
      lastMessage: "Thank you for the medicine reminder!",
      diagnosis: "Upper respiratory infection - prescribed rest and fluids",
      startTime: "10:15 AM", 
      duration: "12 min",
      messageCount: 15
    },
    {
      id: "conv_003",
      patientId: "Patient #4780",
      phone: "+1234567892", 
      status: "waiting",
      lastMessage: "Bot is typing...",
      diagnosis: "Analyzing stomach pain symptoms",
      startTime: "10:25 AM",
      duration: "3 min", 
      messageCount: 4
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.phone.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-medical-green";
      case "completed": return "bg-medical-blue";
      case "waiting": return "bg-medical-orange";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card shadow-soft border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-medical-blue" />
            WhatsApp Conversation Monitor
          </CardTitle>
          <CardDescription>
            Real-time monitoring of patient conversations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient ID or phone number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-gradient-medical hover:opacity-90">
              Export Report
            </Button>
          </div>

          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {filteredConversations.map((conversation) => (
                <Card key={conversation.id} className="border border-border/50 hover:shadow-soft transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-medical-light flex items-center justify-center">
                          <User className="h-5 w-5 text-medical-blue" />
                        </div>
                        <div>
                          <h4 className="font-medium">{conversation.patientId}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {conversation.phone}
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(conversation.status)}>
                        {conversation.status}
                      </Badge>
                    </div>

                    <div className="bg-medical-light/30 rounded-lg p-3 mb-3">
                      <div className="flex items-start gap-2 mb-2">
                        <User className="h-4 w-4 text-medical-blue mt-0.5" />
                        <p className="text-sm">{conversation.lastMessage}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Bot className="h-4 w-4 text-medical-green mt-0.5" />
                        <p className="text-sm text-medical-green">{conversation.diagnosis}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Started: {conversation.startTime}
                        </div>
                        <div>Duration: {conversation.duration}</div>
                        <div>{conversation.messageCount} messages</div>
                      </div>
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

export default ConversationMonitor;