import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Calendar, 
  Clock, 
  DollarSign, 
  Plus, 
  BarChart3, 
  Settings,
  TrendingUp,
  Activity,
  UserCheck
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening with your clinic today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="health-card border-0 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground truncate">Total Patients</dt>
                  <dd className="text-2xl font-bold text-foreground">1,234</dd>
                </dl>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-accent">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="health-card border-0 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground truncate">Today&apos;s Appointments</dt>
                  <dd className="text-2xl font-bold text-foreground">28</dd>
                </dl>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-accent">
              <Activity className="w-4 h-4 mr-1" />
              85% completion rate
            </div>
          </CardContent>
        </Card>

        <Card className="health-card border-0 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground truncate">Pending Appointments</dt>
                  <dd className="text-2xl font-bold text-foreground">12</dd>
                </dl>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <UserCheck className="w-4 h-4 mr-1" />
              Awaiting confirmation
            </div>
          </CardContent>
        </Card>

        <Card className="health-card border-0 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground truncate">Monthly Revenue</dt>
                  <dd className="text-2xl font-bold text-foreground">$45,678</dd>
                </dl>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-accent">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="health-card border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              Recent Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'John Doe', time: '9:00 AM', type: 'Check-up', status: 'Confirmed' },
                { name: 'Jane Smith', time: '10:30 AM', type: 'Follow-up', status: 'Confirmed' },
                { name: 'Mike Johnson', time: '2:00 PM', type: 'Consultation', status: 'Pending' },
                { name: 'Sarah Wilson', time: '3:30 PM', type: 'Procedure', status: 'Confirmed' },
              ].map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                  <div>
                    <p className="font-semibold text-foreground">{appointment.name}</p>
                    <p className="text-sm text-muted-foreground">{appointment.time} • {appointment.type}</p>
                  </div>
                  <Badge variant={appointment.status === 'Confirmed' ? 'default' : 'secondary'} className="status-badge">
                    {appointment.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="health-card border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto p-4 justify-start health-btn-secondary" asChild>
                <a href="/admin/patients/new">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mr-3">
                    <Plus className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">Add Patient</p>
                    <p className="text-sm text-muted-foreground">Register new patient</p>
                  </div>
                </a>
              </Button>

              <Button variant="outline" className="h-auto p-4 justify-start health-btn-secondary" asChild>
                <a href="/admin/appointments/new">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mr-3">
                    <Calendar className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">Schedule Appointment</p>
                    <p className="text-sm text-muted-foreground">Book new appointment</p>
                  </div>
                </a>
              </Button>

              <Button variant="outline" className="h-auto p-4 justify-start health-btn-secondary" asChild>
                <a href="/admin/reports">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mr-3">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">View Reports</p>
                    <p className="text-sm text-muted-foreground">Analytics & insights</p>
                  </div>
                </a>
              </Button>

              <Button variant="outline" className="h-auto p-4 justify-start health-btn-secondary" asChild>
                <a href="/admin/settings">
                  <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center mr-3">
                    <Settings className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">Settings</p>
                    <p className="text-sm text-muted-foreground">Configure clinic</p>
                  </div>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 