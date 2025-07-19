"use client";

import Link from "next/link";
import { useState } from "react";
// import { useAuth } from "@/lib/auth-context";
// import { ProtectedRoute } from "@/components/auth/protected-route";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Stethoscope,
  Settings, 
  X, 
  Menu,
  User,
  LogOut,
  Bell,
  Building
} from "lucide-react";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const { user, logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/staff/dashboard', icon: LayoutDashboard },
    { name: 'Patients', href: '/staff/patients', icon: Users },
    { name: 'Appointments', href: '/staff/appointments', icon: Calendar },
    { name: 'Medical Records', href: '/staff/records', icon: FileText },
    { name: 'Clinical Notes', href: '/staff/notes', icon: Stethoscope },
    { name: 'Settings', href: '/staff/settings', icon: Settings },
  ];

  const handleLogout = () => {
    // logout();
  };

  return (
    // <ProtectedRoute userType="staff">
      <div className="min-h-screen bg-gray-100">
        {/* Mobile sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center space-x-2">
                  <Building className="w-8 h-8 text-primary" />
                  <span className="text-xl font-bold text-foreground">Staff Portal</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <nav className="p-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Desktop sidebar */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          <div className="flex flex-col flex-grow bg-white shadow-lg">
            <div className="flex items-center space-x-2 p-4 border-b border-border">
              <Building className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Staff Portal</span>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-border">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="w-8 h-8">
                  {/* <AvatarImage src={user?.avatar || "/avatars/staff.jpg"} /> */}
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  {/* <p className="text-sm font-medium text-foreground">{user?.name || 'Staff Member'}</p> */}
                  {/* <p className="text-xs text-muted-foreground">{user?.organization?.role || 'Staff'}</p> */}
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full health-btn-secondary" 
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64">
          {/* Top navigation */}
          <header className="bg-white shadow-sm border-b border-border">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden"
                >
                  <Menu className="w-5 h-5" />
                </Button>
                <div className="hidden md:block">
                  <h1 className="text-lg font-semibold text-foreground">
                    Healthcare Staff Portal
                  </h1>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    3
                  </span>
                </Button>
                <Avatar className="w-8 h-8">
                  {/* <AvatarImage src={user?.avatar || "/avatars/staff.jpg"} /> */}
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="bg-gray-100 min-h-screen">
            {children}
          </main>
        </div>
      </div>
    // </ProtectedRoute>
  );
} 