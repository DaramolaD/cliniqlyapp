"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  User, 
  Calendar, 
  FileText, 
  Stethoscope, 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  AlertCircle,
  CheckCircle,
  Edit,
  Plus,
  Activity,
  ClipboardList,
  Eye,
  TrendingUp
} from "lucide-react";

export default function PatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const patientId = params.id;

  // Mock patient data
  const patient = {
    id: patientId,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    age: 34,
    gender: "Female",
    status: "active",
    dateOfBirth: "1990-03-15",
    address: "123 Main Street, New York, NY 10001",
    emergencyContact: "+1 (555) 987-6543",
    department: "Cardiology",
    avatar: "/avatars/patient1.jpg",
    patientId: "P001",
    bloodType: "O+",
    allergies: "Penicillin",
    medicalHistory: "Hypertension, Diabetes Type 2",
    currentMedications: ["Metformin", "Lisinopril", "Atorvastatin"]
  };

  const appointments = [
    {
      id: 1,
      date: "2024-02-20",
      time: "10:00 AM",
      type: "Follow-up",
      status: "confirmed",
      doctor: "Dr. Michael Chen",
      notes: "Cardiology follow-up for hypertension management"
    },
    {
      id: 2,
      date: "2024-01-15",
      time: "2:30 PM",
      type: "Consultation",
      status: "completed",
      doctor: "Dr. Sarah Johnson",
      notes: "Initial consultation for chest pain"
    },
    {
      id: 3,
      date: "2024-03-05",
      time: "11:00 AM",
      type: "Procedure",
      status: "scheduled",
      doctor: "Dr. Robert Wilson",
      notes: "Echocardiogram scheduled"
    }
  ];

  const medicalRecords = [
    {
      id: 1,
      date: "2024-01-15",
      type: "Blood Test",
      doctor: "Dr. Sarah Johnson",
      status: "completed",
      results: "Normal range",
      notes: "Complete blood count and lipid panel"
    },
    {
      id: 2,
      date: "2024-01-10",
      type: "X-Ray",
      doctor: "Dr. Michael Chen",
      status: "completed",
      results: "Clear",
      notes: "Chest X-ray for chest pain evaluation"
    },
    {
      id: 3,
      date: "2024-01-05",
      type: "ECG",
      doctor: "Dr. Robert Wilson",
      status: "completed",
      results: "Normal sinus rhythm",
      notes: "12-lead ECG for cardiac evaluation"
    }
  ];

  const clinicalNotes = [
    {
      id: 1,
      date: "2024-01-15",
      doctor: "Dr. Sarah Johnson",
      type: "Consultation",
      notes: "Patient presents with chest pain. BP: 140/90, HR: 85. Ordered ECG and blood work. Prescribed Lisinopril 10mg daily."
    },
    {
      id: 2,
      date: "2024-01-10",
      doctor: "Dr. Michael Chen",
      type: "Follow-up",
      notes: "Blood pressure improved with medication. Patient reports mild dizziness. Adjusted Lisinopril to 5mg daily."
    },
    {
      id: 3,
      date: "2024-01-05",
      doctor: "Dr. Robert Wilson",
      type: "Initial",
      notes: "New patient with history of hypertension and diabetes. Started on Metformin and lifestyle modifications recommended."
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const mockUser = {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@cliniqly.com",
    role: "Staff"
  };

  return (
    <DashboardLayout variant="staff" user={mockUser}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => router.back()}
              className="health-btn-secondary"
            >
              ← Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{patient.name}</h1>
              <p className="text-muted-foreground">Patient ID: {patient.patientId}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              onClick={() => router.push(`/staff/patients/${patientId}/edit`)}
              className="health-btn-secondary"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Patient
            </Button>
            <Button 
              onClick={() => router.push(`/staff/appointments/new?patientId=${patientId}`)}
              className="health-btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Schedule Appointment
            </Button>
          </div>
        </div>

        {/* Patient Info Card */}
        <Card className="health-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={patient.avatar} />
                <AvatarFallback className="text-lg">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Personal Information</label>
                    <div className="space-y-1 mt-1">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{patient.age} years old • {patient.gender}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Blood Type: {patient.bloodType}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Contact Information</label>
                    <div className="space-y-1 mt-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{patient.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{patient.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{patient.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Medical Information</label>
                    <div className="space-y-1 mt-1">
                      <div className="flex items-center space-x-2">
                        <Stethoscope className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Department: {patient.department}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Allergies: {patient.allergies}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Status: {patient.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different sections */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="records">Medical Records</TabsTrigger>
            <TabsTrigger value="notes">Clinical Notes</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Medical History */}
              <Card className="health-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Medical History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Conditions</label>
                      <p className="text-sm mt-1">{patient.medicalHistory}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Current Medications</label>
                      <div className="space-y-1 mt-1">
                        {patient.currentMedications.map((med, index) => (
                          <Badge key={index} variant="outline" className="mr-2">
                            {med}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="health-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Last Visit</span>
                      <span className="text-sm text-muted-foreground">Jan 15, 2024</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Next Appointment</span>
                      <span className="text-sm text-primary">Feb 20, 2024</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Appointments</span>
                      <span className="text-sm text-muted-foreground">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Medical Records</span>
                      <span className="text-sm text-muted-foreground">8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <Card className="health-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Appointments
                  </div>
                  <Button 
                    onClick={() => router.push(`/staff/appointments/new?patientId=${patientId}`)}
                    className="health-btn-primary"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Appointment
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{new Date(appointment.date).toLocaleDateString()}</div>
                            <div className="text-sm text-muted-foreground">{appointment.time}</div>
                          </div>
                        </TableCell>
                        <TableCell>{appointment.type}</TableCell>
                        <TableCell>{appointment.doctor}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{appointment.notes}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medical Records Tab */}
          <TabsContent value="records" className="space-y-6">
            <Card className="health-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Medical Records
                  </div>
                  <Button className="health-btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Record
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Results</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medicalRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                        <TableCell>{record.type}</TableCell>
                        <TableCell>{record.doctor}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{record.results}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clinical Notes Tab */}
          <TabsContent value="notes" className="space-y-6">
            <Card className="health-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ClipboardList className="w-5 h-5 mr-2" />
                    Clinical Notes
                  </div>
                  <Button className="health-btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Note
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clinicalNotes.map((note) => (
                    <div key={note.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{note.doctor}</span>
                          <Badge variant="outline">{note.type}</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(note.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{note.notes}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
} 