"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DataTable } from "@/components/customs/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  FileText, 
//   Calendar, 
  User, 
  Download,
  Eye,
//   Plus,
  AlertCircle,
  CheckCircle,
  Clock,
  Activity,
  Heart,
  Pill
} from "lucide-react";
import { useRouter } from "next/navigation";

interface MedicalRecord {
  id: number;
  date: string;
  type: 'appointment' | 'test' | 'procedure' | 'vaccination' | 'surgery';
  title: string;
  doctor: string;
  department: string;
  diagnosis?: string;
  treatment?: string;
  notes: string;
  status: 'completed' | 'scheduled' | 'cancelled';
  attachments?: string[];
}

interface Condition {
  id: number;
  name: string;
  diagnosisDate: string;
  status: 'active' | 'resolved' | 'chronic';
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
  treatment: string;
}

interface Allergy {
  id: number;
  allergen: string;
  reaction: string;
  severity: 'mild' | 'moderate' | 'severe';
  discoveredDate: string;
  notes: string;
}

export default function MedicalHistoryPage() {
  const router = useRouter();
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('records');

  const medicalRecords: MedicalRecord[] = [
    {
      id: 1,
      date: '2024-01-15',
      type: 'appointment',
      title: 'Annual Physical Examination',
      doctor: 'Dr. Sarah Johnson',
      department: 'General Medicine',
      diagnosis: 'Healthy - No issues found',
      treatment: 'Continue current lifestyle and diet',
      notes: 'Patient is in good health. Blood pressure and heart rate normal. Recommended annual checkup in 6 months.',
      status: 'completed',
      attachments: ['blood_work_results.pdf', 'physical_exam_report.pdf']
    },
    {
      id: 2,
      date: '2024-01-10',
      type: 'test',
      title: 'Blood Work - Comprehensive Panel',
      doctor: 'Dr. Sarah Johnson',
      department: 'Laboratory',
      diagnosis: 'Normal results',
      treatment: 'No treatment required',
      notes: 'All values within normal range. Cholesterol slightly elevated but within acceptable limits.',
      status: 'completed',
      attachments: ['blood_work_results.pdf']
    },
    {
      id: 3,
      date: '2024-01-05',
      type: 'procedure',
      title: 'ECG - Cardiac Assessment',
      doctor: 'Dr. Michael Chen',
      department: 'Cardiology',
      diagnosis: 'Normal sinus rhythm',
      treatment: 'Continue current medications',
      notes: 'ECG shows normal sinus rhythm. No signs of cardiac abnormalities. Patient reports no chest pain or shortness of breath.',
      status: 'completed',
      attachments: ['ecg_report.pdf', 'cardiac_assessment.pdf']
    },
    {
      id: 4,
      date: '2023-12-20',
      type: 'vaccination',
      title: 'Flu Shot',
      doctor: 'Nurse Emily Rodriguez',
      department: 'General Medicine',
      notes: 'Annual flu vaccination administered. No adverse reactions reported.',
      status: 'completed'
    },
    {
      id: 5,
      date: '2023-12-15',
      type: 'appointment',
      title: 'Follow-up Consultation',
      doctor: 'Dr. Lisa Thompson',
      department: 'Pediatrics',
      diagnosis: 'Recovery progressing well',
      treatment: 'Continue prescribed treatment',
      notes: 'Follow-up for previous condition. Patient showing significant improvement. Continue current treatment plan.',
      status: 'completed'
    }
  ];

  const conditions: Condition[] = [
    {
      id: 1,
      name: 'Hypertension',
      diagnosisDate: '2020-03-15',
      status: 'chronic',
      severity: 'mild',
      description: 'Mild hypertension managed with medication',
      treatment: 'Lisinopril 10mg daily, lifestyle modifications'
    },
    {
      id: 2,
      name: 'Type 2 Diabetes',
      diagnosisDate: '2021-06-20',
      status: 'chronic',
      severity: 'moderate',
      description: 'Type 2 diabetes managed with diet and medication',
      treatment: 'Metformin 500mg twice daily, diet control'
    },
    {
      id: 3,
      name: 'Knee Sprain',
      diagnosisDate: '2023-12-10',
      status: 'resolved',
      severity: 'mild',
      description: 'Minor knee sprain from sports injury',
      treatment: 'RICE therapy, physical therapy completed'
    }
  ];

  const allergies: Allergy[] = [
    {
      id: 1,
      allergen: 'Penicillin',
      reaction: 'Rash and hives',
      severity: 'moderate',
      discoveredDate: '2018-05-10',
      notes: 'Allergic reaction to penicillin antibiotics. Alternative medications should be prescribed.'
    },
    {
      id: 2,
      allergen: 'Peanuts',
      reaction: 'Swelling, difficulty breathing',
      severity: 'severe',
      discoveredDate: '2015-08-22',
      notes: 'Severe peanut allergy. Carry epinephrine auto-injector at all times.'
    }
  ];

  const columns = [
    {
      key: 'date',
      title: 'Date',
      render: (record: MedicalRecord) => (
        <div className="font-medium">
          {new Date(record.date).toLocaleDateString()}
        </div>
      )
    },
    {
      key: 'type',
      title: 'Type',
      render: (record: MedicalRecord) => {
        const getTypeIcon = (type: string) => {
          switch (type) {
            case 'appointment': return <User className="w-4 h-4" />;
            case 'test': return <Activity className="w-4 h-4" />;
            case 'procedure': return <Heart className="w-4 h-4" />;
            case 'vaccination': return <Pill className="w-4 h-4" />;
            case 'surgery': return <AlertCircle className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
          }
        };

        return (
          <div className="flex items-center space-x-2">
            {getTypeIcon(record.type)}
            <span className="capitalize">{record.type}</span>
          </div>
        );
      }
    },
    {
      key: 'title',
      title: 'Title',
      render: (record: MedicalRecord) => (
        <div className="font-medium">{record.title}</div>
      )
    },
    {
      key: 'doctor',
      title: 'Doctor',
      render: (record: MedicalRecord) => (
        <div>
          <div className="font-medium">{record.doctor}</div>
          <div className="text-sm text-muted-foreground">{record.department}</div>
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (record: MedicalRecord) => {
        const getStatusVariant = (status: string) => {
          switch (status) {
            case 'completed': return 'secondary';
            case 'scheduled': return 'default';
            case 'cancelled': return 'destructive';
            default: return 'outline';
          }
        };
        
        const getStatusIcon = (status: string) => {
          switch (status) {
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            case 'scheduled': return <Clock className="w-4 h-4" />;
            case 'cancelled': return <AlertCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
          }
        };

        return (
          <Badge variant={getStatusVariant(record.status)} className="status-badge">
            {getStatusIcon(record.status)}
            <span className="ml-1">{record.status}</span>
          </Badge>
        );
      }
    }
  ];

  const filters = [
    {
      key: 'type',
      label: 'Type',
      options: [
        { value: 'appointment', label: 'Appointment' },
        { value: 'test', label: 'Test' },
        { value: 'procedure', label: 'Procedure' },
        { value: 'vaccination', label: 'Vaccination' },
        { value: 'surgery', label: 'Surgery' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'completed', label: 'Completed' },
        { value: 'scheduled', label: 'Scheduled' },
        { value: 'cancelled', label: 'Cancelled' }
      ]
    }
  ];

  const handleViewRecord = (record: MedicalRecord) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };

  const handleDownloadRecord = (record: MedicalRecord) => {
    console.log('Downloading record:', record.id);
    // Trigger download
  };

  const actions = (record: MedicalRecord) => (
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
      {record.attachments && record.attachments.length > 0 && (
        <Button 
          variant="link" 
          size="sm" 
          onClick={() => handleDownloadRecord(record)}
          className="text-accent hover:text-accent/80"
        >
          <Download className="w-4 h-4 mr-1" />
          Download
        </Button>
      )}
    </div>
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-orange-600 bg-orange-100';
      case 'severe': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-600 bg-red-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'chronic': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
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
          <div>
            <h1 className="text-3xl font-bold text-foreground">Medical History</h1>
            <p className="mt-2 text-muted-foreground">
              View your complete medical records, conditions, and allergies.
            </p>
          </div>
          <Button 
            onClick={() => router.push('/client/documents')}
            className="health-btn-primary"
          >
            <Download className="w-4 h-4 mr-2" />
            Download All Records
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          <Button
            variant={activeTab === 'records' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('records')}
            className="flex-1"
          >
            Medical Records
          </Button>
          <Button
            variant={activeTab === 'conditions' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('conditions')}
            className="flex-1"
          >
            Conditions
          </Button>
          <Button
            variant={activeTab === 'allergies' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('allergies')}
            className="flex-1"
          >
            Allergies
          </Button>
        </div>

        {/* Medical Records Tab */}
        {activeTab === 'records' && (
          <DataTable
            data={medicalRecords}
            columns={columns}
            filters={filters}
            searchPlaceholder="Search medical records..."
            onExport={() => console.log('Exporting medical records...')}
            actions={actions}
            onRowClick={(record) => handleViewRecord(record)}
            title="Medical Records"
          />
        )}

        {/* Conditions Tab */}
        {activeTab === 'conditions' && (
          <div className="space-y-6">
            <Card className="health-card border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-primary" />
                  Medical Conditions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conditions.map((condition) => (
                    <div key={condition.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium text-foreground">{condition.name}</h4>
                            <Badge className={getStatusColor(condition.status)}>
                              {condition.status}
                            </Badge>
                            <Badge className={getSeverityColor(condition.severity)}>
                              {condition.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Diagnosed: {new Date(condition.diagnosisDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-foreground mb-2">{condition.description}</p>
                          <p className="text-sm text-foreground">
                            <span className="font-medium">Treatment:</span> {condition.treatment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Allergies Tab */}
        {activeTab === 'allergies' && (
          <div className="space-y-6">
            <Card className="health-card border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-primary" />
                  Allergies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allergies.map((allergy) => (
                    <div key={allergy.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium text-foreground">{allergy.allergen}</h4>
                            <Badge className={getSeverityColor(allergy.severity)}>
                              {allergy.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Discovered: {new Date(allergy.discoveredDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-foreground mb-2">
                            <span className="font-medium">Reaction:</span> {allergy.reaction}
                          </p>
                          <p className="text-sm text-foreground">{allergy.notes}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* View Record Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="health-card border-0 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Medical Record Details
              </DialogTitle>
            </DialogHeader>
            {selectedRecord && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Date</label>
                    <p className="text-foreground">{new Date(selectedRecord.date).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Type</label>
                    <p className="text-foreground capitalize">{selectedRecord.type}</p>
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
                
                {selectedRecord.diagnosis && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Diagnosis</label>
                    <p className="text-foreground">{selectedRecord.diagnosis}</p>
                  </div>
                )}
                
                {selectedRecord.treatment && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Treatment</label>
                    <p className="text-foreground">{selectedRecord.treatment}</p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Notes</label>
                  <p className="text-foreground">{selectedRecord.notes}</p>
                </div>

                {selectedRecord.attachments && selectedRecord.attachments.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Attachments</label>
                    <div className="space-y-2">
                      {selectedRecord.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm">{attachment}</span>
                          <Button variant="link" size="sm" className="text-primary">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
              {selectedRecord && selectedRecord.attachments && selectedRecord.attachments.length > 0 && (
                <Button 
                  onClick={() => handleDownloadRecord(selectedRecord)}
                  className="health-btn-primary"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
} 