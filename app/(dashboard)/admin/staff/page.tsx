"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";
import { User, Mail, AlertTriangle, Trash2, Edit, Eye, Plus, Search, Building, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";

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

export default function StaffPage() {
  const router = useRouter();
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const staff: StaffMember[] = [
    { 
      id: 1, 
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
    },
    { 
      id: 2, 
      name: 'Dr. Michael Chen', 
      email: 'michael.chen@clinic.com', 
      role: 'Physician',
      department: 'Cardiology',
      status: 'Active',
      phone: '+1 (555) 234-5678',
      joinDate: '2023-03-20',
      specialization: 'Cardiology',
      license: 'MD-23456',
      education: 'Stanford Medical School, MD',
      notes: 'Interventional cardiologist with 10+ years experience'
    },
    { 
      id: 3, 
      name: 'Emily Rodriguez', 
      email: 'emily.rodriguez@clinic.com', 
      role: 'Nurse',
      department: 'General Medicine',
      status: 'Active',
      phone: '+1 (555) 345-6789',
      joinDate: '2023-02-10',
      specialization: 'Registered Nurse',
      license: 'RN-34567',
      education: 'University of California, BSN',
      notes: 'Certified in emergency care and patient education'
    },
    { 
      id: 4, 
      name: 'James Wilson', 
      email: 'james.wilson@clinic.com', 
      role: 'Receptionist',
      department: 'Administration',
      status: 'Active',
      phone: '+1 (555) 456-7890',
      joinDate: '2023-04-05',
      notes: 'Handles patient scheduling and front desk operations'
    },
    { 
      id: 5, 
      name: 'Dr. Lisa Thompson', 
      email: 'lisa.thompson@clinic.com', 
      role: 'Physician',
      department: 'Pediatrics',
      status: 'On Leave',
      phone: '+1 (555) 567-8901',
      joinDate: '2022-11-12',
      specialization: 'Pediatrics',
      license: 'MD-56789',
      education: 'Johns Hopkins Medical School, MD',
      notes: 'On maternity leave until March 2024'
    },
  ];

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

  const handleDeleteStaff = () => {
    if (selectedStaff) {
      // Here you would typically make an API call to delete the staff member
      console.log(`Deleting staff member ${selectedStaff.id}`);
      setIsDeleteModalOpen(false);
      setSelectedStaff(null);
      // You could add a toast notification here
    }
  };

  const handleViewStaff = (staffMember: StaffMember) => {
    setSelectedStaff(staffMember);
    setIsViewModalOpen(true);
  };

  const handleEditStaff = (staffMember: StaffMember) => {
    router.push(`/admin/staff/${staffMember.id}/edit`);
  };

  const handleAddStaff = () => {
    router.push('/admin/staff/new');
  };

  const filteredStaff = staff.filter(staffMember => {
    const matchesSearch = staffMember.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staffMember.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staffMember.phone.includes(searchTerm);
    const matchesRole = !roleFilter || staffMember.role === roleFilter;
    const matchesDepartment = !departmentFilter || staffMember.department === departmentFilter;
    const matchesStatus = !statusFilter || staffMember.status === statusFilter;
    return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
  });

  const activeStaff = staff.filter(s => s.status === 'Active').length;
  const physicians = staff.filter(s => s.role === 'Physician').length;
  const supportStaff = staff.filter(s => s.role !== 'Physician').length;

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your clinic staff and their roles.
            </p>
          </div>
          <Button onClick={handleAddStaff} className="health-btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Staff Member
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="health-card border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground truncate">Total Staff</dt>
                  <dd className="text-lg font-medium text-foreground">{staff.length}</dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="health-card border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground truncate">Active Staff</dt>
                  <dd className="text-lg font-medium text-foreground">{activeStaff}</dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="health-card border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground truncate">Physicians</dt>
                  <dd className="text-lg font-medium text-foreground">{physicians}</dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="health-card border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground truncate">Support Staff</dt>
                  <dd className="text-lg font-medium text-foreground">{supportStaff}</dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="health-card border-0 shadow-sm mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  id="search"
                  placeholder="Search staff..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="health-card border-0 pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={roleFilter || "all"} onValueChange={(value) => setRoleFilter(value === "all" ? "" : value)}>
                <SelectTrigger className="health-card border-0">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Physician">Physician</SelectItem>
                  <SelectItem value="Nurse">Nurse</SelectItem>
                  <SelectItem value="Receptionist">Receptionist</SelectItem>
                  <SelectItem value="Administrator">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select value={departmentFilter || "all"} onValueChange={(value) => setDepartmentFilter(value === "all" ? "" : value)}>
                <SelectTrigger className="health-card border-0">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="General Medicine">General Medicine</SelectItem>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="Administration">Administration</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter || "all"} onValueChange={(value) => setStatusFilter(value === "all" ? "" : value)}>
                <SelectTrigger className="health-card border-0">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                className="w-full health-btn-secondary"
                onClick={() => {
                  setSearchTerm("");
                  setRoleFilter("");
                  setDepartmentFilter("");
                  setStatusFilter("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Staff Table */}
      <Card className="health-card border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2 text-primary" />
            Staff List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Member</TableHead>
                <TableHead>Role & Department</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staffMember) => (
                <TableRow 
                  key={staffMember.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => router.push(`/admin/staff/${staffMember.id}`)}
                >
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {staffMember.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-foreground">{staffMember.name}</div>
                        <div className="text-sm text-muted-foreground">ID: {staffMember.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge variant={getRoleVariant(staffMember.role)} className="status-badge">
                        {staffMember.role}
                      </Badge>
                      <div className="text-sm text-muted-foreground">{staffMember.department}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-foreground">{staffMember.email}</div>
                    <div className="text-sm text-muted-foreground">{staffMember.phone}</div>
                  </TableCell>
                  <TableCell className="text-sm text-foreground">
                    {new Date(staffMember.joinDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(staffMember.status)} className="status-badge">
                      {staffMember.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <Button 
                        variant="link" 
                        size="sm" 
                        onClick={() => handleViewStaff(staffMember)}
                        className="text-primary hover:text-primary/80"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="link" 
                        size="sm" 
                        onClick={() => handleEditStaff(staffMember)}
                        className="text-accent hover:text-accent/80"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="link" 
                        size="sm" 
                        onClick={() => {
                          setSelectedStaff(staffMember);
                          setIsDeleteModalOpen(true);
                        }}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredStaff.length}</span> of{' '}
              <span className="font-medium">{filteredStaff.length}</span> results
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="health-btn-secondary">
                Previous
              </Button>
              <Button variant="outline" size="sm" className="health-btn-secondary">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Staff Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="health-card border-0">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-destructive" />
              Delete Staff Member
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this staff member? This action cannot be undone and will remove all associated records.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedStaff && (
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{selectedStaff.name}</span>
                </div>
                <div className="flex items-center space-x-3 mb-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{selectedStaff.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  <span>{selectedStaff.role} - {selectedStaff.department}</span>
                </div>
              </div>
            )}
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

      {/* View Staff Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="health-card border-0 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <User className="w-5 h-5 mr-2 text-primary" />
              Staff Member Details
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {selectedStaff && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                    <p className="text-foreground">{selectedStaff.name}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Role</Label>
                    <Badge variant={getRoleVariant(selectedStaff.role)}>
                      {selectedStaff.role}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                    <p className="text-foreground">{selectedStaff.email}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                    <p className="text-foreground">{selectedStaff.phone}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Department</Label>
                    <p className="text-foreground">{selectedStaff.department}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                    <Badge variant={getStatusVariant(selectedStaff.status)}>
                      {selectedStaff.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Join Date</Label>
                    <p className="text-foreground">{new Date(selectedStaff.joinDate).toLocaleDateString()}</p>
                  </div>
                  {selectedStaff.specialization && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">Specialization</Label>
                      <p className="text-foreground">{selectedStaff.specialization}</p>
                    </div>
                  )}
                </div>
                
                {selectedStaff.license && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">License</Label>
                    <p className="text-foreground">{selectedStaff.license}</p>
                  </div>
                )}
                
                {selectedStaff.education && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Education</Label>
                    <p className="text-foreground">{selectedStaff.education}</p>
                  </div>
                )}
                
                {selectedStaff.notes && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Notes</Label>
                    <p className="text-foreground">{selectedStaff.notes}</p>
                  </div>
                )}
              </>
            )}
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsViewModalOpen(false)}
              className="health-btn-secondary"
            >
              Close
            </Button>
            <Button 
              onClick={() => {
                setIsViewModalOpen(false);
                if (selectedStaff) {
                  handleEditStaff(selectedStaff);
                }
              }}
              className="health-btn-primary"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Staff Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 