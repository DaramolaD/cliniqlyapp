"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  HelpCircle, 
  Search, 
  Phone, 
  Mail, 
  MessageCircle,
  FileText,
  Video,
  BookOpen,
  ChevronRight,
  ExternalLink
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface SupportOption {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
  url: string;
  available: boolean;
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const faqItems: FAQItem[] = [
    {
      question: "How do I book an appointment?",
      answer: "You can book an appointment by navigating to the 'Appointments' section and clicking 'Book Appointment'. Choose your preferred date, time, and doctor, then fill out the required information.",
      category: "appointments"
    },
    {
      question: "How can I view my test results?",
      answer: "Your test results are available in the 'Health' section under 'Results'. Results are typically available within 24-48 hours after your test.",
      category: "health"
    },
    {
      question: "What should I do if I forgot my password?",
      answer: "Click on 'Forgot Password' on the login page. You'll receive a reset link via email. If you don't receive the email, check your spam folder.",
      category: "account"
    },
    {
      question: "How do I update my personal information?",
      answer: "Go to 'Settings' and then 'Profile' to update your personal information, contact details, and preferences.",
      category: "account"
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer: "Yes, you can cancel or reschedule appointments up to 24 hours before the scheduled time. Go to your appointments list and click on the appointment to modify it.",
      category: "appointments"
    },
    {
      question: "How do I contact my doctor?",
      answer: "You can message your doctor through the 'Messages' section. For urgent matters, please call the office directly.",
      category: "communication"
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit cards, debit cards, and insurance payments. You can also set up automatic payments for recurring charges.",
      category: "billing"
    },
    {
      question: "How do I upload documents?",
      answer: "Go to 'Documents' and click 'Upload'. You can upload medical records, insurance cards, and other relevant documents in PDF, JPG, or PNG format.",
      category: "documents"
    }
  ];

  const supportOptions: SupportOption[] = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: <MessageCircle className="w-6 h-6" />,
      action: "Start Chat",
      url: "#",
      available: true
    },
    {
      title: "Phone Support",
      description: "Call us for immediate assistance",
      icon: <Phone className="w-6 h-6" />,
      action: "Call Now",
      url: "tel:+1-800-123-4567",
      available: true
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      icon: <Mail className="w-6 h-6" />,
      action: "Send Email",
      url: "mailto:support@cliniqly.com",
      available: true
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      icon: <Video className="w-6 h-6" />,
      action: "Watch Videos",
      url: "#",
      available: true
    },
    {
      title: "User Manual",
      description: "Download the complete user guide",
      icon: <FileText className="w-6 h-6" />,
      action: "Download PDF",
      url: "#",
      available: true
    },
    {
      title: "Knowledge Base",
      description: "Browse our comprehensive help articles",
      icon: <BookOpen className="w-6 h-6" />,
      action: "Browse Articles",
      url: "#",
      available: true
    }
  ];

  const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Patient"
  };

  const filteredFAQ = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
    console.log("Contact form submitted:", contactForm);
  };

  const categories = [
    { key: "all", label: "All", count: faqItems.length },
    { key: "appointments", label: "Appointments", count: faqItems.filter(f => f.category === "appointments").length },
    { key: "account", label: "Account", count: faqItems.filter(f => f.category === "account").length },
    { key: "health", label: "Health", count: faqItems.filter(f => f.category === "health").length },
    { key: "billing", label: "Billing", count: faqItems.filter(f => f.category === "billing").length },
    { key: "communication", label: "Communication", count: faqItems.filter(f => f.category === "communication").length },
    { key: "documents", label: "Documents", count: faqItems.filter(f => f.category === "documents").length }
  ];

  return (
    <DashboardLayout variant="client" user={mockUser}>
      <div className="p-6 space-y-6">
        {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
            <p className="mt-2 text-muted-foreground">
            Find answers to your questions and get the support you need.
            </p>
        </div>

        {/* Search */}
        <Card className="health-card border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                placeholder="Search for help articles, FAQs, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg health-card border-0"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Support Options */}
          <div className="lg:col-span-1">
        <Card className="health-card border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-primary" />
                  Get Support
            </CardTitle>
          </CardHeader>
              <CardContent className="space-y-4">
                {supportOptions.map((option, index) => (
                  <div
                    key={index}
                    className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {option.icon}
              </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{option.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {option.description}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          disabled={!option.available}
                        >
                          {option.action}
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
          </CardContent>
        </Card>

            {/* Contact Form */}
            <Card className="health-card border-0 shadow-sm mt-6">
          <CardHeader>
                <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="health-card border-0"
                        required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="health-card border-0"
                        required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="health-card border-0"
                      required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="health-card border-0 min-h-[100px]"
                      placeholder="Describe your issue or question..."
                      required
                />
              </div>
                  <Button type="submit" className="w-full health-btn-primary">
                Send Message
              </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* FAQ */}
          <div className="lg:col-span-2">
            <Card className="health-card border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Frequently Asked Questions</span>
                  <Badge variant="secondary">
                    {filteredFAQ.length} questions
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQ.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          <span>{item.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="health-card border-0 shadow-sm mt-6">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="text-left">
                      <div className="font-medium">Privacy Policy</div>
                      <div className="text-sm text-muted-foreground">Learn about data protection</div>
                    </div>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="text-left">
                      <div className="font-medium">Terms of Service</div>
                      <div className="text-sm text-muted-foreground">Read our terms and conditions</div>
                    </div>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="text-left">
                      <div className="font-medium">HIPAA Compliance</div>
                      <div className="text-sm text-muted-foreground">Information about data security</div>
                    </div>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="text-left">
                      <div className="font-medium">System Status</div>
                      <div className="text-sm text-muted-foreground">Check service availability</div>
                    </div>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 