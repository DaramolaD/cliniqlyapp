"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Calendar, 
  FileText, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Trash2,
  Archive,
  Settings
} from "lucide-react";
import { format } from "date-fns";

interface Notification {
  id: string;
  type: "appointment" | "test_result" | "billing" | "reminder" | "alert" | "info";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    url: string;
  };
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "appointment",
      title: "Appointment Confirmed",
      message: "Your appointment with Dr. Sarah Johnson has been confirmed for tomorrow at 2:00 PM.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      action: {
        label: "View Details",
        url: "/client/appointments/1"
      }
    },
    {
      id: "2",
      type: "test_result",
      title: "Lab Results Available",
      message: "Your blood test results from last week are now available for review.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      action: {
        label: "View Results",
        url: "/client/health/results"
      }
    },
    {
      id: "3",
      type: "billing",
      title: "Payment Due",
      message: "Your insurance claim has been processed. You have a balance of $25.00.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      action: {
        label: "Pay Now",
        url: "/client/billing"
      }
    },
    {
      id: "4",
      type: "reminder",
      title: "Medication Reminder",
      message: "Don't forget to take your prescribed medication at 8:00 AM today.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true
    },
    {
      id: "5",
      type: "alert",
      title: "Allergy Alert",
      message: "Your allergy test results indicate a new sensitivity. Please review with your doctor.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      read: false,
      action: {
        label: "Schedule Consultation",
        url: "/client/appointments/book"
      }
    },
    {
      id: "6",
      type: "info",
      title: "System Maintenance",
      message: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM. Some features may be temporarily unavailable.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
      read: true
    }
  ]);

  const [activeTab, setActiveTab] = useState("all");

  const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Patient"
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "appointment":
        return <Calendar className="w-5 h-5 text-blue-600" />;
      case "test_result":
        return <FileText className="w-5 h-5 text-green-600" />;
      case "billing":
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case "reminder":
        return <Clock className="w-5 h-5 text-purple-600" />;
      case "alert":
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "info":
        return <CheckCircle className="w-5 h-5 text-gray-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getNotificationBadge = (type: Notification["type"]) => {
    switch (type) {
      case "appointment":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Appointment</Badge>;
      case "test_result":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Test Result</Badge>;
      case "billing":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Billing</Badge>;
      case "reminder":
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800">Reminder</Badge>;
      case "alert":
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Alert</Badge>;
      case "info":
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Info</Badge>;
      default:
        return null;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const archiveNotification = (id: string) => {
    // In a real app, this would move to archived notifications
    deleteNotification(id);
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    return notification.type === activeTab;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DashboardLayout variant="client" user={mockUser}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
            <p className="mt-2 text-muted-foreground">
              Stay updated with your healthcare information.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={markAllAsRead}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Mark All Read
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Notification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="health-card border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{notifications.length}</p>
                </div>
                <Bell className="w-8 h-8 text-muted-foreground" />
                  </div>
            </CardContent>
          </Card>
          
          <Card className="health-card border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unread</p>
                  <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bell className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="health-card border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today</p>
                  <p className="text-2xl font-bold text-green-600">
                    {notifications.filter(n => 
                      n.timestamp.toDateString() === new Date().toDateString()
                    ).length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="health-card border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {notifications.filter(n => {
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return n.timestamp > weekAgo;
                    }).length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <Card className="health-card border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>All Notifications</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {filteredNotifications.length} notifications
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="appointment">Appointments</TabsTrigger>
                <TabsTrigger value="test_result">Results</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="alert">Alerts</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <div className="space-y-4">
                  {filteredNotifications.length === 0 ? (
                    <div className="text-center py-8">
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-muted-foreground">
                        No notifications
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        You're all caught up!
                      </p>
              </div>
            ) : (
                    filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                        className={`p-4 rounded-lg border transition-colors ${
                          notification.read 
                            ? "bg-background border-border" 
                            : "bg-blue-50 border-blue-200"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type)}
                      </div>
                          
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className={`font-medium ${
                                    notification.read ? "text-foreground" : "text-foreground"
                                  }`}>
                                    {notification.title}
                                  </h4>
                                  {getNotificationBadge(notification.type)}
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                  )}
                            </div>
                                <p className="text-sm text-muted-foreground mb-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                  {format(notification.timestamp, "MMM d, yyyy 'at' h:mm a")}
                            </p>
                          </div>
                              
                              <div className="flex items-center gap-1">
                                {notification.action && (
                              <Button
                                variant="ghost"
                                size="sm"
                                    onClick={() => markAsRead(notification.id)}
                                    className="text-xs"
                              >
                                    {notification.action.label}
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                                  onClick={() => archiveNotification(notification.id)}
                                  className="text-xs text-muted-foreground hover:text-foreground"
                                >
                                  <Archive className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteNotification(notification.id)}
                                  className="text-xs text-muted-foreground hover:text-red-600"
                                >
                                  <Trash2 className="w-3 h-3" />
                            </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 