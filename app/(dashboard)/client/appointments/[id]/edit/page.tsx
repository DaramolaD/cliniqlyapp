"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  ArrowLeft,
  Save,
  AlertCircle
} from "lucide-react";
import { AppointmentStatus, getStatusDisplayName } from "@/lib/appointment-types";

interface Appointment {
  id: number;
  date: string;
  time: string;
  doctor: string;
  department: string;
  type: string;
  status: AppointmentStatus;
  notes?: string;
  location?: string;
  phone?: string;
  doctorId?: string;
  duration?: string;
}

export default function EditClientAppointmentPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [appointment, setAppointment] = useState<Appointment>({
    id: Number(params.id),
    date: '',
    time: '',
    doctor: '',
    department: '',
    type: '',
    status: 'pending',
    notes: '',
    location: '',
    phone: '',
    doctorId: '',
    duration: ''
  });

  // Mock appointment data - in real app, fetch from API
  const mockAppointment: Appointment = {
    id: Number(params.id),
    date: '2024-01-15',
    time: '10:00 AM',
    doctor: 'Dr. Sarah Johnson',
    department: 'General Medicine',
    type: 'General Checkup',
    status: 'pending',
    notes: 'Annual physical examination. Please bring any current medications and medical history.',
    location: 'Main Clinic - Room 101',
    phone: '+1 (555) 123-4567',
    doctorId: 'D001',
    duration: '30 minutes'
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAppointment(mockAppointment);
      setLoading(false);
    }, 500);
  }, [params.id]);

  const handleSave = async () => {
    setSaving(true);
      // Simulate API call
    setTimeout(() => {
      console.log('Saving appointment:', appointment);
      setSaving(false);
      router.push(`/client/appointments/${params.id}`);
    }, 1000);
  };

  const handleCancel = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmCancel = () => {
    router.push(`/client/appointments/${params.id}`);
  };

  const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Patient"
  };

  if (loading) {
    return (
      <DashboardLayout variant="client" user={mockUser}>
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout variant="client" user={mockUser}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => router.push(`/client/appointments/${params.id}`)}
              className="health-btn-secondary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Edit Appointment</h1>
              <p className="mt-2 text-muted-foreground">
                Modify your appointment details.
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="health-btn-secondary"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={saving}
              className="health-btn-primary"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Appointment Details */}
          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={appointment.date}
                    onChange={(e) => setAppointment({...appointment, date: e.target.value})}
                    className="health-card border-0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={appointment.time}
                    onChange={(e) => setAppointment({...appointment, time: e.target.value})}
                    className="health-card border-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Appointment Type</Label>
                <Select 
                  value={appointment.type}
                  onValueChange={(value) => setAppointment({...appointment, type: value})}
                >
                  <SelectTrigger className="health-card border-0 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Checkup">General Checkup</SelectItem>
                    <SelectItem value="Consultation">Consultation</SelectItem>
                    <SelectItem value="Follow-up">Follow-up</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                    <SelectItem value="Test">Test</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select 
                  value={appointment.department}
                  onValueChange={(value) => setAppointment({...appointment, department: value})}
                >
                  <SelectTrigger className="health-card border-0 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Medicine">General Medicine</SelectItem>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="Dermatology">Dermatology</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={appointment.notes}
                  onChange={(e) => setAppointment({...appointment, notes: e.target.value})}
                  placeholder="Add any special notes or requirements..."
                  className="health-card border-0"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Current Information */}
          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Current Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{getStatusDisplayName(appointment.status)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Doctor</Label>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{appointment.doctor}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{appointment.location}</span>
                </div>
              </div>
              
                  <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Duration</Label>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{appointment.duration}</span>
                    </div>
                  </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Contact</Label>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{appointment.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Confirmation Dialog */}
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="health-card border-0">
            <DialogHeader>
              <DialogTitle>Discard Changes?</DialogTitle>
              <DialogDescription>
                Are you sure you want to discard your changes? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
          <Button 
            variant="outline" 
                onClick={() => setShowConfirmDialog(false)}
            className="health-btn-secondary"
          >
                Continue Editing
          </Button>
          <Button 
                onClick={handleConfirmCancel}
            className="health-btn-primary"
          >
                Discard Changes
          </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
} 