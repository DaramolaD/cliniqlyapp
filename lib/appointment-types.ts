// Standardized appointment status types
export type AppointmentStatus = 
  | 'pending'
  | 'confirmed'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
  | 'no-show'
  | 'rescheduled';

// Appointment type definitions
export type AppointmentType = 
  | 'General Checkup'
  | 'Consultation'
  | 'Follow-up'
  | 'Emergency'
  | 'Surgery'
  | 'Test'
  | 'Cardiology Consultation'
  | 'Skin Check'
  | 'Dental Checkup'
  | 'Mental Health'
  | 'Physical Therapy';

// Department types
export type Department = 
  | 'General Medicine'
  | 'Cardiology'
  | 'Pediatrics'
  | 'Orthopedics'
  | 'Dermatology'
  | 'Dental'
  | 'Mental Health'
  | 'Physical Therapy'
  | 'Emergency'
  | 'Surgery';

// Base appointment interface
export interface BaseAppointment {
  id: number;
  date: string;
  time: string;
  type: AppointmentType;
  status: AppointmentStatus;
  department: Department;
  notes?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

// Client appointment interface
export interface ClientAppointment extends BaseAppointment {
  doctor: string;
  doctorId?: string;
}

// Staff appointment interface
export interface StaffAppointment extends BaseAppointment {
  patient: string;
  patientId: string;
  doctor: string;
  doctorId: string;
  phone?: string;
}

// Admin appointment interface
export interface AdminAppointment extends BaseAppointment {
  patient: string;
  patientId: string;
  doctor: string;
  doctorId?: string;
  phone?: string;
  assignedBy: string;
}

// Status display utilities
export function getStatusDisplayName(status: AppointmentStatus): string {
  const statusMap: Record<AppointmentStatus, string> = {
    'pending': 'Pending',
    'confirmed': 'Confirmed',
    'in-progress': 'In Progress',
    'completed': 'Completed',
    'cancelled': 'Cancelled',
    'no-show': 'No Show',
    'rescheduled': 'Rescheduled'
  };
  return statusMap[status];
}

export function getStatusColor(status: AppointmentStatus): string {
  const colorMap: Record<AppointmentStatus, string> = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'confirmed': 'bg-green-100 text-green-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'completed': 'bg-gray-100 text-gray-800',
    'cancelled': 'bg-red-100 text-red-800',
    'no-show': 'bg-orange-100 text-orange-800',
    'rescheduled': 'bg-purple-100 text-purple-800'
  };
  return colorMap[status];
}

export function getStatusVariant(status: AppointmentStatus): 'default' | 'secondary' | 'destructive' | 'outline' {
  const variantMap: Record<AppointmentStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    'pending': 'secondary',
    'confirmed': 'default',
    'in-progress': 'default',
    'completed': 'secondary',
    'cancelled': 'destructive',
    'no-show': 'outline',
    'rescheduled': 'outline'
  };
  return variantMap[status];
}

// Status transition rules
export function canTransitionStatus(fromStatus: AppointmentStatus, toStatus: AppointmentStatus): boolean {
  const allowedTransitions: Record<AppointmentStatus, AppointmentStatus[]> = {
    'pending': ['confirmed', 'cancelled', 'rescheduled'],
    'confirmed': ['in-progress', 'cancelled', 'rescheduled', 'no-show'],
    'in-progress': ['completed', 'cancelled'],
    'completed': [], // Terminal state
    'cancelled': ['pending'], // Can be rescheduled
    'no-show': ['pending', 'cancelled'], // Can be rescheduled
    'rescheduled': ['confirmed', 'cancelled']
  };
  
  return allowedTransitions[fromStatus]?.includes(toStatus) || false;
}

// Appointment validation
export function validateAppointment(appointment: Partial<BaseAppointment>): string[] {
  const errors: string[] = [];
  
  if (!appointment.date) errors.push('Date is required');
  if (!appointment.time) errors.push('Time is required');
  if (!appointment.type) errors.push('Appointment type is required');
  if (!appointment.department) errors.push('Department is required');
  
  // Validate date is not in the past
  if (appointment.date && new Date(appointment.date) < new Date()) {
    errors.push('Appointment date cannot be in the past');
  }
  
  return errors;
}

// Mock data generators
export function generateMockAppointments(count: number = 10): AdminAppointment[] {
  const mockAppointments: AdminAppointment[] = [];
  const types: AppointmentType[] = ['General Checkup', 'Consultation', 'Follow-up', 'Emergency'];
  const departments: Department[] = ['General Medicine', 'Cardiology', 'Pediatrics', 'Orthopedics'];
  const statuses: AppointmentStatus[] = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];
  const doctors = [
    'Dr. Sarah Johnson',
    'Dr. Michael Chen',
    'Dr. Lisa Thompson',
    'Dr. Robert Wilson',
    'Dr. Emily Rodriguez'
  ];
  const patients = [
    'John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson',
    'David Brown', 'Lisa Davis', 'Tom Anderson', 'Mary Johnson'
  ];
  
  for (let i = 1; i <= count; i++) {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 30));
    
    mockAppointments.push({
      id: i,
      date: date.toISOString().split('T')[0],
      time: `${Math.floor(Math.random() * 12) + 8}:${Math.random() > 0.5 ? '00' : '30'} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      patient: patients[Math.floor(Math.random() * patients.length)],
      patientId: `P${String(i).padStart(3, '0')}`,
      doctor: doctors[Math.floor(Math.random() * doctors.length)],
      doctorId: `D${String(Math.floor(Math.random() * 5) + 1).padStart(3, '0')}`,
      department: departments[Math.floor(Math.random() * departments.length)],
      type: types[Math.floor(Math.random() * types.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      notes: `Appointment notes for patient ${i}`,
      location: `Room ${Math.floor(Math.random() * 100) + 1}`,
      phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      assignedBy: Math.random() > 0.5 ? 'Admin' : doctors[Math.floor(Math.random() * doctors.length)],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  return mockAppointments;
} 