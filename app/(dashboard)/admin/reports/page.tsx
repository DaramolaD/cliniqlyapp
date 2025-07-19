"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  BarChart3, 
//   TrendingUp, 
  Users, 
  Calendar,
  Download,
//   Filter,
//   Calendar as CalendarIcon,
  Activity,
  DollarSign,
  FileText,
  PieChart,
  LineChart,
  Trash2
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ReportData {
  id: number;
  name: string;
  type: 'appointments' | 'revenue' | 'patients' | 'staff' | 'inventory' | 'custom';
  dateRange: string;
  generatedDate: string;
  status: 'ready' | 'processing' | 'failed';
  fileSize: string;
  format: 'pdf' | 'excel' | 'csv';
}

interface AnalyticsData {
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  totalPatients: number;
  newPatients: number;
  totalRevenue: number;
  averageRevenue: number;
  staffUtilization: number;
  patientSatisfaction: number;
}

export default function AdminReportsPage() {
  const router = useRouter();
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('last_30_days');
  const [selectedReportType, setSelectedReportType] = useState('appointments');

  const reports: ReportData[] = [
    {
      id: 1,
      name: 'Monthly Appointments Report',
      type: 'appointments',
      dateRange: 'January 2024',
      generatedDate: '2024-01-31T10:30:00',
      status: 'ready',
      fileSize: '2.3 MB',
      format: 'pdf'
    },
    {
      id: 2,
      name: 'Revenue Analysis Q4 2023',
      type: 'revenue',
      dateRange: 'October - December 2023',
      generatedDate: '2024-01-15T14:20:00',
      status: 'ready',
      fileSize: '1.8 MB',
      format: 'excel'
    },
    {
      id: 3,
      name: 'Patient Demographics Report',
      type: 'patients',
      dateRange: 'Last 12 months',
      generatedDate: '2024-01-10T09:15:00',
      status: 'ready',
      fileSize: '3.1 MB',
      format: 'pdf'
    },
    {
      id: 4,
      name: 'Staff Performance Report',
      type: 'staff',
      dateRange: 'December 2023',
      generatedDate: '2024-01-05T16:45:00',
      status: 'ready',
      fileSize: '1.5 MB',
      format: 'excel'
    },
    {
      id: 5,
      name: 'Inventory Status Report',
      type: 'inventory',
      dateRange: 'Current Month',
      generatedDate: '2024-01-20T11:00:00',
      status: 'processing',
      fileSize: '0.8 MB',
      format: 'csv'
    }
  ];

  const analyticsData: AnalyticsData = {
    totalAppointments: 1247,
    completedAppointments: 1189,
    cancelledAppointments: 58,
    totalPatients: 456,
    newPatients: 23,
    totalRevenue: 125000,
    averageRevenue: 105,
    staffUtilization: 87,
    patientSatisfaction: 4.6
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-orange-600 bg-orange-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return '✓';
      case 'processing': return '⏳';
      case 'failed': return '✗';
      default: return '?';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf': return <FileText className="w-4 h-4 text-red-500" />;
      case 'excel': return <BarChart3 className="w-4 h-4 text-green-500" />;
      case 'csv': return <FileText className="w-4 h-4 text-blue-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleViewReport = (report: ReportData) => {
    setSelectedReport(report);
    setIsViewModalOpen(true);
  };

  const handleDownloadReport = (report: ReportData) => {
    console.log('Downloading report:', report.id);
    // Trigger download
  };

  const handleGenerateReport = async () => {
    console.log('Generating report:', { type: selectedReportType, dateRange: selectedDateRange });
    setIsGenerateModalOpen(false);
  };

  const handleDeleteReport = (report: ReportData) => {
    console.log('Deleting report:', report.id);
    setIsViewModalOpen(false);
  };

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
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="mt-2 text-muted-foreground">
              Generate and view comprehensive reports and analytics.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setIsGenerateModalOpen(true)}
              className="health-btn-secondary"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button 
              onClick={() => console.log('Exporting all reports...')}
              className="health-btn-primary"
            >
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="health-card border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Total Appointments</dt>
                    <dd className="text-lg font-medium text-foreground">{analyticsData.totalAppointments}</dd>
                    <dd className="text-xs text-muted-foreground">
                      {analyticsData.completedAppointments} completed
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
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Total Patients</dt>
                    <dd className="text-lg font-medium text-foreground">{analyticsData.totalPatients}</dd>
                    <dd className="text-xs text-muted-foreground">
                      {analyticsData.newPatients} new this month
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
                    <DollarSign className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Total Revenue</dt>
                    <dd className="text-lg font-medium text-foreground">
                      ${analyticsData.totalRevenue.toLocaleString()}
                    </dd>
                    <dd className="text-xs text-muted-foreground">
                      ${analyticsData.averageRevenue} avg per visit
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
                    <Activity className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Staff Utilization</dt>
                    <dd className="text-lg font-medium text-foreground">{analyticsData.staffUtilization}%</dd>
                    <dd className="text-xs text-muted-foreground">
                      {analyticsData.patientSatisfaction}/5 satisfaction
                    </dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Appointments Trend */}
          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChart className="w-5 h-5 mr-2 text-primary" />
                Appointments Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Chart visualization would go here</p>
                  <p className="text-sm text-muted-foreground">Showing appointment trends over time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Breakdown */}
          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-primary" />
                Revenue Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center">
                  <PieChart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Chart visualization would go here</p>
                  <p className="text-sm text-muted-foreground">Showing revenue by department</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Appointment Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Completion Rate</span>
                <span className="font-medium">
                  {((analyticsData.completedAppointments / analyticsData.totalAppointments) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Cancellation Rate</span>
                <span className="font-medium">
                  {((analyticsData.cancelledAppointments / analyticsData.totalAppointments) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Average Daily</span>
                <span className="font-medium">
                  {Math.round(analyticsData.totalAppointments / 30)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Patient Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Growth Rate</span>
                <span className="font-medium text-green-600">
                  +{((analyticsData.newPatients / analyticsData.totalPatients) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg Appointments/Patient</span>
                <span className="font-medium">
                  {(analyticsData.totalAppointments / analyticsData.totalPatients).toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Satisfaction Score</span>
                <span className="font-medium">
                  {analyticsData.patientSatisfaction}/5
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Financial Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Monthly Revenue</span>
                <span className="font-medium">
                  ${(analyticsData.totalRevenue / 12).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Revenue per Patient</span>
                <span className="font-medium">
                  ${(analyticsData.totalRevenue / analyticsData.totalPatients).toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Staff Efficiency</span>
                <span className="font-medium">
                  {analyticsData.staffUtilization}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports List */}
        <Card className="health-card border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-primary" />
              Generated Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => handleViewReport(report)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getFormatIcon(report.format)}
                      <div>
                        <h4 className="font-medium text-foreground">{report.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {report.dateRange} • {report.fileSize}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Generated: {new Date(report.generatedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(report.status)}>
                        {getStatusIcon(report.status)} {report.status}
                      </Badge>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadReport(report);
                        }}
                        className="text-primary hover:text-primary/80"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* View Report Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="health-card border-0 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Report Details
              </DialogTitle>
            </DialogHeader>
            {selectedReport && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Report Name</label>
                    <p className="text-foreground font-medium">{selectedReport.name}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Type</label>
                    <p className="text-foreground capitalize">{selectedReport.type.replace('_', ' ')}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Date Range</label>
                    <p className="text-foreground">{selectedReport.dateRange}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Format</label>
                    <p className="text-foreground uppercase">{selectedReport.format}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">File Size</label>
                    <p className="text-foreground">{selectedReport.fileSize}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Generated</label>
                    <p className="text-foreground">
                      {new Date(selectedReport.generatedDate).toLocaleString()}
                    </p>
                  </div>
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
              {selectedReport && (
                <>
                  <Button 
                    onClick={() => handleDownloadReport(selectedReport)}
                    className="health-btn-primary"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button 
                    onClick={() => handleDeleteReport(selectedReport)}
                    className="health-btn-primary"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Generate Report Modal */}
        <Dialog open={isGenerateModalOpen} onOpenChange={setIsGenerateModalOpen}>
          <DialogContent className="health-card border-0 max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                Generate New Report
              </DialogTitle>
              <DialogDescription>
                Create a new report with your specified parameters.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <select
                  value={selectedReportType}
                  onChange={(e) => setSelectedReportType(e.target.value)}
                  className="w-full p-3 border border-border rounded-lg bg-background"
                >
                  <option value="appointments">Appointments Report</option>
                  <option value="revenue">Revenue Analysis</option>
                  <option value="patients">Patient Demographics</option>
                  <option value="staff">Staff Performance</option>
                  <option value="inventory">Inventory Status</option>
                  <option value="custom">Custom Report</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <select
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                  className="w-full p-3 border border-border rounded-lg bg-background"
                >
                  <option value="last_7_days">Last 7 Days</option>
                  <option value="last_30_days">Last 30 Days</option>
                  <option value="last_90_days">Last 90 Days</option>
                  <option value="last_12_months">Last 12 Months</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Format</label>
                <select className="w-full p-3 border border-border rounded-lg bg-background">
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Name (Optional)</label>
                <input
                  type="text"
                  placeholder="Enter report name..."
                  className="w-full p-3 border border-border rounded-lg bg-background"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsGenerateModalOpen(false)}
                className="health-btn-secondary"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleGenerateReport}
                className="health-btn-primary"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
} 