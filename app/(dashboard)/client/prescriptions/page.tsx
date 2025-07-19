"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DataTable } from "@/components/customs/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Pill, 
  Calendar, 
//   User, 
//   FileText, 
  Download,
  Eye,
  Plus,
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw,
  XCircle
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Prescription {
  id: number;
  medicationName: string;
  genericName: string;
  dosage: string;
  frequency: string;
  quantity: number;
  refills: number;
  prescribedDate: string;
  expiryDate: string;
  doctor: string;
  pharmacy: string;
  status: 'active' | 'completed' | 'discontinued' | 'expired';
  instructions: string;
  sideEffects: string[];
  interactions: string[];
  nextRefillDate?: string;
  lastFilledDate?: string;
}

export default function ClientPrescriptionsPage() {
  const router = useRouter();
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isRefillModalOpen, setIsRefillModalOpen] = useState(false);

  const prescriptions: Prescription[] = [
    {
      id: 1,
      medicationName: 'Lisinopril',
      genericName: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      quantity: 30,
      refills: 3,
      prescribedDate: '2024-01-01',
      expiryDate: '2025-01-01',
      doctor: 'Dr. Sarah Johnson',
      pharmacy: 'CVS Pharmacy - Main St',
      status: 'active',
      instructions: 'Take 1 tablet by mouth once daily in the morning. Take with or without food.',
      sideEffects: ['Dizziness', 'Dry cough', 'Fatigue', 'Headache'],
      interactions: ['NSAIDs', 'Lithium', 'Diuretics'],
      nextRefillDate: '2024-02-01',
      lastFilledDate: '2024-01-01'
    },
    {
      id: 2,
      medicationName: 'Metformin',
      genericName: 'Metformin Hydrochloride',
      dosage: '500mg',
      frequency: 'Twice daily',
      quantity: 60,
      refills: 2,
      prescribedDate: '2024-01-05',
      expiryDate: '2025-01-05',
      doctor: 'Dr. Sarah Johnson',
      pharmacy: 'Walgreens - Downtown',
      status: 'active',
      instructions: 'Take 1 tablet by mouth twice daily with meals. Start with 500mg once daily for the first week.',
      sideEffects: ['Nausea', 'Diarrhea', 'Stomach upset', 'Loss of appetite'],
      interactions: ['Alcohol', 'Contrast dye', 'Other diabetes medications'],
      nextRefillDate: '2024-01-25',
      lastFilledDate: '2024-01-05'
    },
    {
      id: 3,
      medicationName: 'Ibuprofen',
      genericName: 'Ibuprofen',
      dosage: '400mg',
      frequency: 'As needed',
      quantity: 50,
      refills: 5,
      prescribedDate: '2023-12-15',
      expiryDate: '2024-12-15',
      doctor: 'Dr. Lisa Thompson',
      pharmacy: 'CVS Pharmacy - Main St',
      status: 'active',
      instructions: 'Take 1-2 tablets every 4-6 hours as needed for pain or fever. Do not exceed 6 tablets in 24 hours.',
      sideEffects: ['Stomach upset', 'Heartburn', 'Dizziness', 'Rash'],
      interactions: ['Blood thinners', 'Other NSAIDs', 'ACE inhibitors'],
      lastFilledDate: '2023-12-15'
    },
    {
      id: 4,
      medicationName: 'Amoxicillin',
      genericName: 'Amoxicillin',
      dosage: '500mg',
      frequency: 'Three times daily',
      quantity: 21,
      refills: 0,
      prescribedDate: '2024-01-10',
      expiryDate: '2024-02-10',
      doctor: 'Dr. Michael Chen',
      pharmacy: 'Walgreens - Downtown',
      status: 'completed',
      instructions: 'Take 1 capsule three times daily for 7 days. Take with food to reduce stomach upset.',
      sideEffects: ['Diarrhea', 'Nausea', 'Rash', 'Yeast infection'],
      interactions: ['Birth control pills', 'Probenecid', 'Allopurinol'],
      lastFilledDate: '2024-01-10'
    },
    {
      id: 5,
      medicationName: 'Atorvastatin',
      genericName: 'Atorvastatin Calcium',
      dosage: '20mg',
      frequency: 'Once daily',
      quantity: 30,
      refills: 0,
      prescribedDate: '2023-11-01',
      expiryDate: '2024-11-01',
      doctor: 'Dr. Sarah Johnson',
      pharmacy: 'CVS Pharmacy - Main St',
      status: 'discontinued',
      instructions: 'Take 1 tablet by mouth once daily in the evening. Take with or without food.',
      sideEffects: ['Muscle pain', 'Liver problems', 'Memory loss', 'Diabetes risk'],
      interactions: ['Grapefruit juice', 'Other cholesterol medications', 'Blood thinners'],
      lastFilledDate: '2023-11-01'
    }
  ];

  const columns = [
    {
      key: 'medicationName',
      title: 'Medication',
      render: (prescription: Prescription) => (
        <div>
          <div className="font-medium text-foreground">{prescription.medicationName}</div>
          <div className="text-sm text-muted-foreground">{prescription.genericName}</div>
        </div>
      )
    },
    {
      key: 'dosage',
      title: 'Dosage & Frequency',
      render: (prescription: Prescription) => (
        <div>
          <div className="font-medium text-foreground">{prescription.dosage}</div>
          <div className="text-sm text-muted-foreground">{prescription.frequency}</div>
        </div>
      )
    },
    {
      key: 'doctor',
      title: 'Prescribed By',
      render: (prescription: Prescription) => (
        <div className="text-sm text-muted-foreground">{prescription.doctor}</div>
      )
    },
    {
      key: 'pharmacy',
      title: 'Pharmacy',
      render: (prescription: Prescription) => (
        <div className="text-sm text-muted-foreground">{prescription.pharmacy}</div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (prescription: Prescription) => {
        const getStatusVariant = (status: string) => {
          switch (status) {
            case 'active': return 'default';
            case 'completed': return 'secondary';
            case 'discontinued': return 'destructive';
            case 'expired': return 'outline';
            default: return 'outline';
          }
        };
        
        const getStatusIcon = (status: string) => {
          switch (status) {
            case 'active': return <CheckCircle className="w-4 h-4" />;
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            case 'discontinued': return <XCircle className="w-4 h-4" />;
            case 'expired': return <AlertCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
          }
        };

        return (
          <Badge variant={getStatusVariant(prescription.status)} className="status-badge">
            {getStatusIcon(prescription.status)}
            <span className="ml-1">{prescription.status}</span>
          </Badge>
        );
      }
    },
    {
      key: 'refills',
      title: 'Refills',
      render: (prescription: Prescription) => (
        <div className="text-center">
          <div className="font-medium text-foreground">{prescription.refills}</div>
          <div className="text-xs text-muted-foreground">remaining</div>
        </div>
      )
    }
  ];

  const filters = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' },
        { value: 'discontinued', label: 'Discontinued' },
        { value: 'expired', label: 'Expired' }
      ]
    }
  ];

  const handleViewPrescription = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setIsViewModalOpen(true);
  };

  const handleRefillPrescription = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setIsRefillModalOpen(true);
  };

  const handleDownloadPrescription = (prescription: Prescription) => {
    console.log('Downloading prescription:', prescription.id);
    // Trigger download
  };

  const handleRequestRefill = async () => {
    if (!selectedPrescription) return;

    console.log('Requesting refill for prescription:', selectedPrescription.id);
    setIsRefillModalOpen(false);
    // In a real app, you'd send the refill request
  };

  const actions = (prescription: Prescription) => (
    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
      <Button 
        variant="link" 
        size="sm" 
        onClick={() => handleViewPrescription(prescription)}
        className="text-primary hover:text-primary/80"
      >
        <Eye className="w-4 h-4 mr-1" />
        View
      </Button>
      <Button 
        variant="link" 
        size="sm" 
        onClick={() => handleDownloadPrescription(prescription)}
        className="text-accent hover:text-accent/80"
      >
        <Download className="w-4 h-4 mr-1" />
        Download
      </Button>
      {prescription.status === 'active' && prescription.refills > 0 && (
        <Button 
          variant="link" 
          size="sm" 
          onClick={() => handleRefillPrescription(prescription)}
          className="text-green-600 hover:text-green-700"
        >
          <RefreshCw className="w-4 h-4 mr-1" />
          Refill
        </Button>
      )}
    </div>
  );

  const activePrescriptions = prescriptions.filter(p => p.status === 'active').length;
  const needsRefill = prescriptions.filter(p => p.status === 'active' && p.nextRefillDate && new Date(p.nextRefillDate) <= new Date()).length;
  const totalRefills = prescriptions.reduce((sum, p) => sum + p.refills, 0);

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
            <h1 className="text-3xl font-bold text-foreground">Prescriptions</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your medications and prescription refills.
            </p>
          </div>
          <Button 
            onClick={() => router.push('/client/appointments/book')}
            className="health-btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Request New Prescription
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="health-card border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Pill className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Active Prescriptions</dt>
                    <dd className="text-lg font-medium text-foreground">{activePrescriptions}</dd>
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
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Need Refill</dt>
                    <dd className="text-lg font-medium text-foreground">{needsRefill}</dd>
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
                    <RefreshCw className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Total Refills</dt>
                    <dd className="text-lg font-medium text-foreground">{totalRefills}</dd>
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
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Next Refill</dt>
                    <dd className="text-lg font-medium text-foreground">
                      {prescriptions.find(p => p.nextRefillDate && new Date(p.nextRefillDate) > new Date())?.nextRefillDate 
                        ? new Date(prescriptions.find(p => p.nextRefillDate && new Date(p.nextRefillDate) > new Date())!.nextRefillDate!).toLocaleDateString()
                        : 'N/A'
                      }
                    </dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Prescriptions Table */}
        <DataTable
          data={prescriptions}
          columns={columns}
          filters={filters}
          searchPlaceholder="Search prescriptions..."
          onExport={() => console.log('Exporting prescriptions...')}
          actions={actions}
          onRowClick={(prescription) => handleViewPrescription(prescription)}
          title="My Prescriptions"
        />

        {/* View Prescription Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="health-card border-0 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Pill className="w-5 h-5 mr-2 text-primary" />
                Prescription Details
              </DialogTitle>
            </DialogHeader>
            {selectedPrescription && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Medication</label>
                    <p className="text-foreground font-medium">{selectedPrescription.medicationName}</p>
                    <p className="text-sm text-muted-foreground">{selectedPrescription.genericName}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Dosage</label>
                    <p className="text-foreground">{selectedPrescription.dosage} • {selectedPrescription.frequency}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Prescribed By</label>
                    <p className="text-foreground">{selectedPrescription.doctor}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Pharmacy</label>
                    <p className="text-foreground">{selectedPrescription.pharmacy}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Quantity</label>
                    <p className="text-foreground">{selectedPrescription.quantity} tablets</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Refills Remaining</label>
                    <p className="text-foreground">{selectedPrescription.refills}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Instructions</label>
                  <p className="text-foreground">{selectedPrescription.instructions}</p>
                </div>

                {selectedPrescription.sideEffects.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Side Effects</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedPrescription.sideEffects.map((effect, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {effect}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPrescription.interactions.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Drug Interactions</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedPrescription.interactions.map((interaction, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {interaction}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Prescribed Date</label>
                    <p className="text-foreground">{new Date(selectedPrescription.prescribedDate).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Expiry Date</label>
                    <p className="text-foreground">{new Date(selectedPrescription.expiryDate).toLocaleDateString()}</p>
                  </div>
                  {selectedPrescription.lastFilledDate && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Last Filled</label>
                      <p className="text-foreground">{new Date(selectedPrescription.lastFilledDate).toLocaleDateString()}</p>
                    </div>
                  )}
                  {selectedPrescription.nextRefillDate && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Next Refill</label>
                      <p className="text-foreground">{new Date(selectedPrescription.nextRefillDate).toLocaleDateString()}</p>
                    </div>
                  )}
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
              {selectedPrescription && selectedPrescription.status === 'active' && selectedPrescription.refills > 0 && (
                <Button 
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handleRefillPrescription(selectedPrescription);
                  }}
                  className="health-btn-primary"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Request Refill
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Refill Request Modal */}
        <Dialog open={isRefillModalOpen} onOpenChange={setIsRefillModalOpen}>
          <DialogContent className="health-card border-0 max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <RefreshCw className="w-5 h-5 mr-2 text-primary" />
                Request Refill
              </DialogTitle>
              <DialogDescription>
                Request a refill for {selectedPrescription?.medicationName} from your pharmacy.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Pharmacy:</strong> {selectedPrescription?.pharmacy}
                </p>
                <p className="text-sm text-blue-800">
                  <strong>Refills Remaining:</strong> {selectedPrescription?.refills}
                </p>
                {selectedPrescription?.nextRefillDate && (
                  <p className="text-sm text-blue-800">
                    <strong>Next Refill Date:</strong> {new Date(selectedPrescription.nextRefillDate).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Special Instructions (Optional)</label>
                <textarea
                  placeholder="Any special instructions for the pharmacy..."
                  rows={3}
                  className="w-full p-3 border border-border rounded-lg bg-background resize-none"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsRefillModalOpen(false)}
                className="health-btn-secondary"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleRequestRefill}
                className="health-btn-primary"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Request Refill
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
} 