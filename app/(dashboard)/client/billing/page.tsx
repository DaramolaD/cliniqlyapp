"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DataTable } from "@/components/customs/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  CreditCard, 
  DollarSign, 
  FileText, 
  Download,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
//   ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

interface Bill {
  id: number;
  date: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  description: string;
  insuranceCoverage?: number;
  patientResponsibility: number;
  appointmentId?: number;
  appointmentType?: string;
}

export default function ClientBillingPage() {
  const router = useRouter();
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const bills: Bill[] = [
    {
      id: 1,
      date: '2024-01-15',
      dueDate: '2024-02-15',
      amount: 150.00,
      status: 'paid',
      description: 'General Consultation - Dr. Sarah Johnson',
      insuranceCoverage: 120.00,
      patientResponsibility: 30.00,
      appointmentId: 1,
      appointmentType: 'Consultation'
    },
    {
      id: 2,
      date: '2024-01-10',
      dueDate: '2024-02-10',
      amount: 250.00,
      status: 'pending',
      description: 'Cardiology Consultation - Dr. Michael Chen',
      insuranceCoverage: 200.00,
      patientResponsibility: 50.00,
      appointmentId: 2,
      appointmentType: 'Specialist Visit'
    },
    {
      id: 3,
      date: '2024-01-05',
      dueDate: '2024-02-05',
      amount: 75.00,
      status: 'overdue',
      description: 'Follow-up Visit - Dr. Lisa Thompson',
      insuranceCoverage: 60.00,
      patientResponsibility: 15.00,
      appointmentId: 3,
      appointmentType: 'Follow-up'
    },
    {
      id: 4,
      date: '2024-01-20',
      dueDate: '2024-02-20',
      amount: 300.00,
      status: 'pending',
      description: 'Laboratory Tests - Blood Work',
      insuranceCoverage: 240.00,
      patientResponsibility: 60.00,
      appointmentType: 'Laboratory'
    }
  ];

  const columns = [
    {
      key: 'date',
      title: 'Bill Date',
      render: (bill: Bill) => (
        <div>
          <div className="font-medium">{new Date(bill.date).toLocaleDateString()}</div>
          <div className="text-sm text-muted-foreground">Due: {new Date(bill.dueDate).toLocaleDateString()}</div>
        </div>
      )
    },
    {
      key: 'description',
      title: 'Description',
      render: (bill: Bill) => (
        <div>
          <div className="font-medium">{bill.description}</div>
          {bill.appointmentType && (
            <div className="text-sm text-muted-foreground">{bill.appointmentType}</div>
          )}
        </div>
      )
    },
    {
      key: 'amount',
      title: 'Amount',
      render: (bill: Bill) => (
        <div>
          <div className="font-medium">${bill.amount.toFixed(2)}</div>
          {bill.insuranceCoverage && (
            <div className="text-sm text-muted-foreground">
              Insurance: ${bill.insuranceCoverage.toFixed(2)}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'patientResponsibility',
      title: 'Your Responsibility',
      render: (bill: Bill) => (
        <div className="font-semibold text-foreground">
          ${bill.patientResponsibility.toFixed(2)}
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (bill: Bill) => {
        const getStatusVariant = (status: string) => {
          switch (status) {
            case 'paid': return 'secondary';
            case 'pending': return 'default';
            case 'overdue': return 'destructive';
            case 'cancelled': return 'outline';
            default: return 'outline';
          }
        };
        
        const getStatusIcon = (status: string) => {
          switch (status) {
            case 'paid': return <CheckCircle className="w-4 h-4" />;
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'overdue': return <AlertCircle className="w-4 h-4" />;
            case 'cancelled': return <AlertCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
          }
        };

        return (
          <Badge variant={getStatusVariant(bill.status)} className="status-badge">
            {getStatusIcon(bill.status)}
            <span className="ml-1">{bill.status}</span>
          </Badge>
        );
      }
    }
  ];

  const filters = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'paid', label: 'Paid' },
        { value: 'pending', label: 'Pending' },
        { value: 'overdue', label: 'Overdue' },
        { value: 'cancelled', label: 'Cancelled' }
      ]
    }
  ];

  const handleViewBill = (bill: Bill) => {
    setSelectedBill(bill);
    setIsViewModalOpen(true);
  };

  const handlePayBill = (bill: Bill) => {
    console.log('Paying bill:', bill.id);
    // Navigate to payment page or open payment modal
  };

  const handleDownloadBill = (bill: Bill) => {
    console.log('Downloading bill:', bill.id);
    // Trigger download
  };

  const actions = (bill: Bill) => (
    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
      <Button 
        variant="link" 
        size="sm" 
        onClick={() => handleViewBill(bill)}
        className="text-primary hover:text-primary/80"
      >
        <Eye className="w-4 h-4 mr-1" />
        View
      </Button>
      <Button 
        variant="link" 
        size="sm" 
        onClick={() => handleDownloadBill(bill)}
        className="text-accent hover:text-accent/80"
      >
        <Download className="w-4 h-4 mr-1" />
        Download
      </Button>
      {bill.status === 'pending' || bill.status === 'overdue' ? (
        <Button 
          variant="link" 
          size="sm" 
          onClick={() => handlePayBill(bill)}
          className="text-green-600 hover:text-green-700"
        >
          <CreditCard className="w-4 h-4 mr-1" />
          Pay
        </Button>
      ) : null}
    </div>
  );

  const totalBills = bills.length;
  const paidBills = bills.filter(b => b.status === 'paid').length;
  const pendingBills = bills.filter(b => b.status === 'pending').length;
//   const overdueBills = bills.filter(b => b.status === 'overdue').length;
  const totalAmount = bills.reduce((sum, bill) => sum + bill.patientResponsibility, 0);

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
            <h1 className="text-3xl font-bold text-foreground">Billing & Payments</h1>
            <p className="mt-2 text-muted-foreground">
              View and manage your medical bills and payments.
            </p>
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
                    <dt className="text-sm font-medium text-muted-foreground truncate">Total Bills</dt>
                    <dd className="text-lg font-medium text-foreground">{totalBills}</dd>
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
                    <dt className="text-sm font-medium text-muted-foreground truncate">Paid</dt>
                    <dd className="text-lg font-medium text-foreground">{paidBills}</dd>
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
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Pending</dt>
                    <dd className="text-lg font-medium text-foreground">{pendingBills}</dd>
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
                    <DollarSign className="w-5 h-5 text-red-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Total Due</dt>
                    <dd className="text-lg font-medium text-foreground">${totalAmount.toFixed(2)}</dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bills Table */}
        <DataTable
          data={bills}
          columns={columns}
          filters={filters}
          searchPlaceholder="Search bills..."
          onExport={() => console.log('Exporting bills...')}
          actions={actions}
          onRowClick={(bill) => handleViewBill(bill)}
          title="Medical Bills"
        />

        {/* Quick Actions */}
        <Card className="health-card border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="health-btn-secondary"
                onClick={() => router.push('/client/billing/payment-methods')}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Manage Payment Methods
              </Button>
              <Button 
                variant="outline" 
                className="health-btn-secondary"
                onClick={() => router.push('/client/billing/insurance')}
              >
                <FileText className="w-4 h-4 mr-2" />
                Update Insurance
              </Button>
              <Button 
                variant="outline" 
                className="health-btn-secondary"
                onClick={() => router.push('/client/billing/payment-history')}
              >
                <FileText className="w-4 h-4 mr-2" />
                Payment History
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* View Bill Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="health-card border-0 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Bill Details
              </DialogTitle>
            </DialogHeader>
            {selectedBill && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Bill Date</Label>
                    <p className="text-foreground">{new Date(selectedBill.date).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Due Date</Label>
                    <p className="text-foreground">{new Date(selectedBill.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Total Amount</Label>
                    <p className="text-foreground font-semibold">${selectedBill.amount.toFixed(2)}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Your Responsibility</Label>
                    <p className="text-foreground font-semibold">${selectedBill.patientResponsibility.toFixed(2)}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                    <Badge variant={
                      selectedBill.status === 'paid' ? 'secondary' :
                      selectedBill.status === 'pending' ? 'default' :
                      selectedBill.status === 'overdue' ? 'destructive' : 'outline'
                    }>
                      {selectedBill.status}
                    </Badge>
                  </div>
                  {selectedBill.insuranceCoverage && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">Insurance Coverage</Label>
                      <p className="text-foreground">${selectedBill.insuranceCoverage.toFixed(2)}</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                  <p className="text-foreground">{selectedBill.description}</p>
                </div>
                
                {selectedBill.appointmentType && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Service Type</Label>
                    <p className="text-foreground">{selectedBill.appointmentType}</p>
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
              {selectedBill && (selectedBill.status === 'pending' || selectedBill.status === 'overdue') && (
                <Button 
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handlePayBill(selectedBill);
                  }}
                  className="health-btn-primary"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay Now
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
} 