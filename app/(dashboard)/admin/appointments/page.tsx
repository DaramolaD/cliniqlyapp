"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DataTable } from "@/components/customs/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Eye,
  Edit,
  Plus,
  Users
} from "lucide-react";
import { useRouter } from "next/navigation";
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
}

export default function AdminAppointmentsPage() {
  const router = useRouter();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<AppointmentStatus>('pending');
  const [newDoctor, setNewDoctor] = useState<string>('');

  const appointments: Appointment[] = [
    {
      id: 1,
      date: '2024-01-15',
      time: '10:00 AM',
      patient: 'John Doe',
      doctor: 'Dr. Sarah Johnson',
      department: 'General Medicine',
      type: 'General Checkup',
      status: 'confirmed',
      notes: 'Annual physical examination',
      location: 'Main Clinic - Room 101',
      phone: '+1 (555) 123-4567',
      patientId: 'P001',
      doctorId: 'D001',
      assignedBy: 'Dr. Sarah Johnson'
    },
    {
      id: 2,
      date: '2024-01-10',
      time: '2:30 PM',
      patient: 'Jane Smith',
      doctor: 'Dr. Michael Chen',
      department: 'Cardiology',
      type: 'Cardiology Consultation',
      status: 'completed',
      notes: 'Follow-up on heart condition',
      location: 'Cardiology Wing - Room 205',
      phone: '+1 (555) 234-5678',
      patientId: 'P002',
      doctorId: 'D002',
      assignedBy: 'Dr. Michael Chen'
    },
    {
      id: 3,
      date: '2024-01-05',
      time: '9:00 AM',
      patient: 'Mike Johnson',
      doctor: 'Dr. Lisa Thompson',
      department: 'Pediatrics',
      type: 'Follow-up',
      status: 'completed',
      notes: 'Post-treatment follow-up',
      location: 'Pediatrics Wing - Room 103',
      phone: '+1 (555) 345-6789',
      patientId: 'P003',
      doctorId: 'D003',
      assignedBy: 'Dr. Lisa Thompson'
    },
    {
      id: 4,
      date: '2024-01-20',
      time: '11:30 AM',
      patient: 'Sarah Wilson',
      doctor: 'Dr. Robert Wilson',
      department: 'Orthopedics',
      type: 'Consultation',
      status: 'pending',
      notes: 'Knee pain evaluation',
      location: 'Orthopedics Wing - Room 301',
      phone: '+1 (555) 456-7890',
      patientId: 'P004',
      doctorId: 'D004',
      assignedBy: 'Admin'
    },
    {
      id: 5,
      date: '2024-01-08',
      time: '3:00 PM',
      patient: 'David Brown',
      doctor: 'Dr. Emily Rodriguez',
      department: 'Dermatology',
      type: 'Skin Check',
      status: 'cancelled',
      notes: 'Annual skin cancer screening',
      location: 'Dermatology Wing - Room 401',
      phone: '+1 (555) 567-8901',
      patientId: 'P005',
      doctorId: 'D005',
      assignedBy: 'Dr. Emily Rodriguez'
    },
    {
      id: 6,
      date: '2024-01-12',
      time: '1:00 PM',
      patient: 'Lisa Davis',
      doctor: 'Dr. Sarah Johnson',
      department: 'General Medicine',
      type: 'Follow-up',
      status: 'in-progress',
      notes: 'Diabetes management follow-up',
      location: 'Main Clinic - Room 102',
      phone: '+1 (555) 678-9012',
      patientId: 'P006',
      doctorId: 'D001',
      assignedBy: 'Dr. Sarah Johnson'
    },
    {
      id: 7,
      date: '2024-01-18',
      time: '4:00 PM',
      patient: 'Tom Anderson',
      doctor: 'Unassigned',
      department: 'General Medicine',
      type: 'Consultation',
      status: 'pending',
      notes: 'New patient consultation',
      location: 'Main Clinic - Room 103',
      phone: '+1 (555) 789-0123',
      patientId: 'P007',
      doctorId: "D005",
      assignedBy: 'Admin'
    }
  ];

  const columns = [
    {
      key: 'date',
      title: 'Date & Time',
      render: (appointment: Appointment) => (
        <div>
          <div className="font-medium">{new Date(appointment.date).toLocaleDateString()}</div>
          <div className="text-sm text-muted-foreground">{appointment.time}</div>
        </div>
      )
    },
    {
      key: 'patient',
      title: 'Patient',
      render: (appointment: Appointment) => (
        <div>
          <div className="font-medium">{appointment.patient}</div>
          <div className="text-sm text-muted-foreground">ID: {appointment.patientId}</div>
        </div>
      )
    },
    {
      key: 'doctor',
      title: 'Doctor',
      render: (appointment: Appointment) => (
        <div>
          <div className="font-medium">{appointment.doctor}</div>
          <div className="text-sm text-muted-foreground">{appointment.department}</div>
        </div>
      )
    },
    {
      key: 'type',
      title: 'Type',
      render: (appointment: Appointment) => (
        <div className="font-medium">{appointment.type}</div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (appointment: Appointment) => {
        const getStatusVariant = (status: AppointmentStatus) => {
          switch (status) {
            case 'pending': return 'secondary';
            case 'confirmed': return 'default';
            case 'completed': return 'secondary';
            case 'cancelled': return 'destructive';
            case 'in-progress': return 'default';
            case 'no-show': return 'outline';
            case 'rescheduled': return 'outline';
            default: return 'outline';
          }
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

        return (
          <Badge variant={getStatusVariant(appointment.status)} className="status-badge">
            {getStatusIcon(appointment.status)}
            <span className="ml-1">{getStatusDisplayName(appointment.status)}</span>
          </Badge>
        );
      }
    },
    {
      key: 'assignedBy',
      title: 'Assigned By',
      render: (appointment: Appointment) => (
        <div className="text-sm text-muted-foreground">{appointment.assignedBy}</div>
      )
    }
  ];

  const filters = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'no-show', label: 'No Show' },
        { value: 'rescheduled', label: 'Rescheduled' }
      ]
    },
    {
      key: 'department',
      label: 'Department',
      options: [
        { value: 'General Medicine', label: 'General Medicine' },
        { value: 'Cardiology', label: 'Cardiology' },
        { value: 'Pediatrics', label: 'Pediatrics' },
        { value: 'Orthopedics', label: 'Orthopedics' },
        { value: 'Dermatology', label: 'Dermatology' }
      ]
    }
  ];

  const handleViewAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsViewModalOpen(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    router.push(`/admin/appointments/${appointment.id}/edit`);
  };

  const handleStatusChange = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setNewStatus(appointment.status);
    setIsStatusModalOpen(true);
  };

  const handleReassignAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setNewDoctor(appointment.doctor);
    setIsReassignModalOpen(true);
  };

  const handleConfirmStatusChange = () => {
    if (selectedAppointment) {
      // Here you would typically make an API call to update the appointment status
      console.log('Updating appointment status:', selectedAppointment.id, 'to', newStatus);
      setIsStatusModalOpen(false);
      setSelectedAppointment(null);
      // You could add a toast notification here
    }
  };

  const handleConfirmReassign = () => {
    if (selectedAppointment) {
      // Here you would typically make an API call to reassign the appointment
      console.log('Reassigning appointment:', selectedAppointment.id, 'to', newDoctor);
      setIsReassignModalOpen(false);
      setSelectedAppointment(null);
      // You could add a toast notification here
    }
  };

  const handleNewAppointment = () => {
    router.push('/admin/appointments/new');
  };

  const actions = (appointment: Appointment) => (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleViewAppointment(appointment)}
        className="health-btn-secondary"
      >
        <Eye className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleEditAppointment(appointment)}
        className="health-btn-secondary"
      >
        <Edit className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleStatusChange(appointment)}
        className="health-btn-secondary"
      >
        <CheckCircle className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleReassignAppointment(appointment)}
        className="health-btn-secondary"
      >
        <Users className="w-4 h-4" />
      </Button>
    </div>
  );

  const mockUser = {
    name: "Admin User",
    email: "admin@cliniqly.com",
    role: "Admin"
  };

  return (
    <DashboardLayout variant="admin" user={mockUser}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">All Appointments</h1>
            <p className="mt-2 text-muted-foreground">
              Manage and oversee all clinic appointments.
            </p>
          </div>
          <Button onClick={handleNewAppointment} className="health-btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            New Appointment
          </Button>
        </div>

        {/* Appointments Table */}
        <DataTable
          data={appointments}
          columns={columns}
          filters={filters}
          actions={actions}
          searchPlaceholder="Search appointments..."
        />

        {/* View Appointment Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="health-card border-0">
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
            </DialogHeader>
            {selectedAppointment && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Date & Time</Label>
                    <p className="font-medium">
                      {new Date(selectedAppointment.date).toLocaleDateString()} at {selectedAppointment.time}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                    <Badge variant="secondary" className={getStatusColor(selectedAppointment.status)}>
                      {getStatusDisplayName(selectedAppointment.status)}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Patient</Label>
                    <p className="font-medium">{selectedAppointment.patient}</p>
                    <p className="text-sm text-muted-foreground">ID: {selectedAppointment.patientId}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Doctor</Label>
                    <p className="font-medium">{selectedAppointment.doctor}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Department</Label>
                    <p className="font-medium">{selectedAppointment.department}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Type</Label>
                    <p className="font-medium">{selectedAppointment.type}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                    <p className="font-medium">{selectedAppointment.location}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                    <p className="font-medium">{selectedAppointment.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Assigned By</Label>
                    <p className="font-medium">{selectedAppointment.assignedBy}</p>
                  </div>
                </div>
                {selectedAppointment.notes && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Notes</Label>
                    <p className="text-sm">{selectedAppointment.notes}</p>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsViewModalOpen(false)}
                className="health-btn-secondary"
              >
                Close
              </Button>
              <Button 
                onClick={() => handleEditAppointment(selectedAppointment!)}
                className="health-btn-primary"
              >
                Edit Appointment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Status Change Modal */}
        <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
          <DialogContent className="health-card border-0">
            <DialogHeader>
              <DialogTitle>Update Appointment Status</DialogTitle>
              <DialogDescription>
                Change the status of this appointment.
              </DialogDescription>
            </DialogHeader>
            {selectedAppointment && (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Current Status</Label>
                  <Badge variant="secondary" className={getStatusColor(selectedAppointment.status)}>
                    {getStatusDisplayName(selectedAppointment.status)}
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

        {/* Reassign Appointment Modal */}
        <Dialog open={isReassignModalOpen} onOpenChange={setIsReassignModalOpen}>
          <DialogContent className="health-card border-0">
            <DialogHeader>
              <DialogTitle>Reassign Appointment</DialogTitle>
              <DialogDescription>
                Assign this appointment to a different doctor.
              </DialogDescription>
            </DialogHeader>
            {selectedAppointment && (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Current Doctor</Label>
                  <p className="font-medium">{selectedAppointment.doctor}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">New Doctor</Label>
                  <select
                    value={newDoctor}
                    onChange={(e) => setNewDoctor(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Dr. Sarah Johnson">Dr. Sarah Johnson - General Medicine</option>
                    <option value="Dr. Michael Chen">Dr. Michael Chen - Cardiology</option>
                    <option value="Dr. Lisa Thompson">Dr. Lisa Thompson - Pediatrics</option>
                    <option value="Dr. Robert Wilson">Dr. Robert Wilson - Orthopedics</option>
                    <option value="Dr. Emily Rodriguez">Dr. Emily Rodriguez - Dermatology</option>
                    <option value="Dr. James Brown">Dr. James Brown - General Medicine</option>
                  </select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsReassignModalOpen(false)}
                className="health-btn-secondary"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmReassign}
                className="health-btn-primary"
              >
                Reassign
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
} 