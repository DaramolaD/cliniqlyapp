import { PublicNavigation } from "@/components/customs/public-navigation";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Heart, CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 py-20 px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">About Cliniqly</h1>
        <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto">
          Revolutionizing healthcare management with modern, AI-powered solutions.
          {/* We continuously innovate to bring you the latest technology that makes healthcare management easier and more efficient. */}
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-8">
            We believe that every healthcare provider deserves access to modern, efficient tools that enhance patient care. 
            Cliniqly was built to bridge the gap between traditional healthcare management and cutting-edge technology.
          </p>
          <p className="text-lg text-gray-600">
            Our platform combines the power of artificial intelligence with intuitive design to create a seamless experience 
            for both healthcare providers and their patients.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-4xl mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded by healthcare professionals and technology experts, Cliniqly was born from a simple observation: 
              too many clinics were struggling with outdated, complex systems that slowed down their work instead of helping.
            </p>
            <p className="text-gray-600 mb-4">
              We set out to create a solution that would be as intuitive as the apps we use in our daily lives, 
              but powerful enough to handle the complex needs of modern healthcare.
            </p>
            <p className="text-gray-600">
              Today, Cliniqly serves thousands of healthcare providers across the country, helping them focus on what matters most: their patients.
            </p>
          </div>
          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <CardTitle className="text-xl mb-2">Fast & Reliable</CardTitle>
                <p className="text-gray-600">Built for speed and reliability, ensuring your clinic runs smoothly.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg mb-2">Trust & Security</CardTitle>
                <p className="text-gray-600">
                  Your data security is our top priority. We use enterprise-grade encryption and follow strict healthcare compliance standards.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg mb-2">Patient-First</CardTitle>
                <p className="text-gray-600">
                  Everything we build is designed to improve patient care and enhance the patient experience.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg mb-2">Excellence</CardTitle>
                <p className="text-gray-600">
                  We strive for excellence in every aspect of our platform, from user experience to technical performance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <CardTitle className="text-lg mb-2">Dr. Sarah Johnson</CardTitle>
                <p className="text-gray-600 mb-2">CEO & Co-founder</p>
                <p className="text-sm text-gray-500">
                  Former healthcare administrator with 15+ years of experience in digital health transformation.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <CardTitle className="text-lg mb-2">Michael Chen</CardTitle>
                <p className="text-gray-600 mb-2">CTO & Co-founder</p>
                <p className="text-sm text-gray-500">
                  Software engineer with expertise in AI/ML and healthcare technology platforms.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <CardTitle className="text-lg mb-2">Dr. Emily Rodriguez</CardTitle>
                <p className="text-gray-600 mb-2">Head of Product</p>
                <p className="text-sm text-gray-500">
                  Physician and product strategist focused on user experience and clinical workflow optimization.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 px-4 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of healthcare providers who trust Cliniqly to manage their practice.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" asChild>
            <a href="/client/register">Start Free Trial</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="/contact">Contact Sales</a>
          </Button>
        </div>
      </section>
    </div>
  );
} 