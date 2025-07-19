"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
  Building,
//   GraduationCasp
} from "lucide-react";

interface StaffMember {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  phone: string;
  joinDate: string;
  specialization?: string;
  license?: string;
  education?: string;
  notes?: string;
}

export default function EditStaffPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [staff, setStaff] = useState<StaffMember | null>(null);

  // Mock staff data - in real app, fetch from API
  const mockStaff: StaffMember = {
    id: Number(params.id),
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@clinic.com',
    role: 'Physician',
    department: 'General Medicine',
    status: 'Active',
    phone: '+1 (555) 123-4567',
    joinDate: '2023-01-15',
    specialization: 'Internal Medicine',
    license: 'MD-12345',
    education: 'Harvard Medical School, MD',
    notes: 'Specializes in preventive care and chronic disease management'
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStaff(mockStaff);
      setIsLoading(false);
    }, 500);
  }, [params.id]);

  const handleSave = async () => {
    if (!staff) return;
    
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving staff member:', staff);
      router.push(`/admin/staff/${params.id}`);
    } catch (error) {
      console.error('Error saving staff member:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(`/admin/staff/${params.id}`);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-background min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading staff member...</div>
        </div>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="p-6 bg-background min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Staff member not found</div>
        </div>
      </div>
    );
  }

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
              <h1 className="text-3xl font-bold text-foreground">Edit Staff Member</h1>
              <p className="mt-2 text-muted-foreground">
                Update staff member information
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
              {isSaving ? 'Saving...' : 'Save Changes'}
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
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Physician">Physician</SelectItem>
                    <SelectItem value="Nurse">Nurse</SelectItem>
                    <SelectItem value="Receptionist">Receptionist</SelectItem>
                    <SelectItem value="Administrator">Administrator</SelectItem>
                    <SelectItem value="Technician">Technician</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select value={staff.department} onValueChange={(value) => setStaff({...staff, department: value})}>
                  <SelectTrigger className="health-card border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Medicine">General Medicine</SelectItem>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="Administration">Administration</SelectItem>
                    <SelectItem value="Laboratory">Laboratory</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                type="text"
                id="specialization"
                value={staff.specialization || ''}
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
                value={staff.license || ''}
                onChange={(e) => setStaff({...staff, license: e.target.value})}
                className="health-card border-0"
                placeholder="Enter license number..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Textarea
                id="education"
                value={staff.education || ''}
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
                value={staff.notes || ''}
                onChange={(e) => setStaff({...staff, notes: e.target.value})}
                className="health-card border-0"
                rows={3}
                placeholder="Enter additional notes..."
              />
            </div>
          </CardContent>
        </Card>
      </div>

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
          disabled={isSaving}
          className="health-btn-primary"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
} 