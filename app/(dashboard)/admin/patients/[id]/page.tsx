"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  AlertTriangle, 
  Trash2, 
  Edit, 
  ArrowLeft,
  MapPin,
  Heart,
  FileText,
  Clock
} from "lucide-react";

interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  status: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  medicalHistory: string;
  notes: string;
  bloodType?: string;
  allergies?: string;
  medications?: string;
}

export default function PatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Mock patient data - in real app, fetch from API
  const mockPatient: Patient = {
    id: Number(params.id),
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    lastVisit: '2024-01-15',
    status: 'Active',
    dateOfBirth: '1985-03-15',
    address: '123 Main St, City, State 12345',
    emergencyContact: 'Jane Doe (Spouse) - +1 (555) 987-6543',
    medicalHistory: 'Hypertension, Diabetes Type 2',
    notes: 'Patient prefers morning appointments',
    bloodType: 'O+',
    allergies: 'Penicillin, Shellfish',
    medications: 'Metformin 500mg twice daily, Lisinopril 10mg daily'
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPatient(mockPatient);
      setIsLoading(false);
    }, 500);
  }, [params.id]);

  const handleDeletePatient = () => {
    if (patient) {
      console.log(`Deleting patient ${patient.id}`);
      setIsDeleteModalOpen(false);
      router.push('/admin/patients');
    }
  };

  const handleEditPatient = () => {
    router.push(`/admin/patients/${params.id}/edit`);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-background min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading patient details...</div>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="p-6 bg-background min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Patient not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Patient Details</h1>
              <p className="mt-2 text-muted-foreground">
                View and manage patient information
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleEditPatient} className="health-btn-primary">
              <Edit className="w-4 h-4 mr-2" />
              Edit Patient
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteModalOpen(true)}
              className="health-btn-secondary"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Patient
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-foreground font-medium">{patient.name}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Date of Birth</Label>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-foreground">{new Date(patient.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-foreground">{patient.email}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-foreground">{patient.phone}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                  <Badge variant={patient.status === 'Active' ? 'default' : 'secondary'}>
                    {patient.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Last Visit</Label>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-foreground">{new Date(patient.lastVisit).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 text-muted-foreground mt-0.5" />
                  <span className="text-foreground">{patient.address}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Emergency Contact</Label>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-foreground">{patient.emergencyContact}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-primary" />
                Medical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {patient.bloodType && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Blood Type</Label>
                    <Badge variant="outline" className="status-badge">
                      {patient.bloodType}
                    </Badge>
                  </div>
                )}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Medical History</Label>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-foreground">{patient.medicalHistory || 'None'}</p>
                  </div>
                </div>
              </div>
              
              {patient.allergies && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Allergies</Label>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-foreground">{patient.allergies}</p>
                  </div>
                </div>
              )}
              
              {patient.medications && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Current Medications</Label>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-foreground">{patient.medications}</p>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Notes</Label>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-foreground">{patient.notes || 'No notes'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full health-btn-secondary"
                onClick={() => router.push(`/admin/appointments/new?patient=${patient.id}`)}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Appointment
              </Button>
              <Button 
                variant="outline" 
                className="w-full health-btn-secondary"
                onClick={() => router.push(`/admin/patients/${params.id}/edit`)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Patient
              </Button>
              <Button 
                variant="outline" 
                className="w-full health-btn-secondary"
                onClick={() => router.push(`/admin/appointments?patient=${patient.id}`)}
              >
                <Clock className="w-4 h-4 mr-2" />
                View Appointments
              </Button>
              <Button 
                variant="outline" 
                className="w-full health-btn-secondary"
                onClick={() => router.push(`/admin/patients/${params.id}/medical-history`)}
              >
                <FileText className="w-4 h-4 mr-2" />
                Medical History
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Appointment scheduled</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Medical records updated</p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Patient profile created</p>
                    <p className="text-xs text-muted-foreground">3 months ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Patient Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="health-card border-0">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-destructive" />
              Delete Patient
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this patient? This action cannot be undone and will remove all patient records.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{patient.name}</span>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{patient.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{patient.phone}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteModalOpen(false)}
              className="health-btn-secondary"
            >
              Keep Patient
            </Button>
            <Button 
              onClick={handleDeletePatient}
              className="health-btn-primary"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Patient
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 