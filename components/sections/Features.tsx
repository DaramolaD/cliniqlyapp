import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Bell,
  FileText,
  Users,
  BarChart3,
  MessageSquare,
  Stethoscope,
  CreditCard,
  TrendingUp,
  Pill,
  UserCheck,
  PieChart,
  Link,
  Zap,
  Shield,
  Mail,
  Clock,
} from "lucide-react";

const Features = () => {
  const coreFeatures = [
    {
      title: "Smart Appointment Scheduling",
      description:
        "Automated booking with real-time availability, conflict prevention, and intelligent time slot recommendations based on appointment types.",
      image:
        "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      stats: "Zero conflicts guaranteed",
      capabilities: [
        "Multi-provider scheduling",
        "Recurring appointments",
        "Buffer time management",
        "Waitlist automation",
      ],
      icon: Calendar,
    },
    {
      title: "Automated Reminders & Follow-ups",
      description:
        "Smart SMS and email reminders sent at optimal times. Automated follow-up sequences for post-visit care and treatment compliance.",
      image:
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      stats: "40% fewer no-shows",
      capabilities: [
        "24h & 2h reminders",
        "Custom message templates",
        "Follow-up sequences",
        "Treatment reminders",
      ],
      icon: Bell,
    },
    {
      title: "Patient Record Management",
      description:
        "Comprehensive patient profiles with visit history, notes, health results, and secure document storage. HIPAA-conscious design throughout.",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      stats: "Secure & organized",
      capabilities: [
        "Visit notes & history",
        "Health results tracking",
        "Document storage",
        "Medical timeline view",
      ],
      icon: FileText,
    },
    {
      title: "Multi-Role Dashboard",
      description:
        "Role-based access for patients, staff, and administrators. Each user sees exactly what they need with appropriate permissions.",
      image:
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      stats: "3 user types supported",
      capabilities: [
        "Patient portal",
        "Staff dashboard",
        "Admin oversight",
        "Permission management",
      ],
      icon: Users,
    },
    {
      title: "Health Results & Reports",
      description:
        "Secure sharing of test results, lab reports, and health summaries. Patients can access their data anytime, anywhere.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      stats: "Instant access",
      capabilities: [
        "Lab result sharing",
        "Report generation",
        "Trend analysis",
        "Export capabilities",
      ],
      icon: BarChart3,
    },
    {
      title: "Communication Hub",
      description:
        "Secure messaging between patients and providers, automated notifications, and real-time updates on appointment status.",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      stats: "Real-time messaging",
      capabilities: [
        "Secure chat",
        "Notification center",
        "Status updates",
        "File sharing",
      ],
      icon: MessageSquare,
    },
  ];

  const additionalFeatures = [
    {
      title: "Telemedicine Integration",
      description:
        "Built-in video consultation capabilities for remote patient care",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      tag: "VIRTUAL CARE",
      icon: Stethoscope,
    },
    {
      title: "Insurance Management",
      description: "Streamlined insurance verification and claims processing",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      tag: "BILLING",
      icon: CreditCard,
    },
    {
      title: "Medical History Tracking",
      description: "Comprehensive patient history with timeline visualization",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      tag: "RECORDS",
      icon: TrendingUp,
    },
    {
      title: "Prescription Management",
      description: "Digital prescription writing and pharmacy integration",
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      tag: "PRESCRIPTIONS",
      icon: Pill,
    },
  ];

  const additionalCapabilities = [
    {
      category: "Staff Management",
      features: [
        "Multi-practitioner support",
        "Role-based permissions",
        "Staff scheduling",
        "Performance analytics",
      ],
      icon: UserCheck,
    },
    {
      category: "Analytics & Insights",
      features: [
        "No-show rate tracking",
        "Revenue analytics",
        "Patient engagement metrics",
        "Custom reporting",
      ],
      icon: PieChart,
    },
    {
      category: "Integration & Automation",
      features: [
        "Google Calendar sync",
        "Email/SMS automation",
        "API integrations",
        "Workflow automation",
      ],
      icon: Link,
    },
    {
      category: "Advanced Features",
      features: [
        "Telemedicine ready",
        "Multi-location support",
        "Insurance tracking",
        "Billing integration",
      ],
      icon: Zap,
    },
  ];

  const statisticsData = [
    {
      value: "87%",
      label: "Reduction in scheduling errors",
      description: "Automated conflict detection eliminates double bookings",
    },
    {
      value: "40%",
      label: "Fewer no-shows",
      description: "Smart reminders sent at optimal times improve attendance",
    },
    {
      value: "3x",
      label: "More patients managed",
      description: "Streamlined workflows allow handling 3x more patients",
    },
    {
      value: "10min",
      label: "Average booking time",
      description: "Quick and intuitive booking process for patients",
    },
  ];

  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-br from-gray-50 via-white to-primary/5"
    >
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Complete Healthcare Solution
          </div>
          <h2 className="text-3xl font-bold text-gray-900 leading-tight">
            Built for the Future of
            <span className="text-primary"> Healthcare</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From appointment scheduling to patient records, Cliniqly provides a
            complete healthcare management solution with modern features
            designed for today&apos;s healthcare needs.
          </p>
        </div>

        {/* Core Features Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-24">
          {coreFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>

                  {/* Stats Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-primary shadow-lg">
                    {feature.stats}
                  </div>
                </div>

                {/* Content Section */}
                <CardContent className="px-5 py-4 md:p-8">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                    {feature.description}
                  </p>

                  {/* Capabilities List */}
                  <div className="space-y-3">
                    {feature.capabilities.map((capability, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-3 text-gray-700"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-sm font-medium">
                          {capability}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Statistics Section */}
        <div className="bg-gradient-to-r from-primary/10 via-white to-secondary/20 rounded-3xl px-8 py-12 md:p-12 mb-24 shadow-xl border border-primary/10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4 mr-2" />
              Real Results
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Powering Smarter, Safer, and Scalable Healthcare
            </h3>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from healthcare practices using Cliniqly
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statisticsData.map((stat, index) => (
              <div key={index} className="text-center group h-full">
                <div className="bg-white h-full rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-4xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Advanced Solutions
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Advanced Healthcare Solutions
            </h3>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive features for modern healthcare delivery
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border-0 bg-white/80 backdrop-blur-sm"
                >
                  <div className="relative">
                    <div className="w-full h-48 overflow-hidden">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {feature.tag}
                    </div>
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="font-bold text-gray-900 mb-3 text-lg group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl px-2 py-12 md:p-12 mb-24 shadow-xl border border-gray-100">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Complete Ecosystem
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Complete Healthcare Management Ecosystem
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to run a modern healthcare practice
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalCapabilities.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {section.category}
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {section.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-600 flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Integration Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-4 text-xl">
                Calendar Integration
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Seamless Google Calendar sync keeps your existing workflow
                intact
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-4 text-xl">
                Smart Notifications
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Automated SMS and email reminders reduce no-shows by 40%
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-4 text-xl">
                HIPAA-Conscious
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Enterprise-grade security with healthcare compliance in mind
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 via-white to-secondary/20 rounded-3xl px-3 py-12 md:p-12 shadow-xl border border-primary/10">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Clock className="w-4 h-4 mr-2" />
              Get Started Today
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Healthcare Practice?
            </h3>
            <p className="text-base text-gray-600 mb-8 max-w-3xl mx-auto">
              Join hundreds of healthcare professionals who&apos;ve already made
              the switch to smarter practice management.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Start Your Free Trial
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
