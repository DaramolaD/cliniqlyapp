"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Calendar, 
  User, 
  FileText, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  MessageSquare,
  CreditCard,
  HelpCircle,
  Users,
  Activity,
  Shield,
  ClipboardList,
  BarChart3,
  Database
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: Omit<SidebarItem, 'children'>[];
}

interface SidebarProps {
  variant?: 'default' | 'collapsed' | 'floating';
  className?: string;
  items?: SidebarItem[];
  onLogout?: () => void;
  user?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
}

const defaultItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Appointments",
    href: "/appointments",
    icon: Calendar,
    children: [
      { title: "My Appointments", href: "/appointments", icon: Calendar },
      { title: "Book Appointment", href: "/appointments/book", icon: Calendar },
      { title: "Appointment History", href: "/appointments/history", icon: FileText },
    ]
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
    children: [
      { title: "Personal Info", href: "/profile", icon: User },
      { title: "Medical History", href: "/profile/medical-history", icon: FileText },
      { title: "Documents", href: "/profile/documents", icon: FileText },
    ]
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
    badge: "3",
  },
  {
    title: "Billing",
    href: "/billing",
    icon: CreditCard,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
    badge: "5",
  },
  {
    title: "Help & Support",
    href: "/help",
    icon: HelpCircle,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar({ 
  variant = 'default', 
  className, 
  items = defaultItems,
  onLogout
}: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  const renderItem = (item: SidebarItem, level = 0) => {
    const isItemActive = isActive(item.href);
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.title);

    const buttonContent = (
      <Button
        variant="ghost"
        className={cn(
          "w-full h-10 px-3 transition-all duration-200 group relative",
          isCollapsed ? "justify-center" : "justify-start",
          level > 0 && !isCollapsed && "ml-4",
          isItemActive 
            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm" 
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
          "focus:bg-muted/50 focus:text-foreground focus:ring-2 focus:ring-primary/20"
        )}
        onClick={hasChildren ? (e) => {
          e.preventDefault();
          toggleItem(item.title);
        } : undefined}
      >
        <item.icon className={cn(
          "w-4 h-4 transition-all duration-200",
          isCollapsed ? "mx-auto" : "mr-2",
          isItemActive 
            ? "text-primary-foreground" 
            : "text-muted-foreground group-hover:text-foreground"
        )} />
        {!isCollapsed && (
          <>
            <span className={cn(
              "flex-1 text-left transition-all duration-200 font-medium",
              isItemActive 
                ? "text-primary-foreground" 
                : "text-muted-foreground group-hover:text-foreground"
            )}>
              {item.title}
            </span>
            {item.badge && (
              <span className={cn(
                "ml-auto text-xs px-2 py-1 rounded-full transition-all duration-200 font-medium",
                isItemActive 
                  ? "bg-primary-foreground/20 text-primary-foreground" 
                  : "bg-primary text-primary-foreground"
              )}>
                {item.badge}
              </span>
            )}
            {hasChildren && (
              <ChevronRight 
                className={cn(
                  "w-4 h-4 ml-auto transition-transform duration-200",
                  isItemActive 
                    ? "text-primary-foreground" 
                    : "text-muted-foreground group-hover:text-foreground",
                  isExpanded && "rotate-90"
                )} 
              />
            )}
          </>
        )}
      </Button>
    );

    return (
      <div key={item.title}>
        <Link href={hasChildren ? '#' : item.href} className="block">
          {isCollapsed ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {buttonContent}
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <div className="space-y-1">
                    <p className="font-medium">{item.title}</p>
                    {item.badge && (
                      <p className="text-xs text-muted-foreground">Badge: {item.badge}</p>
                    )}
                    {hasChildren && (
                      <p className="text-xs text-muted-foreground">Click to expand</p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            buttonContent
          )}
        </Link>
        
        {hasChildren && isExpanded && !isCollapsed && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn(
      "flex flex-col bg-background border-r border-border transition-all duration-300",
      isCollapsed ? "w-16" : "w-64",
      variant === 'floating' && "fixed left-0 top-0 h-full z-50 shadow-lg",
      className
    )}>
      {/* Header */}
      <div className={cn(
        "flex border-b border-border",
        isCollapsed 
          ? "flex-col items-center justify-between p-4 px-2 py-4" 
          : "flex-row items-center justify-between p-4"
      )}>
        {/* Logo Section */}
        <div className={cn(
          "flex items-center",
          isCollapsed ? "flex-col space-y-2" : "flex-row space-x-2"
        )}>
          <div className={cn(
            "bg-primary rounded-lg flex items-center justify-center transition-all duration-200",
            isCollapsed ? "w-10 h-10" : "w-8 h-8"
          )}>
            <span className={cn(
              "text-primary-foreground font-bold transition-all duration-200",
              isCollapsed ? "text-lg" : "text-sm"
            )}>
              {isCollapsed ? "CQ" : "C"}
            </span>
          </div>
          {!isCollapsed && (
            <span className="font-semibold text-lg">CliniQly</span>
          )}
        </div>

        {/* Collapse/Expand Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={cn(
                  "transition-all duration-200 hover:bg-muted",
                  isCollapsed ? "mt-4 w-8 h-8 p-0" : ""
                )}
              >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{isCollapsed ? "Expand sidebar" : "Collapse sidebar"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Navigation Items */}
      <nav className={cn(
        "flex-1 space-y-1 overflow-y-auto",
        isCollapsed ? "p-2" : "p-4"
      )}>
        {items.map(item => renderItem(item))}
      </nav>

      {/* Footer */}
      <div className={cn(
        "border-t border-border",
        isCollapsed ? "p-2" : "p-4"
      )}>
        {onLogout && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full transition-all duration-200 text-destructive hover:text-destructive hover:bg-destructive/10",
                    isCollapsed ? "justify-center px-2 h-10" : "justify-start"
                  )}
                  onClick={onLogout}
                >
                  <LogOut className={cn(
                    "w-4 h-4 transition-all duration-200",
                    isCollapsed ? "mx-auto" : "mr-3"
                  )} />
                  {!isCollapsed && "Logout"}
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  <p>Logout</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}

// Client-specific sidebar items
export const clientSidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/client",
    icon: LayoutDashboard,
  },
  {
    title: "Appointments",
    href: "/client/appointments",
    icon: Calendar,
    children: [
      { title: "My Appointments", href: "/client/appointments", icon: Calendar },
      { title: "Book Appointment", href: "/client/appointments/book", icon: Calendar },
      { title: "Appointment History", href: "/client/appointments/history", icon: FileText },
    ]
  },
  {
    title: "My Health",
    href: "/client/health",
    icon: User,
    children: [
      { title: "Health Dashboard", href: "/client/health", icon: User },
      { title: "Health Results", href: "/client/health/results", icon: FileText },
      { title: "Profile", href: "/client/profile", icon: User },
      { title: "Medical History", href: "/client/medical-history", icon: FileText },
      { title: "Documents", href: "/client/documents", icon: FileText },
      { title: "Prescriptions", href: "/client/prescriptions", icon: FileText },
    ]
  },
  {
    title: "Messages",
    href: "/client/messages",
    icon: MessageSquare,
    badge: "3",
  },
  {
    title: "Billing",
    href: "/client/billing",
    icon: CreditCard,
  },
  {
    title: "Notifications",
    href: "/client/notifications",
    icon: Bell,
    badge: "5",
  },
  {
    title: "Help & Support",
    href: "/client/help",
    icon: HelpCircle,
  },
  {
    title: "Settings",
    href: "/client/settings",
    icon: Settings,
  },
];

