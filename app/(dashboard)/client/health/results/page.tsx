"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  FileText, 
  Download,
  Eye,
  TrendingUp,
//   TrendingDown,
  Minus,
  AlertCircle,
  CheckCircle,
  Clock,
  Activity,
  Heart,
  Droplets,
//   Thermometer,
  Scale
} from "lucide-react";
// import { useRouter } from "next/navigation";

interface TestResult {
  id: number;
  testName: string;
  testDate: string;
  status: 'normal' | 'abnormal' | 'pending' | 'critical';
  category: string;
  value: string;
  unit: string;
  referenceRange: string;
  doctor: string;
  notes?: string;
  isReviewed: boolean;
}

export default function HealthResultsPage() {
//   const router = useRouter();
  const [selectedResult, setSelectedResult] = useState<TestResult | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const testResults: TestResult[] = [
    {
      id: 1,
      testName: "Complete Blood Count (CBC)",
      testDate: "2024-01-15",
      status: "normal",
      category: "Blood Tests",
      value: "14.2",
      unit: "g/dL",
      referenceRange: "12.0-15.5",
      doctor: "Dr. Sarah Johnson",
      notes: "All values within normal range",
      isReviewed: true
    },
    {
      id: 2,
      testName: "Cholesterol Panel",
      testDate: "2024-01-15",
      status: "abnormal",
      category: "Blood Tests",
      value: "240",
      unit: "mg/dL",
      referenceRange: "<200",
      doctor: "Dr. Sarah Johnson",
      notes: "Elevated LDL cholesterol. Consider dietary changes.",
      isReviewed: true
    },
    {
      id: 3,
      testName: "Blood Glucose",
      testDate: "2024-01-15",
      status: "normal",
      category: "Blood Tests",
      value: "95",
      unit: "mg/dL",
      referenceRange: "70-100",
      doctor: "Dr. Sarah Johnson",
      isReviewed: true
    },
    {
      id: 4,
      testName: "Chest X-Ray",
      testDate: "2024-01-10",
      status: "normal",
      category: "Imaging",
      value: "Normal",
      unit: "",
      referenceRange: "Normal",
      doctor: "Dr. Michael Chen",
      notes: "No abnormalities detected",
      isReviewed: true
    },
    {
      id: 5,
      testName: "ECG",
      testDate: "2024-01-10",
      status: "normal",
      category: "Cardiology",
      value: "Normal sinus rhythm",
      unit: "",
      referenceRange: "Normal",
      doctor: "Dr. Michael Chen",
      isReviewed: true
    },
    {
      id: 6,
      testName: "Urinalysis",
      testDate: "2024-01-20",
      status: "pending",
      category: "Urine Tests",
      value: "Pending",
      unit: "",
      referenceRange: "N/A",
      doctor: "Dr. Lisa Thompson",
      isReviewed: false
    }
  ];

  const categories = ["all", "Blood Tests", "Imaging", "Cardiology", "Urine Tests"];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'normal': return 'secondary';
      case 'abnormal': return 'destructive';
      case 'pending': return 'default';
      case 'critical': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle className="w-4 h-4" />;
      case 'abnormal': return <AlertCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'critical': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (status: string) => {
    switch (status) {
      case 'normal': return <Minus className="w-4 h-4 text-green-600" />;
      case 'abnormal': return <TrendingUp className="w-4 h-4 text-red-600" />;
      case 'pending': return <Minus className="w-4 h-4 text-gray-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredResults = testResults.filter(result => 
    filterCategory === "all" || result.category === filterCategory
  );

  const normalResults = testResults.filter(r => r.status === 'normal').length;
  const abnormalResults = testResults.filter(r => r.status === 'abnormal').length;
  const pendingResults = testResults.filter(r => r.status === 'pending').length;
  const totalResults = testResults.length;

  const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Patient"
  };

  const handleViewResult = (result: TestResult) => {
    setSelectedResult(result);
    setIsViewModalOpen(true);
  };

  const handleDownloadResult = (result: TestResult) => {
    console.log('Downloading result:', result.id);
    // Trigger download
  };

  return (
    <DashboardLayout variant="client" user={mockUser}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Health Results</h1>
            <p className="mt-2 text-muted-foreground">
              View and manage your medical test results and health data.
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
                    <dt className="text-sm font-medium text-muted-foreground truncate">Total Results</dt>
                    <dd className="text-lg font-medium text-foreground">{totalResults}</dd>
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
                    <dt className="text-sm font-medium text-muted-foreground truncate">Normal</dt>
                    <dd className="text-lg font-medium text-foreground">{normalResults}</dd>
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
                    <dt className="text-sm font-medium text-muted-foreground truncate">Abnormal</dt>
                    <dd className="text-lg font-medium text-foreground">{abnormalResults}</dd>
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
                    <dd className="text-lg font-medium text-foreground">{pendingResults}</dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="health-card border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filterCategory === category ? "default" : "outline"}
                  onClick={() => setFilterCategory(category)}
                  className="health-btn-secondary"
                >
                  {category === "all" ? "All Categories" : category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Results List */}
        <div className="space-y-4">
          {filteredResults.map((result) => (
            <Card key={result.id} className="health-card border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        {result.category === "Blood Tests" && <Droplets className="w-6 h-6 text-primary" />}
                        {result.category === "Imaging" && <Activity className="w-6 h-6 text-primary" />}
                        {result.category === "Cardiology" && <Heart className="w-6 h-6 text-primary" />}
                        {result.category === "Urine Tests" && <Scale className="w-6 h-6 text-primary" />}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-foreground">{result.testName}</h3>
                        <Badge variant={getStatusVariant(result.status)} className="status-badge">
                          {getStatusIcon(result.status)}
                          <span className="ml-1">{result.status}</span>
                        </Badge>
                        {getTrendIcon(result.status)}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        <span>{result.category}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(result.testDate).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span>{result.doctor}</span>
                      </div>
                      {result.value !== "Pending" && (
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Result: </span>
                          <span className="text-foreground">{result.value} {result.unit}</span>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <span className="text-muted-foreground">Reference: {result.referenceRange}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewResult(result)}
                      className="health-btn-secondary"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDownloadResult(result)}
                      className="health-btn-secondary"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View Result Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="health-card border-0 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Test Result Details
              </DialogTitle>
            </DialogHeader>
            {selectedResult && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Test Name</label>
                    <p className="text-foreground font-semibold">{selectedResult.testName}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Test Date</label>
                    <p className="text-foreground">{new Date(selectedResult.testDate).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Category</label>
                    <p className="text-foreground">{selectedResult.category}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <Badge variant={getStatusVariant(selectedResult.status)} className="status-badge">
                      {getStatusIcon(selectedResult.status)}
                      <span className="ml-1">{selectedResult.status}</span>
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Result</label>
                    <p className="text-foreground font-semibold">
                      {selectedResult.value} {selectedResult.unit}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Reference Range</label>
                    <p className="text-foreground">{selectedResult.referenceRange}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Ordering Doctor</label>
                    <p className="text-foreground">{selectedResult.doctor}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Reviewed</label>
                    <p className="text-foreground">
                      {selectedResult.isReviewed ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
                
                {selectedResult.notes && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Notes</label>
                    <p className="text-foreground">{selectedResult.notes}</p>
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
              {selectedResult && (
                <Button 
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handleDownloadResult(selectedResult);
                  }}
                  className="health-btn-primary"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
} 