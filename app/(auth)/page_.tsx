"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Stethoscope, Shield } from "lucide-react";
import Link from "next/link";

export default function AuthLandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Cliniqly</h1>
          <p className="text-xl text-gray-600">Choose your login type to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Patient Login */}
          <Card className="hover:shadow-lg transition-shadow duration-300 border-0">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">Patient</CardTitle>
              <p className="text-gray-600 text-sm">
                Access your health records, appointments, and medical information
              </p>
            </CardHeader>
            <CardContent>
              <Link href="/client/login" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Patient Login
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Staff Login */}
          <Card className="hover:shadow-lg transition-shadow duration-300 border-0">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">Healthcare Staff</CardTitle>
              <p className="text-gray-600 text-sm">
                Manage patient records, appointments, and healthcare operations
              </p>
            </CardHeader>
            <CardContent>
              <Link href="/staff/login" className="block">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Staff Login
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Admin Login */}
          <Card className="hover:shadow-lg transition-shadow duration-300 border-0">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">Administrator</CardTitle>
              <p className="text-gray-600 text-sm">
                Manage system settings, user accounts, and administrative functions
              </p>
            </CardHeader>
            <CardContent>
              <Link href="/admin/login" className="block">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Admin Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Demo Credentials:</p>
          <div className="mt-2 space-y-1">
            <p><strong>Patient:</strong> client@example.com / password</p>
            <p><strong>Staff:</strong> staff@example.com / password</p>
            <p><strong>Admin:</strong> admin@example.com / password</p>
          </div>
        </div>
      </div>
    </div>
  );
} 