// Staff-specific sidebar items
export const staffSidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/staff/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Appointments",
    href: "/staff/appointments",
    icon: Calendar,
    children: [
      { title: "All Appointments", href: "/staff/appointments", icon: Calendar },
      { title: "New Appointment", href: "/staff/appointments/new", icon: Calendar },
      { title: "Calendar View", href: "/staff/appointments/calendar", icon: Calendar },
    ]
  },
  {
    title: "Patients",
    href: "/staff/patients",
    icon: User,
    children: [
      { title: "All Patients", href: "/staff/patients", icon: User },
      { title: "Patient Records", href: "/staff/records", icon: FileText },
      { title: "Medical History", href: "/staff/patients/medical-history", icon: FileText },
    ]
  },
  {
    title: "Clinical Notes",
    href: "/staff/notes",
    icon: ClipboardList,
    children: [
      { title: "My Notes", href: "/staff/notes", icon: ClipboardList },
      { title: "Create Note", href: "/staff/notes/new", icon: ClipboardList },
      { title: "Note Templates", href: "/staff/notes/templates", icon: FileText },
    ]
  },
  {
    title: "Messages",
    href: "/staff/messages",
    icon: MessageSquare,
    badge: "2",
  },
  {
    title: "Notifications",
    href: "/staff/notifications",
    icon: Bell,
    badge: "4",
  },
  {
    title: "Settings",
    href: "/staff/settings",
    icon: Settings,
  },
];

