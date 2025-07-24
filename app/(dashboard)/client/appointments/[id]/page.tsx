"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  Phone, 
  FileText, 
  Edit, 
  Trash2, 
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { AppointmentStatus, getStatusDisplayName, getStatusColor } from "@/lib/appointment-types";

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
  cost?: number;
  insurance?: string;
}

export default function ClientAppointmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock appointment data - in real app, fetch from API
  const mockAppointment: Appointment = {
    id: Number(params.id),
    date: '2024-01-15',
    time: '10:00 AM',
    doctor: 'Dr. Sarah Johnson',
    department: 'General Medicine',
    type: 'General Checkup',
    status: 'confirmed',
    notes: 'Annual physical examination. Please bring any current medications and medical history.',
    location: 'Main Clinic - Room 101',
    phone: '+1 (555) 123-4567',
    doctorId: 'D001',
    duration: '30 minutes',
    cost: 150,
    insurance: 'Blue Cross Blue Shield'
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAppointment(mockAppointment);
      setLoading(false);
    }, 500);
  }, [params.id]);

  const handleEditAppointment = () => {
    router.push(`/client/appointments/${params.id}/edit`);
  };

  const handleCancelAppointment = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmCancel = () => {
    // Here you would typically make an API call to cancel the appointment
    console.log('Cancelling appointment:', params.id);
    setIsDeleteModalOpen(false);
    router.push('/client/appointments');
  };

  const getStatusIcon = (status: AppointmentStatus) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      case 'in-progress': return <AlertCircle className="w-4 h-4" />;
      case 'no-show': return <AlertCircle className="w-4 h-4" />;
      case 'rescheduled': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
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

  if (!appointment) {
    return (
      <DashboardLayout variant="client" user={mockUser}>
        <div className="p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Appointment Not Found</h1>
            <p className="text-muted-foreground mb-4">The appointment you&apos;re looking for doesn&apos;t exist.</p>
            <Button onClick={() => router.push('/client/appointments')} className="health-btn-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Appointments
            </Button>
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
              onClick={() => router.push('/client/appointments')}
              className="health-btn-secondary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Appointment Details</h1>
              <p className="mt-2 text-muted-foreground">
                View and manage your appointment information.
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            {appointment.status === 'pending' && (
              <>
                <Button onClick={handleEditAppointment} className="health-btn-secondary">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button onClick={handleCancelAppointment} className="text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Appointment Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="health-card border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Appointment Information</span>
                  <Badge variant="secondary" className={getStatusColor(appointment.status)}>
                    {getStatusIcon(appointment.status)}
                    <span className="ml-1">{getStatusDisplayName(appointment.status)}</span>
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Date & Time</Label>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">
                        {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                      </span>
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
                    <Label className="text-sm font-medium text-muted-foreground">Doctor</Label>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{appointment.doctor}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Department</Label>
                    <span className="font-medium">{appointment.department}</span>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Type</Label>
                    <span className="font-medium">{appointment.type}</span>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{appointment.location}</span>
                    </div>
                  </div>
                </div>
                
                {appointment.notes && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Notes</Label>
                    <div className="flex items-start space-x-2">
                      <FileText className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <p className="text-sm">{appointment.notes}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="health-card border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{appointment.phone}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Cost Information */}
            <Card className="health-card border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Cost Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Appointment Cost:</span>
                  <span className="font-medium">${appointment.cost}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insurance:</span>
                  <span className="font-medium">{appointment.insurance}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-medium">
                    <span>Estimated Cost:</span>
                    <span>${appointment.cost}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="health-card border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full health-btn-secondary"
                  onClick={() => router.push('/client/messages')}
                >
                  Message Doctor
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full health-btn-secondary"
                  onClick={() => router.push('/client/documents')}
                >
                  View Documents
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full health-btn-secondary"
                  onClick={() => router.push('/client/health')}
                >
                  Health Records
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cancel Appointment Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent className="health-card border-0">
            <DialogHeader>
              <DialogTitle>Cancel Appointment</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel this appointment? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteModalOpen(false)}
                className="health-btn-secondary"
              >
                Keep Appointment
              </Button>
              <Button 
                onClick={handleConfirmCancel}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Cancel Appointment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
} 