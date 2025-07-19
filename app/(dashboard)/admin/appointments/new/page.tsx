"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  X,
  Plus
} from "lucide-react";

interface NewAppointment {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  time: string;
  type: string;
  doctor: string;
  notes: string;
  duration: string;
}

export default function NewAppointmentPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [appointment, setAppointment] = useState<NewAppointment>({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    date: '',
    time: '',
    type: 'Check-up',
    doctor: '',
    notes: '',
    duration: '30'
  });

  const handleSave = async () => {
    if (!appointment.patientName || !appointment.date || !appointment.time || !appointment.doctor) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Creating appointment:', appointment);
      router.push('/admin/appointments');
    } catch (error) {
      console.error('Error creating appointment:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/appointments');
  };

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
              <h1 className="text-3xl font-bold text-foreground">Schedule New Appointment</h1>
              <p className="mt-2 text-muted-foreground">
                Create a new appointment for a patient
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
              {isSaving ? 'Scheduling...' : 'Schedule Appointment'}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointment Details */}
        <Card className="health-card border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              Appointment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  type="date"
                  id="date"
                  value={appointment.date}
                  onChange={(e) => setAppointment({...appointment, date: e.target.value})}
                  className="health-card border-0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input
                  type="time"
                  id="time"
                  value={appointment.time}
                  onChange={(e) => setAppointment({...appointment, time: e.target.value})}
                  className="health-card border-0"
                  required
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
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select value={appointment.duration} onValueChange={(value) => setAppointment({...appointment, duration: value})}>
                  <SelectTrigger className="health-card border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctor">Doctor *</Label>
              <Select value={appointment.doctor} onValueChange={(value) => setAppointment({...appointment, doctor: value})}>
                <SelectTrigger className="health-card border-0">
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dr. Sarah Johnson">Dr. Sarah Johnson - General Medicine</SelectItem>
                  <SelectItem value="Dr. Michael Chen">Dr. Michael Chen - Cardiology</SelectItem>
                  <SelectItem value="Dr. Lisa Thompson">Dr. Lisa Thompson - Pediatrics</SelectItem>
                  <SelectItem value="Dr. James Wilson">Dr. James Wilson - Orthopedics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={appointment.notes}
                onChange={(e) => setAppointment({...appointment, notes: e.target.value})}
                className="health-card border-0"
                rows={4}
                placeholder="Enter any notes about the appointment..."
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
              <Label htmlFor="patient-name">Patient Name *</Label>
              <Input
                type="text"
                id="patient-name"
                value={appointment.patientName}
                onChange={(e) => setAppointment({...appointment, patientName: e.target.value})}
                className="health-card border-0"
                placeholder="Enter patient's full name"
                required
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
                placeholder="Enter patient's email address"
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
                placeholder="Enter patient's phone number"
              />
            </div>

            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center mb-2">
                <Plus className="w-4 h-4 mr-2 text-primary" />
                <span className="text-sm font-medium">Quick Actions</span>
              </div>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full health-btn-secondary"
                  onClick={() => router.push('/admin/patients/new')}
                >
                  <User className="w-4 h-4 mr-2" />
                  Add New Patient
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full health-btn-secondary"
                  onClick={() => router.push('/admin/patients')}
                >
                  <User className="w-4 h-4 mr-2" />
                  Browse Existing Patients
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Card */}
      <Card className="health-card border-0 shadow-sm mt-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-primary" />
            Appointment Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Patient:</span>
              <p className="font-medium">{appointment.patientName || 'Not specified'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Date & Time:</span>
              <p className="font-medium">
                {appointment.date && appointment.time 
                  ? `${new Date(appointment.date).toLocaleDateString()} at ${appointment.time}`
                  : 'Not specified'
                }
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Doctor:</span>
              <p className="font-medium">{appointment.doctor || 'Not specified'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Duration:</span>
              <p className="font-medium">{appointment.duration} minutes</p>
            </div>
          </div>
        </CardContent>
      </Card>

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
          disabled={isSaving || !appointment.patientName || !appointment.date || !appointment.time || !appointment.doctor}
          className="health-btn-primary"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Scheduling...' : 'Schedule Appointment'}
        </Button>
      </div>
    </div>
  );
} 