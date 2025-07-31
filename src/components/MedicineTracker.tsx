import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Pill, Clock, User, Bell, Plus } from "lucide-react";

const MedicineTracker = () => {
  const [selectedPatient, setSelectedPatient] = useState("");

  const medicineSchedules = [
    {
      id: "med_001",
      patientId: "Patient #4782",
      medicine: "Paracetamol",
      dosage: "500mg",
      frequency: "Every 6 hours",
      nextDue: "2:00 PM",
      status: "due_soon",
      adherence: 85
    },
    {
      id: "med_002",
      patientId: "Patient #4781", 
      medicine: "Amoxicillin",
      dosage: "250mg",
      frequency: "3 times daily",
      nextDue: "6:00 PM",
      status: "on_time", 
      adherence: 92
    },
    {
      id: "med_003",
      patientId: "Patient #4780",
      medicine: "Omeprazole", 
      dosage: "20mg",
      frequency: "Once daily",
      nextDue: "Tomorrow 8:00 AM",
      status: "missed",
      adherence: 75
    },
    {
      id: "med_004",
      patientId: "Patient #4779",
      medicine: "Vitamin D3",
      dosage: "1000 IU", 
      frequency: "Once daily",
      nextDue: "8:00 AM",
      status: "completed",
      adherence: 98
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "due_soon": return "bg-medical-orange";
      case "on_time": return "bg-medical-green";
      case "missed": return "bg-destructive";
      case "completed": return "bg-medical-blue";
      default: return "bg-muted";
    }
  };

  const getAdherenceColor = (adherence: number) => {
    if (adherence >= 90) return "text-medical-green";
    if (adherence >= 80) return "text-medical-orange";
    return "text-destructive";
  };

  const filteredSchedules = selectedPatient 
    ? medicineSchedules.filter(schedule => schedule.patientId === selectedPatient)
    : medicineSchedules;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card shadow-soft border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-medical-blue" />
            Medicine Schedule Tracker
          </CardTitle>
          <CardDescription>
            Monitor and manage patient medication adherence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Filter by patient" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Patients</SelectItem>
                <SelectItem value="Patient #4782">Patient #4782</SelectItem>
                <SelectItem value="Patient #4781">Patient #4781</SelectItem>
                <SelectItem value="Patient #4780">Patient #4780</SelectItem>
                <SelectItem value="Patient #4779">Patient #4779</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-gradient-medical hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Add Schedule
            </Button>
            <Button variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Send Reminders
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSchedules.map((schedule) => (
              <Card key={schedule.id} className="border border-border/50 hover:shadow-soft transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-medical-light flex items-center justify-center">
                        <Pill className="h-5 w-5 text-medical-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium">{schedule.medicine}</h4>
                        <p className="text-sm text-muted-foreground">{schedule.patientId}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(schedule.status)}>
                      {schedule.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Dosage:</span>
                      <span className="font-medium">{schedule.dosage}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Frequency:</span>
                      <span className="font-medium">{schedule.frequency}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Next Due:</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span className="font-medium">{schedule.nextDue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-medical-light/30 rounded-lg p-3 mb-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Adherence Rate</span>
                      <span className={`font-bold ${getAdherenceColor(schedule.adherence)}`}>
                        {schedule.adherence}%
                      </span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2 mt-2">
                      <div 
                        className={`h-2 rounded-full ${
                          schedule.adherence >= 90 ? 'bg-medical-green' : 
                          schedule.adherence >= 80 ? 'bg-medical-orange' : 'bg-destructive'
                        }`}
                        style={{ width: `${schedule.adherence}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit Schedule
                    </Button>
                    <Button size="sm" className="flex-1 bg-gradient-medical hover:opacity-90">
                      Send Reminder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicineTracker;