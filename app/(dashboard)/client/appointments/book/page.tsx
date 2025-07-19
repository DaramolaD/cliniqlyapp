"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  ArrowLeft,
  Save,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface BookingForm {
  date: string;
  time: string;
  type: string;
  department: string;
  doctor: string;
  notes: string;
  urgency: 'routine' | 'urgent' | 'emergency';
}

export default function BookAppointmentPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [form, setForm] = useState<BookingForm>({
    date: '',
    time: '',
    type: '',
    department: '',
    doctor: '',
    notes: '',
    urgency: 'routine'
  });

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Booking appointment:', form);
      setSaving(false);
      setShowSuccessDialog(true);
    }, 1000);
  };

  const handleSuccessConfirm = () => {
    setShowSuccessDialog(false);
    router.push('/client/appointments');
  };

  const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Patient"
  };

  return (
    <DashboardLayout variant="client" user={mockUser}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/client/appointments')}
              className="health-btn-secondary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Book Appointment</h1>
              <p className="mt-2 text-muted-foreground">
                Schedule a new appointment with our healthcare providers.
              </p>
            </div>
          </div>
          <Button 
            onClick={handleSave}
            disabled={saving || !form.date || !form.time || !form.type || !form.department}
            className="health-btn-primary"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Booking...' : 'Book Appointment'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Booking Form */}
          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({...form, date: e.target.value})}
                    className="health-card border-0"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Preferred Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm({...form, time: e.target.value})}
                    className="health-card border-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select 
                  value={form.urgency}
                  onValueChange={(value) => setForm({...form, urgency: value as 'routine' | 'urgent' | 'emergency'})}
                >
                  <SelectTrigger className="health-card border-0 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="routine">Routine</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select 
                  value={form.department}
                  onValueChange={(value) => setForm({...form, department: value})}
                >
                  <SelectTrigger className="health-card border-0 w-full">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Medicine">General Medicine</SelectItem>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="Dermatology">Dermatology</SelectItem>
                    <SelectItem value="Dental">Dental</SelectItem>
                    <SelectItem value="Mental Health">Mental Health</SelectItem>
                    <SelectItem value="Physical Therapy">Physical Therapy</SelectItem>
                  </SelectContent>
                </Select>
            </div>

              <div className="space-y-2">
                <Label htmlFor="type">Appointment Type</Label>
                <Select 
                  value={form.type}
                  onValueChange={(value) => setForm({...form, type: value})}
                >
                  <SelectTrigger className="health-card border-0 w-full">
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Checkup">General Checkup</SelectItem>
                    <SelectItem value="Consultation">Consultation</SelectItem>
                    <SelectItem value="Follow-up">Follow-up</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                    <SelectItem value="Test">Test</SelectItem>
                    <SelectItem value="Surgery">Surgery</SelectItem>
                    <SelectItem value="Physical Therapy">Physical Therapy</SelectItem>
                  </SelectContent>
                </Select>
          </div>

              <div className="space-y-2">
                <Label htmlFor="doctor">Preferred Doctor (Optional)</Label>
                <Select 
                  value={form.doctor}
                  onValueChange={(value) => setForm({...form, doctor: value})}
                >
                  <SelectTrigger className="health-card border-0 w-full">
                    <SelectValue placeholder="Select preferred doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. Sarah Johnson">Dr. Sarah Johnson - General Medicine</SelectItem>
                    <SelectItem value="Dr. Michael Chen">Dr. Michael Chen - Cardiology</SelectItem>
                    <SelectItem value="Dr. Lisa Thompson">Dr. Lisa Thompson - Pediatrics</SelectItem>
                    <SelectItem value="Dr. Robert Wilson">Dr. Robert Wilson - Orthopedics</SelectItem>
                    <SelectItem value="Dr. Emily Rodriguez">Dr. Emily Rodriguez - Dermatology</SelectItem>
                    <SelectItem value="Any Available">Any Available Doctor</SelectItem>
                  </SelectContent>
                </Select>
        </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={form.notes}
                  onChange={(e) => setForm({...form, notes: e.target.value})}
                  placeholder="Describe your symptoms, concerns, or any special requirements..."
                  className="health-card border-0"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Information Panel */}
          <div className="space-y-6">
            {/* Booking Guidelines */}
            <Card className="health-card border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Booking Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">Please arrive 15 minutes early</span>
                        </div>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">Bring your ID and insurance card</span>
                          </div>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">Cancel at least 24 hours in advance</span>
                    </div>
                </div>
              </CardContent>
            </Card>

            {/* Available Times */}
            <Card className="health-card border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Available Times</CardTitle>
              </CardHeader>
              <CardContent>
                    <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Monday - Friday</div>
                  <div className="text-sm font-medium">8:00 AM - 6:00 PM</div>
                  <div className="text-sm text-muted-foreground mt-2">Saturday</div>
                  <div className="text-sm font-medium">9:00 AM - 2:00 PM</div>
                  <div className="text-sm text-muted-foreground mt-2">Sunday</div>
                  <div className="text-sm font-medium">Emergency Only</div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="health-card border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Phone:</span> +1 (555) 123-4567
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Email:</span> appointments@cliniqly.com
                </div>
                  <div className="text-sm">
                    <span className="font-medium">Emergency:</span> 911
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="health-card border-0">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                Appointment Booked Successfully
              </DialogTitle>
              <DialogDescription>
                Your appointment has been scheduled. You will receive a confirmation email shortly.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                onClick={handleSuccessConfirm}
                className="health-btn-primary"
              >
                View My Appointments
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
} 