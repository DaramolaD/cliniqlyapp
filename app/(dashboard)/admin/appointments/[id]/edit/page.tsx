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
  Calendar, 
  Clock, 
  User, 
  ArrowLeft,
  Save,
  X
} from "lucide-react";

interface Appointment {
  id: number;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  time: string;
  type: string;
  status: string;
  doctor: string;
  notes: string;
  symptoms?: string;
  diagnosis?: string;
  prescription?: string;
  followUpDate?: string;
}

export default function EditAppointmentPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  // Mock appointment data - in real app, fetch from API
  const mockAppointment: Appointment = {
    id: Number(params.id),
    patientName: 'John Doe',
    patientEmail: 'john.doe@email.com',
    patientPhone: '+1 (555) 123-4567',
    date: '2024-01-20',
    time: '09:00',
    type: 'Check-up',
    status: 'Confirmed',
    doctor: 'Dr. Sarah Johnson',
    notes: 'Annual physical examination. Patient reports feeling healthy with no major concerns.',
    symptoms: 'None reported',
    diagnosis: 'Healthy - No issues found',
    prescription: 'Continue current medications',
    followUpDate: '2025-01-20'
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAppointment(mockAppointment);
      setIsLoading(false);
    }, 500);
  }, [params.id]);

  const handleSave = async () => {
    if (!appointment) return;
    
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving appointment:', appointment);
      router.push(`/admin/appointments/${params.id}`);
    } catch (error) {
      console.error('Error saving appointment:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(`/admin/appointments/${params.id}`);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-background min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading appointment...</div>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="p-6 bg-background min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Appointment not found</div>
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
              <h1 className="text-3xl font-bold text-foreground">Edit Appointment</h1>
              <p className="mt-2 text-muted-foreground">
                Update appointment information
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
        {/* Basic Information */}
        <Card className="health-card border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  type="date"
                  id="date"
                  value={appointment.date}
                  onChange={(e) => setAppointment({...appointment, date: e.target.value})}
                  className="health-card border-0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  type="time"
                  id="time"
                  value={appointment.time}
                  onChange={(e) => setAppointment({...appointment, time: e.target.value})}
                  className="health-card border-0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={appointment.type} onValueChange={(value) => setAppointment({...appointment, type: value})}>
                  <SelectTrigger className="health-card border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Check-up">Check-up</SelectItem>
                    <SelectItem value="Follow-up">Follow-up</SelectItem>
                    <SelectItem value="Consultation">Consultation</SelectItem>
                    <SelectItem value="Procedure">Procedure</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={appointment.status} onValueChange={(value) => setAppointment({...appointment, status: value})}>
                  <SelectTrigger className="health-card border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="No-show">No-show</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctor">Doctor</Label>
              <Select value={appointment.doctor} onValueChange={(value) => setAppointment({...appointment, doctor: value})}>
                <SelectTrigger className="health-card border-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dr. Sarah Johnson">Dr. Sarah Johnson</SelectItem>
                  <SelectItem value="Dr. Michael Chen">Dr. Michael Chen</SelectItem>
                  <SelectItem value="Dr. Lisa Thompson">Dr. Lisa Thompson</SelectItem>
                  <SelectItem value="Dr. James Wilson">Dr. James Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="follow-up-date">Follow-up Date</Label>
              <Input
                type="date"
                id="follow-up-date"
                value={appointment.followUpDate || ''}
                onChange={(e) => setAppointment({...appointment, followUpDate: e.target.value})}
                className="health-card border-0"
              />
            </div>
          </CardContent>
        </Card>

        {/* Patient Information */}
        <Card className="health-card border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2 text-primary" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="patient-name">Patient Name</Label>
              <Input
                type="text"
                id="patient-name"
                value={appointment.patientName}
                onChange={(e) => setAppointment({...appointment, patientName: e.target.value})}
                className="health-card border-0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="patient-email">Email</Label>
              <Input
                type="email"
                id="patient-email"
                value={appointment.patientEmail}
                onChange={(e) => setAppointment({...appointment, patientEmail: e.target.value})}
                className="health-card border-0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="patient-phone">Phone</Label>
              <Input
                type="tel"
                id="patient-phone"
                value={appointment.patientPhone}
                onChange={(e) => setAppointment({...appointment, patientPhone: e.target.value})}
                className="health-card border-0"
              />
            </div>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <Card className="health-card border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2 text-primary" />
              Medical Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="symptoms">Symptoms</Label>
              <Textarea
                id="symptoms"
                value={appointment.symptoms || ''}
                onChange={(e) => setAppointment({...appointment, symptoms: e.target.value})}
                className="health-card border-0"
                rows={3}
                placeholder="Enter patient symptoms..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diagnosis">Diagnosis</Label>
              <Textarea
                id="diagnosis"
                value={appointment.diagnosis || ''}
                onChange={(e) => setAppointment({...appointment, diagnosis: e.target.value})}
                className="health-card border-0"
                rows={3}
                placeholder="Enter diagnosis..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prescription">Prescription</Label>
              <Textarea
                id="prescription"
                value={appointment.prescription || ''}
                onChange={(e) => setAppointment({...appointment, prescription: e.target.value})}
                className="health-card border-0"
                rows={3}
                placeholder="Enter prescription details..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="health-card border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary" />
              Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="notes">Appointment Notes</Label>
              <Textarea
                id="notes"
                value={appointment.notes}
                onChange={(e) => setAppointment({...appointment, notes: e.target.value})}
                className="health-card border-0"
                rows={6}
                placeholder="Enter appointment notes..."
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