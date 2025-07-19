"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
//   Phone, 
//   Mail, 
//   Calendar, 
  ArrowLeft,
  Save,
  X,
//   MapPin,
  Heart
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

export default function EditPatientPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);

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

  const handleSave = async () => {
    if (!patient) return;
    
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving patient:', patient);
      router.push(`/admin/patients/${params.id}`);
    } catch (error) {
      console.error('Error saving patient:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(`/admin/patients/${params.id}`);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-background min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading patient...</div>
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
              <h1 className="text-3xl font-bold text-foreground">Edit Patient</h1>
              <p className="mt-2 text-muted-foreground">
                Update patient information
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="health-btn-secondary"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="health-btn-primary"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card className="health-card border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                type="text"
                id="name"
                value={patient.name}
                onChange={(e) => setPatient({...patient, name: e.target.value})}
                className="health-card border-0"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date-of-birth">Date of Birth *</Label>
                <Input
                  type="date"
                  id="date-of-birth"
                  value={patient.dateOfBirth}
                  onChange={(e) => setPatient({...patient, dateOfBirth: e.target.value})}
                  className="health-card border-0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={patient.status} onValueChange={(value) => setPatient({...patient, status: value})}>
                  <SelectTrigger className="health-card border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Deceased">Deceased</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={patient.email}
                onChange={(e) => setPatient({...patient, email: e.target.value})}
                className="health-card border-0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="tel"
                id="phone"
                value={patient.phone}
                onChange={(e) => setPatient({...patient, phone: e.target.value})}
                className="health-card border-0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={patient.address}
                onChange={(e) => setPatient({...patient, address: e.target.value})}
                className="health-card border-0"
                rows={3}
                placeholder="Enter full address..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergency-contact">Emergency Contact</Label>
              <Input
                type="text"
                id="emergency-contact"
                value={patient.emergencyContact}
                onChange={(e) => setPatient({...patient, emergencyContact: e.target.value})}
                className="health-card border-0"
                placeholder="Name and phone number"
              />
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
            <div className="space-y-2">
              <Label htmlFor="blood-type">Blood Type</Label>
              <Select value={patient.bloodType || ''} onValueChange={(value) => setPatient({...patient, bloodType: value})}>
                <SelectTrigger className="health-card border-0">
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medical-history">Medical History</Label>
              <Textarea
                id="medical-history"
                value={patient.medicalHistory}
                onChange={(e) => setPatient({...patient, medicalHistory: e.target.value})}
                className="health-card border-0"
                rows={4}
                placeholder="Enter medical history..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies</Label>
              <Textarea
                id="allergies"
                value={patient.allergies || ''}
                onChange={(e) => setPatient({...patient, allergies: e.target.value})}
                className="health-card border-0"
                rows={3}
                placeholder="Enter allergies..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                value={patient.medications || ''}
                onChange={(e) => setPatient({...patient, medications: e.target.value})}
                className="health-card border-0"
                rows={4}
                placeholder="Enter current medications..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={patient.notes}
                onChange={(e) => setPatient({...patient, notes: e.target.value})}
                className="health-card border-0"
                rows={3}
                placeholder="Enter additional notes..."
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Actions */}
      <div className="mt-8 flex justify-end space-x-4">
        <Button 
          variant="outline" 
          onClick={handleCancel}
          className="health-btn-secondary"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="health-btn-primary"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
} 