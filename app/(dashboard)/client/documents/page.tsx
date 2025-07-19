"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DataTable } from "@/components/customs/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  FileText, 
  Download, 
  Eye, 
  Upload,
  Search,
//   Filter,
//   Calendar,
//   File,
  Image,
//   FilePdf,
  FileSpreadsheet,
  File
} from "lucide-react";
// import { useRouter } from "next/navigation";

interface Document {
  id: number;
  name: string;
  type: 'pdf' | 'image' | 'document' | 'spreadsheet';
  category: 'medical_records' | 'test_results' | 'prescriptions' | 'insurance' | 'billing' | 'consent_forms';
  size: string;
  uploadedDate: string;
  lastAccessed: string;
  description: string;
  tags: string[];
  isShared: boolean;
}

export default function ClientDocumentsPage() {
//   const router = useRouter();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const documents: Document[] = [
    {
      id: 1,
      name: 'Blood_Work_Results_Jan2024.pdf',
      type: 'pdf',
      category: 'test_results',
      size: '2.3 MB',
      uploadedDate: '2024-01-15T10:30:00',
      lastAccessed: '2024-01-16T14:20:00',
      description: 'Comprehensive blood work results from annual physical examination',
      tags: ['blood work', 'annual physical', 'lab results'],
      isShared: true
    },
    {
      id: 2,
      name: 'ECG_Report_Jan2024.pdf',
      type: 'pdf',
      category: 'medical_records',
      size: '1.8 MB',
      uploadedDate: '2024-01-10T15:45:00',
      lastAccessed: '2024-01-12T09:15:00',
      description: 'Electrocardiogram report showing normal sinus rhythm',
      tags: ['ECG', 'cardiology', 'heart'],
      isShared: true
    },
    {
      id: 3,
      name: 'Prescription_Lisinopril.pdf',
      type: 'pdf',
      category: 'prescriptions',
      size: '0.5 MB',
      uploadedDate: '2024-01-08T11:20:00',
      lastAccessed: '2024-01-15T08:30:00',
      description: 'Current prescription for Lisinopril 10mg daily',
      tags: ['prescription', 'medication', 'hypertension'],
      isShared: false
    },
    {
      id: 4,
      name: 'Insurance_Card_Front.jpg',
      type: 'image',
      category: 'insurance',
      size: '1.2 MB',
      uploadedDate: '2023-12-01T09:00:00',
      lastAccessed: '2024-01-10T16:45:00',
      description: 'Front of insurance card for Blue Cross Blue Shield',
      tags: ['insurance', 'card', 'BCBS'],
      isShared: false
    },
    {
      id: 5,
      name: 'Medical_Consent_Form.pdf',
      type: 'pdf',
      category: 'consent_forms',
      size: '0.8 MB',
      uploadedDate: '2023-11-15T14:30:00',
      lastAccessed: '2024-01-05T10:20:00',
      description: 'General medical consent form signed by patient',
      tags: ['consent', 'legal', 'forms'],
      isShared: true
    },
    {
      id: 6,
      name: 'Billing_Statement_Jan2024.xlsx',
      type: 'spreadsheet',
      category: 'billing',
      size: '0.3 MB',
      uploadedDate: '2024-01-20T12:00:00',
      lastAccessed: '2024-01-20T12:00:00',
      description: 'Detailed billing statement for January 2024 services',
      tags: ['billing', 'statement', 'financial'],
      isShared: false
    },
    {
      id: 7,
      name: 'Physical_Exam_Report_Jan2024.pdf',
      type: 'pdf',
      category: 'medical_records',
      size: '3.1 MB',
      uploadedDate: '2024-01-15T16:20:00',
      lastAccessed: '2024-01-16T11:30:00',
      description: 'Complete physical examination report from Dr. Johnson',
      tags: ['physical exam', 'annual checkup', 'health assessment'],
      isShared: true
    },
    {
      id: 8,
      name: 'X-Ray_Knee_December2023.jpg',
      type: 'image',
      category: 'medical_records',
      size: '4.2 MB',
      uploadedDate: '2023-12-12T13:15:00',
      lastAccessed: '2024-01-08T15:40:00',
      description: 'X-ray image of knee showing no fracture',
      tags: ['x-ray', 'knee', 'orthopedics'],
      isShared: true
    }
  ];

  const columns = [
    {
      key: 'name',
      title: 'Document',
      render: (document: Document) => {
        const getFileIcon = (type: string) => {
          switch (type) {
            case 'pdf': return <File className="w-5 h-5 text-red-500" />;
            case 'image': return <Image alt="image" className="w-5 h-5 text-green-500" />;
            case 'spreadsheet': return <FileSpreadsheet className="w-5 h-5 text-green-600" />;
            default: return <FileText className="w-5 h-5 text-blue-500" />;
          }
        };

        return (
          <div className="flex items-center space-x-3">
            {getFileIcon(document.type)}
            <div>
              <div className="font-medium text-foreground">{document.name}</div>
              <div className="text-sm text-muted-foreground">{document.description}</div>
            </div>
          </div>
        );
      }
    },
    {
      key: 'category',
      title: 'Category',
      render: (document: Document) => {
        const getCategoryLabel = (category: string) => {
          switch (category) {
            case 'medical_records': return 'Medical Records';
            case 'test_results': return 'Test Results';
            case 'prescriptions': return 'Prescriptions';
            case 'insurance': return 'Insurance';
            case 'billing': return 'Billing';
            case 'consent_forms': return 'Consent Forms';
            default: return category;
          }
        };

        return (
          <Badge variant="outline" className="capitalize">
            {getCategoryLabel(document.category)}
          </Badge>
        );
      }
    },
    {
      key: 'size',
      title: 'Size',
      render: (document: Document) => (
        <div className="text-sm text-muted-foreground">{document.size}</div>
      )
    },
    {
      key: 'uploadedDate',
      title: 'Uploaded',
      render: (document: Document) => (
        <div className="text-sm text-muted-foreground">
          {new Date(document.uploadedDate).toLocaleDateString()}
        </div>
      )
    },
    {
      key: 'isShared',
      title: 'Status',
      render: (document: Document) => (
        <Badge variant={document.isShared ? 'default' : 'secondary'}>
          {document.isShared ? 'Shared' : 'Private'}
        </Badge>
      )
    }
  ];

  const filters = [
    {
      key: 'category',
      label: 'Category',
      options: [
        { value: 'medical_records', label: 'Medical Records' },
        { value: 'test_results', label: 'Test Results' },
        { value: 'prescriptions', label: 'Prescriptions' },
        { value: 'insurance', label: 'Insurance' },
        { value: 'billing', label: 'Billing' },
        { value: 'consent_forms', label: 'Consent Forms' }
      ]
    },
    {
      key: 'type',
      label: 'File Type',
      options: [
        { value: 'pdf', label: 'PDF' },
        { value: 'image', label: 'Image' },
        { value: 'document', label: 'Document' },
        { value: 'spreadsheet', label: 'Spreadsheet' }
      ]
    }
  ];

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    setIsViewModalOpen(true);
  };

  const handleDownloadDocument = (document: Document) => {
    console.log('Downloading document:', document.name);
    // Trigger download
  };

  const handleUploadDocument = () => {
    console.log('Uploading document...');
    setIsUploadModalOpen(false);
  };

  const actions = (document: Document) => (
    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
      <Button 
        variant="link" 
        size="sm" 
        onClick={() => handleViewDocument(document)}
        className="text-primary hover:text-primary/80"
      >
        <Eye className="w-4 h-4 mr-1" />
        View
      </Button>
      <Button 
        variant="link" 
        size="sm" 
        onClick={() => handleDownloadDocument(document)}
        className="text-accent hover:text-accent/80"
      >
        <Download className="w-4 h-4 mr-1" />
        Download
      </Button>
    </div>
  );

  const filteredDocuments = documents.filter(document => {
    const matchesSearch = document.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || document.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalDocuments = documents.length;
  const totalSize = documents.reduce((sum, doc) => {
    const size = parseFloat(doc.size.split(' ')[0]);
    return sum + size;
  }, 0);
  const sharedDocuments = documents.filter(doc => doc.isShared).length;

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
            <h1 className="text-3xl font-bold text-foreground">Documents</h1>
            <p className="mt-2 text-muted-foreground">
              Access and manage your medical documents and records.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setIsUploadModalOpen(true)}
              className="health-btn-secondary"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
            <Button 
              onClick={() => console.log('Downloading all documents...')}
              className="health-btn-primary"
            >
              <Download className="w-4 h-4 mr-2" />
              Download All
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
                    <dt className="text-sm font-medium text-muted-foreground truncate">Total Documents</dt>
                    <dd className="text-lg font-medium text-foreground">{totalDocuments}</dd>
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
                    <Download className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Total Size</dt>
                    <dd className="text-lg font-medium text-foreground">{totalSize.toFixed(1)} MB</dd>
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
                    <File className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">PDF Files</dt>
                    <dd className="text-lg font-medium text-foreground">
                      {documents.filter(doc => doc.type === 'pdf').length}
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
                    <Eye className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Shared</dt>
                    <dd className="text-lg font-medium text-foreground">{sharedDocuments}</dd>
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
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Categories</option>
                <option value="medical_records">Medical Records</option>
                <option value="test_results">Test Results</option>
                <option value="prescriptions">Prescriptions</option>
                <option value="insurance">Insurance</option>
                <option value="billing">Billing</option>
                <option value="consent_forms">Consent Forms</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Documents Table */}
        <DataTable
          data={filteredDocuments}
          columns={columns}
          filters={filters}
          searchPlaceholder="Search documents..."
          onExport={() => console.log('Exporting documents...')}
          actions={actions}
          onRowClick={(document) => handleViewDocument(document)}
          title="Medical Documents"
        />

        {/* View Document Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="health-card border-0 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Document Details
              </DialogTitle>
            </DialogHeader>
            {selectedDocument && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Document Name</label>
                    <p className="text-foreground font-medium">{selectedDocument.name}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">File Type</label>
                    <p className="text-foreground capitalize">{selectedDocument.type.toUpperCase()}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Size</label>
                    <p className="text-foreground">{selectedDocument.size}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Uploaded</label>
                    <p className="text-foreground">
                      {new Date(selectedDocument.uploadedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Description</label>
                  <p className="text-foreground">{selectedDocument.description}</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedDocument.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Last Accessed</label>
                  <p className="text-foreground">
                    {new Date(selectedDocument.lastAccessed).toLocaleString()}
                  </p>
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
              {selectedDocument && (
                <Button 
                  onClick={() => handleDownloadDocument(selectedDocument)}
                  className="health-btn-primary"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Upload Document Modal */}
        <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
          <DialogContent className="health-card border-0 max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Upload className="w-5 h-5 mr-2 text-primary" />
                Upload Document
              </DialogTitle>
              <DialogDescription>
                Upload a new medical document or record to your account.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Document Name</label>
                <input
                  type="text"
                  placeholder="Enter document name..."
                  className="w-full p-3 border border-border rounded-lg bg-background"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select className="w-full p-3 border border-border rounded-lg bg-background">
                  <option value="">Select category...</option>
                  <option value="medical_records">Medical Records</option>
                  <option value="test_results">Test Results</option>
                  <option value="prescriptions">Prescriptions</option>
                  <option value="insurance">Insurance</option>
                  <option value="billing">Billing</option>
                  <option value="consent_forms">Consent Forms</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  placeholder="Describe the document..."
                  rows={3}
                  className="w-full p-3 border border-border rounded-lg bg-background resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">File</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, JPG, PNG up to 10MB
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsUploadModalOpen(false)}
                className="health-btn-secondary"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUploadDocument}
                className="health-btn-primary"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
} 