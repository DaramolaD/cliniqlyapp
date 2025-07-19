"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  ArrowLeft,
  Edit,
  Trash2,
  Stethoscope,
  MapPin
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

export default function AppointmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  // Mock appointment data - in real app, fetch from API
  const mockAppointment: Appointment = {
    id: Number(params.id),
    patientName: 'John Doe',
    patientEmail: 'john.doe@email.com',
    patientPhone: '+1 (555) 123-4567',
    date: '2024-01-20',
    time: '09:00 AM',
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

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
    switch (status) {
      case 'Confirmed':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const handleCancelAppointment = () => {
    if (appointment && cancelReason) {
      console.log(`Cancelling appointment ${appointment.id} with reason: ${cancelReason}`);
      setIsCancelModalOpen(false);
      setCancelReason("");
      // Here you would update the appointment status via API
    }
  };

  const handleRescheduleAppointment = () => {
    if (appointment && newDate && newTime) {
      console.log(`Rescheduling appointment ${appointment.id} to ${newDate} at ${newTime}`);
      setIsRescheduleModalOpen(false);
      setNewDate("");
      setNewTime("");
      // Here you would update the appointment date/time via API
    }
  };

  const handleEditAppointment = () => {
    router.push(`/admin/appointments/${params.id}/edit`);
  };

  const handleDeleteAppointment = () => {
    if (appointment) {
      console.log(`Deleting appointment ${appointment.id}`);
      router.push('/admin/appointments');
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-background min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading appointment details...</div>
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
              <h1 className="text-3xl font-bold text-foreground">Appointment Details</h1>
              <p className="mt-2 text-muted-foreground">
                View and manage appointment information
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleEditAppointment} className="health-btn-primary">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsRescheduleModalOpen(true)}
              className="health-btn-secondary"
            >
              <Clock className="w-4 h-4 mr-2" />
              Reschedule
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsCancelModalOpen(true)}
              className="health-btn-secondary"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Appointment Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                Appointment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Date</Label>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-foreground">{new Date(appointment.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Time</Label>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-foreground">{appointment.time}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Type</Label>
                  <Badge variant="outline" className="status-badge">
                    {appointment.type}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                  <Badge variant={getStatusVariant(appointment.status)} className="status-badge">
                    {appointment.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Doctor</Label>
                  <div className="flex items-center">
                    <Stethoscope className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-foreground">{appointment.doctor}</span>
                  </div>
                </div>
                {appointment.followUpDate && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Follow-up Date</Label>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span className="text-foreground">{new Date(appointment.followUpDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Notes</Label>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-foreground">{appointment.notes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="w-5 h-5 mr-2 text-primary" />
                Medical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Symptoms</Label>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-foreground">{appointment.symptoms}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Diagnosis</Label>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-foreground">{appointment.diagnosis}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Prescription</Label>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-foreground">{appointment.prescription}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patient Information */}
        <div className="space-y-6">
          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-foreground font-medium">{appointment.patientName}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-foreground">{appointment.patientEmail}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-foreground">{appointment.patientPhone}</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full health-btn-secondary"
                onClick={() => router.push(`/admin/patients/${appointment.id}`)}
              >
                <User className="w-4 h-4 mr-2" />
                View Patient Profile
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full health-btn-secondary"
                onClick={() => router.push(`/admin/appointments/${params.id}/edit`)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Appointment
              </Button>
              <Button 
                variant="outline" 
                className="w-full health-btn-secondary"
                onClick={() => setIsRescheduleModalOpen(true)}
              >
                <Clock className="w-4 h-4 mr-2" />
                Reschedule
              </Button>
              <Button 
                variant="outline" 
                className="w-full health-btn-secondary"
                onClick={() => setIsCancelModalOpen(true)}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Cancel Appointment
              </Button>
              <Button 
                variant="destructive" 
                className="w-full health-btn-destructive"
                onClick={handleDeleteAppointment}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Appointment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Cancel Appointment Modal */}
      <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
        <DialogContent className="health-card border-0">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-destructive" />
              Cancel Appointment
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{appointment.patientName}</span>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{new Date(appointment.date).toLocaleDateString()} at {appointment.time}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{appointment.patientPhone}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cancel-reason">Reason for cancellation</Label>
              <Textarea
                id="cancel-reason"
                placeholder="Please provide a reason for cancelling this appointment..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="health-card border-0"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsCancelModalOpen(false)}
              className="health-btn-secondary"
            >
              Keep Appointment
            </Button>
            <Button 
              onClick={handleCancelAppointment}
              disabled={!cancelReason.trim()}
              className="health-btn-primary"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancel Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reschedule Appointment Modal */}
      <Dialog open={isRescheduleModalOpen} onOpenChange={setIsRescheduleModalOpen}>
        <DialogContent className="health-card border-0">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-accent" />
              Reschedule Appointment
            </DialogTitle>
            <DialogDescription>
              Select a new date and time for this appointment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{appointment.patientName}</span>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Current: {new Date(appointment.date).toLocaleDateString()} at {appointment.time}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{appointment.patientEmail}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-date">New Date</Label>
                <Input
                  type="date"
                  id="new-date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="health-card border-0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-time">New Time</Label>
                <Input
                  type="time"
                  id="new-time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="health-card border-0"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsRescheduleModalOpen(false)}
              className="health-btn-secondary"
            >
              Keep Current Time
            </Button>
            <Button 
              onClick={handleRescheduleAppointment}
              disabled={!newDate || !newTime}
              className="health-btn-primary"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 