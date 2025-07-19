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
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Stethoscope,
  ClipboardList
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { AppointmentStatus, getStatusDisplayName, getStatusColor } from "@/lib/appointment-types";

interface Appointment {
  id: number;
  date: string;
  time: string;
  patient: string;
  doctor: string;
  department: string;
  type: string;
  status: AppointmentStatus;
  notes?: string;
  location?: string;
  phone?: string;
  patientId?: string;
  doctorId?: string;
  assignedBy?: string;
  symptoms?: string;
  diagnosis?: string;
  treatment?: string;
}

export default function StaffAppointmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<AppointmentStatus>('pending');
  const [loading, setLoading] = useState(true);

  // Mock appointment data - in real app, fetch from API
  const mockAppointment: Appointment = {
    id: Number(params.id),
    date: '2024-01-15',
    time: '10:00 AM',
    patient: 'John Doe',
    doctor: 'Dr. Sarah Johnson',
    department: 'General Medicine',
    type: 'General Checkup',
    status: 'confirmed',
    notes: 'Annual physical examination. Patient reports feeling well.',
    location: 'Main Clinic - Room 101',
    phone: '+1 (555) 123-4567',
    patientId: 'P001',
    doctorId: 'D001',
    assignedBy: 'Dr. Sarah Johnson',
    symptoms: 'Patient reports occasional headaches and fatigue',
    diagnosis: 'Pending examination',
    treatment: 'To be determined after examination'
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAppointment(mockAppointment);
      setLoading(false);
    }, 500);
  }, [params.id]);

  const handleEditAppointment = () => {
    router.push(`/staff/appointments/${params.id}/edit`);
  };

  const handleStatusChange = () => {
    setNewStatus(appointment?.status || 'pending');
    setIsStatusModalOpen(true);
  };

  const handleConfirmStatusChange = () => {
    if (appointment) {
      // Here you would typically make an API call to update the appointment status
      console.log('Updating appointment status:', appointment.id, 'to', newStatus);
      setIsStatusModalOpen(false);
      // You could add a toast notification here
    }
  };

  const handleCreateNote = () => {
    router.push(`/staff/notes/new?appointmentId=${params.id}`);
  };

  const handleViewPatient = () => {
    router.push(`/staff/patients/${appointment?.patientId}`);
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
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@cliniqly.com",
    role: "Staff"
  };

  if (loading) {
    return (
      <DashboardLayout variant="staff" user={mockUser}>
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
      <DashboardLayout variant="staff" user={mockUser}>
        <div className="p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Appointment Not Found</h1>
            <p className="text-muted-foreground mb-4">The appointment you're looking for doesn't exist.</p>
            <Button onClick={() => router.push('/staff/appointments')} className="health-btn-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Appointments
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout variant="staff" user={mockUser}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => router.push('/staff/appointments')}
              className="health-btn-secondary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Appointment Details</h1>
              <p className="mt-2 text-muted-foreground">
                View and manage appointment information.
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleStatusChange} className="health-btn-secondary">
              <CheckCircle className="w-4 h-4 mr-2" />
              Update Status
            </Button>
            <Button onClick={handleEditAppointment} className="health-btn-secondary">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
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
                    <Label className="text-sm font-medium text-muted-foreground">Patient</Label>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{appointment.patient}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">ID: {appointment.patientId}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Doctor</Label>
                    <div className="flex items-center space-x-2">
                      <Stethoscope className="w-4 h-4 text-muted-foreground" />
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
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{appointment.phone}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Assigned By</Label>
                    <span className="font-medium">{appointment.assignedBy}</span>
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

            {/* Clinical Information */}
            <Card className="health-card border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Clinical Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appointment.symptoms && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Symptoms</Label>
                    <p className="text-sm">{appointment.symptoms}</p>
                  </div>
                )}
                {appointment.diagnosis && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Diagnosis</Label>
                    <p className="text-sm">{appointment.diagnosis}</p>
                  </div>
                )}
                {appointment.treatment && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Treatment</Label>
                    <p className="text-sm">{appointment.treatment}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="health-card border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full health-btn-secondary"
                  onClick={handleCreateNote}
                >
                  <ClipboardList className="w-4 h-4 mr-2" />
                  Create Clinical Note
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full health-btn-secondary"
                  onClick={handleViewPatient}
                >
                  <User className="w-4 h-4 mr-2" />
                  View Patient Profile
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full health-btn-secondary"
                  onClick={() => router.push('/staff/messages')}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Message Patient
                </Button>
              </CardContent>
            </Card>

            {/* Patient Summary */}
            <Card className="health-card border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Patient Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <span className="font-medium">Name:</span> {appointment.patient}
                </div>
                <div className="text-sm">
                  <span className="font-medium">ID:</span> {appointment.patientId}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Phone:</span> {appointment.phone}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Last Visit:</span> 2 weeks ago
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Status Change Modal */}
        <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
          <DialogContent className="health-card border-0">
            <DialogHeader>
              <DialogTitle>Update Appointment Status</DialogTitle>
              <DialogDescription>
                Change the status of this appointment.
              </DialogDescription>
            </DialogHeader>
            {appointment && (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Current Status</Label>
                  <Badge variant="secondary" className={getStatusColor(appointment.status)}>
                    {getStatusDisplayName(appointment.status)}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">New Status</Label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as AppointmentStatus)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="no-show">No Show</option>
                    <option value="rescheduled">Rescheduled</option>
                  </select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsStatusModalOpen(false)}
                className="health-btn-secondary"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmStatusChange}
                className="health-btn-primary"
              >
                Update Status
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
} 