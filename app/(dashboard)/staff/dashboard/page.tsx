"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Users, 
  FileText, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  User, 
  Stethoscope,
  Building,
  Bell,
  TrendingUp,
  Activity,
  Plus,
  Eye,
  ClipboardList,
  Heart
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: string;
  link?: string;
}

export default function StaffDashboard() {
  const router = useRouter();
  const [currentTime] = useState(new Date());

  // Mock data for staff dashboard
  const stats = [
    {
      title: "Today's Appointments",
      value: "12",
      change: "+2",
      icon: Calendar,
      color: "text-blue-600",
      link: "/staff/appointments"
    },
    {
      title: "Active Patients",
      value: "45",
      change: "+5",
      icon: Users,
      color: "text-green-600",
      link: "/staff/patients"
    },
    {
      title: "Pending Reports",
      value: "8",
      change: "-3",
      icon: FileText,
      color: "text-orange-600",
      link: "/staff/records"
    },
    {
      title: "Hours This Week",
      value: "32",
      change: "+4",
      icon: Clock,
      color: "text-purple-600",
      link: "/staff/schedule"
    }
  ];

  const recentAppointments = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      time: "09:00 AM",
      type: "Follow-up",
      status: "confirmed",
      room: "Exam Room 3",
      patientId: "P001"
    },
    {
      id: 2,
      patientName: "Michael Chen",
      time: "10:30 AM",
      type: "New Patient",
      status: "waiting",
      room: "Exam Room 1",
      patientId: "P002"
    },
    {
      id: 3,
      patientName: "Emily Davis",
      time: "11:15 AM",
      type: "Consultation",
      status: "in-progress",
      room: "Exam Room 2",
      patientId: "P003"
    },
    {
      id: 4,
      patientName: "Robert Wilson",
      time: "02:00 PM",
      type: "Procedure",
      status: "scheduled",
      room: "Procedure Room A",
      patientId: "P004"
    }
  ];

  const notifications = [
    {
      id: 1,
      title: "New lab results available",
      message: "Patient ID: 12345 - Blood work results ready for review",
      time: "5 minutes ago",
      type: "info",
      link: "/staff/records"
    },
    {
      id: 2,
      title: "Appointment reminder",
      message: "Next appointment in 15 minutes - Room 3",
      time: "10 minutes ago",
      type: "reminder",
      link: "/staff/appointments"
    },
    {
      id: 3,
      title: "System maintenance",
      message: "Scheduled maintenance tonight at 2 AM",
      time: "1 hour ago",
      type: "warning",
      link: "/staff/settings"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <FileText className="w-4 h-4" />;
      case 'reminder':
        return <Bell className="w-4 h-4" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'schedule':
        router.push('/staff/appointments/new');
        break;
      case 'records':
        router.push('/staff/records');
        break;
      case 'patients':
        router.push('/staff/patients');
        break;
      case 'notes':
        router.push('/staff/notes');
        break;
      default:
        break;
    }
  };

  const handleViewAppointment = (appointmentId: number) => {
    router.push(`/staff/appointments/${appointmentId}`);
  };

  const handleViewNotification = (notification: Notification) => {
    if (notification.link) {
      router.push(notification.link);
    }
  };

  const mockUser = {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@cliniqly.com",
    role: "Staff"
  };

  return (
    <DashboardLayout variant="staff" user={mockUser}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Staff Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, Dr. Johnson. Here&apos;s what&apos;s happening today.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Current Time</p>
              <p className="text-lg font-semibold">
                {currentTime.toLocaleTimeString()}
              </p>
            </div>
            <Avatar className="w-10 h-10">
              <AvatarImage src="/avatars/staff.jpg" />
              <AvatarFallback>
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="health-card cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push(stat.link)}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.change} from yesterday
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Appointments */}
          <Card className="health-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Today&apos;s Appointments
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => router.push('/staff/appointments')}
                  className="health-btn-secondary"
                >
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => handleViewAppointment(appointment.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>
                          {appointment.patientName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">
                          {appointment.patientName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.type} • {appointment.room} • ID: {appointment.patientId}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">
                        {appointment.time}
                      </p>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notifications
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => router.push('/staff/notifications')}
                  className="health-btn-secondary"
                >
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => handleViewNotification(notification)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-1 rounded-full bg-muted">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="health-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                className="health-btn-primary h-20 flex-col"
                onClick={() => handleQuickAction('schedule')}
              >
                <Calendar className="w-6 h-6 mb-2" />
                Schedule Appointment
              </Button>
              <Button 
                className="health-btn-secondary h-20 flex-col"
                onClick={() => handleQuickAction('records')}
              >
                <FileText className="w-6 h-6 mb-2" />
                View Patient Records
              </Button>
              <Button 
                className="health-btn-secondary h-20 flex-col"
                onClick={() => handleQuickAction('patients')}
              >
                <Users className="w-6 h-6 mb-2" />
                Patient List
              </Button>
              <Button 
                className="health-btn-secondary h-20 flex-col"
                onClick={() => handleQuickAction('notes')}
              >
                <Stethoscope className="w-6 h-6 mb-2" />
                Clinical Notes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 