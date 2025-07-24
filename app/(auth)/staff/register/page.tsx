"use client"
import { useState } from "react";
// import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Eye, EyeOff, Building, UserPlus, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function StaffRegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    employeeId: "",
    reason: "",
    password: "",
    confirmPassword: "",
    terms: false,
    hipaa: false,
    training: false
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.terms || !formData.hipaa || !formData.training) {
      setError("You must agree to all required terms and conditions");
      return;
    }

    setIsLoading(true);

    // try {
    //   const success = await register(formData, 'staff');
    //   if (!success) {
    //     setError("Registration request failed. Please try again.");
    //   }
    // } catch {
    //   setError("An error occurred. Please try again.");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Staff Access Request</h1>
          <p className="text-muted-foreground">
            Request access to the healthcare organization portal
          </p>
        </div>

        {/* Register Card */}
        <Card className="health-card border-0 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Request Account</CardTitle>
            <p className="text-center text-muted-foreground">
              Fill out the form to request staff access
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-600">{error}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    className="health-card border-0"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    className="health-card border-0"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@healthcare.org"
                  className="health-card border-0"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="health-card border-0"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select onValueChange={(value) => handleInputChange('department', value)}>
                  <SelectTrigger className="health-card border-0">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency">Emergency Medicine</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="oncology">Oncology</SelectItem>
                    <SelectItem value="radiology">Radiology</SelectItem>
                    <SelectItem value="laboratory">Laboratory</SelectItem>
                    <SelectItem value="pharmacy">Pharmacy</SelectItem>
                    <SelectItem value="nursing">Nursing</SelectItem>
                    <SelectItem value="administration">Administration</SelectItem>
                    <SelectItem value="it">IT Support</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position/Role</Label>
                <Select onValueChange={(value) => handleInputChange('position', value)}>
                  <SelectTrigger className="health-card border-0">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doctor">Doctor/Physician</SelectItem>
                    <SelectItem value="nurse">Nurse</SelectItem>
                    <SelectItem value="specialist">Specialist</SelectItem>
                    <SelectItem value="technician">Technician</SelectItem>
                    <SelectItem value="administrator">Administrator</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="assistant">Assistant</SelectItem>
                    <SelectItem value="intern">Intern/Resident</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID (if available)</Label>
                <Input
                  id="employeeId"
                  type="text"
                  placeholder="EMP123456"
                  className="health-card border-0"
                  value={formData.employeeId}
                  onChange={(e) => handleInputChange('employeeId', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Access</Label>
                <Textarea
                  id="reason"
                  placeholder="Please explain why you need access to the system..."
                  className="health-card border-0 min-h-[80px]"
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Proposed Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="health-card border-0 pr-10"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="health-card border-0 pr-10"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="terms" 
                    className="mt-1"
                    checked={formData.terms}
                    onCheckedChange={(checked) => handleInputChange('terms', checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:text-primary/80">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:text-primary/80">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="hipaa" 
                    className="mt-1"
                    checked={formData.hipaa}
                    onCheckedChange={(checked) => handleInputChange('hipaa', checked as boolean)}
                  />
                  <Label htmlFor="hipaa" className="text-sm text-muted-foreground leading-relaxed">
                    I understand and will comply with HIPAA regulations and patient privacy requirements
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="training" 
                    className="mt-1"
                    checked={formData.training}
                    onCheckedChange={(checked) => handleInputChange('training', checked as boolean)}
                  />
                  <Label htmlFor="training" className="text-sm text-muted-foreground leading-relaxed">
                    I will complete required security training before accessing patient data
                  </Label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full health-btn-primary" 
                size="lg"
                disabled={isLoading}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                {isLoading ? "Submitting Request..." : "Submit Request"}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              Already have access?{" "}
              <Link
                href="/staff/login"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Information */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-center text-foreground">What happens next?</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
              <span>Your request will be reviewed by administration</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
              <span>You&apos;ll receive an email confirmation within 24 hours</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
              <span>Upon approval, you&apos;ll get login credentials</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
              <span>Required training must be completed before access</span>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-accent" />
              HIPAA Compliant
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-accent" />
              Secure Platform
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-accent" />
              24/7 Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 