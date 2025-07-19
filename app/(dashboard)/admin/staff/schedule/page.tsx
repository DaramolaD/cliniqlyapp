"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Calendar, 
  Clock, 
  User, 
  Plus,
  ChevronLeft,
  ChevronRight,
//   MapPin,
//   Phone,
//   Mail,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useRouter } from "next/navigation";

interface StaffMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  avatar?: string;
  isActive: boolean;
}

interface Schedule {
  id: number;
  staffId: number;
  staffName: string;
  date: string;
  startTime: string;
  endTime: string;
  shiftType: 'morning' | 'afternoon' | 'night' | 'full';
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  location: string;
}

export default function AdminStaffSchedulePage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedStaff, setSelectedStaff] = useState<string>("all");

  const staffMembers: StaffMember[] = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@cliniqly.com',
      phone: '+1 (555) 123-4567',
      role: 'Physician',
      department: 'General Medicine',
      isActive: true
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      email: 'michael.chen@cliniqly.com',
      phone: '+1 (555) 234-5678',
      role: 'Cardiologist',
      department: 'Cardiology',
      isActive: true
    },
    {
      id: 3,
      name: 'Dr. Lisa Thompson',
      email: 'lisa.thompson@cliniqly.com',
      phone: '+1 (555) 345-6789',
      role: 'Pediatrician',
      department: 'Pediatrics',
      isActive: true
    },
    {
      id: 4,
      name: 'Nurse Emily Rodriguez',
      email: 'emily.rodriguez@cliniqly.com',
      phone: '+1 (555) 456-7890',
      role: 'Registered Nurse',
      department: 'General Medicine',
      isActive: true
    },
    {
      id: 5,
      name: 'Dr. Robert Wilson',
      email: 'robert.wilson@cliniqly.com',
      phone: '+1 (555) 567-8901',
      role: 'Orthopedic Surgeon',
      department: 'Orthopedics',
      isActive: false
    }
  ];

  const schedules: Schedule[] = [
    {
      id: 1,
      staffId: 1,
      staffName: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      startTime: '08:00',
      endTime: '17:00',
      shiftType: 'full',
      status: 'confirmed',
      location: 'Main Clinic - Room 101',
      notes: 'Regular clinic hours'
    },
    {
      id: 2,
      staffId: 2,
      staffName: 'Dr. Michael Chen',
      date: '2024-01-15',
      startTime: '09:00',
      endTime: '18:00',
      shiftType: 'full',
      status: 'confirmed',
      location: 'Cardiology Department',
      notes: 'Cardiac consultations'
    },
    {
      id: 3,
      staffId: 4,
      staffName: 'Nurse Emily Rodriguez',
      date: '2024-01-15',
      startTime: '07:00',
      endTime: '15:00',
      shiftType: 'morning',
      status: 'confirmed',
      location: 'Main Clinic - Nursing Station',
      notes: 'Morning shift'
    },
    {
      id: 4,
      staffId: 3,
      staffName: 'Dr. Lisa Thompson',
      date: '2024-01-16',
      startTime: '10:00',
      endTime: '19:00',
      shiftType: 'afternoon',
      status: 'scheduled',
      location: 'Pediatrics Department',
      notes: 'Afternoon clinic'
    },
    {
      id: 5,
      staffId: 1,
      staffName: 'Dr. Sarah Johnson',
      date: '2024-01-16',
      startTime: '08:00',
      endTime: '17:00',
      shiftType: 'full',
      status: 'confirmed',
      location: 'Main Clinic - Room 101',
      notes: 'Regular clinic hours'
    }
  ];

  const getShiftTypeColor = (shiftType: string) => {
    switch (shiftType) {
      case 'morning': return 'text-blue-600 bg-blue-100';
      case 'afternoon': return 'text-orange-600 bg-orange-100';
      case 'night': return 'text-purple-600 bg-purple-100';
      case 'full': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleViewSchedule = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setIsViewModalOpen(true);
  };

  const handleEditSchedule = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setIsEditModalOpen(true);
  };

  const handleDeleteSchedule = (schedule: Schedule) => {
    console.log('Deleting schedule:', schedule.id);
    setIsViewModalOpen(false);
  };

  const handleSaveSchedule = async () => {
    if (!selectedSchedule) return;

    console.log('Saving schedule:', selectedSchedule);
    setIsEditModalOpen(false);
  };

  const getSchedulesForDate = (date: string) => {
    return schedules.filter(schedule => schedule.date === date);
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
        schedules: getSchedulesForDate(prevDate.toISOString().split('T')[0])
      });
    }

    // Add days of current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const currentDate = new Date(year, month, day);
      days.push({
        date: currentDate.toISOString().split('T')[0],
        isCurrentMonth: true,
        schedules: getSchedulesForDate(currentDate.toISOString().split('T')[0])
      });
    }

    // Add days from next month to fill last week
    const lastDayOfWeek = lastDay.getDay();
    for (let day = 1; day <= 6 - lastDayOfWeek; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({
        date: nextDate.toISOString().split('T')[0],
        isCurrentMonth: false,
        schedules: getSchedulesForDate(nextDate.toISOString().split('T')[0])
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

  const activeStaff = staffMembers.filter(staff => staff.isActive).length;
  const totalSchedules = schedules.length;
  const confirmedSchedules = schedules.filter(s => s.status === 'confirmed').length;

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
            <h1 className="text-3xl font-bold text-foreground">Staff Schedule</h1>
            <p className="mt-2 text-muted-foreground">
              Manage staff schedules and shift assignments.
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
              onClick={() => setIsEditModalOpen(true)}
              className="health-btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Schedule
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="health-card border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Active Staff</dt>
                    <dd className="text-lg font-medium text-foreground">{activeStaff}</dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="health-card border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Total Schedules</dt>
                    <dd className="text-lg font-medium text-foreground">{totalSchedules}</dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="health-card border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Confirmed</dt>
                    <dd className="text-lg font-medium text-foreground">{confirmedSchedules}</dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="health-card border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Today's Shifts</dt>
                    <dd className="text-lg font-medium text-foreground">
                      {getSchedulesForDate(new Date().toISOString().split('T')[0]).length}
                    </dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Staff Filter */}
        <Card className="health-card border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedStaff === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStaff("all")}
              >
                All Staff
              </Button>
              {staffMembers.filter(staff => staff.isActive).map((staff) => (
                <Button
                  key={staff.id}
                  variant={selectedStaff === staff.id.toString() ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStaff(staff.id.toString())}
                >
                  {staff.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

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
              {getCurrentMonthDays().map((day, index) => {
                const filteredSchedules = selectedStaff === "all" 
                  ? day.schedules 
                  : day.schedules.filter(s => s.staffId.toString() === selectedStaff);

                return (
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
                      {filteredSchedules.slice(0, 3).map((schedule) => (
                        <div
                          key={schedule.id}
                          className={`
                            p-1 rounded text-xs cursor-pointer transition-colors
                            ${getShiftTypeColor(schedule.shiftType)}
                            hover:opacity-80
                          `}
                          onClick={() => handleViewSchedule(schedule)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{schedule.startTime}</span>
                            <span>{getStatusIcon(schedule.status)}</span>
                          </div>
                          <div className="truncate">{schedule.staffName.split(' ')[0]}</div>
                          <div className="truncate text-xs opacity-75">{schedule.shiftType}</div>
                        </div>
                      ))}
                      {filteredSchedules.length > 3 && (
                        <div className="text-xs text-muted-foreground text-center">
                          +{filteredSchedules.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card className="health-card border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              Today's Schedule ({new Date().toLocaleDateString()})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getSchedulesForDate(new Date().toISOString().split('T')[0]).length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No schedules for today</p>
              </div>
            ) : (
              <div className="space-y-4">
                {getSchedulesForDate(new Date().toISOString().split('T')[0]).map((schedule) => (
                  <div
                    key={schedule.id}
                    className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={() => handleViewSchedule(schedule)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{schedule.staffName}</h4>
                          <p className="text-sm text-muted-foreground">{schedule.startTime} - {schedule.endTime}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getShiftTypeColor(schedule.shiftType)}>
                          {schedule.shiftType}
                        </Badge>
                        <Badge className={`mt-1 ${getStatusColor(schedule.status)}`}>
                          {schedule.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* View Schedule Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="health-card border-0 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                Schedule Details
              </DialogTitle>
            </DialogHeader>
            {selectedSchedule && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Staff Member</label>
                    <p className="text-foreground font-medium">{selectedSchedule.staffName}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Date</label>
                    <p className="text-foreground">{new Date(selectedSchedule.date).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Time</label>
                    <p className="text-foreground">{selectedSchedule.startTime} - {selectedSchedule.endTime}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Shift Type</label>
                    <Badge className={getShiftTypeColor(selectedSchedule.shiftType)}>
                      {selectedSchedule.shiftType}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Location</label>
                    <p className="text-foreground">{selectedSchedule.location}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <Badge className={getStatusColor(selectedSchedule.status)}>
                      {selectedSchedule.status}
                    </Badge>
                  </div>
                </div>

                {selectedSchedule.notes && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Notes</label>
                    <p className="text-foreground">{selectedSchedule.notes}</p>
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
              {selectedSchedule && (
                <>
                  <Button 
                    onClick={() => handleEditSchedule(selectedSchedule)}
                    className="health-btn-primary"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    onClick={() => handleDeleteSchedule(selectedSchedule)}
                    className="health-btn-primary"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Schedule Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="health-card border-0 max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                {selectedSchedule ? <Edit className="w-5 h-5 mr-2 text-primary" /> : <Plus className="w-5 h-5 mr-2 text-primary" />}
                {selectedSchedule ? 'Edit Schedule' : 'Add Schedule'}
              </DialogTitle>
              <DialogDescription>
                {selectedSchedule ? 'Update the schedule details.' : 'Create a new staff schedule.'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Staff Member</label>
                <select className="w-full p-3 border border-border rounded-lg bg-background">
                  <option value="">Select staff member...</option>
                  {staffMembers.filter(staff => staff.isActive).map((staff) => (
                    <option key={staff.id} value={staff.id}>
                      {staff.name} - {staff.role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <input
                  type="date"
                  className="w-full p-3 border border-border rounded-lg bg-background"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Time</label>
                  <input
                    type="time"
                    className="w-full p-3 border border-border rounded-lg bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Time</label>
                  <input
                    type="time"
                    className="w-full p-3 border border-border rounded-lg bg-background"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Shift Type</label>
                <select className="w-full p-3 border border-border rounded-lg bg-background">
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="night">Night</option>
                  <option value="full">Full Day</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <input
                  type="text"
                  placeholder="Enter location..."
                  className="w-full p-3 border border-border rounded-lg bg-background"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Notes (Optional)</label>
                <textarea
                  placeholder="Add any notes..."
                  rows={3}
                  className="w-full p-3 border border-border rounded-lg bg-background resize-none"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsEditModalOpen(false)}
                className="health-btn-secondary"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveSchedule}
                className="health-btn-primary"
              >
                {selectedSchedule ? 'Update' : 'Create'} Schedule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
} 