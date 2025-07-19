"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DataTable } from "@/components/customs/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Calendar, 
  Clock, 
//   User, 
  FileText, 
  Download,
  Eye,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
// import { useRouter } from "next/navigation";

interface AppointmentHistory {
  id: number;
  date: string;
  time: string;
  doctor: string;
  department: string;
  type: string;
  status: 'completed' | 'cancelled' | 'no-show';
  notes: string;
  diagnosis?: string;
  treatment?: string;
  followUp?: string;
  rating?: number;
  review?: string;
}

export default function AppointmentHistoryPage() {
//   const router = useRouter();
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentHistory | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    review: ''
  });

  const appointmentHistory: AppointmentHistory[] = [
    {
      id: 1,
      date: '2024-01-10',
      time: '10:00 AM',
      doctor: 'Dr. Sarah Johnson',
      department: 'General Medicine',
      type: 'Annual Checkup',
      status: 'completed',
      notes: 'Annual physical examination completed. Patient is in good health.',
      diagnosis: 'Healthy - No issues found',
      treatment: 'Continue current lifestyle and diet',
      followUp: 'Schedule follow-up in 6 months',
      rating: 5,
      review: 'Excellent care and attention to detail.'
    },
    {
      id: 2,
      date: '2024-01-05',
      time: '2:30 PM',
      doctor: 'Dr. Michael Chen',
      department: 'Cardiology',
      type: 'Cardiac Consultation',
      status: 'completed',
      notes: 'ECG and blood pressure monitoring. Results within normal range.',
      diagnosis: 'Normal cardiac function',
      treatment: 'Continue current medications',
      followUp: 'Follow-up in 3 months',
      rating: 4,
      review: 'Very professional and thorough examination.'
    },
    {
      id: 3,
      date: '2023-12-20',
      time: '9:00 AM',
      doctor: 'Dr. Lisa Thompson',
      department: 'Pediatrics',
      type: 'Follow-up Visit',
      status: 'completed',
      notes: 'Follow-up for previous condition. Patient showing improvement.',
      diagnosis: 'Recovery progressing well',
      treatment: 'Continue prescribed treatment',
      followUp: 'No follow-up required',
      rating: 5,
      review: 'Great bedside manner and clear explanations.'
    },
    {
      id: 4,
      date: '2023-12-15',
      time: '11:00 AM',
      doctor: 'Dr. Sarah Johnson',
      department: 'General Medicine',
      type: 'Consultation',
      status: 'cancelled',
      notes: 'Appointment cancelled by patient due to scheduling conflict.',
      diagnosis: 'N/A',
      treatment: 'N/A',
      followUp: 'Reschedule appointment'
    },
    {
      id: 5,
      date: '2023-12-10',
      time: '3:00 PM',
      doctor: 'Dr. Robert Wilson',
      department: 'Orthopedics',
      type: 'Injury Consultation',
      status: 'completed',
      notes: 'Knee injury assessment. X-rays taken and reviewed.',
      diagnosis: 'Minor sprain, no fracture',
      treatment: 'Rest, ice, compression, elevation (RICE)',
      followUp: 'Follow-up in 2 weeks',
      rating: 4,
      review: 'Good care but waiting time was long.'
    }
  ];

  const columns = [
    {
      key: 'date',
      title: 'Date & Time',
      render: (appointment: AppointmentHistory) => (
        <div>
          <div className="font-medium">{new Date(appointment.date).toLocaleDateString()}</div>
          <div className="text-sm text-muted-foreground">{appointment.time}</div>
        </div>
      )
    },
    {
      key: 'doctor',
      title: 'Doctor & Department',
      render: (appointment: AppointmentHistory) => (
        <div>
          <div className="font-medium">{appointment.doctor}</div>
          <div className="text-sm text-muted-foreground">{appointment.department}</div>
        </div>
      )
    },
    {
      key: 'type',
      title: 'Type',
      render: (appointment: AppointmentHistory) => (
        <div className="font-medium">{appointment.type}</div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (appointment: AppointmentHistory) => {
        const getStatusVariant = (status: string) => {
          switch (status) {
            case 'completed': return 'secondary';
            case 'cancelled': return 'destructive';
            case 'no-show': return 'outline';
            default: return 'outline';
          }
        };
        
        const getStatusIcon = (status: string) => {
          switch (status) {
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            case 'cancelled': return <XCircle className="w-4 h-4" />;
            case 'no-show': return <AlertCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
          }
        };

        return (
          <Badge variant={getStatusVariant(appointment.status)} className="status-badge">
            {getStatusIcon(appointment.status)}
            <span className="ml-1">{appointment.status}</span>
          </Badge>
        );
      }
    },
    {
      key: 'rating',
      title: 'Rating',
      render: (appointment: AppointmentHistory) => (
        <div className="flex items-center">
          {appointment.rating ? (
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < appointment.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {appointment.rating}/5
              </span>
            </div>
          ) : (
            <span className="text-muted-foreground">Not rated</span>
          )}
        </div>
      )
    }
  ];

  const filters = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' },
        { value: 'no-show', label: 'No Show' }
      ]
    },
    {
      key: 'department',
      label: 'Department',
      options: [
        { value: 'General Medicine', label: 'General Medicine' },
        { value: 'Cardiology', label: 'Cardiology' },
        { value: 'Pediatrics', label: 'Pediatrics' },
        { value: 'Orthopedics', label: 'Orthopedics' }
      ]
    }
  ];

  const handleViewAppointment = (appointment: AppointmentHistory) => {
    setSelectedAppointment(appointment);
    setIsViewModalOpen(true);
  };

  const handleReviewAppointment = (appointment: AppointmentHistory) => {
    setSelectedAppointment(appointment);
    setReviewForm({
      rating: appointment.rating || 5,
      review: appointment.review || ''
    });
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = async () => {
    if (!selectedAppointment) return;

    console.log('Submitting review:', { appointmentId: selectedAppointment.id, ...reviewForm });
    setIsReviewModalOpen(false);
    // In a real app, you'd update the appointment with the review
  };

  const handleDownloadRecords = (appointment: AppointmentHistory) => {
    console.log('Downloading records for appointment:', appointment.id);
    // Trigger download
  };

  const actions = (appointment: AppointmentHistory) => (
    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
      <Button 
        variant="link" 
        size="sm" 
        onClick={() => handleViewAppointment(appointment)}
        className="text-primary hover:text-primary/80"
      >
        <Eye className="w-4 h-4 mr-1" />
        View
      </Button>
      <Button 
        variant="link" 
        size="sm" 
        onClick={() => handleDownloadRecords(appointment)}
        className="text-accent hover:text-accent/80"
      >
        <Download className="w-4 h-4 mr-1" />
        Download
      </Button>
      {appointment.status === 'completed' && !appointment.rating && (
        <Button 
          variant="link" 
          size="sm" 
          onClick={() => handleReviewAppointment(appointment)}
          className="text-green-600 hover:text-green-700"
        >
          <Star className="w-4 h-4 mr-1" />
          Review
        </Button>
      )}
    </div>
  );

  const completedAppointments = appointmentHistory.filter(a => a.status === 'completed').length;
  const cancelledAppointments = appointmentHistory.filter(a => a.status === 'cancelled').length;
  const averageRating = appointmentHistory
    .filter(a => a.rating)
    .reduce((sum, a) => sum + (a.rating || 0), 0) / 
    appointmentHistory.filter(a => a.rating).length;

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
            <h1 className="text-3xl font-bold text-foreground">Appointment History</h1>
            <p className="mt-2 text-muted-foreground">
              View your past appointments and medical records.
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
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Total Appointments</dt>
                    <dd className="text-lg font-medium text-foreground">{appointmentHistory.length}</dd>
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
                    <dt className="text-sm font-medium text-muted-foreground truncate">Completed</dt>
                    <dd className="text-lg font-medium text-foreground">{completedAppointments}</dd>
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
                    <XCircle className="w-5 h-5 text-red-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Cancelled</dt>
                    <dd className="text-lg font-medium text-foreground">{cancelledAppointments}</dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="health-card border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Average Rating</dt>
                    <dd className="text-lg font-medium text-foreground">
                      {averageRating ? averageRating.toFixed(1) : 'N/A'}
                    </dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Table */}
        <DataTable
          data={appointmentHistory}
          columns={columns}
          filters={filters}
          searchPlaceholder="Search appointment history..."
          onExport={() => console.log('Exporting appointment history...')}
          actions={actions}
          onRowClick={(appointment) => handleViewAppointment(appointment)}
          title="Appointment History"
        />

        {/* View Appointment Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="health-card border-0 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Appointment Details
              </DialogTitle>
            </DialogHeader>
            {selectedAppointment && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Date & Time</label>
                    <p className="text-foreground">
                      {new Date(selectedAppointment.date).toLocaleDateString()} at {selectedAppointment.time}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Doctor</label>
                    <p className="text-foreground">{selectedAppointment.doctor}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Department</label>
                    <p className="text-foreground">{selectedAppointment.department}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Type</label>
                    <p className="text-foreground">{selectedAppointment.type}</p>
                  </div>
                </div>
                
                {selectedAppointment.diagnosis && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Diagnosis</label>
                    <p className="text-foreground">{selectedAppointment.diagnosis}</p>
                  </div>
                )}
                
                {selectedAppointment.treatment && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Treatment</label>
                    <p className="text-foreground">{selectedAppointment.treatment}</p>
                  </div>
                )}
                
                {selectedAppointment.followUp && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Follow-up</label>
                    <p className="text-foreground">{selectedAppointment.followUp}</p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Notes</label>
                  <p className="text-foreground">{selectedAppointment.notes}</p>
                </div>

                {selectedAppointment.rating && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Your Rating</label>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < selectedAppointment.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {selectedAppointment.rating}/5
                      </span>
                    </div>
                    {selectedAppointment.review && (
                      <p className="text-sm text-foreground mt-2">{selectedAppointment.review}</p>
                    )}
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
              {selectedAppointment && selectedAppointment.status === 'completed' && !selectedAppointment.rating && (
                <Button 
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handleReviewAppointment(selectedAppointment);
                  }}
                  className="health-btn-primary"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Leave Review
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Review Modal */}
        <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
          <DialogContent className="health-card border-0 max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-primary" />
                Rate Your Experience
              </DialogTitle>
              <DialogDescription>
                Help us improve by sharing your experience with {selectedAppointment?.doctor}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Rating</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setReviewForm({ ...reviewForm, rating })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          rating <= reviewForm.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Review (Optional)</label>
                <textarea
                  value={reviewForm.review}
                  onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                  placeholder="Share your experience..."
                  rows={4}
                  className="w-full p-3 border border-border rounded-lg bg-background resize-none"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsReviewModalOpen(false)}
                className="health-btn-secondary"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitReview}
                className="health-btn-primary"
              >
                <Star className="w-4 h-4 mr-2" />
                Submit Review
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
} 