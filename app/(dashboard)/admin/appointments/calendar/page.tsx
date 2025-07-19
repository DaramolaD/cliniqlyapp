"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Calendar, 
  Clock, 
  User, 
  Plus,
  ChevronLeft,
  ChevronRight,
//   MapPin,
  Phone,
  Mail,
  XCircle
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Appointment {
  id: number;
  date: string;
  time: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctor: string;
  department: string;
  type: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  duration: number;
  notes?: string;
}

export default function AdminCalendarPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  const appointments: Appointment[] = [
    {
      id: 1,
      date: '2024-01-15',
      time: '09:00',
      patientName: 'John Doe',
      patientEmail: 'john.doe@example.com',
      patientPhone: '+1 (555) 123-4567',
      doctor: 'Dr. Sarah Johnson',
      department: 'General Medicine',
      type: 'Annual Checkup',
      status: 'confirmed',
      duration: 30,
      notes: 'Annual physical examination'
    },
    {
      id: 2,
      date: '2024-01-15',
      time: '10:00',
      patientName: 'Jane Smith',
      patientEmail: 'jane.smith@example.com',
      patientPhone: '+1 (555) 234-5678',
      doctor: 'Dr. Michael Chen',
      department: 'Cardiology',
      type: 'Cardiac Consultation',
      status: 'confirmed',
      duration: 45,
      notes: 'Follow-up for chest pain'
    },
    {
      id: 3,
      date: '2024-01-15',
      time: '11:00',
      patientName: 'Bob Wilson',
      patientEmail: 'bob.wilson@example.com',
      patientPhone: '+1 (555) 345-6789',
      doctor: 'Dr. Lisa Thompson',
      department: 'Pediatrics',
      type: 'Vaccination',
      status: 'pending',
      duration: 15,
      notes: 'Flu shot and routine vaccination'
    },
    {
      id: 4,
      date: '2024-01-16',
      time: '14:00',
      patientName: 'Alice Brown',
      patientEmail: 'alice.brown@example.com',
      patientPhone: '+1 (555) 456-7890',
      doctor: 'Dr. Sarah Johnson',
      department: 'General Medicine',
      type: 'Follow-up',
      status: 'confirmed',
      duration: 30,
      notes: 'Follow-up for diabetes management'
    },
    {
      id: 5,
      date: '2024-01-16',
      time: '15:30',
      patientName: 'Charlie Davis',
      patientEmail: 'charlie.davis@example.com',
      patientPhone: '+1 (555) 567-8901',
      doctor: 'Dr. Robert Wilson',
      department: 'Orthopedics',
      type: 'Consultation',
      status: 'confirmed',
      duration: 60,
      notes: 'Knee injury assessment'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-orange-600 bg-orange-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return '✓';
      case 'pending': return '⏳';
      case 'cancelled': return '✗';
      case 'completed': return '✓';
      default: return '?';
    }
  };

  const handleViewAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsViewModalOpen(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    router.push(`/admin/appointments/${appointment.id}/edit`);
  };

  const handleCancelAppointment = (appointment: Appointment) => {
    console.log('Cancelling appointment:', appointment.id);
    setIsViewModalOpen(false);
  };

  const handleRescheduleAppointment = (appointment: Appointment) => {
    router.push(`/admin/appointments/${appointment.id}/edit`);
  };

  const getAppointmentsForDate = (date: string) => {
    return appointments.filter(appointment => appointment.date === date);
  };

  const getCurrentMonthDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add days from previous month to fill first week
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate.toISOString().split('T')[0],
        isCurrentMonth: false,
        appointments: getAppointmentsForDate(prevDate.toISOString().split('T')[0])
      });
    }

    // Add days of current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const currentDate = new Date(year, month, day);
      days.push({
        date: currentDate.toISOString().split('T')[0],
        isCurrentMonth: true,
        appointments: getAppointmentsForDate(currentDate.toISOString().split('T')[0])
      });
    }

    // Add days from next month to fill last week
    const lastDayOfWeek = lastDay.getDay();
    for (let day = 1; day <= 6 - lastDayOfWeek; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({
        date: nextDate.toISOString().split('T')[0],
        isCurrentMonth: false,
        appointments: getAppointmentsForDate(nextDate.toISOString().split('T')[0])
      });
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedDate(newDate);
  };

  const mockUser = {
    name: "Admin User",
    email: "admin@cliniqly.com",
    role: "Administrator"
  };

  return (
    <DashboardLayout variant="admin" user={mockUser}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Appointments Calendar</h1>
            <p className="mt-2 text-muted-foreground">
              View and manage appointments in calendar format.
            </p>
          </div>
          <div className="flex space-x-2">
            <div className="flex border border-border rounded-lg">
              <Button
                variant={viewMode === 'month' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('month')}
              >
                Month
              </Button>
              <Button
                variant={viewMode === 'week' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('week')}
              >
                Week
              </Button>
              <Button
                variant={viewMode === 'day' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('day')}
              >
                Day
              </Button>
            </div>
            <Button 
              onClick={() => router.push('/admin/appointments/new')}
              className="health-btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Appointment
            </Button>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => navigateMonth('prev')}
            className="health-btn-secondary"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <h2 className="text-xl font-semibold">
            {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <Button
            variant="outline"
            onClick={() => navigateMonth('next')}
            className="health-btn-secondary"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <Card className="health-card border-0 shadow-sm">
          <CardContent className="p-6">
            {/* Calendar Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {getCurrentMonthDays().map((day, index) => (
                <div
                  key={index}
                  className={`
                    min-h-[120px] p-2 border border-border rounded-lg
                    ${day.isCurrentMonth ? 'bg-background' : 'bg-muted/30'}
                    ${day.date === new Date().toISOString().split('T')[0] ? 'ring-2 ring-primary' : ''}
                  `}
                >
                  <div className="text-sm font-medium mb-2">
                    {new Date(day.date).getDate()}
                  </div>
                  <div className="space-y-1">
                    {day.appointments.slice(0, 3).map((appointment) => (
                      <div
                        key={appointment.id}
                        className={`
                          p-1 rounded text-xs cursor-pointer transition-colors
                          ${getStatusColor(appointment.status)}
                          hover:opacity-80
                        `}
                        onClick={() => handleViewAppointment(appointment)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{appointment.time}</span>
                          <span>{getStatusIcon(appointment.status)}</span>
                        </div>
                        <div className="truncate">{appointment.patientName}</div>
                        <div className="truncate text-xs opacity-75">{appointment.type}</div>
                      </div>
                    ))}
                    {day.appointments.length > 3 && (
                      <div className="text-xs text-muted-foreground text-center">
                        +{day.appointments.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Appointments */}
        <Card className="health-card border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              Today's Appointments ({new Date().toLocaleDateString()})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getAppointmentsForDate(new Date().toISOString().split('T')[0]).length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No appointments scheduled for today</p>
              </div>
            ) : (
              <div className="space-y-4">
                {getAppointmentsForDate(new Date().toISOString().split('T')[0]).map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={() => handleViewAppointment(appointment)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Clock className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{appointment.time}</h4>
                          <p className="text-sm text-muted-foreground">{appointment.duration} minutes</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">{appointment.patientName}</p>
                        <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* View Appointment Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="health-card border-0 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                Appointment Details
              </DialogTitle>
            </DialogHeader>
            {selectedAppointment && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Date & Time</label>
                    <p className="text-foreground">
                      {new Date(selectedAppointment.date).toLocaleDateString()} at {selectedAppointment.time}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Duration</label>
                    <p className="text-foreground">{selectedAppointment.duration} minutes</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Patient</label>
                    <p className="text-foreground">{selectedAppointment.patientName}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Doctor</label>
                    <p className="text-foreground">{selectedAppointment.doctor}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Type</label>
                    <p className="text-foreground">{selectedAppointment.type}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Department</label>
                    <p className="text-foreground">{selectedAppointment.department}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Patient Contact</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedAppointment.patientEmail}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedAppointment.patientPhone}</span>
                    </div>
                  </div>
                </div>

                {selectedAppointment.notes && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Notes</label>
                    <p className="text-foreground">{selectedAppointment.notes}</p>
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
              {selectedAppointment && (
                <>
                  <Button 
                    onClick={() => handleEditAppointment(selectedAppointment)}
                    className="health-btn-primary"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  {selectedAppointment.status === 'confirmed' && (
                    <Button 
                    onClick={() => handleRescheduleAppointment(selectedAppointment)}
                    className="health-btn-primary"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Reschedule
                  </Button>
                  )}
                  {selectedAppointment.status !== 'cancelled' && (
                    <Button 
                      onClick={() => handleCancelAppointment(selectedAppointment)}
                      className="health-btn-primary"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  )}
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
} 