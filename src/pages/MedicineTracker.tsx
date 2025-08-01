import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Pill, Bell, Plus } from "lucide-react";

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

  const getStatusColor = (status) => {
    switch (status) {
      case "due_soon": return "bg-yellow-500 text-white";
      case "on_time": return "bg-green-600 text-white";
      case "missed": return "bg-red-500 text-white";
      case "completed": return "bg-blue-500 text-white";
      default: return "bg-muted";
    }
  };

  const filteredSchedules = selectedPatient 
    ? medicineSchedules.filter(schedule => schedule.patientId === selectedPatient)
    : medicineSchedules;

  return (
    <div className="space-y-6">
      <Card className="shadow border border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Pill className="h-5 w-5 text-blue-600" />
            Medicine Schedule Tracker
          </CardTitle>
          <CardDescription>
            Monitor and manage patient medication adherence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger className="w-60">
                <SelectValue placeholder="Filter by patient" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Patients</SelectItem>
                {Array.from(new Set(medicineSchedules.map(m => m.patientId))).map(patient => (
                  <SelectItem key={patient} value={patient}>{patient}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-1" />
              Add Schedule
            </Button>
            <Button variant="outline">
              <Bell className="h-4 w-4 mr-1" />
              Send Reminders
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSchedules.map((schedule) => (
              <Card key={schedule.id} className="border border-border hover:shadow transition">
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium text-lg">{schedule.medicine}</h4>
                      <p className="text-sm text-muted-foreground">{schedule.patientId}</p>
                    </div>
                    <Badge className={getStatusColor(schedule.status)}>
                      {schedule.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div className="text-sm space-y-1">
                    <p><strong>Dosage:</strong> {schedule.dosage}</p>
                    <p><strong>Frequency:</strong> {schedule.frequency}</p>
                    <p className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <strong>Next Due:</strong> {schedule.nextDue}
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="text-sm text-muted-foreground flex justify-between">
                      <span>Adherence</span>
                      <span className="font-semibold">{schedule.adherence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full ${
                          schedule.adherence >= 90 ? "bg-green-600" :
                          schedule.adherence >= 80 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                        style={{ width: `${schedule.adherence}%` }}
                      />
                    </div>
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
