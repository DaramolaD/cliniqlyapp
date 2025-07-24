"use client";

import { useAuth, useRole } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ('client' | 'staff' | 'admin')[]
  redirectTo?: string
}

export function ProtectedRoute({ 
  children, 
  allowedRoles = ['client', 'staff', 'admin'],
  redirectTo = '/login'
}: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth()
  const { role } = useRole()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      // If no user is logged in, redirect to login
      if (!user) {
        router.push(redirectTo)
        return
      }

      // If user has no profile, redirect to profile setup
      if (!profile) {
        router.push('/profile-setup')
        return
      }

      // If user's role is not allowed, redirect to appropriate dashboard
      if (!allowedRoles.includes(role as 'client' | 'staff' | 'admin')) {
        switch (role) {
          case 'client':
            router.push('/client')
            break
          case 'staff':
            router.push('/staff/dashboard')
            break
          case 'admin':
            router.push('/admin/dashboard')
            break
          default:
            router.push('/login')
        }
        return
      }
    }
  }, [user, profile, loading, allowedRoles, role, router, redirectTo])

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // If user is not authenticated or doesn't have the right role, don't render children
  if (!user || !profile || !allowedRoles.includes(role as 'client' | 'staff' | 'admin')) {
    return null
  }

  return <>{children}</>
}

// Specific route protectors for each role
export function ClientRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['client']} redirectTo="/client/login">
      {children}
    </ProtectedRoute>
  )
}

export function StaffRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['staff', 'admin']} redirectTo="/staff/login">
      {children}
    </ProtectedRoute>
  )
}

export function AdminRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['admin']} redirectTo="/admin/login">
      {children}
    </ProtectedRoute>
  )
}

// Hook to check if user can access a specific feature
export function useCanAccess(feature: string) {
  const { profile } = useAuth()
  
  const permissions = {
    'view-patients': profile?.role === 'staff' || profile?.role === 'admin',
    'manage-patients': profile?.role === 'staff' || profile?.role === 'admin',
    'manage-staff': profile?.role === 'admin',
    'manage-appointments': profile?.role === 'staff' || profile?.role === 'admin',
    'view-health-results': true, // All users can view their own
    'manage-health-results': profile?.role === 'staff' || profile?.role === 'admin',
    'manage-system': profile?.role === 'admin',
    'view-reports': profile?.role === 'staff' || profile?.role === 'admin',
    'manage-billing': profile?.role === 'staff' || profile?.role === 'admin',
    'view-documents': true, // All users can view their own
    'manage-documents': profile?.role === 'staff' || profile?.role === 'admin'
  }

  return permissions[feature as keyof typeof permissions] || false
} 