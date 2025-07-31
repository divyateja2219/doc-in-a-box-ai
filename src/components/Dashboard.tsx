import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, MessageCircle, Users, Calendar, Database, Settings, Heart, Stethoscope } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Active Conversations",
      value: "47",
      change: "+12%",
      icon: MessageCircle,
      color: "medical-blue"
    },
    {
      title: "Patients Helped Today", 
      value: "156",
      change: "+8%",
      icon: Users,
      color: "medical-green"
    },
    {
      title: "Medicine Reminders",
      value: "89",
      change: "+23%", 
      icon: Calendar,
      color: "medical-orange"
    },
    {
      title: "Knowledge Base Entries",
      value: "2,847",
      change: "+5%",
      icon: Database,
      color: "primary"
    }
  ];

  const recentConsultations = [
    {
      id: "1",
      patient: "Patient #4782",
      symptoms: "Headache, fever",
      diagnosis: "Possible viral infection",
      status: "completed",
      time: "2 minutes ago"
    },
    {
      id: "2", 
      patient: "Patient #4781",
      symptoms: "Cough, sore throat",
      diagnosis: "Upper respiratory infection",
      status: "active",
      time: "5 minutes ago"
    },
    {
      id: "3",
      patient: "Patient #4780", 
      symptoms: "Stomach pain",
      diagnosis: "Gastritis - dietary advice given",
      status: "completed",
      time: "8 minutes ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-background to-card p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center gap-2 text-medical-blue">
            <Stethoscope className="h-8 w-8" />
            <Heart className="h-6 w-6 text-medical-green animate-pulse-glow" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-medical bg-clip-text text-transparent">
            AI Doctor Dashboard
          </h1>
        </div>
        <p className="text-muted-foreground">
          WhatsApp-based medical assistant helping patients worldwide
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gradient-card shadow-soft border-0 hover:shadow-medical transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <Badge variant="secondary" className="text-xs bg-medical-green/10 text-medical-green">
                      {stat.change}
                    </Badge>
                  </div>
                </div>
                <div className={`h-12 w-12 rounded-full bg-${stat.color}/10 flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Consultations */}
        <Card className="lg:col-span-2 bg-gradient-card shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-medical-blue" />
              Recent Consultations
            </CardTitle>
            <CardDescription>
              Latest patient interactions via WhatsApp
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentConsultations.map((consultation) => (
                <div key={consultation.id} className="flex items-center justify-between p-4 rounded-lg bg-medical-light/50 border border-border/50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{consultation.patient}</span>
                      <Badge 
                        variant={consultation.status === "active" ? "default" : "secondary"}
                        className={consultation.status === "active" ? "bg-medical-green" : ""}
                      >
                        {consultation.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      <strong>Symptoms:</strong> {consultation.symptoms}
                    </p>
                    <p className="text-sm text-medical-blue">
                      <strong>Diagnosis:</strong> {consultation.diagnosis}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {consultation.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-card shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-medical-blue" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Manage your AI doctor bot
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-gradient-medical hover:opacity-90" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              View All Conversations
            </Button>
            <Button variant="outline" className="w-full" size="sm">
              <Database className="h-4 w-4 mr-2" />
              Manage Knowledge Base
            </Button>
            <Button variant="outline" className="w-full" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Medicine Schedules
            </Button>
            <Button variant="outline" className="w-full" size="sm">
              <Activity className="h-4 w-4 mr-2" />
              Analytics Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;