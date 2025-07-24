"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Home, 
  ArrowLeft, 
  Search, 
  User, 
  Settings, 
  Calendar,
  FileText,
  HelpCircle,
  AlertTriangle,
  Heart,
  Building
} from "lucide-react";

interface UserContext {
  type: 'public' | 'client' | 'admin';
  name?: string;
  email?: string;
}

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();
  const [userContext, setUserContext] = useState<UserContext>({ type: 'public' });

  useEffect(() => {
    // Detect user context based on pathname
    if (pathname?.startsWith('/admin')) {
      setUserContext({ type: 'admin' });
    } else if (pathname?.startsWith('/client')) {
      setUserContext({ type: 'client' });
    } else {
      setUserContext({ type: 'public' });
    }
  }, [pathname]);

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    if (userContext.type === 'admin') {
      router.push('/admin');
    } else if (userContext.type === 'client') {
      router.push('/client');
    } else {
      router.push('/');
    }
  };

  const getNavigationOptions = () => {
    switch (userContext.type) {
      case 'admin':
        return [
          { title: 'Dashboard', href: '/admin', icon: Building },
          { title: 'Appointments', href: '/admin/appointments', icon: Calendar },
          { title: 'Patients', href: '/admin/patients', icon: User },
          { title: 'Staff', href: '/admin/staff', icon: User },
          { title: 'Reports', href: '/admin/reports', icon: FileText },
          { title: 'Settings', href: '/admin/settings', icon: Settings },
        ];
      case 'client':
        return [
          { title: 'Dashboard', href: '/client', icon: Heart },
          { title: 'Appointments', href: '/client/appointments', icon: Calendar },
          { title: 'My Health', href: '/client/health', icon: User },
          { title: 'Billing', href: '/client/billing', icon: FileText },
          { title: 'Messages', href: '/client/messages', icon: FileText },
          { title: 'Settings', href: '/client/settings', icon: Settings },
        ];
      default:
        return [
          { title: 'Home', href: '/', icon: Home },
          { title: 'About', href: '/about', icon: User },
          { title: 'Features', href: '/features', icon: FileText },
          { title: 'Pricing', href: '/pricing', icon: FileText },
          { title: 'Contact', href: '/contact', icon: FileText },
        ];
    }
  };

  const getPageTitle = () => {
    switch (userContext.type) {
      case 'admin':
        return 'Admin Dashboard';
      case 'client':
        return 'Patient Portal';
      default:
        return 'CliniQly';
    }
  };

  const getPageDescription = () => {
    switch (userContext.type) {
      case 'admin':
        return 'Healthcare Management System';
      case 'client':
        return 'Your Health, Your Control';
      default:
        return 'Modern Healthcare Solutions';
    }
  };

  const navigationOptions = getNavigationOptions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mr-4">
              <span className="text-primary-foreground font-bold text-2xl">C</span>
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-foreground">{getPageTitle()}</h1>
              <p className="text-muted-foreground">{getPageDescription()}</p>
            </div>
          </div>
        </div>

        {/* 404 Content */}
        <Card className="health-card border-0 shadow-lg mb-8">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-2">404</h2>
              <h3 className="text-xl font-semibold text-foreground mb-2">Page Not Found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                The page you&apos;re looking for doesn&apos;t exist or has been moved. 
                Let&apos;s get you back on track.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button onClick={handleGoBack} variant="outline" className="health-btn-secondary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              <Button onClick={handleGoHome} className="health-btn-primary">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </div>

            {/* Search Suggestion */}
            <div className="bg-muted/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-muted-foreground mb-2">
                Can&apos;t find what you&apos;re looking for?
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search for pages..."
                  className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button size="sm" className="health-btn-primary">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {navigationOptions.map((option) => (
            <Link key={option.href} href={option.href}>
              <Card className="health-card border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <option.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{option.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Navigate to {option.title.toLowerCase()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Help Section */}
        <Card className="health-card border-0 shadow-sm mt-8">
          <CardContent className="p-6">
            <div className="text-center">
              <HelpCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Need Help?</h3>
              <p className="text-muted-foreground mb-4">
                If you&apos;re having trouble finding what you need, our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" className="health-btn-secondary">
                  <FileText className="w-4 h-4 mr-2" />
                  Documentation
                </Button>
                <Button variant="outline" className="health-btn-secondary">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
                {userContext.type === 'public' && (
                  <Link href="/contact">
                    <Button variant="outline" className="health-btn-secondary">
                      <User className="w-4 h-4 mr-2" />
                      Contact Us
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            © 2024 CliniQly. All rights reserved. | 
            <Link href="/privacy" className="hover:text-foreground ml-1">Privacy Policy</Link> | 
            <Link href="/terms" className="hover:text-foreground ml-1">Terms of Service</Link>
          </p>
        </div>
      </div>
    </div>
  );
} 