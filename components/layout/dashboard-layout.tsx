"use client";

import { useState } from "react";
import {
  Sidebar,
  getSidebarItemsByRole,
} from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Menu, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface DashboardLayoutProps {
  children: React.ReactNode;
  variant?: "admin" | "client" | "staff";
  user?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  onLogout?: () => void;
  className?: string;
}

export function DashboardLayout({
  children,
  variant = "client",
  user,
  onLogout,
  className,
}: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get sidebar items based on user role or variant
  const userRole = user?.role || variant;
  const sidebarItems = getSidebarItemsByRole(userRole);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior
      console.log("Logging out...");
      // Add your logout logic here
    }
  };

  const getDashboardTitle = () => {
    switch (variant) {
      case "admin":
        return "Admin Dashboard";
      case "staff":
        return "Staff Dashboard";
      case "client":
      default:
        return "Patient Portal";
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          items={sidebarItems}
          onLogout={handleLogout}
          className="h-full"
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full">
            <Sidebar
              items={sidebarItems}
              onLogout={handleLogout}
              variant="floating"
              className="h-full"
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-background border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="hidden md:block">
                <h1 className="text-lg font-semibold">
                  {getDashboardTitle()}
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* User Menu */}
              <div className="">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    {user?.avatar ? (
                      <Image
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <span className="text-primary font-medium">
                        {user?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    )}
                  </div>
                  <div className="hidden md:block flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className={cn("flex-1 overflow-auto", className)}>
          {children}
        </main>
      </div>
    </div>
  );
}
