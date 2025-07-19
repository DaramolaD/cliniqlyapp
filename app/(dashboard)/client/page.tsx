"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { 
  Calendar, 
  User, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  ArrowRight,
  Heart,
  Activity,
  TrendingUp,
  Bell,
  MessageSquare,
  Zap,
  Pill,
  Thermometer,
  Weight,
  MapPin
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

interface Appointment {
  id: number;
  date: string;
  time: string;
  doctor: string;
  type: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  location: string;
  specialty: string;
}

interface HealthMetric {
  name: string;
  value: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<{ className?: string }>;
  status: 'normal' | 'warning' | 'critical';
  lastUpdated: string;
}

interface QuickAction {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
  bgColor: string;
  primary?: boolean;
}

export default function ClientDashboard() {
  const router = useRouter();
  const { user } = useAuth();

  const mockUser = {
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    role: "Patient"
  };

  // Enhanced Quick Stats
  const quickStats = [
    {
      title: "Upcoming Appointments",
      value: "2",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: "+1 this week",
      trendColor: "text-green-600"
    },
    {
      title: "Health Score",
      value: "85%",
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: "+5% this month",
      trendColor: "text-green-600"
    },
    {
      title: "Unread Messages",
      value: "3",
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "From care team",
      trendColor: "text-purple-600",
      alert: true
    },
    {
      title: "Test Results",
      value: "2 New",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: "Ready for review",
      trendColor: "text-orange-600",
      alert: true
    }
  ];

  const [recentAppointments] = useState<Appointment[]>([
    {
      id: 1,
      date: '2024-01-15',
      time: '10:00 AM',
      doctor: 'Dr. Sarah Johnson',
      type: 'Annual Checkup',
      status: 'upcoming',
      location: 'Main Clinic',
      specialty: 'Primary Care'
    },
    {
      id: 2,
      date: '2024-01-10',
      time: '2:30 PM',
      doctor: 'Dr. Michael Chen',
      type: 'Cardiology Consultation',
      status: 'completed',
      location: 'Cardiology Center',
      specialty: 'Cardiology'
    },
    {
      id: 3,
      date: '2024-01-05',
      time: '9:00 AM',
      doctor: 'Dr. Lisa Thompson',
      type: 'Follow-up',
      status: 'completed',
      location: 'Main Clinic',
      specialty: 'Internal Medicine'
    }
  ]);

  const [healthMetrics] = useState<HealthMetric[]>([
    {
      name: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      trend: 'stable',
      icon: Heart,
      status: 'normal',
      lastUpdated: '2 hours ago'
    },
    {
      name: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      trend: 'down',
      icon: Activity,
      status: 'normal',
      lastUpdated: '1 hour ago'
    },
    {
      name: 'Temperature',
      value: '98.6',
      unit: '°F',
      trend: 'stable',
      icon: Thermometer,
      status: 'normal',
      lastUpdated: '3 hours ago'
    },
    {
      name: 'Weight',
      value: '165',
      unit: 'lbs',
      trend: 'down',
      icon: Weight,
      status: 'normal',
      lastUpdated: '1 day ago'
    }
  ]);

  // Enhanced Quick Actions
  const quickActions: QuickAction[] = [
    {
      title: "Book Appointment",
      description: "Schedule a new appointment",
      icon: Calendar,
      href: "/client/appointments/book",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      primary: true
    },
    {
      title: "View Test Results",
      description: "Check your latest results",
      icon: FileText,
      href: "/client/health/results",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Send Message",
      description: "Contact your care team",
      icon: MessageSquare,
      href: "/client/messages",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Update Profile",
      description: "Manage your information",
      icon: User,
      href: "/client/profile",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "View Medications",
      description: "Check your prescriptions",
      icon: Pill,
      href: "/client/medications",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Health Records",
      description: "Access your medical history",
      icon: FileText,
      href: "/client/health/records",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    }
  ];

  // Recent Activity Data
  const recentActivity = [
    {
      type: "Appointment",
      title: "Annual Checkup Scheduled",
      description: "Appointment confirmed with Dr. Sarah Johnson for tomorrow at 2:00 PM",
      time: "2 hours ago",
      status: "Confirmed",
      icon: Calendar
    },
    {
      type: "Test Result",
      title: "Blood Test Results Available",
      description: "Your latest blood work is ready for review. All values within normal range.",
      time: "1 day ago",
      status: "New",
      icon: FileText
    },
    {
      type: "Message",
      title: "Message from Dr. Johnson",
      description: "Regarding your recent test results and medication adjustment",
      time: "2 days ago",
      status: "Unread",
      icon: MessageSquare
    },
    {
      type: "Prescription",
      title: "Prescription Renewed",
      description: "Lisinopril has been renewed for 90 days with 2 refills remaining",
      time: "3 days ago",
      status: "Completed",
      icon: Pill
    }
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'default';
      case 'completed':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      case 'stable':
        return <Activity className="w-4 h-4 text-blue-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'critical':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <DashboardLayout variant="client" user={mockUser}>
      <div className="p-6 space-y-8">
        {/* Enhanced Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {mockUser.name}! 👋
            </h1>
            <p className="mt-2 text-muted-foreground">
              Here&rsquo;s your health overview for {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="health-btn-secondary">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
          <Button onClick={() => router.push('/client/appointments/book')} className="health-btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Book Appointment
          </Button>
                </div>
              </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="health-card border-0 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                      {stat.value}
                    </p>
                    <p className={`text-xs font-medium mt-1 ${stat.trendColor}`}>
                      {stat.trend}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor} relative transition-transform duration-200 hover:scale-110`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    {stat.alert && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                </div>
              </div>
            </CardContent>
          </Card>
          ))}
                  </div>

        {/* Quick Actions - Standardized styling */}
        <Card className="health-card border-0 shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Zap className="w-5 h-5 text-primary" />
              Quick Actions
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Access your most important features in one click.</p>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  type="button"
                  title={action.description}
                  onClick={() => router.push(action.href)}
                  className={
                    `group flex flex-col items-center justify-center p-4 rounded-xl shadow-sm border border-transparent bg-white hover:bg-blue-50/80 hover:border-blue-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 active:scale-95 ` +
                    (action.primary ? 'ring-2 ring-primary/10' : '')
                  }
                  tabIndex={0}
                >
                  <span className={`flex items-center justify-center w-12 h-12 rounded-full mb-3 transition-transform duration-200 group-hover:scale-110 ${action.bgColor}`}>
                    <action.icon className={`w-6 h-6 ${action.color} group-hover:animate-bounce`} />
                  </span>
                  <span className="font-semibold text-sm text-foreground mb-1 text-center">
                    {action.title}
                  </span>
                  <span className="text-xs text-muted-foreground text-center leading-tight">
                    {action.description}
                  </span>
                </button>
              ))}
              </div>
            </CardContent>
          </Card>

        {/* Recent Appointments and Recent Activity - Side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Appointments */}
          <Card className="health-card border-0 shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Calendar className="w-5 h-5 text-primary" />
                  Recent Appointments
                </CardTitle>
                <Button 
                variant="outline" 
                size="sm"
                  onClick={() => router.push('/client/appointments')}
                className="health-btn-secondary"
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {recentAppointments.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 cursor-pointer group"
                    onClick={() => router.push(`/client/appointments/${appointment.id}`)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                        {getStatusIcon(appointment.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{appointment.doctor}</p>
                          <Badge variant="secondary" className="text-xs">
                            {appointment.specialty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{appointment.type}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                          {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {appointment.location}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge variant={getStatusVariant(appointment.status)} className="status-badge">
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="health-card border-0 shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Activity className="w-5 h-5 text-primary" />
                Recent Activity
                </CardTitle>
                <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/client/activity')}
                className="health-btn-secondary"
              >
                View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                      <activity.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground">{activity.title}</p>
                        <Badge variant="secondary" className="text-xs">
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Health Metrics */}
        <Card className="health-card border-0 shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Activity className="w-5 h-5 text-primary" />
              Health Metrics
            </CardTitle>
              <Button 
                variant="outline" 
              size="sm"
              onClick={() => router.push('/client/health')}
              className="health-btn-secondary"
              >
              View Details
              <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {healthMetrics.map((metric) => (
                <div key={metric.name} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 group">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-full transition-transform duration-200 group-hover:scale-110 ${getStatusColor(metric.status).split(' ')[1]}`}>
                      <metric.icon className={`w-5 h-5 ${getStatusColor(metric.status).split(' ')[0]}`} />
                    </div>
                    {getTrendIcon(metric.trend)}
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">{metric.name}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {metric.value}
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      {metric.unit}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">{metric.lastUpdated}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 