// Admin-specific sidebar items
export const adminSidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Appointments",
    href: "/admin/appointments",
    icon: Calendar,
    children: [
      { title: "All Appointments", href: "/admin/appointments", icon: Calendar },
      { title: "New Appointment", href: "/admin/appointments/new", icon: Calendar },
      { title: "Calendar View", href: "/admin/appointments/calendar", icon: Calendar },
    ]
  },
  {
    title: "Patients",
    href: "/admin/patients",
    icon: User,
    children: [
      { title: "All Patients", href: "/admin/patients", icon: User },
      { title: "Add Patient", href: "/admin/patients/new", icon: User },
      { title: "Patient Records", href: "/admin/patients/records", icon: FileText },
    ]
  },
  {
    title: "Staff Management",
    href: "/admin/staff",
    icon: Users,
    children: [
      { title: "All Staff", href: "/admin/staff", icon: Users },
      { title: "Add Staff", href: "/admin/staff/new", icon: Users },
      { title: "Staff Schedule", href: "/admin/staff/schedule", icon: Calendar },
      { title: "Staff Performance", href: "/admin/staff/performance", icon: Activity },
    ]
  },
  {
    title: "Reports & Analytics",
    href: "/admin/reports",
    icon: BarChart3,
    children: [
      { title: "Overview", href: "/admin/reports", icon: BarChart3 },
      { title: "Appointment Reports", href: "/admin/reports/appointments", icon: Calendar },
      { title: "Patient Reports", href: "/admin/reports/patients", icon: User },
      { title: "Financial Reports", href: "/admin/reports/financial", icon: CreditCard },
      { title: "Staff Reports", href: "/admin/reports/staff", icon: Users },
    ]
  },
  {
    title: "System Management",
    href: "/admin/settings",
    icon: Settings,
    children: [
      { title: "General Settings", href: "/admin/settings", icon: Settings },
      { title: "User Management", href: "/admin/settings/users", icon: Users },
      { title: "Security Settings", href: "/admin/settings/security", icon: Shield },
      { title: "Database Management", href: "/admin/settings/database", icon: Database },
      { title: "System Health", href: "/admin/settings/health", icon: Activity },
    ]
  },
];

// Helper function to get sidebar items based on user role
export function getSidebarItemsByRole(role: string): SidebarItem[] {
  switch (role.toLowerCase()) {
    case 'admin':
      return adminSidebarItems;
    case 'staff':
    case 'doctor':
    case 'nurse':
      return staffSidebarItems;
    case 'client':
    case 'patient':
      return clientSidebarItems;
    default:
      return defaultItems;
  }
} 