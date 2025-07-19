"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
//   Phone, 
//   Mail, 
//   Calendar, 
  ArrowLeft,
  Save,
  X,
//   Plus,
  Building,
//   GraduationCap
} from "lucide-react";

interface NewStaffMember {
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  phone: string;
  joinDate: string;
  specialization: string;
  license: string;
  education: string;
  notes: string;
}

export default function NewStaffPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [staff, setStaff] = useState<NewStaffMember>({
    name: '',
    email: '',
    role: '',
    department: '',
    status: 'Active',
    phone: '',
    joinDate: new Date().toISOString().split('T')[0],
    specialization: '',
    license: '',
    education: '',
    notes: ''
  });

  const handleSave = async () => {
    if (!staff.name || !staff.email || !staff.role || !staff.department) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Creating staff member:', staff);
      router.push('/admin/staff');
    } catch (error) {
      console.error('Error creating staff member:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/staff');
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Add New Staff Member</h1>
              <p className="mt-2 text-muted-foreground">
                Create a new staff member record
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="health-btn-secondary"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="health-btn-primary"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Creating...' : 'Create Staff Member'}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card className="health-card border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                type="text"
                id="name"
                value={staff.name}
                onChange={(e) => setStaff({...staff, name: e.target.value})}
                className="health-card border-0"
                placeholder="Enter staff member's full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                type="email"
                id="email"
                value={staff.email}
                onChange={(e) => setStaff({...staff, email: e.target.value})}
                className="health-card border-0"
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="tel"
                id="phone"
                value={staff.phone}
                onChange={(e) => setStaff({...staff, phone: e.target.value})}
                className="health-card border-0"
                placeholder="Enter phone number"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="join-date">Join Date</Label>
                <Input
                  type="date"
                  id="join-date"
                  value={staff.joinDate}
                  onChange={(e) => setStaff({...staff, joinDate: e.target.value})}
                  className="health-card border-0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={staff.status} onValueChange={(value) => setStaff({...staff, status: value})}>
                  <SelectTrigger className="health-card border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card className="health-card border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="w-5 h-5 mr-2 text-primary" />
              Professional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select value={staff.role} onValueChange={(value) => setStaff({...staff, role: value})}>
                  <SelectTrigger className="health-card border-0">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Physician">Physician</SelectItem>
                    <SelectItem value="Nurse">Nurse</SelectItem>
                    <SelectItem value="Receptionist">Receptionist</SelectItem>
                    <SelectItem value="Administrator">Administrator</SelectItem>
                    <SelectItem value="Technician">Technician</SelectItem>
                    <SelectItem value="Pharmacist">Pharmacist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select value={staff.department} onValueChange={(value) => setStaff({...staff, department: value})}>
                  <SelectTrigger className="health-card border-0">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Medicine">General Medicine</SelectItem>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="Administration">Administration</SelectItem>
                    <SelectItem value="Laboratory">Laboratory</SelectItem>
                    <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                type="text"
                id="specialization"
                value={staff.specialization}
                onChange={(e) => setStaff({...staff, specialization: e.target.value})}
                className="health-card border-0"
                placeholder="Enter specialization..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="license">License Number</Label>
              <Input
                type="text"
                id="license"
                value={staff.license}
                onChange={(e) => setStaff({...staff, license: e.target.value})}
                className="health-card border-0"
                placeholder="Enter license number..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Textarea
                id="education"
                value={staff.education}
                onChange={(e) => setStaff({...staff, education: e.target.value})}
                className="health-card border-0"
                rows={3}
                placeholder="Enter education details..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={staff.notes}
                onChange={(e) => setStaff({...staff, notes: e.target.value})}
                className="health-card border-0"
                rows={3}
                placeholder="Enter additional notes..."
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Card */}
      <Card className="health-card border-0 shadow-sm mt-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2 text-primary" />
            Staff Member Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Name:</span>
              <p className="font-medium">{staff.name || 'Not specified'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Role:</span>
              <p className="font-medium">{staff.role || 'Not specified'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Department:</span>
              <p className="font-medium">{staff.department || 'Not specified'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Status:</span>
              <p className="font-medium">{staff.status}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Actions */}
      <div className="mt-8 flex justify-end space-x-4">
        <Button 
          variant="outline" 
          onClick={handleCancel}
          className="health-btn-secondary"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button 
          onClick={handleSave}
          disabled={isSaving || !staff.name || !staff.email || !staff.role || !staff.department}
          className="health-btn-primary"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Creating...' : 'Create Staff Member'}
        </Button>
      </div>
    </div>
  );
} 