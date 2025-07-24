"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, CheckCircle, Clock, Mail, Shield } from "lucide-react";
import Link from "next/link";

export default function StaffRegisterConfirmation() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Request Submitted</h1>
          <p className="text-muted-foreground">
            Your staff access request has been received
          </p>
        </div>

        {/* Confirmation Card */}
        <Card className="health-card border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Request Received</CardTitle>
            <p className="text-muted-foreground">
              We&apos;ve received your staff access request and will review it shortly
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Request Details */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-foreground">Request Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">Dr. Jane Smith</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">jane.smith@healthcare.org</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Department:</span>
                  <span className="font-medium">Emergency Medicine</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Position:</span>
                  <span className="font-medium">Physician</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Request ID:</span>
                  <Badge variant="secondary">REQ-2024-001</Badge>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">What happens next?</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Administration Review</p>
                    <p className="text-xs text-muted-foreground">
                      Your request will be reviewed by the IT department and administration
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Email Notification</p>
                    <p className="text-xs text-muted-foreground">
                      You&apos;ll receive an email within 24-48 hours with the decision
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Account Setup</p>
                    <p className="text-xs text-muted-foreground">
                      If approved, your account will be created and credentials sent
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">4</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Training Required</p>
                    <p className="text-xs text-muted-foreground">
                      Complete required security and HIPAA training before access
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-blue-50 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-foreground flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Need Help?
              </h3>
              <p className="text-sm text-muted-foreground">
                If you have questions about your request or need immediate assistance:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IT Support:</span>
                  <span className="font-medium">support@healthcare.org</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">(555) 123-4567</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hours:</span>
                  <span className="font-medium">Mon-Fri 8AM-6PM</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full health-btn-primary">
                <Mail className="w-4 h-4 mr-2" />
                Check Email Status
              </Button>
              <Button variant="outline" className="w-full health-btn-secondary" asChild>
                <Link href="/staff/login">
                  Back to Login
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-accent" />
              Secure Process
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-accent" />
              24-48 Hour Response
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-accent" />
              HIPAA Compliant
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 