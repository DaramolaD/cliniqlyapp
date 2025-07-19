"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Loading } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";

interface WithAuthProps {
  requiredRoles?: string[];
  redirectTo?: string;
  children: React.ReactNode;
}

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: {
    requiredRoles?: string[];
    redirectTo?: string;
    loadingComponent?: React.ComponentType;
  } = {}
) {
  return function AuthenticatedComponent(props: P) {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
      if (!isLoading) {
        // Check if user is authenticated
        if (!user) {
          const returnUrl = searchParams.get('returnUrl') || options.redirectTo || '/client/login';
          router.push(returnUrl);
          return;
        }

        // Check if user has required role
        if (options.requiredRoles && options.requiredRoles.length > 0) {
          const hasRequiredRole = options.requiredRoles.includes(user.role);
          if (!hasRequiredRole) {
            // Redirect to appropriate login page based on user role
            let loginUrl = '/client/login';
            if (user.role === 'staff') {
              loginUrl = '/staff/login';
            } else if (user.role === 'admin') {
              loginUrl = '/admin/login';
            }
            router.push(loginUrl);
            return;
          }
        }

        setIsChecking(false);
      }
    }, [user, isLoading, router, searchParams, options.requiredRoles, options.redirectTo]);

    // Show loading while checking authentication
    if (isLoading || isChecking) {
      const LoadingComponent = options.loadingComponent || DefaultLoadingComponent;
      return <LoadingComponent />;
    }

    // Show access denied if user doesn't have required role
    if (options.requiredRoles && user && !options.requiredRoles.includes(user.role)) {
      return <AccessDenied userRole={user.role} requiredRoles={options.requiredRoles} />;
    }

    // Render the protected component
    return <WrappedComponent {...props} />;
  };
}

// Default loading component
function DefaultLoadingComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading size="lg" variant="health" text="Checking authentication..." />
    </div>
  );
}

// Access denied component
function AccessDenied({ userRole, requiredRoles }: { userRole: string; requiredRoles: string[] }) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-4">
            You don't have permission to access this page.
          </p>
          <div className="bg-muted p-4 rounded-lg mb-6">
            <p className="text-sm text-muted-foreground">
              <strong>Your role:</strong> {userRole}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Required roles:</strong> {requiredRoles.join(', ')}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.back()}
            >
              Go Back
            </Button>
            <Button
              onClick={() => router.push('/')}
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Route protection hook
export function useRouteGuard(requiredRoles?: string[]) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        const returnUrl = searchParams.get('returnUrl') || '/client/login';
        router.push(returnUrl);
        return;
      }

      if (requiredRoles && requiredRoles.length > 0) {
        const hasRequiredRole = requiredRoles.includes(user.role);
        if (!hasRequiredRole) {
          let loginUrl = '/client/login';
          if (user.role === 'staff') {
            loginUrl = '/staff/login';
          } else if (user.role === 'admin') {
            loginUrl = '/admin/login';
          }
          router.push(loginUrl);
        }
      }
    }
  }, [user, isLoading, router, searchParams, requiredRoles]);

  return { user, isLoading, isAuthenticated: !!user };
}

// Role-based component wrapper
export function RequireRole({ 
  roles, 
  children, 
  fallback 
}: { 
  roles: string[]; 
  children: React.ReactNode; 
  fallback?: React.ReactNode;
}) {
  const { user } = useAuth();

  if (!user || !roles.includes(user.role)) {
    return fallback || null;
  }

  return <>{children}</>;
}

// Client-only component wrapper
export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
} 