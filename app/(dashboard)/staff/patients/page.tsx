"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Phone, 
  Mail, 
  Calendar,
  MapPin,
  Heart,
  Activity,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Stethoscope,
  ClipboardList
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function PatientsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);

  // Mock patient data
  const patients = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      age: 34,
      gender: "Female",
      status: "active",
      lastVisit: "2024-01-15",
      nextAppointment: "2024-02-20",
      department: "Cardiology",
      avatar: "/avatars/patient1.jpg",
      patientId: "P001"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+1 (555) 234-5678",
      age: 28,
      gender: "Male",
      status: "active",
      lastVisit: "2024-01-10",
      nextAppointment: "2024-02-15",
      department: "Neurology",
      avatar: "/avatars/patient2.jpg",
      patientId: "P002"
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1 (555) 345-6789",
      age: 45,
      gender: "Female",
      status: "inactive",
      lastVisit: "2023-12-20",
      nextAppointment: null,
      department: "Orthopedics",
      avatar: "/avatars/patient3.jpg",
      patientId: "P003"
    },
    {
      id: 4,
      name: "Robert Wilson",
      email: "robert.wilson@email.com",
      phone: "+1 (555) 456-7890",
      age: 52,
      gender: "Male",
      status: "active",
      lastVisit: "2024-01-20",
      nextAppointment: "2024-02-25",
      department: "Oncology",
      avatar: "/avatars/patient4.jpg",
      patientId: "P004"
    },
    {
      id: 5,
      name: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      phone: "+1 (555) 567-8901",
      age: 39,
      gender: "Female",
      status: "active",
      lastVisit: "2024-01-18",
      nextAppointment: "2024-02-22",
      department: "Pediatrics",
      avatar: "/avatars/patient5.jpg",
      patientId: "P005"
    }
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDepartmentColor = (department: string) => {
    const colors: { [key: string]: string } = {
      'Cardiology': 'bg-red-100 text-red-800',
      'Neurology': 'bg-blue-100 text-blue-800',
      'Orthopedics': 'bg-orange-100 text-orange-800',
      'Oncology': 'bg-purple-100 text-purple-800',
      'Pediatrics': 'bg-pink-100 text-pink-800'
    };
    return colors[department] || 'bg-gray-100 text-gray-800';
  };

  const handleAddPatient = () => {
    setIsAddPatientModalOpen(true);
  };

  const handleViewPatient = (patient: any) => {
    router.push(`/staff/patients/${patient.id}`);
  };

  const handleEditPatient = (patient: any) => {
    router.push(`/staff/patients/${patient.id}/edit`);
  };

  const handleViewMedicalRecords = (patient: any) => {
    router.push(`/staff/patients/${patient.id}/records`);
  };

  const mockUser = {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@cliniqly.com",
    role: "Staff"
  };

  return (
    <DashboardLayout variant="staff" user={mockUser}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Patients</h1>
            <p className="text-muted-foreground">
              Manage patient information and medical records
            </p>
          </div>
          <Button className="health-btn-primary" onClick={handleAddPatient}>
            <Plus className="w-4 h-4 mr-2" />
            Add Patient
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="health-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
                  <p className="text-2xl font-bold text-foreground">{patients.length}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="health-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Patients</p>
                  <p className="text-2xl font-bold text-foreground">
                    {patients.filter(p => p.status === 'active').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="health-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today's Appointments</p>
                  <p className="text-2xl font-bold text-foreground">8</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="health-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Reports</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                </div>
                <FileText className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="health-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search patients by name, email, or ID..."
                    className="pl-10 health-card border-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48 health-card border-0">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="health-btn-secondary">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Patients Table */}
        <Card className="health-card">
          <CardHeader>
            <CardTitle>Patient List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Next Appointment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={patient.avatar} />
                            <AvatarFallback>
                              {patient.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-foreground">{patient.name}</div>
                            <div className="text-sm text-muted-foreground">ID: {patient.patientId}</div>
                            <div className="text-sm text-muted-foreground">{patient.age} • {patient.gender}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">{patient.email}</div>
                          <div className="text-sm text-muted-foreground">{patient.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getDepartmentColor(patient.department)}>
                          {patient.department}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(patient.status)}>
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {new Date(patient.lastVisit).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        {patient.nextAppointment ? (
                          <div className="text-sm text-primary">
                            {new Date(patient.nextAppointment).toLocaleDateString()}
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground">No upcoming</div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewPatient(patient)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditPatient(patient)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewMedicalRecords(patient)}
                            className="h-8 w-8 p-0"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Add Patient Modal */}
        <Dialog open={isAddPatientModalOpen} onOpenChange={setIsAddPatientModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This feature will allow staff to add new patients to the system with full medical history and contact information.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <Input placeholder="Enter first name" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <Input placeholder="Enter last name" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input placeholder="Enter email" type="email" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input placeholder="Enter phone number" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Date of Birth</label>
                  <Input type="date" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Gender</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium">Department</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="oncology">Oncology</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setIsAddPatientModalOpen(false)}
                className="health-btn-secondary"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  // Handle add patient logic
                  setIsAddPatientModalOpen(false);
                }}
                className="health-btn-primary"
              >
                Add Patient
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
} 