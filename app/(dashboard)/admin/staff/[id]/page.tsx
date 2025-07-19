"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  ArrowLeft,
  Edit,
  Trash2,
  Building,
  GraduationCap,
  AlertTriangle,
  Clock,
//   MapPin
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

export default function StaffDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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

  const handleDeleteStaff = () => {
    if (staff) {
      // Here you would typically make an API call to delete the staff member
      console.log(`Deleting staff member ${staff.id}`);
      setIsDeleteModalOpen(false);
      router.push('/admin/staff');
    }
  };

  const handleEditStaff = () => {
    router.push(`/admin/staff/${params.id}/edit`);
  };

  const getRoleVariant = (role: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (role) {
      case 'Physician':
        return 'default';
      case 'Nurse':
        return 'secondary';
      case 'Receptionist':
        return 'outline';
      case 'Administrator':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'On Leave':
        return 'secondary';
      case 'Inactive':
        return 'destructive';
      default:
        return 'outline';
    }
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
              <h1 className="text-3xl font-bold text-foreground">{staff.name}</h1>
              <p className="mt-2 text-muted-foreground">
                Staff Member Details
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteModalOpen(true)}
              className="health-btn-secondary"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
            <Button 
              onClick={handleEditStaff}
              className="health-btn-primary"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Staff Member
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Staff Profile Card */}
        <div className="lg:col-span-1">
          <Card className="health-card border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">
                    {staff.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">{staff.name}</h2>
                <div className="space-y-2 mb-4">
                  <Badge variant={getRoleVariant(staff.role)} className="status-badge">
                    {staff.role}
                  </Badge>
                  <Badge variant={getStatusVariant(staff.status)} className="status-badge">
                    {staff.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Staff ID: {staff.id}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Staff Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-primary" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                    <p className="text-foreground">{staff.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                    <p className="text-foreground">{staff.phone}</p>
                  </div>
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
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Department</Label>
                    <p className="text-foreground">{staff.department}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Join Date</Label>
                    <p className="text-foreground">{new Date(staff.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              
              {staff.specialization && (
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Specialization</Label>
                    <p className="text-foreground">{staff.specialization}</p>
                  </div>
                </div>
              )}
              
              {staff.license && (
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">License</Label>
                    <p className="text-foreground">{staff.license}</p>
                  </div>
                </div>
              )}
              
              {staff.education && (
                <div className="flex items-start space-x-3">
                  <GraduationCap className="w-4 h-4 text-muted-foreground mt-1" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Education</Label>
                    <p className="text-foreground">{staff.education}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notes */}
          {staff.notes && (
            <Card className="health-card border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-primary" />
                  Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">{staff.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="health-btn-secondary"
                  onClick={() => router.push(`/admin/appointments/new?staff=${staff.id}`)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
                <Button 
                  variant="outline" 
                  className="health-btn-secondary"
                  onClick={() => router.push(`/admin/patients?staff=${staff.id}`)}
                >
                  <User className="w-4 h-4 mr-2" />
                  View Patients
                </Button>
                <Button 
                  variant="outline" 
                  className="health-btn-secondary"
                  onClick={handleEditStaff}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Staff Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="health-card border-0">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-destructive" />
              Delete Staff Member
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {staff.name}? This action cannot be undone and will remove all associated records.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{staff.name}</span>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{staff.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Building className="w-4 h-4 text-muted-foreground" />
                <span>{staff.role} - {staff.department}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteModalOpen(false)}
              className="health-btn-secondary"
            >
              Keep Staff Member
            </Button>
            <Button 
              onClick={handleDeleteStaff}
              className="health-btn-primary"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Staff Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 