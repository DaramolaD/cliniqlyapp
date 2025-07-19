"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DataTable } from "@/components/customs/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  FileText, 
  User, 
  Calendar, 
  Download,
  Eye,
//   Plus,
  Search,
//   Filter,
  AlertCircle,
  CheckCircle,
  Clock,
  Activity,
//   Heart,
  Pill
} from "lucide-react";
import { useRouter } from "next/navigation";

interface PatientRecord {
  id: number;
  patientId: number;
  patientName: string;
  recordType: 'medical_history' | 'test_results' | 'prescriptions' | 'appointments' | 'billing' | 'consent_forms';
  title: string;
  description: string;
  date: string;
  doctor: string;
  department: string;
  status: 'active' | 'archived' | 'pending_review';
  fileSize: string;
  tags: string[];
  isConfidential: boolean;
}

interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  lastVisit: string;
  totalRecords: number;
  activeRecords: number;
}

export default function AdminPatientRecordsPage() {
  const router = useRouter();
  const [selectedRecord, setSelectedRecord] = useState<PatientRecord | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecordType, setSelectedRecordType] = useState<string>("all");

  const patients: Patient[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1985-03-15',
      gender: 'Male',
      lastVisit: '2024-01-15',
      totalRecords: 12,
      activeRecords: 8
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 234-5678',
      dateOfBirth: '1990-07-22',
      gender: 'Female',
      lastVisit: '2024-01-10',
      totalRecords: 8,
      activeRecords: 5
    },
    {
      id: 3,
      name: 'Bob Wilson',
      email: 'bob.wilson@example.com',
      phone: '+1 (555) 345-6789',
      dateOfBirth: '1978-11-08',
      gender: 'Male',
      lastVisit: '2024-01-12',
      totalRecords: 15,
      activeRecords: 10
    }
  ];

  const patientRecords: PatientRecord[] = [
    {
      id: 1,
      patientId: 1,
      patientName: 'John Doe',
      recordType: 'medical_history',
      title: 'Complete Medical History',
      description: 'Comprehensive medical history including past conditions, surgeries, and treatments',
      date: '2024-01-15',
      doctor: 'Dr. Sarah Johnson',
      department: 'General Medicine',
      status: 'active',
      fileSize: '2.3 MB',
      tags: ['medical history', 'comprehensive', 'baseline'],
      isConfidential: true
    },
    {
      id: 2,
      patientId: 1,
      patientName: 'John Doe',
      recordType: 'test_results',
      title: 'Blood Work Results - January 2024',
      description: 'Complete blood count, metabolic panel, and lipid profile',
      date: '2024-01-15',
      doctor: 'Dr. Sarah Johnson',
      department: 'Laboratory',
      status: 'active',
      fileSize: '1.8 MB',
      tags: ['blood work', 'lab results', 'annual'],
      isConfidential: true
    },
    {
      id: 3,
      patientId: 1,
      patientName: 'John Doe',
      recordType: 'prescriptions',
      title: 'Current Medications List',
      description: 'Active prescriptions and medication history',
      date: '2024-01-15',
      doctor: 'Dr. Sarah Johnson',
      department: 'General Medicine',
      status: 'active',
      fileSize: '0.5 MB',
      tags: ['prescriptions', 'medications', 'active'],
      isConfidential: true
    },
    {
      id: 4,
      patientId: 2,
      patientName: 'Jane Smith',
      recordType: 'appointments',
      title: 'Appointment History - 2023-2024',
      description: 'Complete appointment history and visit notes',
      date: '2024-01-10',
      doctor: 'Dr. Michael Chen',
      department: 'Cardiology',
      status: 'active',
      fileSize: '3.1 MB',
      tags: ['appointments', 'visit notes', 'history'],
      isConfidential: true
    },
    {
      id: 5,
      patientId: 2,
      patientName: 'Jane Smith',
      recordType: 'test_results',
      title: 'ECG Results - January 2024',
      description: 'Electrocardiogram results and cardiologist interpretation',
      date: '2024-01-10',
      doctor: 'Dr. Michael Chen',
      department: 'Cardiology',
      status: 'active',
      fileSize: '2.2 MB',
      tags: ['ECG', 'cardiology', 'heart'],
      isConfidential: true
    },
    {
      id: 6,
      patientId: 3,
      patientName: 'Bob Wilson',
      recordType: 'billing',
      title: 'Billing Records - 2023',
      description: 'Complete billing history and payment records',
      date: '2024-01-12',
      doctor: 'N/A',
      department: 'Administration',
      status: 'archived',
      fileSize: '1.5 MB',
      tags: ['billing', 'financial', '2023'],
      isConfidential: false
    }
  ];

  const columns = [
    {
      key: 'patientName',
      title: 'Patient',
      render: (record: PatientRecord) => (
        <div>
          <div className="font-medium text-foreground">{record.patientName}</div>
          <div className="text-sm text-muted-foreground">ID: {record.patientId}</div>
        </div>
      )
    },
    {
      key: 'title',
      title: 'Record',
      render: (record: PatientRecord) => (
        <div>
          <div className="font-medium text-foreground">{record.title}</div>
          <div className="text-sm text-muted-foreground">{record.description}</div>
        </div>
      )
    },
    {
      key: 'recordType',
      title: 'Type',
      render: (record: PatientRecord) => {
        const getTypeIcon = (type: string) => {
          switch (type) {
            case 'medical_history': return <User className="w-4 h-4" />;
            case 'test_results': return <Activity className="w-4 h-4" />;
            case 'prescriptions': return <Pill className="w-4 h-4" />;
            case 'appointments': return <Calendar className="w-4 h-4" />;
            case 'billing': return <FileText className="w-4 h-4" />;
            case 'consent_forms': return <FileText className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
          }
        };

        const getTypeLabel = (type: string) => {
          switch (type) {
            case 'medical_history': return 'Medical History';
            case 'test_results': return 'Test Results';
            case 'prescriptions': return 'Prescriptions';
            case 'appointments': return 'Appointments';
            case 'billing': return 'Billing';
            case 'consent_forms': return 'Consent Forms';
            default: return type;
          }
        };

        return (
          <div className="flex items-center space-x-2">
            {getTypeIcon(record.recordType)}
            <span className="text-sm">{getTypeLabel(record.recordType)}</span>
          </div>
        );
      }
    },
    {
      key: 'date',
      title: 'Date',
      render: (record: PatientRecord) => (
        <div className="text-sm text-muted-foreground">
          {new Date(record.date).toLocaleDateString()}
        </div>
      )
    },
    {
      key: 'doctor',
      title: 'Doctor',
      render: (record: PatientRecord) => (
        <div>
          <div className="text-sm text-foreground">{record.doctor}</div>
          <div className="text-xs text-muted-foreground">{record.department}</div>
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (record: PatientRecord) => {
        const getStatusVariant = (status: string) => {
          switch (status) {
            case 'active': return 'default';
            case 'archived': return 'secondary';
            case 'pending_review': return 'outline';
            default: return 'outline';
          }
        };
        
        const getStatusIcon = (status: string) => {
          switch (status) {
            case 'active': return <CheckCircle className="w-4 h-4" />;
            case 'archived': return <FileText className="w-4 h-4" />;
            case 'pending_review': return <Clock className="w-4 h-4" />;
            default: return <AlertCircle className="w-4 h-4" />;
          }
        };

        return (
          <Badge variant={getStatusVariant(record.status)} className="status-badge">
            {getStatusIcon(record.status)}
            <span className="ml-1">{record.status.replace('_', ' ')}</span>
          </Badge>
        );
      }
    }
  ];

  const filters = [
    {
      key: 'recordType',
      label: 'Record Type',
      options: [
        { value: 'medical_history', label: 'Medical History' },
        { value: 'test_results', label: 'Test Results' },
        { value: 'prescriptions', label: 'Prescriptions' },
        { value: 'appointments', label: 'Appointments' },
        { value: 'billing', label: 'Billing' },
        { value: 'consent_forms', label: 'Consent Forms' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'archived', label: 'Archived' },
        { value: 'pending_review', label: 'Pending Review' }
      ]
    }
  ];

  const handleViewRecord = (record: PatientRecord) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsPatientModalOpen(true);
  };

  const handleDownloadRecord = (record: PatientRecord) => {
    console.log('Downloading record:', record.id);
    // Trigger download
  };

  const handleArchiveRecord = (record: PatientRecord) => {
    console.log('Archiving record:', record.id);
    setIsViewModalOpen(false);
  };

  const actions = (record: PatientRecord) => (
    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
      <Button 
        variant="link" 
        size="sm" 
        onClick={() => handleViewRecord(record)}
        className="text-primary hover:text-primary/80"
      >
        <Eye className="w-4 h-4 mr-1" />
        View
      </Button>
      <Button 
        variant="link" 
        size="sm" 
        onClick={() => handleDownloadRecord(record)}
        className="text-accent hover:text-accent/80"
      >
        <Download className="w-4 h-4 mr-1" />
        Download
      </Button>
      {record.status === 'active' && (
        <Button 
          variant="link" 
          size="sm" 
          onClick={() => handleArchiveRecord(record)}
          className="text-orange-600 hover:text-orange-700"
        >
          <FileText className="w-4 h-4 mr-1" />
          Archive
        </Button>
      )}
    </div>
  );

  const filteredRecords = patientRecords.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedRecordType === "all" || record.recordType === selectedRecordType;
    return matchesSearch && matchesType;
  });

  const totalRecords = patientRecords.length;
  const activeRecords = patientRecords.filter(r => r.status === 'active').length;
  const confidentialRecords = patientRecords.filter(r => r.isConfidential).length;

  const mockUser = {
    name: "Admin User",
    email: "admin@cliniqly.com",
    role: "Administrator"
  };

  return (
    <DashboardLayout variant="admin" user={mockUser}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Patient Records</h1>
            <p className="mt-2 text-muted-foreground">
              Manage and access patient medical records and documentation.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => console.log('Exporting all records...')}
              className="health-btn-secondary"
            >
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
            <Button 
              onClick={() => router.push('/admin/patients')}
              className="health-btn-primary"
            >
              <User className="w-4 h-4 mr-2" />
              View Patients
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="health-card border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Total Records</dt>
                    <dd className="text-lg font-medium text-foreground">{totalRecords}</dd>
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
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Active Records</dt>
                    <dd className="text-lg font-medium text-foreground">{activeRecords}</dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="health-card border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Confidential</dt>
                    <dd className="text-lg font-medium text-foreground">{confidentialRecords}</dd>
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
                    <dt className="text-sm font-medium text-muted-foreground truncate">Patients</dt>
                    <dd className="text-lg font-medium text-foreground">{patients.length}</dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="health-card border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search patient records..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <select
                value={selectedRecordType}
                onChange={(e) => setSelectedRecordType(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Record Types</option>
                <option value="medical_history">Medical History</option>
                <option value="test_results">Test Results</option>
                <option value="prescriptions">Prescriptions</option>
                <option value="appointments">Appointments</option>
                <option value="billing">Billing</option>
                <option value="consent_forms">Consent Forms</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Records Table */}
        <DataTable
          data={filteredRecords}
          columns={columns}
          filters={filters}
          searchPlaceholder="Search patient records..."
          onExport={() => console.log('Exporting patient records...')}
          actions={actions}
          onRowClick={(record) => handleViewRecord(record)}
          title="Patient Records"
        />

        {/* View Record Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="health-card border-0 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Record Details
              </DialogTitle>
            </DialogHeader>
            {selectedRecord && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Patient</label>
                    <p className="text-foreground font-medium">{selectedRecord.patientName}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Record Type</label>
                    <p className="text-foreground capitalize">{selectedRecord.recordType.replace('_', ' ')}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Date</label>
                    <p className="text-foreground">{new Date(selectedRecord.date).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">File Size</label>
                    <p className="text-foreground">{selectedRecord.fileSize}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Doctor</label>
                    <p className="text-foreground">{selectedRecord.doctor}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Department</label>
                    <p className="text-foreground">{selectedRecord.department}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Description</label>
                  <p className="text-foreground">{selectedRecord.description}</p>
                </div>

                {selectedRecord.tags.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedRecord.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Badge variant={selectedRecord.isConfidential ? 'destructive' : 'secondary'}>
                    {selectedRecord.isConfidential ? 'Confidential' : 'Public'}
                  </Badge>
                  <Badge variant={selectedRecord.status === 'active' ? 'default' : 'secondary'}>
                    {selectedRecord.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsViewModalOpen(false)}
                className="health-btn-secondary"
              >
                Close
              </Button>
              {selectedRecord && (
                <Button 
                  onClick={() => handleDownloadRecord(selectedRecord)}
                  className="health-btn-primary"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Patient Modal */}
        <Dialog open={isPatientModalOpen} onOpenChange={setIsPatientModalOpen}>
          <DialogContent className="health-card border-0 max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                Patient Information
              </DialogTitle>
            </DialogHeader>
            {selectedPatient && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-foreground font-medium">{selectedPatient.name}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-foreground">{selectedPatient.email}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-foreground">{selectedPatient.phone}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                    <p className="text-foreground">{new Date(selectedPatient.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Gender</label>
                    <p className="text-foreground">{selectedPatient.gender}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Last Visit</label>
                  <p className="text-foreground">{new Date(selectedPatient.lastVisit).toLocaleDateString()}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Total Records</label>
                    <p className="text-foreground">{selectedPatient.totalRecords}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Active Records</label>
                    <p className="text-foreground">{selectedPatient.activeRecords}</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsPatientModalOpen(false)}
                className="health-btn-secondary"
              >
                Close
              </Button>
              {selectedPatient && (
                <Button 
                  onClick={() => router.push(`/admin/patients/${selectedPatient.id}`)}
                  className="health-btn-primary"
                >
                  <User className="w-4 h-4 mr-2" />
                  View Patient
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
} 