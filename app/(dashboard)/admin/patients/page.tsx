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
import { User, Phone, Mail, Calendar, AlertTriangle, Trash2, Edit, Eye, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  status: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  medicalHistory: string;
  notes: string;
}

export default function PatientsPage() {
  const router = useRouter();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const patients = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john.doe@email.com', 
      phone: '+1 (555) 123-4567', 
      lastVisit: '2024-01-15', 
      status: 'Active',
      dateOfBirth: '1985-03-15',
      address: '123 Main St, City, State 12345',
      emergencyContact: 'Jane Doe (Spouse) - +1 (555) 987-6543',
      medicalHistory: 'Hypertension, Diabetes Type 2',
      notes: 'Patient prefers morning appointments'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane.smith@email.com', 
      phone: '+1 (555) 234-5678', 
      lastVisit: '2024-01-10', 
      status: 'Active',
      dateOfBirth: '1990-07-22',
      address: '456 Oak Ave, City, State 12345',
      emergencyContact: 'Mike Smith (Father) - +1 (555) 876-5432',
      medicalHistory: 'Asthma, Seasonal allergies',
      notes: 'Allergic to penicillin'
    },
    { 
      id: 3, 
      name: 'Mike Johnson', 
      email: 'mike.johnson@email.com', 
      phone: '+1 (555) 345-6789', 
      lastVisit: '2024-01-08', 
      status: 'Inactive',
      dateOfBirth: '1978-11-08',
      address: '789 Pine Rd, City, State 12345',
      emergencyContact: 'Sarah Johnson (Wife) - +1 (555) 765-4321',
      medicalHistory: 'None',
      notes: 'No current health issues'
    },
    { 
      id: 4, 
      name: 'Sarah Wilson', 
      email: 'sarah.wilson@email.com', 
      phone: '+1 (555) 456-7890', 
      lastVisit: '2024-01-12', 
      status: 'Active',
      dateOfBirth: '1992-04-30',
      address: '321 Elm St, City, State 12345',
      emergencyContact: 'David Wilson (Brother) - +1 (555) 654-3210',
      medicalHistory: 'Migraines',
      notes: 'Prefers female doctors'
    },
    { 
      id: 5, 
      name: 'David Brown', 
      email: 'david.brown@email.com', 
      phone: '+1 (555) 567-8901', 
      lastVisit: '2024-01-05', 
      status: 'Active',
      dateOfBirth: '1988-09-14',
      address: '654 Maple Dr, City, State 12345',
      emergencyContact: 'Lisa Brown (Sister) - +1 (555) 543-2109',
      medicalHistory: 'High cholesterol',
      notes: 'Follows vegetarian diet'
    },
  ];

  const handleDeletePatient = () => {
    if (selectedPatient) {
      // Here you would typically make an API call to delete the patient
      console.log(`Deleting patient ${selectedPatient.id}`);
      setIsDeleteModalOpen(false);
      setSelectedPatient(null);
      // You could add a toast notification here
    }
  };

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsViewModalOpen(true);
  };

  const handleEditPatient = (patient: Patient) => {
    router.push(`/admin/patients/${patient.id}/edit`);
  };

  const handleAddPatient = () => {
    router.push('/admin/patients/new');
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm);
    const matchesStatus = !statusFilter || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'lastVisit':
        return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime();
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Patients</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your patient records and information.
            </p>
          </div>
          <Button onClick={handleAddPatient} className="health-btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Patient
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
                  <dt className="text-sm font-medium text-muted-foreground truncate">Total Patients</dt>
                  <dd className="text-lg font-medium text-foreground">{patients.length}</dd>
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
                  <dt className="text-sm font-medium text-muted-foreground truncate">Active Patients</dt>
                  <dd className="text-lg font-medium text-foreground">
                    {patients.filter(p => p.status === 'Active').length}
                  </dd>
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
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground truncate">This Month</dt>
                  <dd className="text-lg font-medium text-foreground">
                    {patients.filter(p => {
                      const lastVisit = new Date(p.lastVisit);
                      const now = new Date();
                      return lastVisit.getMonth() === now.getMonth() && 
                             lastVisit.getFullYear() === now.getFullYear();
                    }).length}
                  </dd>
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
                  <User className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground truncate">New This Week</dt>
                  <dd className="text-lg font-medium text-foreground">
                    {patients.filter(p => {
                      const lastVisit = new Date(p.lastVisit);
                      const now = new Date();
                      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                      return lastVisit >= weekAgo;
                    }).length}
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="health-card border-0 shadow-sm mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  id="search"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="health-card border-0 pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="health-card border-0">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sort">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="health-card border-0">
                  <SelectValue placeholder="Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="lastVisit">Last Visit</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                className="w-full health-btn-secondary"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("");
                  setSortBy("name");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card className="health-card border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2 text-primary" />
            Patient List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-foreground">{patient.name}</div>
                        <div className="text-sm text-muted-foreground">ID: {patient.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-foreground">{patient.email}</div>
                    <div className="text-sm text-muted-foreground">{patient.phone}</div>
                  </TableCell>
                  <TableCell className="text-sm text-foreground">
                    {new Date(patient.lastVisit).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={patient.status === 'Active' ? 'default' : 'secondary'} className="status-badge">
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="link" 
                        size="sm" 
                        onClick={() => handleViewPatient(patient)}
                        className="text-primary hover:text-primary/80"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="link" 
                        size="sm" 
                        onClick={() => handleEditPatient(patient)}
                        className="text-accent hover:text-accent/80"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="link" 
                        size="sm" 
                        onClick={() => {
                          setSelectedPatient(patient);
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
              Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedPatients.length}</span> of{' '}
              <span className="font-medium">{sortedPatients.length}</span> results
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

      {/* Delete Patient Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="health-card border-0">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-destructive" />
              Delete Patient
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this patient? This action cannot be undone and will remove all patient records.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedPatient && (
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{selectedPatient.name}</span>
                </div>
                <div className="flex items-center space-x-3 mb-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{selectedPatient.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{selectedPatient.phone}</span>
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
              Keep Patient
            </Button>
            <Button 
              onClick={handleDeletePatient}
              className="health-btn-primary"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Patient
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Patient Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="health-card border-0 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <User className="w-5 h-5 mr-2 text-primary" />
              Patient Details
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {selectedPatient && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                    <p className="text-foreground">{selectedPatient.name}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Date of Birth</Label>
                    <p className="text-foreground">{new Date(selectedPatient.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                    <p className="text-foreground">{selectedPatient.email}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                    <p className="text-foreground">{selectedPatient.phone}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                    <Badge variant={selectedPatient.status === 'Active' ? 'default' : 'secondary'}>
                      {selectedPatient.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Last Visit</Label>
                    <p className="text-foreground">{new Date(selectedPatient.lastVisit).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                  <p className="text-foreground">{selectedPatient.address}</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Emergency Contact</Label>
                  <p className="text-foreground">{selectedPatient.emergencyContact}</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Medical History</Label>
                  <p className="text-foreground">{selectedPatient.medicalHistory || 'None'}</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Notes</Label>
                  <p className="text-foreground">{selectedPatient.notes || 'No notes'}</p>
                </div>
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
                if (selectedPatient) {
                  handleEditPatient(selectedPatient);
                }
              }}
              className="health-btn-primary"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Patient
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 