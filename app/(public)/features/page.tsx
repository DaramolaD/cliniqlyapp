import { PublicNavigation } from "@/components/customs/public-navigation";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, FileText, Shield, BarChart3, Zap } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 py-20 px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Features</h1>
        <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto">
          Everything you need to run a modern, efficient healthcare practice.
        </p>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Patient Records */}
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg mb-2">Patient Records</CardTitle>
                <p className="text-gray-600 mb-4">
                  Comprehensive patient management with secure, HIPAA-compliant record keeping.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Digital patient profiles</li>
                  <li>• Medical history tracking</li>
                  <li>• Document storage</li>
                  <li>• Insurance information</li>
                </ul>
              </CardContent>
            </Card>

            {/* Communication */}
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg mb-2">Appointment Scheduling</CardTitle>
                <p className="text-gray-600 mb-4">
                  Streamlined appointment booking with automated reminders and calendar integration.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Online booking portal</li>
                  <li>• Automated reminders</li>
                  <li>• Calendar sync</li>
                  <li>• Waitlist management</li>
                </ul>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg mb-2">Analytics & Reporting</CardTitle>
                <p className="text-gray-600 mb-4">
                  Powerful insights into your practice performance and patient outcomes.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Practice metrics</li>
                  <li>• Revenue tracking</li>
                  <li>• Patient analytics</li>
                  <li>• Custom reports</li>
                </ul>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-lg mb-2">Security & Compliance</CardTitle>
                <p className="text-gray-600 mb-4">
                  Enterprise-grade security with full HIPAA compliance and data protection.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• HIPAA compliant</li>
                  <li>• End-to-end encryption</li>
                  <li>• Regular audits</li>
                  <li>• Data backup</li>
                </ul>
              </CardContent>
            </Card>

            {/* Billing */}
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="text-lg mb-2">Billing & Insurance</CardTitle>
                <p className="text-gray-600 mb-4">
                  Automated billing and insurance processing to streamline your revenue cycle.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Automated claims</li>
                  <li>• Payment processing</li>
                  <li>• Insurance verification</li>
                  <li>• Financial reporting</li>
                </ul>
              </CardContent>
            </Card>

            {/* AI Features */}
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle className="text-lg mb-2">AI-Powered Features</CardTitle>
                <p className="text-gray-600 mb-4">
                  Intelligent automation and insights to enhance your practice efficiency.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Smart scheduling</li>
                  <li>• Predictive analytics</li>
                  <li>• Automated workflows</li>
                  <li>• Voice transcription</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your practice?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of healthcare providers who trust Cliniqly to manage their practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/client/register">Start Free Trial</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/contact">Schedule Demo</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 