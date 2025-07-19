"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Activity, 
  Thermometer, 
  Scale,
  TrendingUp,
  TrendingDown,
//   AlertCircle,
//   CheckCircle,
//   Clock,
  FileText,
  Calendar,
  Pill
} from "lucide-react";
import { useRouter } from "next/navigation";

interface VitalSigns {
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  weight: number;
  height: number;
  bmi: number;
  lastUpdated: string;
}

interface HealthMetric {
  name: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  lastReading: string;
}

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  nextDose: string;
  status: 'active' | 'completed' | 'discontinued';
  refillDate?: string;
}

interface UpcomingTest {
  id: number;
  name: string;
  date: string;
  time: string;
  type: string;
  preparation?: string;
  location: string;
}

export default function ClientHealthPage() {
  const router = useRouter();

  const vitalSigns: VitalSigns = {
    bloodPressure: '120/80',
    heartRate: 72,
    temperature: 98.6,
    weight: 165,
    height: 70,
    bmi: 23.7,
    lastUpdated: '2024-01-15T10:30:00'
  };

  const healthMetrics: HealthMetric[] = [
    {
      name: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      status: 'normal',
      trend: 'stable',
      lastReading: '2024-01-15'
    },
    {
      name: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      status: 'normal',
      trend: 'down',
      lastReading: '2024-01-15'
    },
    {
      name: 'Temperature',
      value: '98.6',
      unit: '°F',
      status: 'normal',
      trend: 'stable',
      lastReading: '2024-01-15'
    },
    {
      name: 'Weight',
      value: '165',
      unit: 'lbs',
      status: 'normal',
      trend: 'down',
      lastReading: '2024-01-14'
    },
    {
      name: 'BMI',
      value: '23.7',
      unit: '',
      status: 'normal',
      trend: 'down',
      lastReading: '2024-01-14'
    },
    {
      name: 'Cholesterol',
      value: '180',
      unit: 'mg/dL',
      status: 'warning',
      trend: 'up',
      lastReading: '2024-01-10'
    }
  ];

  const medications: Medication[] = [
    {
      id: 1,
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      nextDose: '2024-01-16T08:00:00',
      status: 'active',
      refillDate: '2024-02-01'
    },
    {
      id: 2,
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      nextDose: '2024-01-15T20:00:00',
      status: 'active',
      refillDate: '2024-01-25'
    },
    {
      id: 3,
      name: 'Ibuprofen',
      dosage: '400mg',
      frequency: 'As needed',
      nextDose: 'N/A',
      status: 'active'
    }
  ];

  const upcomingTests: UpcomingTest[] = [
    {
      id: 1,
      name: 'Blood Work',
      date: '2024-01-20',
      time: '9:00 AM',
      type: 'Laboratory',
      preparation: 'Fast for 12 hours before test',
      location: 'Main Lab - Room 201'
    },
    {
      id: 2,
      name: 'ECG',
      date: '2024-01-25',
      time: '2:00 PM',
      type: 'Cardiology',
      location: 'Cardiology Department'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-green-500" />;
      case 'stable': return <Activity className="w-4 h-4 text-blue-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getMedicationStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'discontinued': return 'text-red-600 bg-red-100';
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
            <h1 className="text-3xl font-bold text-foreground">My Health</h1>
            <p className="mt-2 text-muted-foreground">
              Monitor your health metrics, medications, and upcoming tests.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => router.push('/client/medical-history')}
              className="health-btn-secondary"
            >
              <FileText className="w-4 h-4 mr-2" />
              Medical History
            </Button>
            <Button 
              onClick={() => router.push('/client/prescriptions')}
              className="health-btn-primary"
            >
              <Pill className="w-4 h-4 mr-2" />
              Manage Medications
            </Button>
          </div>
        </div>

        {/* Health Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="health-card border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-red-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Blood Pressure</dt>
                    <dd className="text-lg font-medium text-foreground">{vitalSigns.bloodPressure}</dd>
                    <dd className="text-xs text-muted-foreground">mmHg</dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="health-card border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Heart Rate</dt>
                    <dd className="text-lg font-medium text-foreground">{vitalSigns.heartRate}</dd>
                    <dd className="text-xs text-muted-foreground">bpm</dd>
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
                    <Thermometer className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">Temperature</dt>
                    <dd className="text-lg font-medium text-foreground">{vitalSigns.temperature}</dd>
                    <dd className="text-xs text-muted-foreground">°F</dd>
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
                    <Scale className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">BMI</dt>
                    <dd className="text-lg font-medium text-foreground">{vitalSigns.bmi}</dd>
                    <dd className="text-xs text-muted-foreground">Normal</dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Health Metrics */}
          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-primary" />
                Health Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {healthMetrics.map((metric) => (
                  <div key={metric.name} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(metric.status).split(' ')[1]}`} />
                      <div>
                        <p className="font-medium text-foreground">{metric.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Last reading: {metric.lastReading}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-foreground">
                        {metric.value} {metric.unit}
                      </span>
                      {getTrendIcon(metric.trend)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Medications */}
          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pill className="w-5 h-5 mr-2 text-primary" />
                Current Medications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medications.map((medication) => (
                  <div key={medication.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-foreground">{medication.name}</h4>
                          <Badge className={getMedicationStatusColor(medication.status)}>
                            {medication.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {medication.dosage} • {medication.frequency}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Next dose: {medication.nextDose === 'N/A' ? 'As needed' : new Date(medication.nextDose).toLocaleString()}
                        </p>
                        {medication.refillDate && (
                          <p className="text-xs text-orange-600 mt-1">
                            Refill needed: {new Date(medication.refillDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/client/prescriptions')}
                  className="w-full health-btn-secondary"
                >
                  <Pill className="w-4 h-4 mr-2" />
                  Manage All Medications
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Tests */}
        <Card className="health-card border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              Upcoming Tests & Procedures
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingTests.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No upcoming tests scheduled</p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingTests.map((test) => (
                  <div key={test.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-foreground">{test.name}</h4>
                          <Badge variant="outline">{test.type}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Date & Time</p>
                            <p className="text-foreground">
                              {new Date(test.date).toLocaleDateString()} at {test.time}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Location</p>
                            <p className="text-foreground">{test.location}</p>
                          </div>
                        </div>
                        {test.preparation && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm font-medium text-blue-800 mb-1">Preparation Required</p>
                            <p className="text-sm text-blue-700">{test.preparation}</p>
                          </div>
                        )}
                      </div>
                      <Button variant="outline" size="sm" className="health-btn-secondary">
                        <Calendar className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Health Goals Progress */}
        <Card className="health-card border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary" />
              Health Goals Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Weight Goal</span>
                  <span className="text-sm text-muted-foreground">160 lbs target</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground">5 lbs to go</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Daily Steps</span>
                  <span className="text-sm text-muted-foreground">8,500 / 10,000</span>
                </div>
                <Progress value={85} className="h-2" />
                <p className="text-xs text-muted-foreground">1,500 more steps today</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Medication Adherence</span>
                  <span className="text-sm text-muted-foreground">95%</span>
                </div>
                <Progress value={95} className="h-2" />
                <p className="text-xs text-muted-foreground">Excellent adherence this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="health-card border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                onClick={() => router.push('/client/medical-history')}
                className="health-btn-secondary"
              >
                <FileText className="w-4 h-4 mr-2" />
                View Medical History
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push('/client/documents')}
                className="health-btn-secondary"
              >
                <FileText className="w-4 h-4 mr-2" />
                Access Documents
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push('/client/appointments/book')}
                className="health-btn-secondary"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Appointment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 