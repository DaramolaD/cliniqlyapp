"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Home, 
  ArrowLeft, 
  RefreshCw, 
  AlertTriangle,
  Heart,
  Building,
  HelpCircle,
  FileText
} from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

interface UserContext {
  type: 'public' | 'client' | 'admin';
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
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

    // Log error for debugging
    console.error('Application error:', error);
  }, [pathname, error]);

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

  const handleRetry = () => {
    reset();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
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

        {/* Error Content */}
        <Card className="health-card border-0 shadow-lg mb-8">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Something went wrong!</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-4">
                We encountered an unexpected error. Don&apos;t worry, our team has been notified and is working to fix it.
              </p>
              
              {/* Error Details (only in development) */}
              {process.env.NODE_ENV === 'development' && (
                <div className="bg-muted/30 rounded-lg p-4 mb-4 text-left">
                  <p className="text-sm font-medium text-foreground mb-2">Error Details:</p>
                  <p className="text-sm text-muted-foreground font-mono break-all">
                    {error.message}
                  </p>
                  {error.digest && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Error ID: {error.digest}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button onClick={handleRetry} className="health-btn-primary">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button onClick={handleGoBack} variant="outline" className="health-btn-secondary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              <Button onClick={handleGoHome} variant="outline" className="health-btn-secondary">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="health-card border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="text-center">
              <HelpCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Need Immediate Help?</h3>
              <p className="text-muted-foreground mb-4">
                If this error persists, please contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" className="health-btn-secondary">
                  <FileText className="w-4 h-4 mr-2" />
                  Report Issue
                </Button>
                <Button variant="outline" className="health-btn-secondary">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
                {userContext.type === 'public' && (
                  <Link href="/contact">
                    <Button variant="outline" className="health-btn-secondary">
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