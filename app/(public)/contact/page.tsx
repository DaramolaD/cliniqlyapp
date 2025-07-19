import { PublicNavigation } from "@/components/customs/public-navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, MapPin, Mail, Clock, MessageCircle, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavigation />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
            <MessageCircle className="w-4 h-4 mr-2" />
            Get in Touch
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto text-white/90">
            Get in touch with our team. We&apos;re here to help you get started with Cliniqly.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 health-gradient">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      type="text"
                      id="firstName"
                      placeholder="Enter your first name"
                      className="health-card border-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      type="text"
                      id="lastName"
                      placeholder="Enter your last name"
                      className="health-card border-0"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    className="health-card border-0"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    className="health-card border-0"
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full health-btn-primary">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in touch</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-muted-foreground">hello@cliniqly.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Office</h3>
                    <p className="text-muted-foreground">123 Healthcare Ave, Suite 100<br />San Francisco, CA 94102</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mr-4">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Business Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-8 p-6 bg-card rounded-xl border border-border">
                <div className="flex items-center mb-4">
                  <Shield className="w-5 h-5 text-accent mr-2" />
                  <h3 className="font-semibold">Why Trust Cliniqly?</h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• HIPAA compliant and secure</p>
                  <p>• 24/7 customer support</p>
                  <p>• 99.9% uptime guarantee</p>
                  <p>• Trusted by 10,000+ healthcare providers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Find answers to common questions about Cliniqly</p>
          </div>
          <div className="space-y-6">
            <Card className="health-card border-0 shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">How quickly can I get started?</h3>
                <p className="text-muted-foreground">
                  You can start using Cliniqly immediately after signing up. Our setup process takes less than 10 minutes, 
                  and you can import your existing patient data or start fresh.
                </p>
              </CardContent>
            </Card>
            
            <Card className="health-card border-0 shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Is my data secure?</h3>
                <p className="text-muted-foreground">
                  Absolutely. We use enterprise-grade encryption and follow HIPAA compliance standards. 
                  Your data is stored securely and backed up regularly.
                </p>
              </CardContent>
            </Card>
            
            <Card className="health-card border-0 shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Can I cancel anytime?</h3>
                <p className="text-muted-foreground">
                  Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees.
                </p>
              </CardContent>
            </Card>
            
            <Card className="health-card border-0 shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Do you offer training?</h3>
                <p className="text-muted-foreground">
                  Yes! We provide free onboarding and training for all new customers. Our support team is also available 
                  to help you get the most out of Cliniqly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
} 