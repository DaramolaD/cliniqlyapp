"use client";

import { withAuth } from "@/components/auth/with-auth";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  Edit,
  Save,
  X
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
  };
}

function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-03-15",
    address: "123 Main Street, Anytown, ST 12345",
    emergencyContact: {
      name: "Jane Doe",
      phone: "+1 (555) 987-6543",
      relationship: "Spouse"
    },
    insurance: {
      provider: "Blue Cross Blue Shield",
      policyNumber: "BCBS123456789",
      groupNumber: "GRP987654321"
    }
  });

  const handleSave = () => {
    // In production, this would make an API call
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
  };

  const mockUser = {
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    role: "Patient"
  };

  return (
    <DashboardLayout variant="client" user={mockUser}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Profile</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your personal information and preferences.
            </p>
          </div>
          <div className="flex items-center gap-2">
          {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="health-btn-primary">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
              <>
              <Button onClick={handleCancel} variant="outline" className="health-btn-secondary">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} className="health-btn-primary">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              </>
            )}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="health-card border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-primary" />
                  Profile Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/avatars/user.jpg" />
                    <AvatarFallback className="text-lg">
                      {profileData.firstName[0]}{profileData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {profileData.firstName} {profileData.lastName}
                    </h3>
                    <p className="text-muted-foreground">{profileData.email}</p>
                    <Badge variant="secondary" className="mt-1">
                      {user?.role || "Patient"}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{profileData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Born {new Date(profileData.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{profileData.address}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
        </div>

        {/* Personal Information */}
          <div className="lg:col-span-2">
        <Card className="health-card border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
              <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                  disabled={!isEditing}
                  className="health-card border-0"
                />
              </div>
                  
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                  disabled={!isEditing}
                  className="health-card border-0"
                />
              </div>
                  
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  disabled={!isEditing}
                  className="health-card border-0"
                />
              </div>
                  
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  disabled={!isEditing}
                  className="health-card border-0"
                />
              </div>
                  
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                  disabled={!isEditing}
                  className="health-card border-0"
                />
            </div>

                  <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                disabled={!isEditing}
                className="health-card border-0"
              />
            </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="health-card border-0 shadow-sm mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-primary" />
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                    <Label htmlFor="emergencyName">Name</Label>
                <Input
                      id="emergencyName"
                      value={profileData.emergencyContact.name}
                      onChange={(e) => setProfileData({
                        ...profileData, 
                        emergencyContact: {...profileData.emergencyContact, name: e.target.value}
                      })}
                  disabled={!isEditing}
                  className="health-card border-0"
                />
              </div>
                  
              <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Phone</Label>
                <Input
                      id="emergencyPhone"
                      value={profileData.emergencyContact.phone}
                      onChange={(e) => setProfileData({
                        ...profileData, 
                        emergencyContact: {...profileData.emergencyContact, phone: e.target.value}
                      })}
                  disabled={!isEditing}
                  className="health-card border-0"
                />
              </div>
                  
              <div className="space-y-2">
                    <Label htmlFor="emergencyRelationship">Relationship</Label>
                <Input
                      id="emergencyRelationship"
                      value={profileData.emergencyContact.relationship}
                      onChange={(e) => setProfileData({
                        ...profileData, 
                        emergencyContact: {...profileData.emergencyContact, relationship: e.target.value}
                      })}
                  disabled={!isEditing}
                  className="health-card border-0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insurance Information */}
            <Card className="health-card border-0 shadow-sm mt-6">
          <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary" />
                Insurance Information
              </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                    <Label htmlFor="insuranceProvider">Provider</Label>
                <Input
                      id="insuranceProvider"
                      value={profileData.insurance.provider}
                      onChange={(e) => setProfileData({
                        ...profileData, 
                        insurance: {...profileData.insurance, provider: e.target.value}
                      })}
                      disabled={!isEditing}
                  className="health-card border-0"
                />
              </div>
                  
              <div className="space-y-2">
                    <Label htmlFor="policyNumber">Policy Number</Label>
                <Input
                      id="policyNumber"
                      value={profileData.insurance.policyNumber}
                      onChange={(e) => setProfileData({
                        ...profileData, 
                        insurance: {...profileData.insurance, policyNumber: e.target.value}
                      })}
                      disabled={!isEditing}
                  className="health-card border-0"
                />
              </div>
                  
              <div className="space-y-2">
                    <Label htmlFor="groupNumber">Group Number</Label>
                <Input
                      id="groupNumber"
                      value={profileData.insurance.groupNumber}
                      onChange={(e) => setProfileData({
                        ...profileData, 
                        insurance: {...profileData.insurance, groupNumber: e.target.value}
                      })}
                      disabled={!isEditing}
                  className="health-card border-0"
                />
              </div>
            </div>
              </CardContent>
            </Card>
              </div>
            </div>
      </div>
    </DashboardLayout>
  );
} 

// Export with authentication wrapper
export default withAuth(ProfilePage, {
  requiredRoles: ['client'],
  redirectTo: '/client/login'
}); 